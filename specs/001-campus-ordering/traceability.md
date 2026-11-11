# Bolt 01 需求追溯表

- **模式** CODE
- **規格基準** `specs/001-campus-ordering/spec.md` @ `35101cc3eb3e5a47f20310dabf37feb5937ea5e8`
- **UML 基準** `specs/001-campus-ordering/uml/` round 2, revised from round 1 `12a2a063d234937788c4f940c183c68cd0aba7e7`
- **狀態說明** Mapped 表示有對應且圖中至少描述主要結構或流程。Partial 表示圖中只有廣義步驟、屬性或需求 ID 註記，未表達全部規則。Gap 表示找不到能表達該需求的 UML 元素。
- **程式雛形基準** Bolt 01 T13 worktree output after approved UML `dee9ffa9afed681cf0d4eec9da627e7b0dcc49fb`; code module entries are mapped from source requirement ID comments and checked against UML elements.

| Source | Requirement ID | UML element | Code module | Status |
|---|---|---|---|---|
| Q-01, Q-20, Q-24, G3-06, G3-15, CR-002 | FR-01 | UC_Register、UC_Login（use-cases.puml）；學生註冊與登入序列（sequence-order.puml）；StudentAccount（domain-class.puml） | `backend/src/accounts.ts` (StudentAccount, UC_Register, UC_Login); `backend/prisma/schema.prisma` (StudentAccount); `frontend/src/app.tsx` (registration/sign-in screens) | Mapped |
| Q-01 (R-05, R-09, R-10), Q-03 (R-07), G3-06 | FR-02 | UC_Merchants, UC_Admins (use-cases.puml); Administrator and Merchant actors; Administration System, Merchant Account Store, Administrator Account Store; Administrator hands credentials to Merchant (sequence-admin.puml); AdministratorAccount, MerchantAccount, Merchant (domain-class.puml) | `backend/src/accounts.ts` (account management/sign-in contracts); `backend/prisma/schema.prisma` (account and merchant models); `frontend/src/app.tsx` (role sign-in screens) | Partial |
| I-1.1, Q-01, Q-02 (R-09), G3-07, G3-09, G3-21, G3-25 | FR-03 | UC_Browse (use-cases.puml); Visitor/System/Catalog browse active merchants (sequence-order.puml); Browse active merchants step (activity-order.puml); Merchant (domain-class.puml) | `backend/src/catalog.ts` (merchant listing); `backend/prisma/schema.prisma` (Merchant); `frontend/src/app.tsx` (browse screen); `backend/src/app.module.ts`, `backend/src/main.ts` (system bootstrap) | Partial |
| I-1.2, Q-01, Q-02 (R-06), Q-04, G3-09, G3-11, G3-21 | FR-04 | UC_Browse (use-cases.puml); Visitor/System/Catalog browse menu (sequence-order.puml); Merchant, Item (domain-class.puml) | `backend/src/catalog.ts` (menu query); `backend/prisma/schema.prisma` (Merchant, Item) | Partial |
| Q-02 (R-06), Q-05, G3-08, G3-10, G3-21, G3-26 | FR-05 | UC_Search (use-cases.puml); Search/filter catalog step (activity-order.puml); System/Catalog search results (sequence-order.puml) | `backend/src/catalog.ts` (search/filter query) | Partial |
| I-2.1–I-2.3, Q-06, Q-19, G3-17, G3-21, G3-23, G3-24 | FR-06 | UC_Catalog (use-cases.puml); create/edit, take down/relist, permanent delete (sequence-catalog.puml); Merchant, Item (domain-class.puml) | `backend/src/catalog.ts` (catalog management); `backend/prisma/schema.prisma` (Merchant, Item) | Mapped |
| I-2.4, I-2.6, Q-03 (R-11) | FR-07 | Item.name, Item.basePrice (domain-class.puml); create/edit own item (sequence-catalog.puml) | `backend/src/catalog.ts` (ItemDetails); `backend/prisma/schema.prisma` (Item) | Partial |
| I-2.5, Q-04 | FR-08 | Item.image (domain-class.puml); create/edit item (sequence-catalog.puml) | `backend/src/catalog.ts` (ItemImageUpload, ItemDetails); `backend/prisma/schema.prisma` (Item.image) | Partial |
| I-2.7, Q-05, G3-01 | FR-09 | Category; Merchant–Category and Category–Item associations (domain-class.puml); manage categories (sequence-catalog.puml) | `backend/src/catalog.ts` (category management); `backend/prisma/schema.prisma` (Category, Merchant, Item) | Mapped |
| I-2.8, Q-03 (R-04), Q-07 | FR-10 | Item inventoryMode, stockQuantity, manuallySoldOut (domain-class.puml); Inventory check/deduct (sequence-order.puml); stock deduction (activity-order.puml) | `backend/src/catalog.ts` (InventorySettings); `backend/src/checkout.ts` (Inventory contract); `backend/prisma/schema.prisma` (Item inventory fields) | Partial |
| I-3.3, I-4.3, Q-09, Q-15, G3-03, G3-17 | FR-11 | OptionGroup, CustomOption and associations (domain-class.puml); valid option selection (sequence-order.puml, activity-order.puml); UC_Cart (use-cases.puml) | `backend/src/catalog.ts` (option group/item contracts); `backend/src/checkout.ts` (CartLine selection); `backend/prisma/schema.prisma` (OptionGroup, CustomOption) | Partial |
| I-1.3, I-3.1, I-3.2, Q-07, Q-08, Q-10, G3-03, G3-04 | FR-12 | UC_Cart (use-cases.puml); Visitor adds item (sequence-order.puml); select available items/add to cart (activity-order.puml); CartLine.quantity (domain-class.puml) | `backend/src/checkout.ts` (Cart, CartLine); `frontend/src/app.tsx` (cart screen) | Partial |
| I-3.4, Q-11, Q-13, Q-24 | FR-13 | CartLine.note, OrderLine.note (domain-class.puml); Visitor adds item with note (sequence-order.puml) | `backend/src/checkout.ts` (CartLine note); `backend/src/suborders.ts` (OrderLine note view); `backend/prisma/schema.prisma` (OrderLine.note) | Partial |
| I-1.3, Q-10, Q-11, Q-14, G3-03, G3-05, G3-20 | FR-14 | UC_Cart (use-cases.puml); edit quantities/options/notes (activity-order.puml); CartLine (domain-class.puml) | `backend/src/checkout.ts` (cart edit contract) | Partial |
| Q-14, G3-03 | FR-15 | Cart; StudentAccount–Cart association (domain-class.puml); UC_Cart (use-cases.puml) | `backend/src/checkout.ts` (Cart contract; persistence/sign-in handoff left open); no code module represents the StudentAccount–Cart association | Partial |
| I-1.4, Q-13 (R-03, R-12), Q-20 | FR-16 | UC_Submit (use-cases.puml); create parent order and merchant suborders (sequence-order.puml); Order–Suborder relationship (domain-class.puml) | `backend/src/checkout.ts` (order submission); `backend/prisma/schema.prisma` (Order, Suborder) | Mapped |
| I-3.5, Q-12, Q-13 (R-12) | FR-17 | Set pickup time per merchant suborder (activity-order.puml); sequence-order.puml explicitly validates each pickup time as same-day and future in Asia/Taipei; Suborder.pickupTime (domain-class.puml) | `backend/src/checkout.ts` (pickup time submission contract); `backend/src/suborders.ts` (pickup time query); `backend/prisma/schema.prisma` (Suborder.pickupTime) | Mapped |
| I-4.6, Q-15 | FR-18 | System boundary note states integer New Taiwan dollar amounts (use-cases.puml) | `backend/src/catalog.ts` (integer price contracts); `backend/src/checkout.ts` (amount breakdown); `backend/src/suborders.ts` (amount views); `backend/prisma/schema.prisma` (integer price/amount fields); `frontend/src/app.tsx` (amount display) | Partial |
| I-4.1–I-4.3, I-4.6, Q-13 (R-12), Q-16 | FR-19 | OrderLine/SelectedOption snapshots and Suborder totals (domain-class.puml); UC_Discount references FR-19–FR-21 formulas (use-cases.puml); no explicit calculation steps | `backend/src/checkout.ts` (amount breakdown); `backend/src/suborders.ts` (amount and snapshot views); `backend/prisma/schema.prisma` (order line and total models) | Partial |
| I-4.4, I-4.6, Q-13 (R-12), Q-17 (R-08), G3-02, G3-18 | FR-20 | Merchant.fixedDiscount, Suborder.discount (domain-class.puml); UC_Discount and fixed-discount setting/editing flow, including discount bounds and preservation of existing totals (use-cases.puml, sequence-catalog.puml) | `backend/src/catalog.ts` (fixed discount contract); `backend/src/checkout.ts` (effective discount amount contract); `backend/src/suborders.ts` (stored discount view); `backend/prisma/schema.prisma` (fixedDiscount, discount) | Partial |
| I-4.1–I-4.6, Q-13 (R-03, R-12), Q-16–Q-18, G3-12, G3-18 | FR-21 | Order.total, Suborder.discount/total (domain-class.puml); UC_Discount references formulas in FR-19–FR-21; fixed discount behavior and stored totals (use-cases.puml, sequence-catalog.puml); display amounts in order query (sequence-suborders.puml) | `backend/src/checkout.ts` (amount breakdown); `backend/src/suborders.ts` (order amount view); `backend/prisma/schema.prisma` (Order, Suborder totals); `frontend/src/app.tsx` (total display) | Partial |
| I-1.4, Q-08, Q-12, Q-19, G3-21, G3-24 | FR-22 | Revalidate merchants/items/options/stock/time (sequence-order.puml, activity-order.puml); broad validation-failure branch | `backend/src/checkout.ts` (revalidation and Inventory contracts); `backend/src/catalog.ts` (catalog query contracts); `backend/prisma/schema.prisma` (catalog/stock models) | Partial |
| I-4.6, Q-09, Q-19, G3-02 | FR-23 | sequence-order.puml guard names base price, selected option surcharge, and fixed discount changes; activity-order.puml shows reconfirmation decision | `backend/src/checkout.ts` (amount-change/reconfirmation contract) | Mapped |
| I-1.4, Q-01, Q-08, Q-10, Q-11, Q-13, Q-14, Q-20, G3-03 | FR-24 | UC_Submit (use-cases.puml); create order/deduct stock (sequence-order.puml); main ordering activity (activity-order.puml) | `backend/src/checkout.ts` (atomic order/stock operation contract); `backend/prisma/schema.prisma` (Order/Suborder models); `backend/src/app.module.ts`, `backend/src/main.ts` (API bootstrap) | Partial |
| I-1.4, I-1.5, Q-13, Q-21 | FR-25 | sequence-order.puml returns the first attempt result on retry, branches for first-attempt success or failure, returns parent ID only on success, and prevents another deduction; activity-order.puml shows retry only after atomic-operation outcomes, not after the earlier validation-failure branch | `backend/src/checkout.ts` (confirmation ID and retry result contracts) | Partial |
| I-1.5, Q-13 (R-12), Q-22, G3-21 | FR-26 | UC_Suborders (use-cases.puml); sequence-suborders.puml gives initial 待接單, valid transitions, terminal states, and permits inactive merchants to complete existing nonterminal suborders; Suborder.status (domain-class.puml) | `backend/src/suborders.ts` (status update and merchant query); `backend/prisma/schema.prisma` (SuborderStatus, Suborder) | Mapped |
| Q-07, Q-08, Q-13 (R-12), Q-22, G3-19 | FR-27 | Optional rejection and inventory restoration (sequence-suborders.puml); Item stock fields (domain-class.puml) | `backend/src/checkout.ts` (Inventory restoration contract); `backend/src/suborders.ts` (rejection/status contract); `backend/prisma/schema.prisma` (stock and Suborder models) | Partial |
| Q-13 (R-03, R-12), Q-23, G3-02, G3-12 | FR-28 | OrderLine and SelectedOption snapshots (domain-class.puml); sequence-catalog note on preserving order contents | `backend/src/catalog.ts` (catalog changes); `backend/src/checkout.ts` (order snapshot/amount contracts); `backend/src/suborders.ts` (snapshot read model); `backend/prisma/schema.prisma` (snapshot fields) | Partial |
| I-1.5, Q-13 (R-12), Q-24 | FR-29 | UC_ViewOrder/UC_Suborders (use-cases.puml); own suborders and own order details (sequence-suborders.puml) | `backend/src/suborders.ts` (student and merchant query endpoints); `backend/prisma/schema.prisma` (order relations); `backend/src/app.module.ts` (controller registration) | Partial |
| I-1.5, Q-13 (R-12), Q-20, Q-23, Q-24, G3-13, CR-002 | FR-30 | Order.orderId, Suborder.suborderId (domain-class.puml); sequence-suborders.puml shows parent ID and visible details, groups visible suborder IDs by status including rejected; merchant sees only own suborders, student alone sees aggregate status | `backend/src/suborders.ts` (student/merchant order view contracts); `backend/prisma/schema.prisma` (Order, Suborder identifiers) | Mapped |
| I-5.1, Q-18 | FR-31 | System boundary note states payment scope is limited to amount display and excludes online payment/status flows (use-cases.puml) | `frontend/src/app.tsx` (amount display); `backend/src/checkout.ts` (amount contracts); `backend/src/suborders.ts` (amount views) | Mapped |
| Q-01, G3-15, G3-16, CR-002 | FR-32 | UC_Login explicitly notes separate role sign-in screens; student sign-in appears in sequence-order, administrator sign-in in sequence-admin, and merchant login has no dedicated interaction sequence. Student ordering system and Merchant Back Office have separate lifelines (sequence-order.puml, sequence-catalog.puml) | `backend/src/accounts.ts` (role sign-in contracts); `frontend/src/app.tsx` (student, merchant, administrator screens) | Partial |
| I-1.5, Q-22, G3-14, CR-002 | FR-33 | Order.aggregateStatus derivation rule and student-only query aggregation (domain-class.puml, sequence-suborders.puml); groups visible suborder IDs by state (use-cases.puml, sequence-suborders.puml) | `backend/src/suborders.ts` (AggregateOrderStatus contract and query); `backend/prisma/schema.prisma` (derived-status note) | Mapped |
| I-5.2 | NFR-01 | System boundary note states this version is a web application (use-cases.puml) | `frontend/src/app.tsx`, `frontend/src/main.tsx`, `frontend/index.html` (web application); `backend/src/main.ts`, `backend/src/app.module.ts` (web API) | Mapped |

