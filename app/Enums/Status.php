<?php

namespace App\Enums;

enum Status: int
{
    case STATUS_ACTIVE = 1;
    case STATUS_INACTIVE = 2;
    case STATUS_BLOCKED = 3;

    case STATUS_PENDING = 4;
    case STATUS_COMPLETE = 5;
    case STATUS_APPROVED = 6;
    case STATUS_REJECTED = 7;
}
