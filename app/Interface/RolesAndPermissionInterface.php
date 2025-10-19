<?php

namespace App\Interface;

use Illuminate\Http\Request;

interface RolesAndPermissionInterface
{
    public function getRoles(Request $request);
}
