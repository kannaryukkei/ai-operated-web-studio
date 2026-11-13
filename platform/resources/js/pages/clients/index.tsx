import { Head, Link, useForm } from '@inertiajs/react';
import { Building2, Plus, UserPlus } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Client = {
    id: number;
    business_name: string;
    business_category: string | null;
    website: string | null;
    contact_name: string | null;
    contact_email: string | null;
    projects_count: number;
};

type Paginator<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

function InviteMember({ client }: { client: Client }) {
    const form = useForm({ email: '', membership_role: 'member' });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post(`/clients/${client.id}/invitations`, {
            onSuccess: () => form.reset(),
        });
    }

    return (
        <form onSubmit={submit} className="space-y-2 border-t pt-4">
            <div className="flex items-center gap-2 text-sm font-medium">
                <UserPlus className="size-4" />
                Invite client member
            </div>
            <Input
                type="email"
                value={form.data.email}
                onChange={(event) => form.setData('email', event.target.value)}
                placeholder="client@example.com"
                required
            />
            {form.errors.email && (
                <p className="text-xs text-destructive">{form.errors.email}</p>
            )}
            <select
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.data.membership_role}
                onChange={(event) => form.setData('membership_role', event.target.value)}
            >
                <option value="member">Member</option>
                <option value="owner">Account owner</option>
            </select>
            <Button type="submit" variant="outline" size="sm" disabled={form.processing}>
                {form.processing ? 'Creating link...' : 'Create invitation link'}
            </Button>
        </form>
    );
}

export default function ClientsIndex({
    clients,
    isStudio,
    invitationUrl,
}: {
    clients: Paginator<Client>;
    isStudio: boolean;
    invitationUrl?: string | null;
}) {
    const form = useForm({
        business_name: '',
        business_category: '',
        website: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/clients', { onSuccess: () => form.reset() });
    }

    return (
        <>
            <Head title="Clients" />
            <div className="flex flex-col gap-6 p-4 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-sm text-muted-foreground">Workspace</p>
                        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage client organizations, members, and website projects.
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground">{clients.total} client accounts</div>
                </div>

                {invitationUrl && (
                    <Card>
                        <CardContent className="space-y-2 pt-5">
                            <p className="text-sm font-medium">Invitation link created</p>
                            <p className="text-xs text-muted-foreground">
                                Share this link directly with the invited person. It expires in 7 days. No email is sent automatically.
                            </p>
                            <Input readOnly value={invitationUrl} onFocus={(event) => event.currentTarget.select()} />
                        </CardContent>
                    </Card>
                )}

                {isStudio && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-4 flex items-center gap-2 font-medium">
                                <Plus className="size-4" /> Add client account
                            </div>
                            <form onSubmit={submit} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Business name *</label>
                                    <Input value={form.data.business_name} onChange={(e) => form.setData('business_name', e.target.value)} placeholder="e.g. Zacks Detailing" />
                                    {form.errors.business_name && <p className="text-xs text-destructive">{form.errors.business_name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Category</label>
                                    <Input value={form.data.business_category} onChange={(e) => form.setData('business_category', e.target.value)} placeholder="Automotive services" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Website</label>
                                    <Input value={form.data.website} onChange={(e) => form.setData('website', e.target.value)} placeholder="https://" />
                                    {form.errors.website && <p className="text-xs text-destructive">{form.errors.website}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Contact name</label>
                                    <Input value={form.data.contact_name} onChange={(e) => form.setData('contact_name', e.target.value)} placeholder="Contact person" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Contact email</label>
                                    <Input type="email" value={form.data.contact_email} onChange={(e) => form.setData('contact_email', e.target.value)} placeholder="name@business.com" />
                                    {form.errors.contact_email && <p className="text-xs text-destructive">{form.errors.contact_email}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Contact phone</label>
                                    <Input value={form.data.contact_phone} onChange={(e) => form.setData('contact_phone', e.target.value)} placeholder="+62..." />
                                </div>
                                <div className="md:col-span-2 xl:col-span-3">
                                    <Button type="submit" disabled={form.processing}>
                                        {form.processing ? 'Creating...' : 'Create client account'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {clients.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center py-14 text-center">
                            <Building2 className="mb-3 size-8 text-muted-foreground" />
                            <h2 className="font-medium">No client accounts yet</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {isStudio ? 'Create your first client account using the form above.' : 'Your client workspace will appear here.'}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {clients.data.map((client) => (
                            <Card key={client.id} className="transition-colors hover:border-foreground/20">
                                <CardContent className="flex h-full flex-col gap-4 pt-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                                            <Building2 className="size-5" />
                                        </div>
                                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                                            {client.projects_count} projects
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">{client.business_name}</h2>
                                        <p className="mt-1 text-sm text-muted-foreground">{client.business_category || 'Category not set'}</p>
                                    </div>
                                    <div className="mt-auto border-t pt-3 text-sm text-muted-foreground">
                                        <p>{client.contact_name || 'No contact assigned'}</p>
                                        {client.contact_email && <p className="truncate">{client.contact_email}</p>}
                                        {client.website && (
                                            <a className="mt-1 inline-block text-primary hover:underline" href={client.website} target="_blank" rel="noreferrer">
                                                Visit website
                                            </a>
                                        )}
                                    </div>
                                    {isStudio && <InviteMember client={client} />}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {clients.last_page > 1 && (
                    <div className="flex flex-wrap gap-2">
                        {clients.links.map((link, index) => link.url ? (
                            <Button key={index} variant={link.active ? 'default' : 'outline'} size="sm" asChild>
                                <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        ) : (
                            <Button key={index} variant="outline" size="sm" disabled dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
