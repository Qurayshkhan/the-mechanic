<?php

namespace App\Enums;

enum UserType: int
{
    case ADMIN = 1;
    case MECHANIC = 2;

    case CUSTOMER = 3;

    case VENDOR = 4;
}
