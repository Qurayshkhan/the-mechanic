<?php

namespace App\Interface;

interface MechanicDocumentInterface
{
    public function updateOrCreateMechanicDocument($userId, $data);
}
