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
| T1 | PO | 原始需求 | `intent.md` | 無 | PO 確認內容 | done | G1 |
| T2 | elicitor | `intent.md`@38391860eb7cb8186dbc9f35bb76d3e30de47f1b | `questions.md` | G1 | 每題都有假設 | done | — |
| T3 | PO | `questions.md` | PO 回答 | T2 | 每題都有回答或處置 | done | G2 |
| T4 | spec_writer | intent.md、questions.md@db1a76681de3db1b3a94fb95052eba5012f35b56 | `spec.md` | G2 | 每條需求都有來源 | done | — |
| T5 | critic (SPEC) | `spec.md`@b34cbe8fae470e10f5fc4c85a7cb123fb8f697b6（blob） | findings | T4 | 報告完成 | done | — |
| T6 | spec_writer | G3-25–G3-26、F-17、spec.md@52a0944（blob） | `spec.md` 修訂 | T5 | 每個 finding 都有處置 | done | — |
| T7 | critic (SPEC) | `spec.md`@41204bb32c286d395447142ddb0b7af529e33296（blob） | findings | T6 | 沒有未處理的 finding | done | — |
| T8 | Reviewer | `spec.md`@41204bb32c286d395447142ddb0b7af529e33296（blob） | `checklist.md` | T7 | checklist 完成 | doing | G3 |
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
| 2026-10-25 | 建立計畫 | BSugarSweet |
| 2026-10-29 | 依 G1 決定改為單一 Bolt，範圍改為全部需求；依 CR-001 新增 T13、T14 | BSugarSweet |
| 2026-11-08 | T2 done：elicitor 於 2026-11-02 完成 `questions.md`（24 題、24 個 ASSUMPTION），輸入為 G1 核准的 intent.md@3839186。該 commit（`d28868f`）誤建在 `main` 上，內容原樣複製到本分支。T3 doing，停在 G2 | 待人工審查 |
| 2026-11-08 | T3 done：PO 回答全部 24 題，G2 審查補充 R-03 至 R-12（`questions.md`@db1a766）。等待 G2 核准 | 待人工審查 |
| 2026-11-09 | T4–T7 重設為 todo：Claude（Claude Code）誤以 Claude subagent 代替 Codex 執行 S3（spec_writer、critic 三輪），違反 METHOD.md 3.2 的角色分工。該產出作廢、未進入 repo；S3 改由 Codex Orchestrator 重跑 | 待人工審查 |
| 2026-11-09 | T4–T6 done。T7 第二輪 SPEC 審查已完成，F-01 至 F-04 已處理；F-05 至 F-08 待 PO 決定，F-07、F-08 另需補規格交叉引用，F-09 待依 Q-13〈R-12〉釐清商家可見金額。T7 未達完成條件，停在 G3 | 待人工審查 |
| 2026-11-10 | T6 done：依 G3-01 至 G3-18 修訂規格，G3-19 與五項待確認主題保留於 Unconfirmed。T7 SPEC 再審完成（spec blob 9fd11ed）：F-06、F-07、F-09 已處理，F-05 已套用確定部分，F-08 延後。新增 F-10（A）及 F-11 至 F-13（B），T7 blocked，停在 G3 | 待人工審查 |
| 2026-11-10 | T6 done：修正 F-10，依 G3-20 至 G3-22 處理 F-11 至 F-13。T7 最終 SPEC 審查完成（spec blob 537e24d），新增 F-14（A，待處置）及 F-15（B，已登錄 Unconfirmed；目前 spec blob e8389b0）。T7 blocked，停在 G3 | 待人工審查 |
| 2026-11-10 | T6 done：FR-06 依 G3-23 修正 F-14，依 G3-24 加入永久刪除。T7 限定範圍再審（spec blob 8ce1fad）：F-14 已解決，無 A 組待處置，F-16（B）已登錄 Unconfirmed。T7 done，停在 G3 | 待人工審查 |
| 2026-11-10 | T8 doing：Reviewer 以 `$speckit-checklist` 產生 `checklist.md`（CHK001–CHK023，審查 spec blob 92a1b53），待逐項勾選 | 待人工審查 |
| 2026-11-10 | T6 done：依 G3 checklist 審查修訂四項，spec blob 52a0944。T7 限定範圍 SPEC 再審完成：四項均已修訂，F-17 為 FR-03 通用置底規則與降冪排序待確認事項的衝突；依本輪範圍保留，T7 blocked。T8 仍由 Reviewer 審查，停在 G3 | 待人工審查 |
| 2026-11-10 | T6 done：依 G3-25、G3-26 修訂 FR-03、FR-05，移除兩項已確認事項。T7 限定範圍 SPEC 再審完成（spec blob 41204bb）：F-17 已解決，無新增 A 組或 B 組問題。T7 done，停在 G3 | 待人工審查 |
