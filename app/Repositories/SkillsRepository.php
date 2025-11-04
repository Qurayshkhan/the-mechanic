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
        $query = $this->skill->query();
        if ($mechanicTypeId) {
            $query->where('mechanic_type_id', $mechanicTypeId)->get();
        }
        return $query->get();
    }
}