## 需求未追溯到 UML

依核准的映射定義，沒有需求完全缺少 UML 對應。以下 Partial 項目有相應用例、屬性、通用流程或圖面註記，但尚未具體呈現全部規範內容。U-F12、U-F13 依 G4 決議保留為 Partial。

| Requirement ID | Partial coverage |
|---|---|
| FR-02 | 商家與管理者帳號建立及交付憑證有流程。商家資料欄位及停用商家後台權限仍屬 Unconfirmed。 |
| FR-03–FR-05 | 瀏覽、搜尋、排序與篩選有用例、流程及需求註記。G3-25 商家分組排序、G3-26 全站價格排序/篩選等細節依 G4 決議維持 Partial。 |
| FR-07–FR-08 | 名稱、價格、圖片欄位及新增/編輯流程有表示，欄位驗證與圖片失敗流程未建模。 |
| FR-10–FR-15 | 庫存模式、選項限制、購物車合併、工作階段保存及登入後是否銜接訪客購物車等規則只由屬性、通用步驟或 Unconfirmed 註記涵蓋。 |
| FR-18 | 用例圖系統邊界註明整數新台幣金額，未表達拒絕小數等完整規則。 |
| FR-19–FR-22 | FR-19–FR-21 公式由用例圖註記引用，折扣管理與部分規則有序列及資料欄位表示，未畫出完整計算步驟；FR-22 各項送單驗證細節未逐項展開。 |
| FR-24 | 原子建立與扣庫存、失敗不建單及保留購物車已表示。完整檢查與並行送單實作細節未逐項展開。 |
| FR-25 | 循序圖表示成功與失敗結果的重試回傳。活動圖的重試只接在原子操作結果後，未覆蓋前段檢查失敗。 |
| FR-32 | 用例圖註明各角色使用分開的登入畫面，學生與管理者登入流程有序列表示。商家登入沒有專屬互動序列。 |
| FR-27–FR-29 | 拒單返還庫存、成交內容保存及查詢權限/更新有相應序列或資料結構；庫存模式切換後返還及永久刪除後拒單等情境仍依 Unconfirmed 處理。 |


