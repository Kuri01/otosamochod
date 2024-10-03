<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241003122216 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE car_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE car (id INT NOT NULL, owner_id INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, price DOUBLE PRECISION NOT NULL, brand VARCHAR(100) NOT NULL, model VARCHAR(100) NOT NULL, year INT NOT NULL, mileage INT NOT NULL, fuel_type VARCHAR(50) NOT NULL, transmission VARCHAR(50) NOT NULL, body_type VARCHAR(50) DEFAULT NULL, color VARCHAR(50) DEFAULT NULL, engine_size DOUBLE PRECISION DEFAULT NULL, horse_power INT DEFAULT NULL, number_of_doors INT DEFAULT NULL, condition VARCHAR(50) NOT NULL, location VARCHAR(255) NOT NULL, is_sold BOOLEAN DEFAULT false NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, seller_contact VARCHAR(255) NOT NULL, images JSON DEFAULT NULL, vin VARCHAR(17) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_773DE69D7E3C61F9 ON car (owner_id)');
        $this->addSql('COMMENT ON COLUMN car.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN car.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE car_id_seq CASCADE');
        $this->addSql('ALTER TABLE car DROP CONSTRAINT FK_773DE69D7E3C61F9');
        $this->addSql('DROP TABLE car');
    }
}
