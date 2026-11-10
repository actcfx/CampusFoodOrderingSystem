# AI Usage Log（第三組）

每次使用 agent 後加一列。報告中的一頁 AI Usage Log 從這裡整理。

| 日期 | Bolt / 步驟 | 工具與模型 | Agent | 要求內容（摘要） | 接受的內容 | 拒絕的內容與理由 | 時間（節省 + / 損失 −，分鐘） | 記錄人 |
|---|---|---|---|---|---|---|---|---|
| 2026-10-25 | Bolt 01 / S1 | Claude Opus 5.5 | （非 Codex agent） | 把 PO 的 4 項需求整理成 intent.md 並編號；起草 Bolt 01 計畫與 Bolt 切分建議 | intent.md 的格式與 24 個需求編號（I-1.1 至 I-4.6）；Bolt 01 計畫的任務表 | 「整理協助」那行的說明「只做格式整理與編號，沒有新增需求」，已檢查確認，故刪除；Bolt 切分建議（3 個 Bolt）：G1 改為 1 個 Bolt，見 `reviews/bolt-01-g1.md` R-01 |+20| actcfx |
| 2026-10-25 | Bolt 00 / 初始化 | Claude Opus 5.5 | （非 Codex agent） | 檢查 repo 有哪些檔案不該上 GitHub；對照作業說明確認 Git 規則 | 所有檔案可提交；建議新增 `.gitignore` | 無 |  +5 | actcfx |
| 2026-10-25 | Bolt 00 / 初始化 | Claude Opus 5.5 | （非 Codex agent） | 修改 METHOD.md 第 9 節與計畫範本的輸入來源 | 「訪談筆記」改為 `intent.md`／「PO 原始需求」 | 無 | 0 | actcfx |
| 2026-10-26 | Bolt 00 / 初始化 | Claude Opus 5.5 | （非 Codex agent） | 查 Spec Kit 新版初始化參數；更新 METHOD.md 第 10 節 | `--ai codex --ai-skills` 改為 `--integration codex`；先在暫存資料夾試跑確認不會改到既有檔案 | 無 | +10 | actcfx |
| 2026-10-26 | Bolt 00 / G0 | Codex（gpt-6.1-sol） | 主執行緒（`$speckit-constitution`） | 依 METHOD.md 第 2 節與 AGENTS.md 起草憲章 v0.1.0；依審查意見修訂為 v0.2.0 | 七條核心原則；v0.2.0 的修訂 | 起草任務描述段落（R-01，INVENTED）；只列 agent 的檔案負責表（R-02、R-03）；錯誤的範圍來源（R-04） | +60 | actcfx |
| 2026-10-27 | Bolt 00 / G0 | Claude Opus 5.5 | （非 Codex agent） | 審查憲章草稿；起草 G0 審查紀錄與 v1.0.0 核准版本 | R-01 至 R-05、R-07 至 R-09；審查紀錄格式 | R-06（加入 G0 關卡）：G0 只發生一次，由人類執行，維持與 AGENTS.md 一致。審查紀錄初稿把 AI 提出的意見來源寫成「人類」，已改為「AI（Claude）」 | +30 | actcfx |
| 2026-10-28 | CR-001 / 起草 | Claude Opus 5.5 | （非 Codex agent） | 依期中的要求起草 CR-001；建議技術棧；比較 custom agent 與 Spec Kit implement | CR-001 變更內容與完成條件；技術棧 React + Vite + TypeScript、NestJS、SQLite + Prisma；新增 custom agent `scaffolder`；架構雛形只建立一次 | 無 | +10| actcfx |
| 2026-10-28 | CR-001 / 修訂（方法文件） | Claude Opus 5.5 | （非 Codex agent） | 依 CR-001 修改 METHOD.md、AGENTS.md、`tracer.toml`、計畫範本、`ai/prompts.md`，新增 `scaffolder.toml` | 方法文件的全部修改（`d13ae5a`） |Claude 未經確認就直接修改已核准的憲章：還原，改由 Codex 起草 |+10| actcfx |
| 2026-10-28 | CR-001 / 修訂（憲章） | Codex（gpt-6.1-sol） | 主執行緒（`$speckit-constitution`） | 依 CR-001 修訂憲章為 1.1.0 | 範圍加入架構雛形；S7 流程規則（`087bd88`） | 保留了自稱 "remove before committing" 的 Sync Impact Report：刪除；Status 未更新：補上 CR-001；技術棧、agent、目錄與完成條件寫死在憲章：改為引用 METHOD.md §3.2、§5，避免重複（`da9892b`） | +15| actcfx |
| 2026-10-28 | CR-001 / 審查（憲章） | Claude Opus 5.5 | （非 Codex agent） | 審查 Codex 修訂的憲章 1.1.0 | 三項意見：刪除 Sync Impact Report、更新 Status、細節改為引用 METHOD.md | 無 | +10| actcfx |
| 2026-10-29 | Bolt 01 / G1 | Claude Opus 5.5 | （非 Codex agent） | 依 G1 決定（1 個 Bolt）起草 intent.md 的 I-5 編號、更新計畫範圍與 T13/T14、起草 G1 審查紀錄 | I-5.1、I-5.2 編號；計畫改為單一 Bolt 並新增 T13、T14；G1 審查紀錄 R-01 至 R-05 | R-03 原本建議「延後到 S2 由 elicitor 提問」：PO 已知道「先」的意思（暫定不做），直接說明，改為接受並在 intent.md 補上說明 | +10 | actcfx |
| 2026-11-07 | Bolt 01 / 流程改善 | Claude Opus 5.5 | （非 Codex agent） | 減少人工往返：`ai/prompts.md` S2 改為一張表列出所有問題、S3 的 T4 至 T7 一次執行只停在 G3；新增 `scripts/gate.sh`（填審查紀錄的 hash 與時間）、`scripts/timelog.sh`（工時）、`scripts/redact-transcript.sh`（去敏第一輪，只輸出行號）。PO 決定：除了 Git 寫入、關卡核准、簽名與去敏最後確認以外，這三支腳本由 Claude 執行，包含寫入 Reviewer 負責的 `reviews/` 與本檔。這偏離 METHOD.md §3.2 的檔案負責表 | 全部| 無| +10| actcfx |
| 2026-11-08 | Bolt 01 / S2、G2 | Claude Opus 5.5 | （非 Codex agent） | 把 elicitor 的 `questions.md` 帶回 bolt 分支；整理 24 題一覽表；檢查 PO 回答並提出 G2 findings；依 PO 在對話中的回答填入 `questions.md` 的「G2 補充」；執行 `gate.sh`、`timelog.sh`；起草 G2 審查紀錄；更新計畫 T2、T3 | R-01 至 R-12；`questions.md` 的 G2 補充；G2 審查紀錄草稿；計畫 T2、T3 done | 一開始判斷 S2 還沒開始、提議重跑 elicitor：elicitor 已完成，S2 是在等 PO 回答| ＋5| actcfx |
| 2026-11-09 | Bolt 01 / S3（作廢） | Claude Opus 5.5 | （非 Codex agent；以 Claude subagent 代替 spec_writer、critic） | PO 要求「繼續 S3」；Claude 自行擔任 Orchestrator，派 Claude subagent 起草 `spec.md`、critic 審查三輪、spec_writer 修訂兩輪，並更新計畫 T4–T7 | PO 在過程中的回答（整理為 G3-01 至 G3-14，之後記入 `reviews/bolt-01-g3.md`） | 全部 S3 產出：違反 METHOD.md §3.2，S3 應由 Codex 的 spec_writer、critic 執行；`spec.md` 未進入 repo，計畫 T4–T7 改回 todo（`1c76a51`），S3 由 Codex 重跑。見下方 AI 錯誤案例 | −20 | actcfx |
| 2026-11-09 | Bolt 01 / S3 | Claude Opus 5.5 | （非 Codex agent） | 確認 agent worktree 落後遠端、請人類更新；說明 Codex 需在 agent worktree 啟動（workspace-write 只能寫啟動目錄）；整理 PO 回答筆記；建議 commit 前先處理 `questions.md` 標頭 | 全部 | 無 | +5 | actcfx |
| 2026-11-09 至 2026-11-10 | Bolt 01 / S3 T4–T7 | Codex（gpt-6.1-sol） | 主執行緒、spec_writer、critic | 依 `ai/prompts.md` S3 起草並審查 `spec.md`（輸入 questions.md@db1a766）；依 G3 前 PO 決定修訂四次；critic 共五輪：F-01 至 F-08、F-07 至 F-09、F-10 至 F-13、F-14 至 F-15、F-16 | `spec.md`（blob `92a1b53`）；A 組 F-01 至 F-04、F-09、F-10、F-14 的修正；B 組依 G3-01 至 G3-24 修訂；F-08、F-15、F-16 及其他 4 項待確認事項列入 Unconfirmed | 無。第一次在主工作目錄啟動時，Codex 判斷無法寫入 agent worktree 而停止（正確行為，非錯誤） | ＋30 | actcfx |
| 2026-11-09 至 2026-11-10 | Bolt 01 / G3 | Claude Opus 5.5 | （非 Codex agent） | 整理 Codex 各輪摘要給 PO；對 B 組提出建議；依 PO 回答起草 `reviews/bolt-01-g3.md`（G3-01 至 G3-24、F-01 至 F-16 處置）；提供每輪給 Codex 的指令 | G3 審查紀錄草稿；F-07、F-11、F-12、F-13 的建議（G3-18、G3-20 至 G3-22）；用 G3-nn 作為需求來源的記錄方式 | 第一版 G3 表把 PO 原文的錯字照抄並將部分回答寫成轉述：PO 要求改正錯字並逐字引用；「不列出」解讀為隱藏無上架品項的商家：PO 改為列出並放最下面（G3-07）；「停用商家」的意思與 PO 的理解不一致，重新提問後 PO 確認保留並新增刪除品項（G3-23、G3-24） | +20 | actcfx |

