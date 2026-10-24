# Bolt NN 工作計畫

- Feature：`specs/NNN-<feature>/`
- 分支：`bolt/NN-<feature>`
- 開始日期：
- 計畫建立者：Orchestrator（Codex）
- 計畫確認者：

## 範圍

（本 Bolt 處理哪一組需求。）

## 任務

| 任務 | Agent / 人類 | 輸入與版本 | 交付物 | 依賴 | 完成條件 | 狀態 | 人工停止點 |
|---|---|---|---|---|---|---|---|
| T1 | PO | 訪談筆記 | `intent.md` | 無 | PO 完成撰寫 | todo | G1 |
| T2 | elicitor | `intent.md`@<hash> | `questions.md` | G1 | 每題都有假設 | todo | — |
| T3 | PO | `questions.md` | PO 回答 | T2 | 每題都有回答或處置 | todo | G2 |
| T4 | spec_writer | intent、questions@<hash> | `spec.md` | G2 | 每條需求都有來源 | todo | — |
| T5 | critic (SPEC) | `spec.md`@<hash> | findings | T4 | 報告完成 | todo | — |
| T6 | spec_writer | findings | `spec.md` 修訂 | T5 | 每個 finding 都有處置 | todo | — |
| T7 | critic (SPEC) | `spec.md`@<hash> | findings | T6 | 沒有未處理的 finding | todo | — |
| T8 | Reviewer | `spec.md`@<hash> | `checklist.md` | T7 | checklist 完成 | todo | G3 |
| T9 | uml_drafter | `spec.md`@<G3 hash> | `uml/` | G3 | 四種圖完成 | todo | — |
| T10 | tracer (FULL) | spec@<G3 hash>、`uml/`@<hash> | `traceability.md` | T9 | 沒有空白對應或已列出 | todo | — |
| T11 | critic (UML) | spec@<G3 hash>、`uml/`@<hash> | findings | T9 | 報告完成 | todo | G4 |
| T12 | Orchestrator、Reviewer | 本 Bolt 所有紀錄 | 審查紀錄、usage log、transcript | G4 | 所有紀錄完成 | todo | G5 |

狀態值：todo / doing / blocked / done / rejected

## 平行執行

- T10 與 T11 可以平行。
- 其他任務循序執行。

## 變更紀錄

| 日期 | 變更 | 確認者 |
|---|---|---|
