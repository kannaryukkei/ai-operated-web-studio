<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\StoreClientAccountRequest as BaseStoreClientAccountRequest;

class StoreClientAccountRequest extends BaseStoreClientAccountRequest
{
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'slug' => ['nullable', 'string', 'max:180', 'alpha_dash', 'unique:client_accounts,slug'],
        ];
    }
}
