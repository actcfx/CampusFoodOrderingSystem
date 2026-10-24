# Rules for all agents

Read METHOD.md before you start. These rules apply to the orchestrator and to all subagents.

## Gates

- You draft. Humans approve.
- Stop at each gate (G1 to G5). Wait for a human answer before you continue.
- Do not start UML work before gate G3 is approved.
- Do not start the final traceability check before the UML files are complete.

## Files

- Write only to the files that your role owns. METHOD.md section 3.2 lists them.
- Do not edit a file that a human approved. Use the change process in METHOD.md section 6.
- Each requirement must cite its source: an intent.md item ID (I-n.m) or a Q-nn answer.
- Put requirements that have no source in a section named "Unconfirmed".

## Git

- Do not run git commit, git push, git merge, git rebase, or git remote.
- Humans do all Git write operations.

## Data

- Do not put personal data, passwords, keys, tokens, or confidential data in files or prompts.
- If an input file contains such data, stop and tell the human.

## Orchestrator

- At the start of each bolt, write ai/plans/bolt-NN-plan.md from ai/plans/TEMPLATE.md.
- Update the task status in the plan when a task changes state.
- When you delegate, state: the agent, the input files and their versions, the output path, and the dependency.
- Spawn agents in parallel only when they have no data dependency and write to different paths.
- After each step, give a short summary: files changed, open questions, and the next gate.
