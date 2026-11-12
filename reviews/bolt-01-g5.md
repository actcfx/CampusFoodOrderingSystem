# Bolt 01 — Gate G5 審查紀錄

- 關卡：G5（人類檢查 diff、提交、結案）
- 審查對象與版本（commit hash）：`specs/001-campus-ordering/traceability.md`、`frontend/`、`backend/`（`a314d57014545d958db08d4a9834aedc9c53a1f2`；關閉時為 `df8b224`，之後依 G5-08 更正 traceability.md 說明文字）
- 審查人：actcfx
- 核准人：BSugarSweet
- 開始時間：2026/11/11 14:43
- 結束時間：2026/11/11 15:30

> 草稿：AI（Claude）依 METHOD.md §5 完成條件檢查架構雛形後起草，處置欄由 PO 於 2026-11-11 決定。G5 另含 S6 結案（T12、transcript、usage log），完成後補記於本檔。

## S7 完成條件檢查（METHOD.md §5）

| 條件 | 結果 |
|---|---|
| 類別圖每個類別都有對應的程式類別或模組 | 符合。12 個領域類別對應 Prisma model；Cart、CartLine 為 TypeScript 介面，未建資料表（FR-15 保存方式仍為 Unconfirmed） |
| 方法只有簽章 | 符合。Service 只回傳固定假資料，無內部邏輯；`clearAfterSubmission()` 為無路由的內部方法，仍為 stub |
| 主要循序圖有對應的 API 端點，可以回傳假資料 | 符合（第 2 次）。第 1 次 29 個端點中 27 個回應 501，見 G5-01；補假資料後 29 個端點均回傳 200 或 201 |
| 每個程式檔案標註需求 ID | 符合 |
| 不加入沒有需求 ID 的類別或功能 | 符合。tracer CODE 回報沒有無需求 ID 的模組，34 條需求都有程式對應 |

假資料抽查：金額與 SC-01、SC-06 一致；學生查詢的彙總狀態為「製作中」（一張已接單、一張已拒單），符合 FR-33；彙總狀態只在學生回應，商家回應只含自家子訂單（FR-30）；資料皆為虛構，無個人資料。

## 審查結果

| Finding / 項目 | 來源（critic / 人類） | 類型 | 處置（接受 / 拒絕 / 延後） | 理由 |
|---|---|---|---|---|
| G5-01 第 1 次 S7 的端點大多回應 501，不能回傳假資料（`66be61d`） | AI（Claude） | MISSING | 接受 | PO 選擇補假資料；scaffolder 重做（`1d3afee`），29 個端點均回傳假資料。`scaffolder.toml` 寫「may return mock data」，與 METHOD.md §5 的要求不一致 |
| G5-02 沒有 `package-lock.json`，clone 後安裝的套件版本可能不同 | AI（Claude） | 其他 | 已解決 | Codex sandbox 無網路，lock 檔應由人類在本機執行 `npm install` 產生並 commit |
| G5-03 管理者登入頁只有標題，沒有表單；學生與商家登入頁有表單 | AI（Claude） | MISSING | 延至期末 | 頁面存在，FR-32「各有自己的登入畫面」已滿足；表單欄位屬內部功能 |
| G5-04 學生前台與商家後台在同一個前端 app，以不同路由分開 | AI（Claude） | 其他 | 接受| FR-32 要求分開的介面，未要求分開部署（G3-16 解讀） |
| G5-05 tracer CODE：StudentAccount–Cart 關聯、管理者直接交付帳密給商家沒有程式對應 | tracer | MISSING | 接受 | 前者因 FR-15 保存方式為 Unconfirmed；後者是人與人之間的動作，不需要程式 |
| G5-06 `npm audit`：backend 有 3 個 high，都來自 Prisma CLI（devDependency）依賴的 `deepmerge-ts` <8.0.0；`npm audit fix --force` 會把 prisma 降到 6.12.0，屬破壞性變更 | 人類（actcfx 產生 lock 檔時發現） | 其他 | 延至期末 | 只影響開發工具，不在執行時的相依套件中；降版會改動已驗證的 Prisma 版本 |
| G5-07 本機 Node 為 v18.19.1，低於 `package.json` 的 `engines`（^20.19.0 或 >=22.12.0）；Vite 7、NestJS 11 都需要 Node 20 以上 | 人類（actcfx 產生 lock 檔時發現） | 其他 | 已解決 | lock 檔可在 Node 18 產生，但前後端的建置與執行需要 Node 20.19 以上 |
| G5-08 `traceability.md` 第 94 行仍描述補假資料前的後端（多數方法丟出 `NotImplementedException`），第 7 行的程式雛形基準沒有 commit hash | Codex Orchestrator（T12 摘要） | 其他 | 接受 | PO 同意由 Claude 直接更正這兩處說明文字，未重跑 tracer：補假資料只改回傳值，Code module 欄的對應不變 |

## AI 產出的處置

| AI 產出 | 接受或拒絕 | 理由 |
|---|---|---|
| scaffolder 架構雛形（`66be61d`） | 接受，需補修 | 結構、需求 ID 與無多餘功能符合；端點未回傳假資料（G5-01） |
| scaffolder 補假資料（`1d3afee`） | 接受 | 只改 `backend/src/` 回傳值；金額、狀態與可見範圍符合 spec |
| tracer CODE 程式模組欄 | 接受 | 34 條需求都有程式對應；2 個 UML 元素無程式對應（G5-05） |

## 決定

- [x] 核准，可以進入下一步
- [ ] 退回，需要修訂（寫明要修訂的項目）

核准人簽名與日期：BSugarSweet 2026/11/12