## UML 元素未對應需求

在七張圖的參與者、用例、活動、類別、屬性及關聯中，未發現完全沒有需求來源的元素。部分元素由需求 ID 註記支持，但不足以表達完整需求，其 Partial 狀態已列於上表。

## UML 元素未對應程式模組

| UML element | Finding |
|---|---|
| StudentAccount — Cart: uses (`domain-class.puml`) | The `Cart` TypeScript contract exists in `backend/src/checkout.ts`, but neither it nor `backend/prisma/schema.prisma` links a cart to a student account. |
| Administrator → Merchant: hand over account credentials (`sequence-admin.puml`) | This is a human-to-human credential handoff. The scaffold models merchant creation and returns an account credential contract in `backend/src/accounts.ts`, but has no application module for delivering credentials from the administrator to the merchant. |

The 14 domain classes in `domain-class.puml` have matching Prisma models or TypeScript contracts: StudentAccount, MerchantAccount, AdministratorAccount, Merchant, Category, Item, OptionGroup, CustomOption, Cart, CartLine, Order, Suborder, OrderLine and SelectedOption. The StudentAccount–Cart association is a separate unmapped element. Sequence participants that represent backend application services have interface or schema mappings above. Actors and explanatory UML notes are people or documentation elements and do not require code modules.

