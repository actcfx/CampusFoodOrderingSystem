# Bolt 01 需求追溯表

- **模式** FULL
- **規格基準** `specs/001-campus-ordering/spec.md` @ `32e10eeb9c4b78bcfb40567c6ca9db7bb1cfe57e`
- **UML 基準** `specs/001-campus-ordering/uml/` @ `f14a1578f13d3a092e375c28dd0d3b5eb345e37c`
- **狀態說明** Mapped 表示有對應且圖中至少描述主要結構或流程。Partial 表示圖中只有廣義步驟、屬性或需求 ID 註記，未表達全部規則。Gap 表示找不到能表達該需求的 UML 元素。
- **程式模組** 尚未建立架構雛形，本欄留白。

| Source | Requirement ID | UML element | Code module | Status |
|---|---|---|---|---|
| Q-01, Q-20, Q-24, G3-06, G3-15 | FR-01 | 無明確註冊/學生登入用例；僅 StudentAccount（domain-class.puml） |  | Gap |
| Q-01 (R-05, R-09, R-10), Q-03 (R-07), G3-06 | FR-02 | UC_Merchants, UC_Admins (use-cases.puml); Administrator, AdminUI, Accounts (sequence-admin.puml); AdministratorAccount, MerchantAccount, Merchant (domain-class.puml) |  | Partial |
| I-1.1, Q-01, Q-02 (R-09), G3-07, G3-09, G3-21, G3-25 | FR-03 | UC_Browse (use-cases.puml); Visitor/System/Catalog browse active merchants (sequence-order.puml); Browse active merchants step (activity-order.puml); Merchant (domain-class.puml) |  | Partial |
| I-1.2, Q-01, Q-02 (R-06), Q-04, G3-09, G3-11, G3-21 | FR-04 | UC_Browse (use-cases.puml); Visitor/System/Catalog browse menu (sequence-order.puml); Merchant, Item (domain-class.puml) |  | Partial |
| Q-02 (R-06), Q-05, G3-08, G3-10, G3-21, G3-26 | FR-05 | UC_Search (use-cases.puml); Search/filter catalog step (activity-order.puml); System/Catalog search results (sequence-order.puml) |  | Partial |
| I-2.1–I-2.3, Q-06, Q-19, G3-17, G3-21, G3-23, G3-24 | FR-06 | UC_Catalog (use-cases.puml); create/edit, take down/relist, permanent delete (sequence-catalog.puml); Merchant, Item (domain-class.puml) |  | Mapped |
| I-2.4, I-2.6, Q-03 (R-11) | FR-07 | Item.name, Item.basePrice (domain-class.puml); create/edit own item (sequence-catalog.puml) |  | Partial |
| I-2.5, Q-04 | FR-08 | Item.image (domain-class.puml); create/edit item (sequence-catalog.puml) |  | Partial |
| I-2.7, Q-05, G3-01 | FR-09 | Category; Merchant–Category and Category–Item associations (domain-class.puml); manage categories (sequence-catalog.puml) |  | Mapped |
| I-2.8, Q-03 (R-04), Q-07 | FR-10 | Item inventoryMode, stockQuantity, manuallySoldOut (domain-class.puml); Inventory check/deduct (sequence-order.puml); stock deduction (activity-order.puml) |  | Partial |
| I-3.3, I-4.3, Q-09, Q-15, G3-03, G3-17 | FR-11 | OptionGroup, CustomOption and associations (domain-class.puml); valid option selection (sequence-order.puml, activity-order.puml); UC_Cart (use-cases.puml) |  | Partial |
| I-1.3, I-3.1, I-3.2, Q-07, Q-08, Q-10, G3-03, G3-04 | FR-12 | UC_Cart (use-cases.puml); Visitor adds item (sequence-order.puml); select available items/add to cart (activity-order.puml); CartLine.quantity (domain-class.puml) |  | Partial |
| I-3.4, Q-11, Q-13, Q-24 | FR-13 | CartLine.note, OrderLine.note (domain-class.puml); Visitor adds item with note (sequence-order.puml) |  | Partial |
| I-1.3, Q-10, Q-11, Q-14, G3-03, G3-05, G3-20 | FR-14 | UC_Cart (use-cases.puml); edit quantities/options/notes (activity-order.puml); CartLine (domain-class.puml) |  | Partial |
| Q-14, G3-03 | FR-15 | Cart; StudentAccount–Cart association (domain-class.puml); UC_Cart (use-cases.puml) |  | Partial |
| I-1.4, Q-13 (R-03, R-12), Q-20 | FR-16 | UC_Submit (use-cases.puml); create parent order and merchant suborders (sequence-order.puml); Order–Suborder relationship (domain-class.puml) |  | Mapped |
| I-3.5, Q-12, Q-13 (R-12) | FR-17 | Set pickup time per merchant suborder (activity-order.puml); submit with pickup times (sequence-order.puml); Suborder.pickupTime (domain-class.puml) |  | Mapped |
| I-4.6, Q-15 | FR-18 | No UML element describes TWD/integer precision or rejection of decimals; only broad FR-16–FR-25 note (sequence-order.puml) |  | Gap |
| I-4.1–I-4.3, I-4.6, Q-13 (R-12), Q-16 | FR-19 | OrderLine/SelectedOption snapshots and Suborder totals (domain-class.puml); note only, no calculation formula (sequence-order.puml) |  | Partial |
| I-4.4, I-4.6, Q-13 (R-12), Q-17 (R-08), G3-02, G3-18 | FR-20 | Merchant.fixedDiscount, Suborder.discount (domain-class.puml); UC_Discount (use-cases.puml) |  | Partial |
| I-4.1–I-4.6, Q-13 (R-03, R-12), Q-16–Q-18, G3-12, G3-18 | FR-21 | Order.total, Suborder.discount/total (domain-class.puml); show amounts in order query (sequence-suborders.puml) |  | Partial |
| I-1.4, Q-08, Q-12, Q-19, G3-21, G3-24 | FR-22 | Revalidate merchants/items/options/stock/time (sequence-order.puml, activity-order.puml); broad validation-failure branch |  | Partial |
| I-4.6, Q-09, Q-19, G3-02 | FR-23 | Amount-change confirmation branch; sequence-order.puml and activity-order.puml explicitly name price/option surcharge/fixed discount changes |  | Mapped |
| I-1.4, Q-01, Q-08, Q-10, Q-11, Q-13, Q-14, Q-20, G3-03 | FR-24 | UC_Submit (use-cases.puml); create order/deduct stock (sequence-order.puml); main ordering activity (activity-order.puml) |  | Partial |
| I-1.4, I-1.5, Q-13, Q-21 | FR-25 | Order/orderId (domain-class.puml); no retry/idempotent submission interaction in sequence/activity diagrams |  | Gap |
| I-1.5, Q-13 (R-12), Q-22, G3-21 | FR-26 | UC_Suborders (use-cases.puml); update status (sequence-suborders.puml); Suborder.status (domain-class.puml) |  | Partial |
| Q-07, Q-08, Q-13 (R-12), Q-22, G3-19 | FR-27 | Optional rejection and inventory restoration (sequence-suborders.puml); Item stock fields (domain-class.puml) |  | Partial |
| Q-13 (R-03, R-12), Q-23, G3-02, G3-12 | FR-28 | OrderLine and SelectedOption snapshots (domain-class.puml); sequence-catalog note on preserving order contents |  | Partial |
| I-1.5, Q-13 (R-12), Q-24 | FR-29 | UC_ViewOrder/UC_Suborders (use-cases.puml); own suborders and own order details (sequence-suborders.puml) |  | Partial |
| I-1.5, Q-13 (R-12), Q-20, Q-23, Q-24, G3-13 | FR-30 | Order.orderId, Suborder.suborderId (domain-class.puml); IDs/details/amounts/statuses in sequence-suborders.puml |  | Mapped |
| I-5.1, Q-18 | FR-31 | No UML element describes payment exclusion; omitted from diagram notes |  | Gap |
| Q-01, G3-15, G3-16 | FR-32 | AdminUI and Merchant Back Office participants (sequence-admin.puml, sequence-catalog.puml); no explicit login-screen or separate student front-end model |  | Partial |
| I-1.5, Q-22, G3-14 | FR-33 | Order.aggregateStatus (domain-class.puml); status query sequence note references FR-33 but no aggregate derivation flow |  | Partial |
| I-5.2 | NFR-01 | No UML element describes web delivery platform |  | Gap |

