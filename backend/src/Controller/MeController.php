<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use App\Entity\User;

class MeController extends AbstractController
{
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Not authenticated'], 401);
        }

        return $this->json([
            'id'           => $user->getId(),
            'email'        => $user->getEmail(),
            'name'         => $user->getName(),
            'surname'      => $user->getSurname(),
            'nickname'     => $user->getNickname(),
            'city'         => $user->getCity(),
            'roles'        => $user->getRoles(),
            'registeredAt' => $user->getRegisteredAt()?->format('Y-m-d H:i:s'),
            'birthdate'    => $user->getBirthdate()?->format('Y-m-d'),
        ]);
    }
}
