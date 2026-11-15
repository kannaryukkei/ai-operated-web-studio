import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    Clipboard,
    Play,
    RotateCcw,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type EvidenceStatus =
    | 'VERIFIED'
    | 'CLIENT-PROVIDED-UNVERIFIED'
    | 'DEMO-ONLY'
    | 'ASSUMPTION'
    | 'MISSING'
    | 'CONFLICT';

type PublicationStatus = 'APPROVED' | 'PENDING' | 'NOT_APPROVED';

type DiscoveryResult = {
    business_summary: string;
    business_model_summary: string;
    primary_audience: string[];
    website_goal: string;
    primary_conversion: string;
    recommended_tier: 'starter' | 'business' | 'custom';
    recommendation_rationale: string[];
    offer_matrix?: {
        name: string;
        details: string;
        pricing: string;
        source: string;
        evidence_status: EvidenceStatus;
    }[];
    fact_register?: {
        fact: string;
        source: string;
        evidence_status: EvidenceStatus;
        publication_status: PublicationStatus;
        notes: string;
    }[];
    cta_register?: {
        action: string;
        destination: string;
        destination_status:
            | 'APPROVED_REAL_DESTINATION'
            | 'NOT_CONFIGURED'
            | 'NEEDS_APPROVAL'
            | 'DEMO_ONLY';
        expected_behavior: string;
    }[];
    asset_register?: {
        asset_or_need: string;
        source_or_owner: string;
        permission_status:
            | 'APPROVED'
            | 'PENDING'
            | 'NOT_APPROVED'
            | 'NOT_APPLICABLE';
        permission_evidence_status: EvidenceStatus;
        consent_status:
            | 'CONFIRMED'
            | 'PENDING'
            | 'NOT_APPROVED'
            | 'NOT_APPLICABLE';
        intended_use: string;
        credit_or_restrictions: string;
    }[];
    customer_question_map?: {
        question: string;
        answer_or_gap: string;
        stage: 'BEFORE_PURCHASE' | 'DURING_PURCHASE' | 'AFTER_PURCHASE';
        answer_status: 'ANSWERED' | 'GAP' | 'NOT_APPLICABLE';
        source: string;
        owner_or_action: string;
        milestone_priority:
            | 'PREVIEW_BLOCKER'
            | 'PRODUCTION_BLOCKER'
            | 'OPTIONAL_GAP';
    }[];
    buying_journey?: {
        stage: 'BEFORE_PURCHASE' | 'DURING_PURCHASE' | 'AFTER_PURCHASE';
        customer_need: string;
        website_support: string;
    }[];
    trust_register?: {
        proof: string;
        source: string;
        evidence_status: EvidenceStatus;
        publication_status: PublicationStatus;
    }[];
    content_gaps?: {
        gap: string;
        owner_or_source: string;
        milestone_priority:
            | 'PREVIEW_BLOCKER'
            | 'PRODUCTION_BLOCKER'
            | 'OPTIONAL_GAP';
    }[];
    sections: {
        key: string;
        purpose: string;
        visitor_question: string;
        draft_message: string;
    }[];
    missing_information: string[];
    claims_requiring_approval: string[];
    scope_risks: string[];
    next_step: string;
};
type DiscoveryRun = {
    id: number;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    intakeVersion: number;
    result: DiscoveryResult | null;
    failureReason: string | null;
};

