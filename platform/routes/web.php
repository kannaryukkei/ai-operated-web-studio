<?php

use App\Http\Controllers\Api\V1\WorkspaceController;
use App\Http\Controllers\ClientInvitationController;
use App\Http\Controllers\ProjectIntakeController;
use App\Http\Controllers\WorkspacePageController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('invitations/{token}', [ClientInvitationController::class, 'show'])
    ->middleware('throttle:20,1')
    ->name('invitations.show');
Route::post('invitations/{token}/accept', [ClientInvitationController::class, 'accept'])
    ->middleware('throttle:10,1')
    ->name('invitations.accept');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', [WorkspacePageController::class, 'dashboard'])->name('dashboard');

    Route::get('clients', [WorkspacePageController::class, 'clients'])->name('clients.index');
    Route::post('clients', [WorkspacePageController::class, 'storeClient'])->name('clients.store');
    Route::post('clients/{clientAccount}/invitations', [ClientInvitationController::class, 'store'])
        ->name('clients.invitations.store');
    Route::delete('clients/{clientAccount}/invitations/{invitation}', [ClientInvitationController::class, 'revoke'])
        ->name('clients.invitations.revoke');

    Route::get('projects', [WorkspacePageController::class, 'projects'])->name('projects.index');
    Route::post('projects', [WorkspacePageController::class, 'storeProject'])->name('projects.store');
    Route::get('projects/{project}/intake', [ProjectIntakeController::class, 'show'])->name('projects.intake.show');
    Route::patch('projects/{project}/intake', [ProjectIntakeController::class, 'save'])->name('projects.intake.save');
    Route::post('projects/{project}/intake/submit', [ProjectIntakeController::class, 'submit'])->name('projects.intake.submit');

    Route::prefix('api/v1')->name('api.v1.')->group(function (): void {
        Route::get('client-accounts', [WorkspaceController::class, 'clientAccounts'])
            ->name('client-accounts.index');
        Route::post('client-accounts', [WorkspaceController::class, 'storeClientAccount'])
            ->name('client-accounts.store');
        Route::get('client-accounts/{clientAccount}', [WorkspaceController::class, 'showClientAccount'])
            ->name('client-accounts.show');
        Route::post('client-accounts/{clientAccount}/members', [WorkspaceController::class, 'addClientAccountMember'])
            ->name('client-accounts.members.store');

        Route::get('projects', [WorkspaceController::class, 'projects'])
            ->name('projects.index');
        Route::post('projects', [WorkspaceController::class, 'storeProject'])
            ->name('projects.store');
        Route::get('projects/{project}', [WorkspaceController::class, 'showProject'])
            ->name('projects.show');
    });
});

require __DIR__.'/settings.php';
