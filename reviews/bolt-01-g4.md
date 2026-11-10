# Bolt 01 — Gate G4 審查紀錄

- 關卡：G4（核准 UML、追溯表與問題處置）
- 審查對象與版本（commit hash）：`specs/001-campus-ordering/uml/`、`specs/001-campus-ordering/traceability.md`（`dee9ffa9afed681cf0d4eec9da627e7b0dcc49fb`，第 2 輪修訂後；第一次審查版本為 `f06f408`）
- 審查人：actcfx
- 核准人：
- 開始時間：2026/11/10 16:43
- 結束時間：2026/11/10 17:26

> 處置由 AI（Claude）提出建議，PO 於 2026-11-10 回答「照你說的」全部採用。R-01、R-02 由 Claude 檢查時提出。

## 處置後的流程

1. 依 METHOD.md §6 提出 CR-002（`changes/CR-002.md`），確定學生登入憑證（G3-15）與整筆訂單彙總狀態（G3-14），由 spec_writer 修訂 spec。
2. uml_drafter 依接受的 findings 及 CR-002 修訂 UML；critic 只再審修訂部分；tracer 依修訂後 UML 更新追溯表。共兩輪：第 1 輪處理 U-F01 至 U-F15、R-01、R-02 及 CR-002（`12a2a06`）；第 2 輪處理第 1 輪 critic 的 U2-F01 至 U2-F06。
3. PO 已於 CR-002 重新核准 spec（`35101cc`）。G4 核准對象改為第 2 輪修訂後的版本。

## 審查結果

| Finding / 項目 | 來源（critic / 人類） | 類型 | 處置（接受 / 拒絕 / 延後） | 理由 |
|---|---|---|---|---|
| U-F01 結帳把建立訂單與扣庫存畫成分開的步驟，且不論扣減結果都回傳成功 | critic | CONFLICT | 接受 | 改為同一動作，扣減失敗則不建立訂單（FR-24） |
| U-F02 購物車明細必須關聯現存品項，無法表達品項永久刪除後仍在購物車 | critic | CONFLICT | 接受 | 關聯改為 0..1，或註明品項已刪除時送單失敗（FR-22、G3-24） |
| U-F03 結帳序列對手動售完模式也做數量檢查 | critic | CONFLICT | 接受 | 只有數量模式檢查數量，手動售完模式只看可售狀態（FR-22） |
| U-F04 訪客轉學生的流程暗示登入後銜接購物車 | critic | AMBIGUOUS | 接受 | 移除暗示，以 note 標為 Unconfirmed（FR-15、G3-03） |
| U-F05 刪除與拒單序列混淆已確認規則與延後的庫存情境 | critic | AMBIGUOUS | 接受 | 已確認路徑與 Unconfirmed（F-16、G3-19）分開表示 |
| U-F06 商家帳號 lifeline 也儲存管理者帳號，且缺少交付帳密給商家 | critic | AMBIGUOUS | 接受 | 兩種帳號分開，補上交付帳密步驟（FR-02） |
| U-F07 缺少同一結果的重試、僅成功時清空購物車、取餐時間檢查 | critic | MISSING | 接受 | 補畫（FR-17、FR-24、FR-25）；R-01、R-02 一併修正 |
| U-F08 缺少學生自行註冊與各角色分開的登入介面 | critic | MISSING | 接受 | 補註冊與登入用例（FR-01、FR-32）；內容依 CR-002 結果 |
| U-F09 缺少折扣管理與計價規則 | critic | MISSING | 部分接受 | 補折扣設定與編輯；計價公式以 note 引用 FR-19 至 FR-21，不另畫計算流程 |
| U-F10 刪除分類後品項列為未分類未表示 | critic | MISSING | 接受 | 在商家菜單序列加一步（FR-09） |
| U-F11 缺少子訂單狀態轉移與各角色查詢結果 | critic | MISSING | 部分接受 | 狀態轉移表以 note 放在 Suborder；不新增狀態圖，`uml-drafter.toml` 只規定四種圖 |
| U-F12 瀏覽與搜尋的排序、篩選與空狀態未表示 | critic | MISSING | 拒絕 | UI 細節，spec FR-03 至 FR-05 已規定；追溯表維持 Partial |
| U-F13 訪客購物車重新整理、合併與編輯規則未表示 | critic | MISSING | 拒絕 | 業務細節，spec FR-12 至 FR-15 已規定；追溯表維持 Partial |
| U-F14 網頁版交付與付款範圍限制未表示 | critic | MISSING | 部分接受 | 用例圖系統邊界加 note 引用 FR-31、NFR-01；FR-18 幣別與整數精度同樣以 note 表示 |
| U-F15 類別圖規定商家帳號一對一、每個學生帳號剛好一個購物車 | critic | INVENTED | 接受 | 改為 spec 有規定的多重性，未規定者不標 |
| R-01 `sequence-order.puml:23` 金額變動條件缺少選項加價；追溯表把 FR-23 標為 Mapped 並稱序列已列出三項 | AI（Claude） | AMBIGUOUS | 接受 | 併入 U-F07 修正；FR-23 改為 Partial，直到修正完成 |
| R-02 循序圖缺少金額變動後學生不確認的分支，與活動圖不一致 | AI（Claude） | MISSING | 接受 | 併入 U-F07 修正 |
| U2-F01 結帳判斷條件未涵蓋只有選項加價變動（第 1 輪修訂後 critic 的 F-01） | critic | AMBIGUOUS | 接受 | 第 2 輪修正，critic 確認已解決；R-01 隨之完成 |
| U2-F02 查詢回應未明列整筆訂單 ID、依狀態分組的子訂單；商家分組只含自家且含已拒單（F-02） | critic | AMBIGUOUS | 接受 | 第 2 輪修正，critic 確認已解決（FR-30、FR-33、CR-002） |
| U2-F03 取餐時間檢查未寫 Asia/Taipei（F-03） | critic | MISSING | 接受 | 第 2 輪修正，critic 確認已解決（FR-17） |
| U2-F04 狀態轉移未含初始狀態待接單，及停用商家可處理既有子訂單（F-04） | critic | MISSING | 接受 | 第 2 輪修正，critic 確認已解決（FR-26） |
| U2-F05 重試流程在送單失敗後仍回傳訂單 ID，與活動圖矛盾（F-05） | critic | CONFLICT | 接受 | 第 2 輪修正循序圖：重試回傳第一次的結果，成功才有訂單 ID。活動圖的殘留見 U3-F01 |
| U2-F06 交付帳密給商家的是後台介面而非管理者（F-06） | critic | CONFLICT | 接受 | 第 2 輪修正，critic 確認已解決（FR-02） |
| U3-F01 活動圖在驗證失敗時直接結束，未經過重試路徑（`activity-order.puml:14`） | critic（第 2 輪） | MISSING | 拒絕 | PO 於 2026-11-10 回答「照你的」採用 AI 建議。驗證失敗時不建立訂單也不扣庫存，重試不可能重複建立；FR-25 的重試行為已由循序圖完整表達，活動圖只畫主流程 |

