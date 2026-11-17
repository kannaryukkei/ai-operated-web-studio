# Inbox file examples

Project initialization:

    {
      "project_id": "CLIENT-001",
      "delivery_mode": "preview_only"
    }

Artifact submission: place the actual artifact content in a file under .studio/inbox/artifacts/<artifact-id>/. No JSON wrapper is needed.

Gate approval:

    {
      "decision": "CONDITIONAL_PREVIEW",
      "subject": "Stage 0 sources, claims and asset permissions",
      "evidence_reference": "GitHub review, client acceptance record or meeting decision reference"
    }

The gate ID and role come from the folder and filename. The GitHub actor must be explicitly mapped to that role in .studio/approver-roles.json.
