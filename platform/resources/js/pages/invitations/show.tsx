import { Head, Link, useForm } from '@inertiajs/react';
import { Building2, MailCheck } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';

export default function InvitationShow({
    email,
    businessName,
    membershipRole,
    existingUser,
    canAccept,
    token,
}: {
    email: string;
    businessName: string;
    membershipRole: string;
    existingUser: boolean;
    canAccept: boolean;
    token: string;
}) {
    const form = useForm({
        name: '',
        password: '',
        password_confirmation: '',
        existing_account: existingUser ? '1' : '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post(`/invitations/${token}/accept`);
    }

    return (
        <>
            <Head title="Accept invitation" />
            <AuthLayout
                title="Join your client workspace"
                description="Accept this invitation to access your project workspace."
            >
                <div className="mb-6 flex items-center gap-3 rounded-lg border p-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        <Building2 className="size-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-medium">{businessName}</p>
                        <p className="text-sm text-muted-foreground">
                            {membershipRole === 'owner'
                                ? 'Account owner'
                                : 'Member'}{' '}
                            · {email}
                        </p>
                    </div>
                </div>

                {existingUser && !canAccept ? (
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            An account already exists for this email. Log in
                            with that account, then reopen this invitation link.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/login">Log in to continue</Link>
                        </Button>
                    </div>
                ) : (
                    <form
                        onSubmit={submit}
                        className="flex flex-col gap-4"
                    >
                        {!existingUser && (
                            <>
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium"
                                    >
                                        Your name
                                    </label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(event) =>
                                            form.setData(
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-xs text-destructive">
                                            {form.errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium"
                                    >
                                        Create password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={form.data.password}
                                        onChange={(event) =>
                                            form.setData(
                                                'password',
                                                event.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {form.errors.password && (
                                        <p className="text-xs text-destructive">
                                            {form.errors.password}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="text-sm font-medium"
                                    >
                                        Confirm password
                                    </label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={
                                            form.data.password_confirmation
                                        }
                                        onChange={(event) =>
                                            form.setData(
                                                'password_confirmation',
                                                event.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {canAccept && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MailCheck className="size-4" />
                                Signed in as {email}
                            </div>
                        )}

                        {form.errors.email && (
                            <p className="text-xs text-destructive">
                                {form.errors.email}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.processing}
                        >
                            {form.processing
                                ? 'Joining...'
                                : 'Accept invitation'}
                        </Button>
                    </form>
                )}
            </AuthLayout>
        </>
    );
}
