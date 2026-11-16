# Customer Question / Section Map

Use the Customer Question Map and Buying Journey as the source of structure. Do not assume every section belongs on every site. Link every answer to canonical fact/source IDs and keep the independent status axes separate.

## Planned section map (Stages 3–4)

Create and maintain media-requirements.csv alongside this map. Every planned visual must answer a visitor question and reference its section. The Media Requirements Plan defines what is needed; the Asset/Permission Register remains the single source of truth for individual files and rights. Do not create or source stock media before the approved WRP and Stage 5.

| section_map_id | question_id | order | section | visitor question | answer summary or gap | source_ids | fact_ids | asset_ids | cta_ids | question_answer_status | evidence_status | publication_status | milestone_priority |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|
| SEC-001 | Q-001 | 1 | Hero | Is this for me? | | | | | | | | | |
| SEC-002 | Q-002 | 2 | Offer | What can I get? | | | | | | | | | |
| SEC-003 | Q-003 | 3 | Process / value | What happens next? | | | | | | | | | |
| SEC-004 | Q-004 | 4 | Visual showcase | What can I see? | | | | | | | | | |

**Customer-question answer status:** ANSWERED / GAP / NOT_APPLICABLE. An ANSWERED question must have supporting fact IDs; it does not imply publication approval or rendered coverage.  
**Evidence status:** VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT.  
**Publication status:** APPROVED / PENDING / NOT_APPROVED.  
**Milestone priority:** PREVIEW_BLOCKER / PRODUCTION_BLOCKER / OPTIONAL_GAP.

## Rendered coverage (after implementation and QA only)

Create canonical `page_coverage[]` records after reviewing the actual rendered candidate. Required fields:

`page_coverage_id`, `question_id`, `target_page_or_url`, `target_section_key`, `coverage_status` (PUBLISHED / PREVIEW_ONLY / GAP / NOT_APPLICABLE), `rendered_locator_or_evidence`, `fact_ids`, and `owner_or_action`.

Do not mark a planned section as PUBLISHED. A draft in the brief or section map is not rendered evidence. A visual showcase may use disclosed concept imagery, but it is not customer proof. Never invent testimonials, reviews, ratings, awards, metrics, customer stories or outcomes — including for demos.