## UML UI steps without a matching UI component

The following UML messages have backend interface contracts, so their code module mapping is interface-level. The UI elements and responses described below have no matching implemented component in `frontend/src/app.tsx`:

| Diagram | Missing UI elements |
|---|---|
| `sequence-admin.puml` | AdminUI display of merchant credentials returned by the API; merchant edit/deactivation screens; administrator account creation screen. The current administrator route renders only a title. |
| `sequence-catalog.puml` | Merchant Back Office item/options create/edit, listing changes, category management, fixed-discount management, and item deletion screens, including their result displays. The current frontend has a merchant sign-in screen only. |
| `sequence-order.puml` | Menu results, add/edit cart controls and cart contents, pickup-time selection, order submission, amount-change confirmation, and submission result/error screens. The current ordering page shows an empty merchant area and a static cart total. |
| `sequence-suborders.puml` | Merchant suborder list/details and status controls, plus student order list/details and aggregate-status display. No order or suborder screens are present. |

Student registration and role sign-in forms are present, but their buttons are disabled, so those UI flows remain placeholders despite the backend contracts.

## 程式模組未對應需求 ID

No executable TypeScript, React, or Prisma source module was found without requirement ID comments. The `frontend/.gitignore` and `backend/.gitignore` files are repository configuration, not code modules.

The code modules are architecture contracts and placeholders. Most backend service methods throw `NotImplementedException`; catalog browsing and search return empty mock data. Their entries establish requirement-to-module coverage for the scaffold and do not claim implemented business behavior. The administrator sign-in screen is a placeholder title, and the frontend does not yet implement account-management interactions.
