<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\CarSetOwnerProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(
            security: 'is_granted("ROLE_USER")',
            processor: CarSetOwnerProcessor::class,
        ),
        new Patch(security: 'is_granted("ROLE_USER") and object.owner === user'),
        new Put(security: 'is_granted("ROLE_USER") and object.owner === user'),
        new Delete(security: 'is_granted("ROLE_USER") and object.owner === user'),
    ],
    normalizationContext: ['groups' => ['car:read']],
    denormalizationContext: ['groups' => ['car:create', 'car:update']],
)]
#[ORM\Entity]
class Car
{
    #[Groups(['car:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue('SEQUENCE')]
    #[ORM\Column(type: 'integer')]
    public ?int $id = null;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 255)]
    public string $title;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'text')]
    public string $description;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'float')]
    public float $price;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 100)]
    public string $brand;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 100)]
    public string $model;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'integer')]
    public int $year;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'integer')]
    public int $mileage;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 50)]
    public string $fuelType;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 50)]
    public string $transmission;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    public ?string $bodyType;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    public ?string $color;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'float', nullable: true)]
    public ?float $engineSize;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'integer', nullable: true)]
    public ?int $horsePower;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'integer', nullable: true)]
    public ?int $numberOfDoors;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 50)]
    public string $condition;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 255)]
    public string $location;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    public bool $isSold = false;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $updatedAt;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 255)]
    public string $sellerContact;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $images;

    #[Groups(['car:read', 'car:create'])]
    #[ORM\Column(type: 'string', length: 17, nullable: true)]
    public ?string $vin;

    // Adding the Many-to-One relationship to User
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'cars')]
    #[ORM\JoinColumn(nullable: false)]
    public UserInterface $owner;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->images = [];
    }

    public function setUpdatedAt(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
