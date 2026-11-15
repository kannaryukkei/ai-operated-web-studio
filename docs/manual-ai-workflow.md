# API-Free Material-First Studio Workflow

## Principle

The client explains the business once in a normal interview and supplies the assets they already have. The AI does the structuring and website-production work. The client is not asked to complete a long website questionnaire or write website copy.

Default inputs:
- interview recording, transcript, meeting notes or operator summary;
- supplied brand/product/service assets and documents;
- optional existing website, social profiles, public CTA destinations and references.

Follow `docs/CLIENT_INPUT_AND_MATERIAL_POLICY_v1.0.md`, `docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md` and the current Master Skill candidate.

## Operating sequence

1. **Create the project and conduct the interview.** Capture the conversation in the form already available (recording, transcript or notes). Use natural prompts only where the conversation leaves material gaps.
2. **Collect existing assets and links.** Preserve originals in a permission-controlled project folder. Do not assume the current platform supports multi-file upload; it does not yet provide the complete per-asset ingestion workflow described in the protocol.
3. **Build the raw material packet.** Inventory interview files, assets and URLs. Keep original source files unchanged.
4. **Hand the packet to the AI.** In ChatGPT, Claude or another available AI application, provide the raw materials with the Material Ingestion Protocol and Master Skill. No paid model API is required.
5. **AI normalizes and traces.** The AI extracts atomic facts, links each material claim to a source locator, builds the asset/permission register, identifies conflicts and missing information, and creates the Client Brief v2.1 and business-discovery artifacts.
6. **Ask minimal clarifications.** Only batch questions whose answers materially affect the offer, price, policy, visitor journey, CTA, public claim, asset permission or release. The client does not repeat information already supplied.
7. **Operator reviews exceptions.** Review the fact register, source locators, public/private contact separation, asset rights, CTA destinations and critical gaps. Do not publish pending or unsupported claims.
8. **Record the normalized snapshot.** The existing Studio project intake/discovery workspace can be used as a durable project/discovery record. Its Project Intake currently contains 26 fields; the controller requires five fields on submission (`business_overview`, `target_audience`, `products_services`, `website_goal`, `primary_conversion`) and leaves 21 optional. The page helper text incorrectly says four required fields. Fill the internal snapshot from interview-derived material; do not ask the client to complete it as a second form. Preserve the raw packet and source-linked artifacts separately because this summary form is not a complete provenance record.
9. **Run the production lifecycle.** Continue through business intelligence, tier/scope, design differentiation, content, implementation, refinement, independent QA, owner approval and release using the Master Skill and specialist skills.
10. **Keep the process API-free.** The operator chooses an existing AI application, copies the relevant prompt/materials, and pastes structured results back into the Studio. Add automation only after repeated manual bottlenecks are demonstrated.

## Legacy intake page — operating caveat

The current Project Intake page is still accessible to authorized client-account owners and project editors because the underlying Project policy permits them to update the project. This is not the intended material-first client journey. Until the platform is aligned, the studio must not direct clients to that page as a required second brief. Studio staff should use it only as an internal snapshot/bridge, populated from the interview and material packet. The UI and server-side authorization need a later implementation change; hiding a link alone is not sufficient.

The 26-field snapshot is not the Raw Material Index, Fact Register, Asset/Permission Register or Source Coverage Matrix. Keep those source-linked artifacts in the controlled project workspace.

## What the platform currently does

- Manages studio users, client accounts and projects.
- Supports a project-scoped authenticated intake with versioned submissions.
- Creates a persisted discovery run from the latest submitted intake snapshot.
- Generates a repeatable prompt for an external AI application.
- Validates and stores structured discovery output.
- Records project/discovery state.

## What the platform does not yet do

- It is not a client-shareable raw interview recorder/transcriber.
- It does not yet provide complete private multi-file asset intake and per-file permission capture.
- It does not automatically parse arbitrary client documents or media into a source-linked fact register.
- It does not autonomously operate an AI model through a paid provider API.

These are known product boundaries, not reasons to force clients through a second long form. The manual material-first method is the production fallback until platform functionality is justified.

## Human authority and safety

The AI may draft and recommend. The client/authorized owner remains responsible for confirming facts and granting publication permission. The Studio owner controls tier, commercial scope, spending, publishing, DNS and release. No external message, transaction, deployment or public release happens without explicit authorization.

## Cost boundary

- No paid model API, API key or provider SDK is required.
- The operator uses their existing AI application and its available file/transcription capabilities.
- Keep raw files in controlled project storage; do not send unnecessary sensitive records to an AI application.
- Build platform ingestion/transcription features only after real delivery demonstrates a repeated bottleneck.
