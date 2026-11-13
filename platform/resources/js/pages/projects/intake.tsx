import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Save } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type IntakePayload = {
    business_overview: string;
    industry: string;
    location: string;
    target_audience: string;
    products_services: string;
    differentiators: string;
    website_goal: string;
    primary_conversion: string;
    current_website: string;
    competitor_references: string;
    brand_direction: string;
    required_pages: string;
    required_features: string;
    constraints: string;
    success_metrics: string;
};

const emptyPayload: IntakePayload = {
    business_overview: '',
    industry: '',
    location: '',
    target_audience: '',
    products_services: '',
    differentiators: '',
    website_goal: '',
    primary_conversion: '',
    current_website: '',
    competitor_references: '',
    brand_direction: '',
    required_pages: '',
    required_features: '',
    constraints: '',
    success_metrics: '',
};

const fields: {
    key: keyof IntakePayload;
    label: string;
    hint: string;
    required?: boolean;
    rows?: number;
    type?: 'url' | 'text';
}[] = [
    { key: 'business_overview', label: 'Business overview', hint: 'What does the business do, how did it start, and what should visitors understand?', required: true, rows: 4 },
    { key: 'industry', label: 'Industry', hint: 'For example: automotive detailing, professional services, food and beverage.' },
    { key: 'location', label: 'Business location', hint: 'City, service area, or locations served.' },
    { key: 'target_audience', label: 'Target audience', hint: 'Describe your ideal customers, their needs, and what influences their decisions.', required: true, rows: 4 },
    { key: 'products_services', label: 'Products and services', hint: 'List the main products or services, packages, and important details.', required: true, rows: 4 },
    { key: 'differentiators', label: 'What makes the business different?', hint: 'Strengths, proof points, expertise, guarantees, or reasons customers choose you.', rows: 3 },
    { key: 'website_goal', label: 'Main website goal', hint: 'What should the website help the business achieve?', required: true, rows: 3 },
    { key: 'primary_conversion', label: 'Primary visitor action', hint: 'What is the most important action visitors should take? For example: request a quote, book, or contact.', required: true, rows: 2 },
    { key: 'current_website', label: 'Current website', hint: 'Enter a full URL if one exists.', type: 'url' },
    { key: 'competitor_references', label: 'Competitors and references', hint: 'Share competitor names, website URLs, or examples you like.', rows: 3 },
    { key: 'brand_direction', label: 'Brand and visual direction', hint: 'Describe preferred tone, personality, colors, or styles to avoid.', rows: 3 },
    { key: 'required_pages', label: 'Required pages', hint: 'List the pages you think the website needs, one per line.', rows: 3 },
    { key: 'required_features', label: 'Required features', hint: 'For example: booking, catalog, quotation form, gallery, or customer portal.', rows: 3 },
    { key: 'constraints', label: 'Constraints and considerations', hint: 'Budget range, timeline, legal requirements, operational limits, or anything else we should know.', rows: 3 },
    { key: 'success_metrics', label: 'How will success be measured?', hint: 'For example: qualified leads, bookings, calls, or online sales.', rows: 2 },
];

export default function ProjectIntake({
    project,
    intake,
    canEdit,
}: {
    project: { id: number; name: string; clientName: string };
    intake: { version: number | null; status: string | null; payload: Partial<IntakePayload>; submittedAt: string | null };
    canEdit: boolean;
}) {
    const form = useForm<{ payload: IntakePayload }>({
        payload: { ...emptyPayload, ...intake.payload },
    });
    const errors = form.errors as Record<string, string | undefined>;

    function save(event: FormEvent) {
        event.preventDefault();
        form.patch(`/projects/${project.id}/intake`, { preserveScroll: true });
    }

    function submit() {
        form.post(`/projects/${project.id}/intake/submit`, { preserveScroll: true });
    }

    return (
        <>
            <Head title={`Business intake · ${project.name}`} />
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
                <div>
                    <Link href="/projects" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="size-4" /> Back to projects
                    </Link>
                    <p className="text-sm text-muted-foreground">{project.clientName} · {project.name}</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">Business discovery intake</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Tell us about the business and what the website needs to accomplish. You can save progress and return later.
                    </p>
                </div>

                <Card>
                    <CardHeader className="gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <CardTitle className="text-base">Intake status</CardTitle>
                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs capitalize">
                                {intake.status || 'Not started'}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {intake.version ? `Version ${intake.version}` : 'No saved version yet'}
                            {intake.submittedAt ? ` · Submitted ${new Date(intake.submittedAt).toLocaleDateString()}` : ''}
                        </p>
                    </CardHeader>
                </Card>

                <form onSubmit={save} className="flex flex-col gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Business and audience</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-5 md:grid-cols-2">
                            {fields.slice(0, 6).map((field) => (
                                <div key={field.key} className={field.rows ? 'space-y-2 md:col-span-2' : 'space-y-2'}>
                                    <label htmlFor={field.key} className="text-sm font-medium">
                                        {field.label}{field.required ? ' *' : ''}
                                    </label>
                                    {field.rows ? (
                                        <textarea
                                            id={field.key}
                                            rows={field.rows}
                                            disabled={!canEdit || form.processing}
                                            value={form.data.payload[field.key]}
                                            onChange={(event) => form.setData('payload', { ...form.data.payload, [field.key]: event.target.value })}
                                            placeholder={field.hint}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                                        />
                                    ) : (
                                        <Input
                                            id={field.key}
                                            disabled={!canEdit || form.processing}
                                            value={form.data.payload[field.key]}
                                            onChange={(event) => form.setData('payload', { ...form.data.payload, [field.key]: event.target.value })}
                                            placeholder={field.hint}
                                        />
                                    )}
                                    {errors[`payload.${field.key}`] && <p className="text-xs text-destructive">{errors[`payload.${field.key}`]}</p>}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Website goals and direction</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-5 md:grid-cols-2">
                            {fields.slice(6).map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <label htmlFor={field.key} className="text-sm font-medium">
                                        {field.label}{field.required ? ' *' : ''}
                                    </label>
                                    {field.type === 'url' ? (
                                        <Input
                                            id={field.key}
                                            type="url"
                                            disabled={!canEdit || form.processing}
                                            value={form.data.payload[field.key]}
                                            onChange={(event) => form.setData('payload', { ...form.data.payload, [field.key]: event.target.value })}
                                            placeholder="https://example.com"
                                        />
                                    ) : (
                                        <textarea
                                            id={field.key}
                                            rows={field.rows || 3}
                                            disabled={!canEdit || form.processing}
                                            value={form.data.payload[field.key]}
                                            onChange={(event) => form.setData('payload', { ...form.data.payload, [field.key]: event.target.value })}
                                            placeholder={field.hint}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                                        />
                                    )}
                                    {errors[`payload.${field.key}`] && <p className="text-xs text-destructive">{errors[`payload.${field.key}`]}</p>}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {canEdit ? (
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-muted-foreground">Required fields are needed before submission. Submitted versions are preserved as read-only snapshots.</p>
                            <div className="flex gap-2">
                                <Button type="submit" variant="outline" disabled={form.processing}>
                                    <Save className="mr-2 size-4" /> Save progress
                                </Button>
                                <Button type="button" disabled={form.processing} onClick={submit}>
                                    <CheckCircle2 className="mr-2 size-4" /> Submit intake
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">You have view-only access to this intake.</p>
                    )}
                </form>
            </div>
        </>
    );
}
