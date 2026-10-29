# Orchestrator 指令

在 Codex 主執行緒依序輸入。把 `<...>` 換成實際值。

## S1 建立工作計畫

```
Read METHOD.md and AGENTS.md.
Create ai/plans/bolt-<NN>-plan.md from ai/plans/TEMPLATE.md for specs/<NNN-feature>/.
Fill in the scope from intent.md. Use the current commit hash for intent.md.
Stop at gate G1.
```

## S2 澄清問題

```
Spawn elicitor for specs/<NNN-feature>/. Input: intent.md at <hash>.
Wait for it to finish. Update task T2 in the plan.
Summarize the number of questions and assumptions.
Stop at gate G2.
```

## S3 起草與審查需求

```
Spawn spec_writer for specs/<NNN-feature>/. Input: intent.md and questions.md at <hash>.
Wait for it to finish.
Then spawn critic with review target SPEC. Wait for it to finish.
Give me the findings. Update tasks T4 and T5 in the plan.
Do not continue until I tell you which findings to fix.
```

```
Spawn spec_writer to fix these findings: <F-nn list>.
Wait for it to finish. Then spawn critic with review target SPEC again.
Give me the findings. Update tasks T6 and T7 in the plan.
Stop at gate G3.
```

## S4 建立 UML

```
Gate G3 is approved. The approved spec.md is at commit <hash>.
Spawn uml_drafter with that commit hash. Wait for it to finish.
Update task T9 in the plan. Do not start S5 yet.
```

## S5 追溯與 UML 審查

```
The UML files are complete at commit <hash>.
Spawn tracer in mode FULL and critic with review target UML in parallel.
tracer writes only traceability.md. critic does not edit files.
Wait for both agents.
Give one summary: traceability gaps and critic findings by group.
Update tasks T10 and T11 in the plan.
Stop at gate G4.
```

## S7 架構雛形（只在最後一個 Bolt）

```
Gate G4 of the last bolt is approved. The approved spec.md and uml/ are at commit <hash>.
Spawn scaffolder with that commit hash. Wait for it to finish.
Then spawn tracer in mode CODE. Wait for it to finish.
Give one summary: UML elements with no code module, and code modules with no requirement ID.
Update tasks T13 and T14 in the plan.
Stop and wait for my review of the code diff.
```

## S6 結案

```
Gate G4 is approved.
Summarize this bolt: accepted and rejected AI output, with the reason for each.
Update task T12 and set all finished tasks to done.
Stop at gate G5. Do not commit.
```

## 變更申請

```
Read changes/CR-<NNN>.md.
Spawn tracer in mode IMPACT. Wait for it to finish.
Give me the impact list. Do not edit approved files.
```
