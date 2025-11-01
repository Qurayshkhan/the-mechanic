<?php

namespace App\Repositories;

use App\Interface\ModuleInterface;
use App\Models\Module;

class ModuleRepository implements ModuleInterface
{
    protected $module;
    public function __construct(Module $module)
    {
        $this->module = $module;
    }

    public function all()
    {
        return $this->module->with('permissions')->get();
    }
}