export default function ProjectDiscovery({
    project,
    hasSubmittedIntake,
    run,
    canStart,
    prompt,
}: {
    project: { id: number; name: string; clientName: string };
    hasSubmittedIntake: boolean;
    run: DiscoveryRun | null;
    canStart: boolean;
    prompt: string | null;
}) {
    const [copied, setCopied] = useState(false);
    const startForm = useForm({});
    const resultForm = useForm({ result_json: '' });

    function start() {
        startForm.post('/projects/' + project.id + '/discovery', {
            preserveScroll: true,
        });
    }

    function complete(event: FormEvent) {
        event.preventDefault();

        if (!run) return;

        resultForm.post(
            '/projects/' + project.id + '/discovery/' + run.id + '/complete',
            { preserveScroll: true },
        );
    }

    async function copyPrompt() {
        if (!prompt) return;

        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    return (
        <>
            <Head title={'Discovery · ' + project.name} />
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
                <div>
                    <Link
                        href="/projects"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" /> Back to projects
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        {project.clientName} · {project.name}
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Discovery workspace
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Prepare a structured discovery brief using ChatGPT or
                        Claude, then save the result here. No API key or
                        additional AI billing is required.
                    </p>
                </div>

                {!hasSubmittedIntake ? (
                    <Card>
                        <CardContent className="flex flex-col gap-3 py-6">
                            <h2 className="font-medium">
                                A submitted intake is required
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                The client must submit the business intake
                                before discovery can begin.
                            </p>
                            <div>
                                <Button asChild variant="outline">
                                    <Link
                                        href={
                                            '/projects/' +
                                            project.id +
                                            '/intake'
                                        }
                                    >
                                        Open business intake
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <Card>
                            <CardHeader className="gap-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <CardTitle className="text-base">
                                        Discovery run
                                    </CardTitle>
                                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs capitalize">
                                        {run?.status ?? 'Not started'}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {run
                                        ? 'Using submitted intake version ' +
                                          run.intakeVersion
                                        : 'The latest submitted intake is ready to use.'}
                                </p>
                            </CardHeader>
                            {canStart && (
                                <CardContent className="pt-0">
                                    <Button
                                        onClick={start}
                                        disabled={startForm.processing}
                                    >
                                        {run ? (
                                            <RotateCcw className="mr-2 size-4" />
                                        ) : (
                                            <Play className="mr-2 size-4" />
                                        )}
                                        {startForm.processing
                                            ? 'Preparing...'
                                            : run
                                              ? 'Start a new discovery run'
                                              : 'Prepare discovery prompt'}
                                    </Button>
                                </CardContent>
                            )}
                        </Card>

                        {run?.status === 'processing' && prompt && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">
                                            1. Run the discovery prompt
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-3">
                                        <p className="text-sm text-muted-foreground">
                                            Copy this prompt into ChatGPT or
                                            Claude. Ask it to return the JSON
                                            object exactly as specified.
                                        </p>
                                        <textarea
                                            readOnly
                                            value={prompt}
                                            rows={18}
                                            className="w-full rounded-md border border-input bg-muted/30 px-3 py-2 font-mono text-xs leading-5"
                                        />
                                        <div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={copyPrompt}
                                            >
                                                {copied ? (
                                                    <CheckCircle2 className="mr-2 size-4" />
                                                ) : (
                                                    <Clipboard className="mr-2 size-4" />
                                                )}
                                                {copied
                                                    ? 'Copied'
                                                    : 'Copy discovery prompt'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">
                                            2. Save the AI result
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form
                                            onSubmit={complete}
                                            className="flex flex-col gap-3"
                                        >
                                            <label
                                                htmlFor="result_json"
                                                className="text-sm text-muted-foreground"
                                            >
                                                Paste the complete JSON response
                                                below, without Markdown code
                                                fences.
                                            </label>
                                            <textarea
                                                id="result_json"
                                                rows={16}
                                                value={
                                                    resultForm.data.result_json
                                                }
                                                onChange={(event) =>
                                                    resultForm.setData(
                                                        'result_json',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder={
                                                    '{\n  "business_summary": "...",\n  "primary_audience": ["..."]\n}'
                                                }
                                                className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs leading-5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            />
                                            {resultForm.errors.result_json && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        resultForm.errors
                                                            .result_json
                                                    }
                                                </p>
                                            )}
                                            <div>
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        resultForm.processing ||
                                                        !resultForm.data.result_json.trim()
                                                    }
                                                >
                                                    <CheckCircle2 className="mr-2 size-4" />
                                                    {resultForm.processing
                                                        ? 'Saving...'
                                                        : 'Validate and save brief'}
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {run?.status === 'completed' && run.result && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Saved discovery brief
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Business summary
                                        </p>
                                        <p className="mt-1 text-sm">
                                            {run.result.business_summary}
                                        </p>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                                Recommended package
                                            </p>
                                            <p className="mt-1 text-sm capitalize">
                                                {run.result.recommended_tier}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                                Primary conversion
                                            </p>
                                            <p className="mt-1 text-sm">
                                                {run.result.primary_conversion}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Suggested next step
                                        </p>
                                        <p className="mt-1 text-sm">
                                            {run.result.next_step}
                                        </p>
                                    </div>
                                    <div className="grid gap-3 md:grid-cols-3">
                                        <div className="rounded-md border p-3">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                                Fact provenance
                                            </p>
                                            <p className="mt-1 text-lg font-semibold">
                                                {run.result.fact_register
                                                    ?.length ?? '—'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Material facts with separate
                                                evidence and publication status
                                            </p>
                                        </div>
                                        <div className="rounded-md border p-3">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                                Customer questions
                                            </p>
                                            <p className="mt-1 text-lg font-semibold">
                                                {run.result.customer_question_map?.filter(
                                                    (item) =>
                                                        item.answer_status ===
                                                        'GAP',
                                                ).length ?? '—'}
                                                <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                    open gaps
                                                </span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {run.result.customer_question_map?.filter(
                                                    (item) =>
                                                        item.answer_status ===
                                                        'ANSWERED',
                                                ).length ?? 0}{' '}
                                                answered ·{' '}
                                                {run.result.customer_question_map?.filter(
                                                    (item) =>
                                                        item.answer_status ===
                                                        'NOT_APPLICABLE',
                                                ).length ?? 0}{' '}
                                                not applicable
                                            </p>
                                        </div>
                                        <div className="rounded-md border p-3">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                                CTA / assets
                                            </p>
                                            <p className="mt-1 text-lg font-semibold">
                                                {run.result.cta_register
                                                    ?.length ?? '—'}{' '}
                                                /{' '}
                                                {run.result.asset_register
                                                    ?.length ?? '—'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Destinations / asset records
                                            </p>
                                        </div>
                                    </div>
                                    {run.result.customer_question_map &&
                                        run.result.customer_question_map
                                            .length > 0 && (
                                            <div className="space-y-2">
                                                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                                    Customer question coverage
                                                </p>
                                                <div className="divide-y rounded-md border">
                                                    {run.result.customer_question_map.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex flex-col gap-1 p-3 sm:flex-row sm:items-start sm:justify-between"
                                                            >
                                                                <div>
                                                                    <p className="text-sm font-medium">
                                                                        {
                                                                            item.question
                                                                        }
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                                        {
                                                                            item.answer_or_gap
                                                                        }
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                                        Source:{' '}
                                                                        {
                                                                            item.source
                                                                        }{' '}
                                                                        ·
                                                                        Owner/action:{' '}
                                                                        {
                                                                            item.owner_or_action
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-xs">
                                                                    {
                                                                        item.answer_status
                                                                    }
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    {run.result.cta_register &&
                                        run.result.cta_register.length > 0 && (
                                            <div className="space-y-2">
                                                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                                    CTA destination register
                                                </p>
                                                <div className="divide-y rounded-md border">
                                                    {run.result.cta_register.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className="space-y-1 p-3"
                                                            >
                                                                <p className="text-sm font-medium">
                                                                    {
                                                                        item.action
                                                                    }
                                                                </p>
                                                                <p className="text-xs break-all text-muted-foreground">
                                                                    {
                                                                        item.destination
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {
                                                                        item.destination_status
                                                                    }{' '}
                                                                    ·{' '}
                                                                    {
                                                                        item.expected_behavior
                                                                    }
                                                                </p>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    <details>
                                        <summary className="cursor-pointer text-sm font-medium">
                                            View complete structured brief
                                        </summary>
                                        <pre className="mt-3 overflow-x-auto rounded-md bg-muted/40 p-3 text-xs leading-5">
                                            {JSON.stringify(
                                                run.result,
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    </details>
                                </CardContent>
                            </Card>
                        )}

                        {run?.status === 'failed' && (
                            <Card>
                                <CardContent className="py-5">
                                    <p className="text-sm text-destructive">
                                        {run.failureReason ||
                                            'This discovery run failed.'}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Start a new run to try again.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
