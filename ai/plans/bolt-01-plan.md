# Bolt 01 工作計畫

- Feature：`specs/001-campus-ordering/`
- 分支：`bolt/01-campus-ordering`
- 開始日期：2026/10/26
- 計畫建立者：AI（Claude Opus 5.5）起草；之後由 Orchestrator（Codex）更新
- 計畫確認者：

## Bolt 切分建議（PO 在 G1 決定）

依資料依賴排序：學生點餐需要菜單資料，金額計算需要購物車內容。

| Bolt | 範圍 | 理由 |
|---|---|---|
| 01 | I-2 商家上架產品、I-1.1 瀏覽商家、I-1.2 瀏覽菜單 | 菜單資料是其他功能的輸入 |
| 02 | I-3 學生點餐、I-1.3 加入購物車、I-4 金額顯示 | 客製化選項與加購金額互相影響，要一起分析 |
| 03 | I-1.4 送出訂單、I-1.5 查詢訂單狀態 | 依賴購物車與金額的結果 |

如果兩位人類可以一次審查全部需求，也可以只用一個 Bolt。請在 G1 審查紀錄中寫下決定。

## 範圍（Bolt 01）

I-1.1、I-1.2、I-2.1 至 I-2.8

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
| T12 | Orchestrator、Reviewer | 本 Bolt 所有紀錄 | 審查紀錄、usage log、transcript | G4 | 所有紀錄完成 | todo | G5 |

狀態值：todo / doing / blocked / done / rejected

## 平行執行

- T10 與 T11 可以平行。
- 其他任務循序執行。

## 變更紀錄

| 日期 | 變更 | 確認者 |
|---|---|---|
| 2026-10-25 | 建立計畫 | |
