<?php

namespace App\Actions\Workspace;

use App\Models\ClientAccount;
use Illuminate\Support\Str;

class CreateClientAccount
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): ClientAccount
    {
        if (blank($attributes['slug'] ?? null)) {
            $baseSlug = Str::slug($attributes['business_name']) ?: 'client';
            $slug = $baseSlug;
            $suffix = 2;

            while (ClientAccount::query()->where('slug', $slug)->exists()) {
                $slug = $baseSlug.'-'.$suffix++;
            }

            $attributes['slug'] = $slug;
        }

        return ClientAccount::create($attributes);
    }
}
