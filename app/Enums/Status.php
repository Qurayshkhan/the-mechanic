<?php

namespace App\Enums;

enum Status: int
{
    case STATUS_ACTIVE = 1;
    case STATUS_INACTIVE = 2;
    case STATUS_BLOCKED = 3;
}
