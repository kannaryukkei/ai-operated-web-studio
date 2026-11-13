import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, BriefcaseBusiness, Building2, CheckCircle2, Clock3, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Project = {
    id: number;
    name: string;
    status: string;
    product_tier: string;
    current_stage: string | null;
    client_account: { id: number; business_name: string };
};

type Stats = {
    clients: number;
    projects: number;
    activeProjects: number;
    completedProjects: number;
};

const statusLabels: Record<string, string> = {
    draft: 'Draft',
    onboarding: 'Onboarding',
    active: 'Active',
    on_hold: 'On hold',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function Dashboard({ stats, recentProjects, isStudio }: { stats: Stats; recentProjects: Project[]; isStudio: boolean }) {
    const cards = [
        { label: 'Client accounts', value: stats.clients, icon: Building2, note: 'Organizations in workspace' },
        { label: 'All projects', value: stats.projects, icon: BriefcaseBusiness, note: 'Total tracked projects' },
        { label: 'In progress', value: stats.activeProjects, icon: Clock3, note: 'Onboarding or active' },
        { label: 'Completed', value: stats.completedProjects, icon: CheckCircle2, note: 'Successfully delivered' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-7 p-4 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">{isStudio ? 'Studio overview' : 'Client workspace'}</p>
                        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="mt-1 text-sm text-muted-foreground">A clear view of your website projects and what needs attention.</p>
                    </div>
                    {isStudio && <div className="flex gap-2"><Button variant="outline" asChild><Link href="/clients">Clients</Link></Button><Button asChild><Link href="/projects"><Plus className="size-4" /> New project</Link></Button></div>}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {cards.map(card => (
                        <Card key={card.label}>
                            <CardContent className="flex items-start justify-between gap-4 pt-6">
                                <div><p className="text-sm text-muted-foreground">{card.label}</p><p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{card.value}</p><p className="mt-1 text-xs text-muted-foreground">{card.note}</p></div>
                                <div className="rounded-lg bg-muted p-2.5"><card.icon className="size-5 text-muted-foreground" /></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div><h2 className="font-semibold">Recent projects</h2><p className="text-sm text-muted-foreground">Latest activity across your workspace.</p></div>
                        <Button variant="ghost" size="sm" asChild><Link href="/projects">View all <ArrowUpRight className="size-4" /></Link></Button>
                    </div>
                    {recentProjects.length === 0 ? (
                        <Card><CardContent className="flex flex-col items-center py-14 text-center">
                            <BriefcaseBusiness className="mb-3 size-8 text-muted-foreground" />
                            <h3 className="font-medium">Your workspace is ready</h3>
                            <p className="mt-1 max-w-md text-sm text-muted-foreground">{isStudio ? 'Create a client account, then create a project to begin organizing website production.' : 'When a project is assigned to your account, it will appear here.'}</p>
                            {isStudio && <Button className="mt-4" asChild><Link href="/clients"><Plus className="size-4" /> Add first client</Link></Button>}
                        </CardContent></Card>
                    ) : (
                        <div className="overflow-hidden rounded-xl border">
                            {recentProjects.map(project => (
                                <div key={project.id} className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4 last:border-b-0">
                                    <div className="min-w-0"><p className="truncate text-sm font-medium">{project.name}</p><p className="mt-1 truncate text-xs text-muted-foreground">{project.client_account.business_name} · <span className="capitalize">{project.product_tier}</span> · {project.current_stage || 'Not started'}</p></div>
                                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{statusLabels[project.status] || project.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }],
};
