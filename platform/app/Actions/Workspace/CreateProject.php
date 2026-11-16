<?php

namespace App\Actions\Workspace;

use App\Models\Project;
use App\Models\User;

class CreateProject
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes, User $creator): Project
    {
        $project = new Project($attributes);
        $project->created_by = $creator->getKey();
        $project->save();

        return $project;
    }
}
