import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Save } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type IntakePayload = {
    business_overview: string; industry: string; location: string; target_audience: string;
    products_services: string; offer_details: string; customer_questions: string;
    customer_objections: string; purchase_process: string; operational_policies: string;
    trust_evidence: string; aftercare_support: string; differentiators: string;
    website_goal: string; primary_conversion: string; public_contact_details: string;
    current_website: string; competitor_references: string; brand_direction: string;
    required_pages: string; required_features: string; constraints: string; success_metrics: string;
};

const emptyPayload: IntakePayload = {
    business_overview: '', industry: '', location: '', target_audience: '',
    products_services: '', offer_details: '', customer_questions: '',
    customer_objections: '', purchase_process: '', operational_policies: '',
    trust_evidence: '', aftercare_support: '', differentiators: '',
    website_goal: '', primary_conversion: '', public_contact_details: '',
    current_website: '', competitor_references: '', brand_direction: '',
    required_pages: '', required_features: '', constraints: '', success_metrics: '',
};

const groups: {
    title: string; description: string;
    fields: { key: keyof IntakePayload; label: string; hint: string; required?: boolean; rows?: number; type?: 'url' | 'text' }[];
}[] = [
    { title: 'Business and customers', description: 'Help us understand what the business sells and who it serves.', fields: [
        { key: 'business_overview', label: 'Business overview', hint: 'What does the business do? Explain it in your own words.', required: true, rows: 3 },
        { key: 'industry', label: 'Business category', hint: 'For example: detailing, café, retail, interior design.' },
        { key: 'location', label: 'Location / service area', hint: 'Where do you operate, deliver or serve customers?' },
        { key: 'target_audience', label: 'Who usually buys from you?', hint: 'Describe your main customers and what they need.', required: true, rows: 3 },
        { key: 'customer_questions', label: 'What do customers usually ask?', hint: 'Questions they ask before deciding to buy or contact you.', rows: 3 },
        { key: 'customer_objections', label: 'What makes customers hesitate?', hint: 'Common doubts, comparisons, complaints or reasons they do not buy.', rows: 3 },
    ]},
    { title: 'Products, services and operations', description: 'The detail that helps visitors understand, compare and choose your offer.', fields: [
        { key: 'products_services', label: 'Main products / services', hint: 'List your main offers using their actual names.', required: true, rows: 3 },
        { key: 'offer_details', label: 'Packages, prices and options', hint: 'What is included/excluded, variations, price or how the price is calculated?', rows: 4 },
        { key: 'purchase_process', label: 'How does a customer buy from you?', hint: 'From first inquiry/order to delivery or completed service. What happens at each step?', rows: 3 },
        { key: 'operational_policies', label: 'Important policies and expectations', hint: 'Hours, availability, preparation, delivery, payment, cancellation, returns, warranty or service limits (if relevant).', rows: 3 },
        { key: 'aftercare_support', label: 'After-purchase support', hint: 'Care instructions, warranty, support, repeat visits or what happens after the sale. Write Not applicable if none.', rows: 2 },
        { key: 'trust_evidence', label: 'Proof and credibility', hint: 'Real reviews, project photos, certifications, experience, process evidence or other proof you can show.', rows: 3 },
        { key: 'differentiators', label: 'Why do customers choose you?', hint: 'Your strengths and real differences from alternatives. Avoid claims you cannot support.', rows: 3 },
    ]},
    { title: 'Website goals and contact', description: 'What the website should achieve and where visitors should go next.', fields: [
        { key: 'website_goal', label: 'Main website goal', hint: 'What should the website help the business achieve?', required: true, rows: 2 },
        { key: 'primary_conversion', label: 'Most important visitor action', hint: 'For example: WhatsApp inquiry, request a quote, visit a store or order online.', required: true, rows: 2 },
        { key: 'public_contact_details', label: 'Public contact destinations', hint: 'Approved WhatsApp number/link, phone, email, booking link, address and social profiles. Do not enter private studio contacts.', rows: 3 },
        { key: 'success_metrics', label: 'How will success be measured?', hint: 'Qualified leads, bookings, calls, store visits or online sales.', rows: 2 },
    ]},
    { title: 'Website references and constraints', description: 'Optional details. The studio will turn these into a practical website plan.', fields: [
        { key: 'current_website', label: 'Current website', hint: 'Enter a full URL if one exists.', type: 'url' },
        { key: 'competitor_references', label: 'Competitors and references', hint: 'Share competitor names or website links. What do you like or dislike?', rows: 2 },
        { key: 'brand_direction', label: 'Brand and visual direction', hint: 'Preferred tone, personality, colors or styles to avoid.', rows: 2 },
        { key: 'required_pages', label: 'Pages you think you need', hint: 'Optional. We will recommend the right structure based on customer needs.', rows: 2 },
        { key: 'required_features', label: 'Features you think you need', hint: 'For example: booking, product catalog, quotation form or customer portal.', rows: 2 },
        { key: 'constraints', label: 'Budget, timeline and other constraints', hint: 'Optional. Include operating limits or important considerations.', rows: 2 },
    ]},
];

