<?php

namespace App\Services;

use App\Repositories\ModuleRepository;

class ModuleService
{
    protected $moduleRepository;

    public function __construct(ModuleRepository $moduleRepository)
    {
        $this->moduleRepository = $moduleRepository;
    }

    public function getAllModulesWithPermissions()
    {
        return $this->moduleRepository->all();
    }
}
