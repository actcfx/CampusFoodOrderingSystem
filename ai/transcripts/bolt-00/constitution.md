<!--
Sync Impact Report — draft for human review; remove before committing.
Version change: unversioned scaffold → 0.1.0 (initial, unratified draft).
Modified principles: template placeholders replaced by the seven METHOD.md §2 principles.
Added sections: Scope and File Ownership; Workflow and Gates; Governance.
Removed sections: generic template examples only; no adopted principles existed.
Deferred: TODO(RATIFICATION_DATE): humans must record the adoption date after approval.
Version notation is document metadata: MAJOR for incompatible rule changes, MINOR for
added or expanded rules, PATCH for wording corrections; this does not authorize changes.
-->
# Campus Food Ordering System Constitution

Status: DRAFT — awaiting human review and approval.

## Core Principles

### I. Agents Draft; Humans Decide

Agents MUST draft; humans MUST approve. Agents MUST stop at each gate G1–G5 and wait
for a human answer before continuing. An agent output does not constitute approval.

Source: METHOD.md §2.1; AGENTS.md, Gates.

### II. Approve Requirements Before UML

UML work MUST NOT start before G3 approval of requirements. The final traceability
check MUST NOT start before the UML files are complete. These dependencies ensure that
models and their final traceability are based on the required completed inputs.

Source: METHOD.md §2.2; AGENTS.md, Gates.

### III. Parallel Work Requires Independence

Agents MUST execute work in parallel only when there is no data dependency and they
write to different paths. Dependent work MUST run sequentially.

Source: METHOD.md §2.3; AGENTS.md, Orchestrator.

### IV. Respect File Ownership and Approved Baselines

Each agent MUST write only the files owned by its role in METHOD.md §3.2. Agents MUST
NOT directly edit human-approved files; changes MUST use METHOD.md §6. This preserves
human decisions and makes responsibility for each artifact explicit.

Source: METHOD.md §2.4; AGENTS.md, Files.

### V. Humans Perform All Git Writes

Humans MUST perform all Git write operations. Agents MUST NOT run `git commit`,
`git push`, `git merge`, `git rebase`, or `git remote`.

Source: METHOD.md §2.5; AGENTS.md, Git.

### VI. Every Requirement Has a Source

Each requirement MUST cite an `intent.md` item ID (`I-n.m`) or a `Q-nn` answer.
Requirements without a source MUST be placed in a section named `Unconfirmed`.
This keeps unsupported agent proposals visible for human decision.

Source: METHOD.md §2.6; AGENTS.md, Files.

### VII. Exclude Sensitive Data

Files and prompts MUST NOT contain personal data, passwords, keys, tokens, or
confidential data. If an input file contains such data, the agent MUST stop and tell
the human.

Source: METHOD.md §2.7; AGENTS.md, Data.

## Scope and File Ownership

The project scope covered here is requirements acquisition through Requirement Analysis,
including UML. Implementation is outside this scope.

Role-owned outputs MUST follow METHOD.md §3.2, as required by AGENTS.md:

| Role | Writable output |
|---|---|
| Orchestrator | `ai/plans/bolt-NN-plan.md` |
| elicitor | `questions.md` |
| spec_writer | `spec.md` |
| critic | None; reports findings only |
| uml_drafter | `uml/` |
| tracer | `traceability.md` |

This constitution draft is written only to `.specify/memory/constitution.md` under the
human's explicit instruction for this drafting task. No Bolt plan or other artifact
is created by this task.

Source: user-specified scope and output restriction; AGENTS.md, Files.

## Workflow and Gates

At the start of each Bolt, the Orchestrator MUST draft `ai/plans/bolt-NN-plan.md`
from `ai/plans/TEMPLATE.md`. Task status MUST be updated whenever a task changes state.
Each delegation MUST identify the agent, input files and their versions, output path,
and dependency. After each step, the Orchestrator MUST summarize changed files,
open questions, and the next gate.

Agents MUST stop at G1, G2, G3, G4, and G5 and wait for human approval. The meaning
and sequence of these gates remain defined by METHOD.md. UML MUST wait for G3;
final traceability MUST wait for completed UML. No gate is approved by this draft.

Source: AGENTS.md, Orchestrator and Gates; METHOD.md §2.1–§2.4.

## Governance

This document is a draft of the principles in METHOD.md §2 and the rules in AGENTS.md.
It does not grant approval or expand the work beyond requirements and UML through
Requirement Analysis. Humans decide whether to approve the draft.

Agents MUST NOT amend human-approved files directly. Proposed changes to approved
artifacts MUST follow the change process in METHOD.md §6: a change request,
impact analysis, a human decision, revisions by the responsible agents if accepted,
review of affected parts, and human reapproval. The referenced process governs the
change; this constitution does not replace it.

Compliance review MUST check gate approval, file ownership, source citations,
parallel-work dependencies, sensitive-data handling, and the prohibition on agent
Git writes. The Orchestrator's step summaries MUST expose changed files, open
questions, and the next gate for human review.

Version numbers describe document revisions using MAJOR.MINOR.PATCH: incompatible
rule changes increment MAJOR; additions or expanded guidance increment MINOR;
wording corrections increment PATCH. This is a document-versioning convention,
not an additional project principle or permission to change approved rules.
Version 0.1.0 identifies this initial draft; ratification remains pending.

Source: METHOD.md §2; AGENTS.md, Gates, Files, Git, Data, and Orchestrator.
The amendment process is incorporated by AGENTS.md's reference to METHOD.md §6.

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE): pending human approval | **Last Amended**: 2026-10-26