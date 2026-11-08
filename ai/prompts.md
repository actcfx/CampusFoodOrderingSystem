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
Give one table for all questions: Q-nn, the question in one line, the ASSUMPTION.
Do not ask me questions one by one.
Stop at gate G2.
```

PO 在 `questions.md` 每題的「PO answer」寫回答。同意假設的題目寫「接受假設」，不同意的寫「拒絕假設：」加上正確答案。每題都要寫，不可以留空。

## S3 起草與審查需求

T4 到 T7 之間沒有關卡（METHOD.md 第 5 節），所以用一個指令跑完，只停在 G3。

```
Spawn spec_writer for specs/<NNN-feature>/. Input: intent.md and questions.md at <hash>.
Wait for it to finish. Update task T4 in the plan.
Spawn critic with review target SPEC. Wait for it to finish. Update task T5.
Sort the findings into two groups:
  A. Findings that can be fixed from intent.md or a PO answer in questions.md.
  B. Findings that need a PO decision (no source, or the sources conflict).
Spawn spec_writer to fix only group A. For group B, spec_writer must not guess:
it moves the item to "Unconfirmed" or marks it [NEEDS CLARIFICATION].
Wait for it to finish. Update task T6.
Spawn critic with review target SPEC again. Wait for it to finish. Update task T7.
Give one summary for gate G3:
  - round 1 findings, with group A or B, and what spec_writer changed
  - round 2 findings
  - group B items that need my decision
Do not ask me anything before this summary.
Stop at gate G3.
```

如果第一輪 findings 很多或分組不確定，改用舊做法：在 T5 之後停下來，由 PO 指定要修的 findings。所有 findings 的處置仍由 PO 在 G3 審查紀錄確認。

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
