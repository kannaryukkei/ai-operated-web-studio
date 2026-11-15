# Starter Acceptance / QA Evidence Checklist

**Master Skill:** Stage 7 — Independent QA.  
**Review exact candidate:** record branch, commit, WRP and Starter Acceptance Gate version. Do not mark a check PASS unless it was performed and evidence is linked.

## Review context
- Project / URL:
- WRP version:
- Acceptance gate version:
- Branch / exact commit:
- Reviewer:
- Review type: FRESH_CONTEXT / SELF_REVIEW / OTHER:
- Browser/tool version:
- Tested at:

## Business, source and content integrity
- [ ] Client Website Brief and source packet referenced.
- [ ] Critical customer questions have source-backed answers or explicit blockers.
- [ ] Fact answer/evidence/publication statuses remain separate.
- [ ] Every public claim, price, policy, credential, offer and contact detail has supporting source and required approval.
- [ ] No invented testimonials, reviews, ratings, awards, customer stories, customer counts, metrics, guarantees or case results, including demo/portfolio content.
- [ ] Concept imagery is clearly disclosed and not presented as real client work or proof.
- [ ] Asset source, ownership, permission, consent, credit and restrictions are checked.
- [ ] No placeholder copy, unsupported claim or internal note is present in public content.

## Rendered page coverage
| page_coverage_id | customer_question_id | section/viewport | coverage_status (PUBLISHED / PREVIEW_ONLY / GAP / NOT_APPLICABLE) | supporting source/fact IDs | evidence |
|---|---|---|---|---|---|
| | | | | | |

PUBLISHED is allowed only when the answer appears in the rendered candidate and all underlying facts/assets have appropriate evidence, rights and publication approval.

## Build and functionality
- [ ] Clean install uses the committed lockfile.
- [ ] Production build passes.
- [ ] Automated browser tests run on exact commit.
- [ ] Navigation/anchors and primary/secondary CTAs behave as approved.
- [ ] Forms/contact actions do exactly what their labels promise.
- [ ] No fake success, fake booking, fake persistence or hidden data handling.
- [ ] Empty/error/unavailable states are truthful.
- [ ] No critical console/network errors or broken assets.

## Responsive, accessibility and visual evidence
- [ ] Actual screenshots reviewed at relevant mobile/tablet/desktop viewports.
- [ ] Viewport matrix includes supported narrow/mobile and desktop widths.
- [ ] No horizontal overflow or clipped controls.
- [ ] Image crop, focal point, loading and alt text checked.
- [ ] Semantic structure, headings, labels, accessible names and keyboard operation checked.
- [ ] Focus, contrast, reduced motion and dialog behavior checked where applicable.
- [ ] SEO title/description, favicon, social metadata and preview/production robots policy checked.
- [ ] Performance/cross-browser checks performed or marked NOT_TESTED.

## Evidence register

| criterion_id | method/command | exact commit | viewport/state | result (PASS / FAIL / NOT_TESTED / BLOCKED) | evidence link | defect_id / notes |
|---|---|---|---|---|---|---|
| QA-001 | | | | NOT_TESTED | | |

## Verdict
- Decision: PASS / PASS WITH CONCERNS / FAIL / BLOCKED
- Blocking/high findings:
- Medium/low findings:
- NOT_TESTED items:
- Authorized fixes completed:
- Re-test evidence:
- G5 production-readiness input: READY / NOT_READY
- Reviewer/date:

A QA PASS is not G5 production readiness or G6 release authorization by itself.
