<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Car;
use Symfony\Bundle\SecurityBundle\Security;

/**
 * @implements ProcessorInterface<Car, Car|void>
 */
final readonly class CarSetOwnerProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $processor,
        private Security $security,
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($data instanceof Car && $this->security->getUser()) {
            $data->owner = $this->security->getUser();
        }

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