## 需求未追溯到 UML

以下需求在圖中沒有對應元素，或只有圖面註記而沒有能表達其規範內容的行為或結構。它們需要在 UML 完成前補圖或由 Reviewer 明確接受為未建模範圍。

| Requirement ID | Gap |
|---|---|
| FR-01 | 學生註冊、學號與暱稱輸入、登入流程未建模。StudentAccount 只列出欄位。 |
| FR-18 | 幣別、整數精度及拒絕小數設定沒有模型或流程。 |
| FR-19 | 計價公式與逐項小計沒有模型或計算步驟。 |
| FR-25 | 送單重試只建立一次訂單的冪等流程未建模。 |
| FR-31 | 不進行線上付款的範圍限制未表達。 |
| NFR-01 | 網頁平台交付限制未表達。 |

以下需求在 UML 有概念或通用步驟，但重要規則只由需求 ID 註記涵蓋，尚未在圖中具體表達：

| Requirement ID | Partial coverage |
|---|---|
| FR-02 | 管理者建立商家及管理者帳號有序列步驟。僅登入的管理者可使用後台、角色權限等細節不完整。 |
| FR-03–FR-05 | 瀏覽、搜尋、排序與篩選有用例或通用步驟。G3-25 的兩種排序下商家分組、G3-26 的全站價格排序/篩選與具體搜尋結果行為未完整畫出。 |
| FR-07–FR-08 | 品項名稱、價格與圖片在 Item 或通用新增/編輯活動中涵蓋，欄位驗證及圖片失敗流程未建模。 |
| FR-10–FR-15 | 庫存模式、選項限制、售完不可加入、合併優先規則、購物車保存與工作階段邊界多數只由屬性、通用動作或註記涵蓋。 |
| FR-20–FR-24 | 金額計算、無效折扣、送單原子性、超賣防止及驗證失敗細節未完整表達。 |
| FR-26–FR-29 | 狀態轉移表、停用商家後處理既有子訂單、庫存返還適用條件、成交快照與讀取權限只部分表達。 |
| FR-32–FR-33 | 角色登入畫面分離與彙總狀態推導未建模；aggregateStatus 僅列為 Order 屬性且推導規則仍 Unconfirmed。 |

## UML 元素未對應需求

在七張圖的參與者、用例、活動、類別、屬性與關聯中，未發現完全沒有需求來源的元素。部分 UML 元素只由圖上的需求 ID 註記或資料結構概念支持，沒有表示其完整行為；相關不完整處已列於上方「Partial coverage」。
