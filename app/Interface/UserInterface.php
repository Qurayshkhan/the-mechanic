<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;
use Request;

interface UserInterface
{
    public function users(Request $request): LengthAwarePaginator;
}