## AI 產出的處置

| AI 產出 | 接受或拒絕 | 理由 |
|---|---|---|
| uml_drafter 的 7 份 DRAFT UML（`f14a157`） | 接受，需修訂 | 見審查結果 U-F01 至 U-F15、R-01、R-02 |
| tracer FULL 追溯表（`f06f408`） | 接受，需更正 | FR-23 誤標為 Mapped（R-01）；其餘 Gap 與 Partial 與 critic 結果一致 |
| critic UML 審查 U-F01 至 U-F15 | 接受 | 處置見審查結果 |
| uml_drafter 第 1 輪修訂（`12a2a06`） | 接受，需再修訂 | 17 項處置中 12 項解決；U-F06、U-F07、U-F11、R-01 部分解決，另產生 U2-F01 至 U2-F06 |
| uml_drafter 第 2 輪修訂 | 接受 | U2-F01 至 U2-F06 中 5 項解決，U2-F05 只剩活動圖（U3-F01） |
| tracer FULL 更新（第 1、2 輪） | 接受 | 第 2 輪結果：11 Mapped、23 Partial、0 Gap；第 1 輪曾把 FR-17、FR-25、FR-30 標為 Mapped，與 critic 未解決的問題不一致，第 2 輪後已一致 |

## 流程問題

1. critic 未直接讀檔：`critic.toml` 設 `shell_tool = false`，第 1 輪 critic 審查的是 Orchestrator 轉述的摘錄，審查內容由 Orchestrator 決定，獨立性降低。這是 METHOD.md §7.1 限制的實例，記入報告；本 Bolt 不修改 `.codex/` 設定。
2. Codex 對話的 agent 執行緒上限：同一對話派出 4 個 subagent 後，無法再派 spec_writer（CR-002）。改為每個派出多個 agent 的步驟使用新的 Codex 對話。
3. PlantUML 未在本機或 Codex 環境渲染驗證。

## 決定

- [ ] 核准，可以進入下一步
- [ ] 退回，需要修訂（寫明要修訂的項目）

核准人簽名與日期：
