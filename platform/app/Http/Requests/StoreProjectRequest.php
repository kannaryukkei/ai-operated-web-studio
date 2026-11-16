<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        Gate::authorize('create', Project::class);

        return true;
    }

    /** @return array<string, list<string>> */
    public function rules(): array
    {
        return [
            'client_account_id' => ['required', 'integer', 'exists:client_accounts,id'],
            'product_tier' => ['required', 'in:starter,business,custom'],
            'name' => ['required', 'string', 'max:160'],
            'objective' => ['nullable', 'string', 'max:4000'],
            'target_launch_date' => ['nullable', 'date'],
        ];
    }
}
