<?php

namespace App\Services\Intake;

use Illuminate\Validation\ValidationException;

class ProjectIntakeSchema
{
    public const LEGACY_VERSION = 1;

    public const CURRENT_VERSION = 2;

    /** @var list<string> */
    private const CORE_FIELDS = [
        'business_overview',
        'target_audience',
        'products_services',
        'website_goal',
        'primary_conversion',
    ];

    /** @var list<string> */
    private const LEGACY_FIELDS = [
        'business_overview',
        'industry',
        'location',
        'target_audience',
        'products_services',
        'offer_details',
        'customer_questions',
        'customer_objections',
        'purchase_process',
        'operational_policies',
        'trust_evidence',
        'aftercare_support',
        'differentiators',
        'website_goal',
        'primary_conversion',
        'public_contact_details',
        'current_website',
        'competitor_references',
        'brand_direction',
        'required_pages',
        'required_features',
        'constraints',
        'success_metrics',
        'existing_assets',
        'asset_permissions',
        'content_approver',
    ];

    /**
     * Schema v2 is an additive extension of the legacy v1 intake.
     * business_model_summary is optional and maps to the existing discovery
     * contract field; v1 payloads remain valid without it.
     *
     * @var list<string>
     */
    private const CURRENT_FIELDS = [
        ...self::LEGACY_FIELDS,
        'business_model_summary',
    ];

    /** @return list<int> */
    public function supportedVersions(): array
    {
        return [
            self::LEGACY_VERSION,
            self::CURRENT_VERSION,
        ];
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(int $schemaVersion, bool $forSubmission = false): array
    {
        $fields = match ($schemaVersion) {
            self::LEGACY_VERSION => self::LEGACY_FIELDS,
            self::CURRENT_VERSION => self::CURRENT_FIELDS,
            default => throw ValidationException::withMessages([
                'schema_version' => 'The selected intake schema version is not supported.',
            ]),
        };

        $required = $forSubmission ? 'required' : 'nullable';

        $rules = [
            'payload' => ['required', 'array:'.implode(',', $fields)],
            'payload.business_overview' => [$required, 'string', 'max:4000'],
            'payload.industry' => ['nullable', 'string', 'max:160'],
            'payload.location' => ['nullable', 'string', 'max:200'],
            'payload.target_audience' => [$required, 'string', 'max:4000'],
            'payload.products_services' => [$required, 'string', 'max:4000'],
            'payload.offer_details' => ['nullable', 'string', 'max:5000'],
            'payload.customer_questions' => ['nullable', 'string', 'max:4000'],
            'payload.customer_objections' => ['nullable', 'string', 'max:4000'],
            'payload.purchase_process' => ['nullable', 'string', 'max:4000'],
            'payload.operational_policies' => ['nullable', 'string', 'max:4000'],
            'payload.trust_evidence' => ['nullable', 'string', 'max:4000'],
            'payload.aftercare_support' => ['nullable', 'string', 'max:3000'],
            'payload.differentiators' => ['nullable', 'string', 'max:4000'],
            'payload.website_goal' => [$required, 'string', 'max:2000'],
            'payload.primary_conversion' => [$required, 'string', 'max:1000'],
            'payload.public_contact_details' => ['nullable', 'string', 'max:2000'],
            'payload.current_website' => ['nullable', 'url', 'max:255'],
            'payload.competitor_references' => ['nullable', 'string', 'max:4000'],
            'payload.brand_direction' => ['nullable', 'string', 'max:4000'],
            'payload.required_pages' => ['nullable', 'string', 'max:3000'],
            'payload.required_features' => ['nullable', 'string', 'max:3000'],
            'payload.constraints' => ['nullable', 'string', 'max:4000'],
            'payload.success_metrics' => ['nullable', 'string', 'max:2000'],
            'payload.existing_assets' => ['nullable', 'string', 'max:5000'],
            'payload.asset_permissions' => ['nullable', 'string', 'max:4000'],
            'payload.content_approver' => ['nullable', 'string', 'max:500'],
        ];

        if ($schemaVersion === self::CURRENT_VERSION) {
            $rules['payload.business_model_summary'] = ['nullable', 'string', 'max:4000'];
        }

        return $rules;
    }
}
