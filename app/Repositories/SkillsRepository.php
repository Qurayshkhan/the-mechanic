<?php

namespace App\Repositories;

use App\Interface\SkillsInterface;
use App\Models\Skill;

class SkillsRepository implements SkillsInterface
{
    protected $skill;

    public function __construct(Skill $skill)
    {
        $this->skill = $skill;
    }

    public function getSkillsByMechanicType($mechanicTypeId = null)
    {
        return $this->skill->where('mechanic_type_id', $mechanicTypeId)->get();
    }
}
