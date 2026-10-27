# AI Usage Log（第三組）

每次使用 agent 後加一列。報告中的一頁 AI Usage Log 從這裡整理。

| 日期 | Bolt / 步驟 | 工具與模型 | Agent | 要求內容（摘要） | 接受的內容 | 拒絕的內容與理由 | 時間（節省 + / 損失 −，分鐘） | 記錄人 |
|---|---|---|---|---|---|---|---|---|
| 2026-10-25 | Bolt 01 / S1 | Claude Opus 5.5 | （非 Codex agent） | 把 PO 的 4 項需求整理成 intent.md 並編號；起草 Bolt 01 計畫與 Bolt 切分建議 | intent.md 的格式與 24 個需求編號（I-1.1 至 I-4.6）；Bolt 01 計畫的任務表 | 「整理協助」那行的說明「只做格式整理與編號，沒有新增需求」，已檢查確認，故刪除；Bolt 切分建議 <待 G1 決定> |+20| actcfx |
| 2026-10-25 | Bolt 00 / 初始化 | Claude Opus 5.5 | （非 Codex agent） | 檢查 repo 有哪些檔案不該上 GitHub；對照作業說明確認 Git 規則 | 所有檔案可提交；建議新增 `.gitignore` | 無 |  +5 | actcfx |
| 2026-10-25 | Bolt 00 / 初始化 | Claude Opus 5.5 | （非 Codex agent） | 修改 METHOD.md 第 9 節與計畫範本的輸入來源 | 「訪談筆記」改為 `intent.md`／「PO 原始需求」 | 無 | 0 | actcfx |
| 2026-10-26 | Bolt 00 / 初始化 | Claude Opus 5.5 | （非 Codex agent） | 查 Spec Kit 新版初始化參數；更新 METHOD.md 第 10 節 | `--ai codex --ai-skills` 改為 `--integration codex`；先在暫存資料夾試跑確認不會改到既有檔案 | 無 | +10 | actcfx |
| 2026-10-26 | Bolt 00 / G0 | Codex（gpt-6.1-sol） | 主執行緒（`$speckit-constitution`） | 依 METHOD.md 第 2 節與 AGENTS.md 起草憲章 v0.1.0；依審查意見修訂為 v0.2.0 | 七條核心原則；v0.2.0 的修訂 | 起草任務描述段落（R-01，INVENTED）；只列 agent 的檔案負責表（R-02、R-03）；錯誤的範圍來源（R-04） | +60 | actcfx |
| 2026-10-27 | Bolt 00 / G0 | Claude Opus 5.5 | （非 Codex agent） | 審查憲章草稿；起草 G0 審查紀錄與 v1.0.0 核准版本 | R-01 至 R-05、R-07 至 R-09；審查紀錄格式 | R-06（加入 G0 關卡）：G0 只發生一次，由人類執行，維持與 AGENTS.md 一致。審查紀錄初稿把 AI 提出的意見來源寫成「人類」，已改為「AI（Claude）」 | +30 | actcfx |

## AI 錯誤案例

- 日期與步驟：2026-10-26，Bolt 00 / G0
- Agent 與模型：Codex 主執行緒（gpt-6.1-sol），`$speckit-constitution`
- AI 產出了什麼：憲章 v0.1.0 的「Scope and File Ownership」段落寫入 "This constitution draft is written only to … No Bolt plan or other artifact is created by this task"，並把範圍來源寫成 "user-specified scope"
- 為什麼是錯的：第一段是 agent 描述自己這次的任務，不是專案規則，核准後內容即失效；範圍其實定義在 METHOD.md 開頭，來源寫錯
- 誰發現、如何發現：Claude 審查草稿時提出（R-01、R-04），PO 確認
- 處置：接受意見，由 Codex 修訂為 v0.2.0 時刪除該段並改正來源

## 工時

| Bolt | 步驟 | 人類撰寫 | 人類審查 | AI 執行 | 重做 |
|---|---|---|---|---|---|
| 00 | G0 憲章 | 15| 60（actcfx）＋ 48（BSugarSweet） | 2 | 5 |