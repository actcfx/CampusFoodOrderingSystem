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
| T8 | Reviewer | `spec.md`@41204bb32c286d395447142ddb0b7af529e33296（blob） | `checklist.md` | T7 | checklist 完成 | done | G3 |
| T9 | uml_drafter | `spec.md`@32e10eeb9c4b78bcfb40567c6ca9db7bb1cfe57e | `uml/` | G3 | 四種圖完成 | done | — |
| T10 | tracer (FULL) | spec@32e10ee、`uml/`@f14a1578 | `traceability.md` | T9 | 沒有空白對應或已列出 | done | — |
| T11 | critic (UML) | spec@32e10ee、`uml/`@f14a1578 | findings | T9 | 報告完成 | done | G4 |
| T12 | Orchestrator、Reviewer | 本 Bolt 所有紀錄 | AI 產出處置摘要、審查紀錄、工時與 usage log、去敏 transcript | T14 | Orchestrator 摘要已完成；Reviewer 結案紀錄待完成 | doing | G5 |
| T13 | scaffolder、Orchestrator | `spec.md`、`uml/`@dee9ffa9afed681cf0d4eec9da627e7b0dcc49fb；架構雛形@66be61d | `frontend/`、`backend/`（本次補作限 `backend/src/`） | G4 | 符合 METHOD.md 第 5 節的完成條件；後端建置及四張主要循序圖對應端點的 HTTP 驗證通過 | done | G5 |
| T14 | tracer (CODE) | `spec.md`、`uml/`、`traceability.md`@dee9ffa9afed681cf0d4eec9da627e7b0dcc49fb；T13 完成的工作目錄 `frontend/`、`backend/` | `traceability.md` 程式模組欄 | T13 | 沒有空白對應或已列出 | done | — |
| T15 | uml_drafter | spec@35101cc、UML@f14a1578、G4 審查及 CR-002@12fd02a | `uml/` 修訂 | G3 重新核准 | 套用接受與部分接受的處置及 CR-002 影響 | done | — |
| T16 | tracer (FULL) | spec@35101cc、T15 完成的 UML、intent、questions、G4 審查及 CR-002@12fd02a | `traceability.md` | T15 | 列出所有追溯缺口 | done | G4 |
| T17 | critic (UML) | spec@35101cc、UML@f14a1578 與 T15 修訂、G4 審查及 CR-002@12fd02a | 限定範圍 findings | T15 | 回報處置結果與新增問題 | done | G4 |
| T18 | uml_drafter | spec@35101cc、UML 第一輪修訂@12a2a06、G4 審查與 F-01 至 F-06 | `uml/` 第二輪修訂 | T15–T17 | 僅修訂六項指定問題 | done | — |
| T19 | critic (UML) | spec@35101cc、T18 完成的 UML、G4 審查與 F-01 至 F-06 | 限定範圍 findings | T18 | 逐項確認修訂並按組別回報新增問題 | done | G4 |
| T20 | tracer (FULL) | spec@35101cc、T18 完成的 UML、intent、questions、G4 審查 | `traceability.md` | T18 | 回報所有追溯缺口 | done | G4 |

狀態值：todo / doing / blocked / done / rejected

## 平行執行

- T10 與 T11 可以平行。
- T16 與 T17 在 T15 完成後可以平行。
- T19 與 T20 在 T18 完成後可以平行。
- T13 必須在 G4 核准之後開始；T14 在 T13 完成後開始。
- 其他任務循序執行。

## T12 結案摘要

### 採用的 AI 產出

