# Campus Food Ordering System Constitution

Status: Ratified at gate G0. Review record: `reviews/bolt-00-g0.md`.

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

### VIII. Human Peer Review

The two humans MUST review each other's work. Every PR MUST be approved by the
other human, who is not the proposer. This provides human review independent of
the person proposing the change.

Source: METHOD.md §3.1.

## Scope and File Ownership

The project scope covered here is requirements acquisition through Requirement Analysis,
including UML. Implementation is outside this scope.

Artifact ownership and output paths MUST follow METHOD.md §3.2 and §4, covering
both agent and human responsibilities.

Source: METHOD.md introduction, §3.2, and §4; AGENTS.md, Files.

## Workflow and Gates

At the start of each Bolt, the Orchestrator MUST draft `ai/plans/bolt-NN-plan.md`
from `ai/plans/TEMPLATE.md`. Task status MUST be updated whenever a task changes state.
Each delegation MUST identify the agent, input files and their versions, output path,
and dependency. After each step, the Orchestrator MUST summarize changed files,
open questions, and the next gate.

Agents MUST stop at G1, G2, G3, G4, and G5 and wait for human approval. The meaning
and sequence of these gates remain defined by METHOD.md. UML MUST wait for G3;
final traceability MUST wait for completed UML.

Source: AGENTS.md, Orchestrator and Gates; METHOD.md §2.1–§2.4.

## Governance

This constitution states the principles in METHOD.md §2, the human peer review
rule in METHOD.md §3.1, and the rules in AGENTS.md.
It does not grant approval or expand the work beyond requirements and UML through
Requirement Analysis.

Agents MUST NOT amend human-approved files directly. Proposed changes to approved
artifacts MUST follow the change process in METHOD.md §6: a change request,
impact analysis, a human decision, revisions by the responsible agents if accepted,
review of affected parts, and human reapproval. The referenced process governs the
change; this constitution does not replace it.

Compliance review MUST check gate approval, file ownership, source citations,
parallel-work dependencies, sensitive-data handling, human peer review of every PR,
and the prohibition on agent Git writes. The Orchestrator's step summaries MUST
expose changed files, open questions, and the next gate for human review.

Version numbers describe document revisions using MAJOR.MINOR.PATCH: incompatible
rule changes increment MAJOR; additions or expanded guidance increment MINOR;
wording corrections increment PATCH. This is a document-versioning convention,
not an additional project principle or permission to change approved rules.
Version 1.0.0 is the version ratified at gate G0.

Source: METHOD.md §2 and §3.1; AGENTS.md, Gates, Files, Git, Data, and Orchestrator.
The amendment process is incorporated by AGENTS.md's reference to METHOD.md §6.

**Version**: 1.0.0 | **Ratified**: 2026-10-27 | **Last Amended**: 2026-10-27