# Local Bootstrap — Laravel Platform

This is the first implementation step after the architecture baseline.

## Environment

The existing development setup uses Windows + Laravel Herd. Laravel 13 requires PHP 8.3 or newer. Confirm that `php`, Composer, and the Laravel installer resolve correctly in the terminal before running the commands.

## 1. Clone the platform repository

Open PowerShell in the directory where projects are stored:

```powershell
git clone https://github.com/kannaryukkei/ai-operated-web-studio.git
cd ai-operated-web-studio
```

## 2. Generate the Laravel app in the platform directory

Keep the platform application under `platform/` so the repository root can continue to hold architecture documents, agent prompts, and product-blueprint references.

```powershell
laravel new platform
```

When the Laravel installer asks for options, choose:

- **Starter kit:** React.
- **Authentication:** Laravel's built-in authentication (not WorkOS).
- **Database:** SQLite for local development.
- **Testing framework:** Pest.
- **Teams:** Do not enable teams for the first MVP.

The official Laravel React starter kit provides React, Inertia, TypeScript, Tailwind, shadcn/ui, and authentication scaffolding. Keep the app self-contained in `platform/`.

If the installer reports that the directory is not empty, stop and inspect the directory. Do not delete the repository root or its documentation.

## 3. Verify the application

```powershell
cd platform
php artisan --version
php artisan about
npm install
npm run build
php artisan migrate
php artisan test
```

The Laravel installer should create the application key and local environment file. Verify that `.env` exists locally and remains ignored by Git. Never copy its secrets into this repository.

## 4. Start the application

```powershell
composer run dev
```

Open the local URL printed by the development command. The official Laravel starter-kit documentation uses `http://localhost:8000` as the local app URL.

## 5. Return to repository root

Open a second PowerShell terminal if the development command is still running:

```powershell
cd ..
git status
git check-ignore platform/.env
```

Expected:
- Laravel project files appear under `platform/`.
- Root `docs/` and `AI_BUILD_RULES.md` remain intact.
- `platform/.env` is ignored.
- No nested Git repository should be committed inside `platform/`. If the installer initialized `platform/.git`, verify the root repository first, then remove only the nested `platform/.git` directory.

## 6. Commit the generated app

After reviewing `git status`, commit the Laravel scaffold to the root repository:

```powershell
git add platform
git commit -m "feat(platform): bootstrap Laravel React application"
git push origin main
```

Do not add `.env`, credentials, local databases containing real client information, or generated secrets.

## 7. What happens next

After the app boots and the scaffold commit is pushed, implementation proceeds in this order:

1. Inspect generated Laravel starter-kit files and versions.
2. Define role and project authorization.
3. Create client account and project migrations/models.
4. Build a minimal studio dashboard and client project view.
5. Add the onboarding intake flow.
6. Add the first queued AI discovery workflow with a test/fake provider before connecting paid AI credentials.

## References

- Laravel 13 starter kits: https://laravel.com/framework/docs/13.x/starter-kits
- Laravel 13 release notes / AI SDK: https://laravel.com/framework/docs/13.x/releases
- Laravel queues: https://laravel.com/framework/docs/13.x/queues
