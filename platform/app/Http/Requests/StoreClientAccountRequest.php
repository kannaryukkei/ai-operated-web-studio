<?php

namespace App\Http\Requests;

use App\Models\ClientAccount;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreClientAccountRequest extends FormRequest
{
    public function authorize(): bool
    {
        Gate::authorize('create', ClientAccount::class);

        return true;
    }

    public function rules(): array
    {
        return [
            'business_name' => ['required', 'string', 'max:160'],
            'business_category' => ['nullable', 'string', 'max:120'],
            'website' => ['nullable', 'url', 'max:255'],
            'contact_name' => ['nullable', 'string', 'max:160'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
        ];
    }
}
