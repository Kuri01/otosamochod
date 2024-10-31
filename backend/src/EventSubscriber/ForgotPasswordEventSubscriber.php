<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use CoopTilleuls\ForgotPasswordBundle\Event\CreateTokenEvent;
use CoopTilleuls\ForgotPasswordBundle\Event\UpdatePasswordEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final readonly class ForgotPasswordEventSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private MailerInterface $mailer,
        private UserPasswordHasherInterface $passwordHasher,
        private EntityManagerInterface $entityManager,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CreateTokenEvent::class => 'onCreateToken',
            UpdatePasswordEvent::class => 'onUpdatePassword',
        ];
    }

    public function onCreateToken(CreateTokenEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();

        $message = (new TemplatedEmail())
            ->from('project@example.com')
            ->to($user->getEmail())
            ->cc('xxxxx@xxxx.xx')
            ->subject('Reset your password')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context([
                'reset_password_url' => sprintf(
                    'localhost:8081/forgot-password/%s',
                    $passwordToken->getToken()
                ),
            ])
        ;
        $this->mailer->send($message);
    }

    public function onUpdatePassword(UpdatePasswordEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $event->getPassword()
        );
        $user->setPassword($hashedPassword);

        $this->entityManager->flush();
    }
}
