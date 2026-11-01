# Bolt 01 工作計畫

- Feature：`specs/001-campus-ordering/`
- 分支：`bolt/01-campus-ordering`
- 開始日期：2026/10/26
- 計畫建立者：AI（Claude Opus 5.5）起草；之後由 Orchestrator（Codex）更新
- 計畫確認者：BSugarSweet

## Bolt 切分（G1 決定）

只用一個 Bolt 處理全部需求（PO 決定，2026-10-29）。理由：需求只有 4 大項，兩位人類可以一次審查完；架構雛形（T13）要在最後一個 Bolt 的 G4 之後才能開始，切成多個 Bolt 會延後程式碼產出。本 Bolt 即最後一個 Bolt，保留 T13、T14。

## 範圍（Bolt 01）

`intent.md` 全部項目：I-1.1 至 I-1.5、I-2.1 至 I-2.8、I-3.1 至 I-3.5、I-4.1 至 I-4.6、I-5.1 至 I-5.2

## 任務

| 任務 | Agent / 人類 | 輸入與版本 | 交付物 | 依賴 | 完成條件 | 狀態 | 人工停止點 |
|---|---|---|---|---|---|---|---|
| T1 | PO | 原始需求 | `intent.md` | 無 | PO 確認內容 | doing | G1 |
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
| T12 | Orchestrator、Reviewer | 本 Bolt 所有紀錄 | 審查紀錄、usage log、transcript | T14 | 所有紀錄完成 | todo | G5 |
| T13 | scaffolder | spec@<G3 hash>、`uml/`@<G4 hash> | `frontend/`、`backend/` | G4 | 符合 METHOD.md 第 5 節的完成條件 | todo | — |
| T14 | tracer (CODE) | `traceability.md`、`frontend/`、`backend/`@<hash> | `traceability.md` 程式模組欄 | T13 | 沒有空白對應或已列出 | todo | — |

狀態值：todo / doing / blocked / done / rejected

## 平行執行

- T10 與 T11 可以平行。
- T13 必須在 G4 核准之後開始；T14 在 T13 完成後開始。
- 其他任務循序執行。

## 變更紀錄

| 日期 | 變更 | 確認者 |
|---|---|---|
| 2026-10-25 | 建立計畫 | |
| 2026-10-29 | 依 G1 決定改為單一 Bolt，範圍改為全部需求；依 CR-001 新增 T13、T14 | |
