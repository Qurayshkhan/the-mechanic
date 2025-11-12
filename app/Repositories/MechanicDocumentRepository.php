<?php

namespace App\Repositories;

use App\Interface\MechanicDocumentInterface;
use App\Models\MechanicDocument;

class MechanicDocumentRepository implements MechanicDocumentInterface
{
    protected $mechanicDocument;

    public function __construct(MechanicDocument $mechanicDocument)
    {
        $this->mechanicDocument = $mechanicDocument;
    }

    public function updateOrCreateMechanicDocument($userId, $data)
    {
        return  MechanicDocument::updateOrCreate(
            ['mechanic_id' => $userId],
            $data
        );
    }
}