export default function ProjectIntake({ project, intake, canEdit }: {
    project: { id: number; name: string; clientName: string };
    intake: { version: number | null; status: string | null; payload: Partial<IntakePayload>; submittedAt: string | null };
    canEdit: boolean;
}) {
    const form = useForm<{ payload: IntakePayload }>({ payload: { ...emptyPayload, ...intake.payload } });
    const errors = form.errors as Record<string, string | undefined>;
    function setField(key: keyof IntakePayload, value: string) {
        form.setData('payload', { ...form.data.payload, [key]: value });
    }
    function save(event: FormEvent) {
        event.preventDefault();
        form.patch(`/projects/${project.id}/intake`, { preserveScroll: true });
    }
    function submit() {
        form.post(`/projects/${project.id}/intake/submit`, { preserveScroll: true });
    }

    return <>
        <Head title={`Business intake · ${project.name}`} />
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
            <div>
                <Link href="/projects" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to projects</Link>
                <p className="text-sm text-muted-foreground">{project.clientName} · {project.name}</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">Business discovery intake</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Tell us how your business works, what customers need to know and how they buy. Short answers are fine. Save progress and return later; optional questions can be left blank.</p>
            </div>
            <Card><CardHeader className="gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2"><CardTitle className="text-base">Intake status</CardTitle><span className="rounded-full bg-muted px-2.5 py-1 text-xs capitalize">{intake.status || 'Not started'}</span></div>
                <p className="text-sm text-muted-foreground">{intake.version ? `Version ${intake.version}` : 'No saved version yet'}{intake.submittedAt ? ` · Submitted ${new Date(intake.submittedAt).toLocaleDateString()}` : ''}</p>
            </CardHeader></Card>
            <form onSubmit={save} className="flex flex-col gap-5">
                {groups.map(group => <Card key={group.title}>
                    <CardHeader className="gap-1"><CardTitle className="text-base">{group.title}</CardTitle><p className="text-sm text-muted-foreground">{group.description}</p></CardHeader>
                    <CardContent className="grid gap-5 md:grid-cols-2">
                        {group.fields.map(field => <div key={field.key} className={field.rows ? 'space-y-2 md:col-span-2' : 'space-y-2'}>
                            <label htmlFor={field.key} className="text-sm font-medium">{field.label}{field.required ? ' *' : ''}</label>
                            {field.type === 'url' ? <Input id={field.key} type="url" disabled={!canEdit || form.processing} value={form.data.payload[field.key]} onChange={event => setField(field.key, event.target.value)} placeholder="https://example.com" /> :
                                <textarea id={field.key} rows={field.rows || 2} disabled={!canEdit || form.processing} value={form.data.payload[field.key]} onChange={event => setField(field.key, event.target.value)} placeholder={field.hint} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60" />}
                            {errors[`payload.${field.key}`] && <p className="text-xs text-destructive">{errors[`payload.${field.key}`]}</p>}
                        </div>)}
                    </CardContent>
                </Card>)}
                {canEdit ? <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">Only four core fields are required. Optional details improve the website plan. Submitted versions are preserved as read-only snapshots.</p>
                    <div className="flex gap-2"><Button type="submit" variant="outline" disabled={form.processing}><Save className="mr-2 size-4" /> Save progress</Button><Button type="button" disabled={form.processing} onClick={submit}><CheckCircle2 className="mr-2 size-4" /> Submit intake</Button></div>
                </div> : <p className="text-sm text-muted-foreground">You have view-only access to this intake.</p>}
            </form>
        </div>
    </>;
}
