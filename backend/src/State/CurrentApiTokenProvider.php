<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Symfony\Bundle\SecurityBundle\Security;

class CurrentApiTokenProvider implements ProviderInterface
{
    public function __construct(
        private readonly Security $security
    )
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $securityToken = $this->security->getToken();

        if (null === $securityToken) {
            return null;
        }

        return $securityToken->getUser();
    }
}