## AI 錯誤案例

- 日期與步驟：2026-10-26，Bolt 00 / G0
- Agent 與模型：Codex 主執行緒（gpt-6.1-sol），`$speckit-constitution`
- AI 產出了什麼：憲章 v0.1.0 的「Scope and File Ownership」段落寫入 "This constitution draft is written only to … No Bolt plan or other artifact is created by this task"，並把範圍來源寫成 "user-specified scope"
- 為什麼是錯的：第一段是 agent 描述自己這次的任務，不是專案規則，核准後內容即失效；範圍其實定義在 METHOD.md 開頭，來源寫錯
- 誰發現、如何發現：Claude 審查草稿時提出（R-01、R-04），PO 確認
- 處置：接受意見，由 Codex 修訂為 v0.2.0 時刪除該段並改正來源

- 日期與步驟：2026-11-09，Bolt 01 / S3
- Agent 與模型：Claude Opus 5.5（Claude Code，非 Codex agent）
- AI 產出了什麼：PO 說「繼續 S3」，Claude 自行擔任 Orchestrator，派 Claude subagent 扮演 spec_writer 與 critic，產出 `spec.md`（FR-01 至 FR-57）與三輪審查
- 為什麼是錯的：METHOD.md §3.2 規定 Orchestrator 是 Codex 主執行緒，spec_writer、critic 是 `.codex/agents/` 定義的 Codex subagent。用 Claude 代跑會讓 S3 不是本組方法的產出，也讓三組比較的紀錄失真
- 誰發現、如何發現：PO 在 Claude 停在 G3 時指出「你直接開 subagent 那不是沒有 codex 什麼事了」
- 處置：產出作廢，`spec.md` 移出 repo；計畫 T4–T7 改回 todo（`1c76a51`）；S3 由人類在 agent worktree 啟動 Codex 重跑。PO 過程中的回答保留，於 G3 記為 G3-nn

## 工時

| Bolt | 步驟 | 人類撰寫 | 人類審查 | AI 執行 | 重做 |
|---|---|---|---|---|---|
| 00 | G0 憲章 | 15| 60（actcfx）＋ 48（BSugarSweet） | 2 | 5 |
| CR-001 | 範圍變更（方法文件與憲章 1.1.0） | 10 | 10（actcfx）＋ 15（BSugarSweet） | 1 | 1 |
| 01 | G1 範圍與輸入 | 10 | 10（actcfx）＋ 5 (BSugarSweet） | 2 | 0 |
| 01 | G2 澄清問題 | 10 | 21（actcfx）＋ 未記錄（BSugarSweet） | 1 | 0 |