| 步驟 | 採用的產出與理由 |
|---|---|
| G1 | `intent.md` 的格式、來源編號與 I-5.1、I-5.2 採用，因其依 PO 原有內容整理。任務表採用範本並依 CR-001 補 T13、T14，涵蓋架構雛形與程式追溯。見 [G1 審查](../../reviews/bolt-01-g1.md)。 |
| S2／G2 | 採用 elicitor 的 24 題，因 PO 已逐題回答。16 個假設依原回答接受。Q-12、Q-17、Q-22、Q-24 改以子訂單為單位後接受，取餐時間、減額、狀態與商家可見範圍因而一致。採用 R-01 至 R-12，因 PO 已確認數值、權限與相互衝突的回答。見 [G2 審查](../../reviews/bolt-01-g2.md)。 |
| S3／G3 | 採用 `questions.md` 的狀態更新，內容仍以 `db1a766` 為核准版本。採用 Codex spec_writer 的規格與六次修訂（`32e10ee`），因 critic 確認 A 組已修正、B 組依 G3-01 至 G3-26 處置，未決項目列入 Unconfirmed。AI 協助找出的四項 checklist 問題也納入修訂。見 [G3 審查](../../reviews/bolt-01-g3.md)。 |
| CR-002 | 採用 tracer 影響分析、AI 建議與 spec 修訂 `35101cc`。學生登入憑證與訂單彙總狀態會影響 S7 的 API 及資料欄位，PO 因此先確定學號加密碼登入、五種彙總狀態及推導規則、子訂單分組與各角色可見範圍。限定範圍再審無 findings，PO 已重新核准。見 [CR-002](../../changes/CR-002.md)。 |
| S4–S5／G4 | 採用七份 UML、critic 審查及 tracer FULL 追溯表，原稿須修訂。接受的 findings 使結帳交易、庫存模式、帳號角色、查詢可見範圍與重試規則符合核准規格。第 1 輪 `12a2a06` 採用後再修；第 2 輪 `dee9ffa9` 完成五項修正及重試循序圖的修正，活動圖殘留項目依 U3-F01 處置。追溯表更正 FR-23 等過早標為 Mapped 的項目，核准結果為 11 Mapped、23 Partial、0 Gap。逐項理由見 [G4 審查](../../reviews/bolt-01-g4.md)。 |
| S7／G5 finding 處置 | 採用 `66be61d` 的架構雛形並要求補假資料，因架構、需求 ID 與範圍符合，初版 29 個端點中 27 個回傳 501。採用 `1d3afee` 的補修，因 29 個端點建置後逐一呼叫均回傳 200 或 201，且整數金額、狀態及角色可見範圍符合規格。採用 tracer CODE，因 34 條需求都有程式對應；StudentAccount–Cart 關聯的保存方式仍待確認，管理者交付帳密是人工步驟。以上為已記錄的 finding 處置，G5 核准待簽。見 [G5 審查](../../reviews/bolt-01-g5.md)。 |

### 拒絕、取代與部分採用的 AI 產出

| 產出 | 處置與理由 |
|---|---|
| G1 三個 Bolt 的建議（R-01） | 拒絕。四大項需求可一次審完，切成三個 Bolt 會推遲須在最後一個 G4 之後進行的架構雛形。R-03 原提議延後釐清「先」的用意，也由 PO 在 G1 直接說明目前範圍。見 [G1 審查](../../reviews/bolt-01-g1.md)與 [AI Usage Log](../usage-log.md)。 |
| G2 Q-01 帳號與權限 | 取代。PO 明定學生自行註冊、商家由管理者在系統內的管理介面新增。 |
| G2 Q-02 瀏覽時暫不加入搜尋和篩選 | 取代。PO 要求加入關鍵字搜尋、排序和篩選。 |
| G2 Q-03 品項欄位假設 | 取代。PO 將品項名稱上限定為 50 字，確認商家名稱唯一，且庫存只在數量模式必填。 |
| G2 Q-13 單商家購物車及訂單 | 取代。PO 允許多商家結帳，依商家拆成各有狀態、取餐時間和折扣的子訂單。以上四個假設見 [G2 審查](../../reviews/bolt-01-g2.md)與[澄清紀錄](../../specs/001-campus-ordering/questions.md)。 |
| S2 重跑 elicitor 的建議 | 拒絕。24 題已產出，當時待 PO 回答。見 [AI Usage Log](../usage-log.md)。 |
| S3 Claude Code 代跑的規格與三輪審查 | 整批作廢。所用 subagent 不符 METHOD.md §3.2 的 Codex 角色分工；保留 PO 回答作為 G3 決策來源，由 Codex 重跑 S3。見 [G3 審查](../../reviews/bolt-01-g3.md)。 |
| G3 審查草稿及 PR 內文 | 更正。PO 要求按確認的用語記錄決策，無上架品項的商家仍顯示在最下方；停用商家保留，另納入永久刪除品項。PR 的檢查項目由核准者勾選。見 [AI Usage Log](../usage-log.md)及 [G3 審查](../../reviews/bolt-01-g3.md)。 |
| S4 自擬指令並接續 S5 的提議 | 取代。PO 要求依 `ai/prompts.md` 執行 S4，再以完成的 UML 作為 S5 的輸入。見 [AI Usage Log](../usage-log.md)。 |
| G4 U-F09、U-F11、U-F14 | 部分採用。折扣設定與編輯入圖，計價公式以 note 引用規格；子訂單狀態轉移以類別圖 note 表達，四種圖的範圍內無獨立狀態圖；網頁、付款範圍與整數金額限制以 note 表達。見 [G4 審查](../../reviews/bolt-01-g4.md)。 |
| G4 U-F12 與 U-F13 | 拒絕補畫。排序、篩選與空狀態已有 FR-03 至 FR-05；訪客購物車的重新整理、合併及編輯已有 FR-12 至 FR-15。追溯維持 Partial。見 [G4 審查](../../reviews/bolt-01-g4.md)。 |
| G4 U3-F01 | 拒絕在活動圖補畫驗證失敗後的重試路徑。驗證失敗時沒有建立訂單或扣庫存，且 FR-25 的重試行為已由循序圖表達。見 [G4 審查](../../reviews/bolt-01-g4.md)。 |

