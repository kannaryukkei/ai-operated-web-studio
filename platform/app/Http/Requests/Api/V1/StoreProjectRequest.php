<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\StoreProjectRequest as BaseStoreProjectRequest;

class StoreProjectRequest extends BaseStoreProjectRequest
{
    /** @return array<string, list<string>> */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'status' => ['sometimes', 'in:draft,onboarding,active,on_hold,completed,cancelled'],
            'current_stage' => ['sometimes', 'string', 'max:64'],
            'next_action' => ['nullable', 'string', 'max:4000'],
            'next_action_owner' => ['nullable', 'in:studio,client'],
        ];
    }
}
