import { Head, Link, useForm } from '@inertiajs/react';
import { BriefcaseBusiness, Plus } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Project = {
    id: number;
    name: string;
    product_tier: 'starter' | 'business' | 'custom';
    status: string;
    current_stage: string | null;
    target_launch_date: string | null;
    client_account: { id: number; business_name: string };
};

type ClientOption = { id: number; business_name: string };
type Paginator<T> = { data: T[]; links: { url: string | null; label: string; active: boolean }[]; current_page: number; last_page: number; total: number };

const statusLabel: Record<string, string> = {
    draft: 'Draft',
    onboarding: 'Onboarding',
    active: 'Active',
    on_hold: 'On hold',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function ProjectsIndex({ projects, clients, isStudio }: { projects: Paginator<Project>; clients: ClientOption[]; isStudio: boolean }) {
    const form = useForm({
        client_account_id: '',
        product_tier: 'starter',
        name: '',
        objective: '',
        target_launch_date: '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/projects', { onSuccess: () => form.reset() });
    }

    return (
        <>
            <Head title="Projects" />
            <div className="flex flex-col gap-6 p-4 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-sm text-muted-foreground">Workspace</p>
                        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Track website production from discovery through launch.</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{projects.total} projects</div>
                </div>

                {isStudio && (
                    <Card><CardContent className="pt-6">
                        <div className="mb-4 flex items-center gap-2 font-medium"><Plus className="size-4" /> Create project</div>
                        {clients.length === 0 ? <p className="text-sm text-muted-foreground">Create a client account before starting a project.</p> : (
                            <form onSubmit={submit} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Client account *</label>
                                    <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.data.client_account_id} onChange={e => form.setData('client_account_id', e.target.value)}>
                                        <option value="">Select a client</option>
                                        {clients.map(client => <option key={client.id} value={client.id}>{client.business_name}</option>)}
                                    </select>
                                    {form.errors.client_account_id && <p className="text-xs text-destructive">{form.errors.client_account_id}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Project name *</label>
                                    <Input value={form.data.name} onChange={e => form.setData('name', e.target.value)} placeholder="Website redesign" />
                                    {form.errors.name && <p className="text-xs text-destructive">{form.errors.name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Package</label>
                                    <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.data.product_tier} onChange={e => form.setData('product_tier', e.target.value)}>
                                        <option value="starter">Starter</option><option value="business">Business</option><option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium">Primary objective</label>
                                    <Input value={form.data.objective} onChange={e => form.setData('objective', e.target.value)} placeholder="Generate qualified leads..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Target launch date</label>
                                    <Input type="date" value={form.data.target_launch_date} onChange={e => form.setData('target_launch_date', e.target.value)} />
                                </div>
                                <div className="md:col-span-2 xl:col-span-3"><Button type="submit" disabled={form.processing || clients.length === 0}>{form.processing ? 'Creating...' : 'Create project'}</Button></div>
                            </form>
                        )}
                    </CardContent></Card>
                )}

                {projects.data.length === 0 ? (
                    <Card><CardContent className="flex flex-col items-center py-14 text-center">
                        <BriefcaseBusiness className="mb-3 size-8 text-muted-foreground" />
                        <h2 className="font-medium">No projects yet</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{isStudio ? 'Create a project to start managing website production.' : 'Your projects will appear here.'}</p>
                    </CardContent></Card>
                ) : (
                    <div className="overflow-hidden rounded-xl border">
                        <div className="grid grid-cols-[minmax(0,1fr)_minmax(110px,150px)_minmax(100px,130px)] gap-3 bg-muted/50 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            <span>Project</span><span>Package</span><span>Status</span>
                        </div>
                        {projects.data.map(project => (
                            <div key={project.id} className="grid grid-cols-[minmax(0,1fr)_minmax(110px,150px)_minmax(100px,130px)] items-center gap-3 border-t px-4 py-4 text-sm">
                                <div className="min-w-0"><p className="truncate font-medium">{project.name}</p><p className="truncate text-xs text-muted-foreground">{project.client_account.business_name} · {project.current_stage || 'Not started'}</p></div>
                                <span className="capitalize text-muted-foreground">{project.product_tier}</span>
                                <span><span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs">{statusLabel[project.status] || project.status}</span></span>
                            </div>
                        ))}
                    </div>
                )}
                {projects.last_page > 1 && <div className="flex flex-wrap gap-2">{projects.links.map((link, index) => link.url ? <Button key={index} variant={link.active ? 'default' : 'outline'} size="sm" asChild><Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} /></Button> : <Button key={index} variant="outline" size="sm" disabled dangerouslySetInnerHTML={{ __html: link.label }} />)}</div>}
            </div>
        </>
    );
}