CR-002 後仍有五項 Unconfirmed 留到期末。G5-03 的管理者登入表單也延至期末，因本次架構雛形已提供獨立登入頁。`traceability.md` 的 CODE 欄已完成，文末對 `NotImplementedException` 與空目錄回應的描述仍是 `66be61d` 的狀態，供 G5 比對時留意。[規格](../../specs/001-campus-ordering/spec.md) · [追溯表](../../specs/001-campus-ordering/traceability.md) · [G5 審查](../../reviews/bolt-01-g5.md)

Orchestrator 的 T12 摘要已完成。Reviewer 仍須整理工時與 usage log、提交去敏 transcript 並完成 G5 審查紀錄。T12 記為 `doing`，其餘 T1–T11、T13–T20 均為 `done`。

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
| 2026-11-10 | T8 done：Reviewer 完成 `checklist.md` CHK001–CHK023（spec blob 41204bb，commit `32e10ee`）。等待 G3 核准 | 待人工審查 |
| 2026-11-10 | T9 done：依 G3 核准版本 `32e10ee` 產出 7 份 DRAFT PlantUML，涵蓋四種圖。S5 尚未開始 | 待人工審查 |
| 2026-11-10 | T10、T11 done：依規格 `32e10ee` 與 UML `f14a1578` 完成 FULL 追溯及 UML 審查。追溯缺口見 traceability.md；U-F01 至 U-F15 待 G4 處置。停在 G4 | 待人工審查 |
| 2026-11-10 | CR-002 已接受（`abdd4fd`）；規格修訂尚未開始，Codex 子代理執行緒已達上限，無法啟動 spec_writer。待修訂及限定範圍 SPEC 再審後，由 PO 重新核准 | 待人工審查 |
| 2026-11-10 | CR-002 規格修訂及限定範圍 SPEC 再審完成（核准基準 `32e10ee`，修訂版 spec blob `433fc4da96d7c1bb1017bc9d6da9bf30ee93e91b`）。修訂 FR-01、FR-30、FR-32、FR-33 與受影響的主要資料實體，移除已確認的 G3-14、G3-15。critic 在 AMBIGUOUS、MISSING、CONFLICT、INVENTED 四組均無發現。停在 G3，等待 PO 重新核准 | actcfx |
| 2026-11-10 | T15 done。以 spec `35101cc` 及 UML `f14a1578` 為基準，依 G4 接受及部分接受的處置和 CR-002 影響修訂 UML。T16、T17 done。追溯表 10 Mapped、24 Partial、0 Gap；限定範圍審查新增 6 項問題，U-F06、U-F07、U-F11、R-01 尚未完全解決。停在 G4 | 待人工審查 |
| 2026-11-10 | G4 第二輪。T18 done：依 spec `35101cc` 修訂 F-01 至 F-06（UML diff `dee9ffa`）；T19、T20 done：F-01 至 F-04 及 F-06 已解決。F-05 尚缺活動圖驗證失敗後的重試路徑（A 組 MISSING）；B 組無新增問題。追溯表 11 Mapped、23 Partial、0 Gap。停在 G4 | 待人工審查 |
| 2026-11-11 | G4 核准後，以 `dee9ffa9` 的規格及 UML 完成 T13。前後端建置、Prisma schema 驗證與 client 產生、29 個 API 端點的基本檢查均通過。T14 完成 CODE 追溯，34 條需求均有模組對應；未對應的 UML 元素及僅有後端介面對應的 UI 步驟已列於 `traceability.md`。停在 G5，等待人工審查程式碼 diff | 待人工審查 |
| 2026-11-11 | T13 補作完成。依 `dee9ffa9` 的規格與四張主要循序圖，在 `backend/src/` 為 `66be61d` 的全部 29 個 HTTP 端點加入固定假資料。後端建置通過，各端點各呼叫一次，回應格式與狀態碼均通過。停在 G5，等待人工審查程式碼 diff | 待人工審查 |
| 2026-11-11 | T12 的 Orchestrator 摘要完成，已彙整本 Bolt 的 AI 產出處置及理由。T12 等待 Reviewer 結案紀錄，其他任務均已完成。停在 G5 | BSugarSweet |
