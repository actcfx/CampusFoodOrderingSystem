# Bolt 01 — Gate G4 審查紀錄

- 關卡：G4（核准 UML、追溯表與問題處置）
- 審查對象與版本（commit hash）：`specs/001-campus-ordering/uml/`、`specs/001-campus-ordering/traceability.md`（`f06f40894491b141ed08d1631cb6c338f2f42fbf`）
- 審查人：actcfx
- 核准人：
- 開始時間：2026/11/10 16:43
- 結束時間：

> 處置由 AI（Claude）提出建議，PO 於 2026-11-10 回答「照你說的」全部採用。R-01、R-02 由 Claude 檢查時提出。

## 處置後的流程

1. 依 METHOD.md §6 提出 CR-002（`changes/CR-002.md`），確定學生登入憑證（G3-15）與整筆訂單彙總狀態（G3-14），由 spec_writer 修訂 spec。
2. uml_drafter 依接受的 findings 及 CR-002 修訂 UML；critic 只再審修訂部分；tracer 依修訂後 UML 更新追溯表。
3. PO 重新核准 spec 的新版本後，G4 才核准。

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

## AI 產出的處置

| AI 產出 | 接受或拒絕 | 理由 |
|---|---|---|
| uml_drafter 的 7 份 DRAFT UML（`f14a157`） | 接受，需修訂 | 見審查結果 U-F01 至 U-F15、R-01、R-02 |
| tracer FULL 追溯表（`f06f408`） | 接受，需更正 | FR-23 誤標為 Mapped（R-01）；其餘 Gap 與 Partial 與 critic 結果一致 |
| critic UML 審查 U-F01 至 U-F15 | 接受 | 處置見審查結果 |

## 決定

- [ ] 核准，可以進入下一步
- [ ] 退回，需要修訂（寫明要修訂的項目）

核准人簽名與日期：
