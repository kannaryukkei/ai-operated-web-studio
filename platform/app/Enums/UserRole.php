<?php

namespace App\Enums;

enum UserRole: string
{
    case StudioOwner = 'studio_owner';
    case StudioOperator = 'studio_operator';
    case Client = 'client';

    public function isStudio(): bool
    {
        return $this === self::StudioOwner || $this === self::StudioOperator;
    }
}
