# SDME：Spec-Driven Mob Elaboration

本文件定義第三組（AI-agent 方法）的開發方法。範圍與 Waterfall + AI、Agile + AI 兩組相同：從需求取得到 Requirement Analysis，並產出 UML。

## 1. 方法來源與自行調整的部分

| 來源 | 採用的部分 | 本組自行調整的部分 |
|---|---|---|
| GitHub Spec Kit | constitution、spec 範本、clarify、checklist | 不使用 plan、tasks、implement，因為超出作業範圍 |
| AWS AI-DLC | Inception 階段的 Mob Elaboration、以 Bolt 為週期單位 | Bolt 長度不固定；以「一組可以審查完的需求」為一個 Bolt |
| OpenAI Codex subagent | 主執行緒協調、subagent 分工、custom agent 設定 | 加入人工關卡、依賴順序、工作計畫檔與變更管理 |

Spec Kit 只提供工具與範本。角色、決策點與執行順序由本文件定義。

## 2. 原則

1. agent 起草，人類決定。每個關卡都需要人類核准，agent 才可以繼續。
2. 先核准需求，再建立 UML。
3. 只有沒有資料依賴的工作才平行執行。
4. 每個 agent 只寫自己負責的檔案。
5. 人類執行所有 Git 寫入動作（commit、push、merge）。
6. 每條需求都必須有來源。沒有來源的需求放在 Unconfirmed 區段。
7. prompt 與檔案中不可以有個人資料、密碼、金鑰或機密資料。

## 3. 角色

### 3.1 人類

| 角色 | 責任 |
|---|---|
| Product Owner（PO） | 撰寫 intent、回答澄清問題、處理假設、核准需求與 UML、決定變更申請 |
| Reviewer / Recorder | 審查 agent 產出與 diff、產生 checklist、記錄工時與 AI Usage Log、檢查機密資料 |

兩位人類互相審查。每個 PR 由提出者以外的另一人核准。

### 3.2 Agent

| Agent | 類型 | 輸入 | 唯一可寫入的位置 |
|---|---|---|---|
| Orchestrator | Codex 主執行緒 | 本文件、AGENTS.md、工作計畫 | `ai/plans/bolt-NN-plan.md` |
| `elicitor` | subagent | `intent.md` | `questions.md` |
| `spec_writer` | subagent | `intent.md`、已回答的 `questions.md` | `spec.md` |
| `critic` | subagent | spec 或 UML 及其來源 | 不寫檔，只回報 |
| `uml_drafter` | subagent | 已核准版本的 `spec.md` | `uml/` |
| `tracer` | subagent | intent、questions、已核准 spec、完成的 UML | `traceability.md` |

`checklist.md` 由 Reviewer 執行 `$speckit-checklist` 產生，責任屬於人類。

## 4. 產出物

| 產出物 | 位置 | 負責者 |
|---|---|---|
| 專案憲章 | `.specify/memory/constitution.md` | 兩位人類（agent 可起草） |
| 工作計畫 | `ai/plans/bolt-NN-plan.md` | Orchestrator 起草，Reviewer 確認 |
| 原始需求 | `specs/NNN-<feature>/intent.md` | PO |
| 澄清問題與回答 | `specs/NNN-<feature>/questions.md` | `elicitor` 起草，PO 回答 |
| 需求規格 | `specs/NNN-<feature>/spec.md` | `spec_writer` 起草，PO 核准 |
| 規格品質檢查 | `specs/NNN-<feature>/checklist.md` | Reviewer |
| UML | `specs/NNN-<feature>/uml/*.puml` | `uml_drafter` 起草，PO 核准 |
| 追溯表 | `specs/NNN-<feature>/traceability.md` | `tracer` 起草，Reviewer 審查 |
| 關卡審查紀錄 | `reviews/bolt-NN-gN.md` | Reviewer |
| 變更申請 | `changes/CR-NNN.md` | 提出者，PO 決定 |
| 對話紀錄 | `ai/transcripts/bolt-NN/` | Reviewer 去敏後提交 |
| AI 使用紀錄 | `ai/usage-log.md` | Reviewer |

## 5. Bolt 流程

一個 Bolt 處理一組可以在一次審查中完成的需求。Bolt 長度不固定。

| 步驟 | 工作 | 執行者 | 依賴 | 關卡 |
|---|---|---|---|---|
| S1 | PO 寫 `intent.md`；Orchestrator 寫工作計畫 | PO、Orchestrator | 無 | **G1** 核准範圍與輸入資料 |
| S2 | `elicitor` 產生問題與假設；PO 逐題回答，接受或拒絕每個假設 | `elicitor`、PO | G1 | **G2** 核准澄清結果 |
| S3 | `spec_writer` 起草 → `critic` 審查 → `spec_writer` 修訂 → `critic` 再審查；Reviewer 產生 checklist | `spec_writer`、`critic`、Reviewer | G2 | **G3** 核准指定版本的需求（記錄 commit hash） |
| S4 | `uml_drafter` 依已核准需求建模，所有圖標示 DRAFT | `uml_drafter` | G3 | 無 |
| S5 | UML 完成後：`tracer` 建立追溯表，`critic` 平行檢查 UML | `tracer`、`critic` | S4 完成 | **G4** 核准 UML、追溯表與問題處置 |
| S6 | Orchestrator 整理接受與拒絕項目；Reviewer 整理工時、usage log、去敏 transcript | Orchestrator、Reviewer | G4 | **G5** 人類檢查 diff、提交、結案 |

### 5.1 平行與循序

- S3 的起草與審查是循序。critic 必須讀到完整的草稿。
- S4 必須在 G3 之後開始。
- S5 的 `tracer` 與 `critic` 可以平行，因為兩者都只讀已完成的 UML，而且寫入不同位置（`critic` 不寫檔）。
- 如果要提早建立追溯表，S3 之後只能建立「來源 → 需求」欄位。「需求 → UML」欄位在 S5 補上。

### 5.2 關卡與 PR

關卡是決策點，PR 是版本審查機制，兩者不必一對一。一個 PR 可以包含多個關卡的決議，但每個關卡都要有自己的審查紀錄檔（`reviews/bolt-NN-gN.md`）。

建議做法：

- PR 1：G1 + G2（intent、questions、工作計畫）
- PR 2：G3（spec、checklist）
- PR 3：G4 + G5（UML、追溯表、紀錄）

## 6. 變更管理

需求在 G3 核准後，任何修改都要走以下流程：

1. 提出者建立 `changes/CR-NNN.md`，寫明變更內容與理由。
2. Orchestrator 派 `tracer` 做影響分析：列出受影響的需求、UML 元素與追溯列。
3. PO 決定：接受、拒絕或延後，並寫理由。
4. 如果接受：受影響的 agent 修訂各自的檔案。
5. `critic` 重新檢查受影響的部分。
6. PO 重新核准，並記錄新的核准 commit hash。

AI 提出的變更也必須走這個流程。agent 不可以直接修改已核准的檔案。

## 7. Git 規則

1. 每個 Bolt 使用一個分支：`bolt/NN-<feature>`。
2. agent 在獨立的 worktree 中工作。這個 worktree 的 push URL 設為無效值，只對這個 worktree 生效（見 `scripts/setup-agent-worktree.sh`）。在 agent worktree 中啟動 Codex。
3. 人類在 agent worktree 中檢查 diff 並 commit。兩個 worktree 共用同一個分支，所以人類回到主工作目錄執行 push。
4. `main` 設定 branch protection：需要 1 個 approval，不可以直接 push。
5. 每個 PR 填寫 `.github/pull_request_template.md` 的所有欄位。

### 7.1 這些控制的限制

以下控制可以降低風險，但不是絕對保證。報告中要寫明：

- Codex 的 sandbox 限制存取範圍，approval 政策決定何時需要核准。兩者都不是專門禁止 `git push` 的規則。實際行為受網路設定、先前授權與執行環境影響。
- subagent 繼承父 session 的 sandbox 與 approval 設定。custom agent 檔案不能設定各自的 sandbox。所以「只寫自己的檔案」靠指令與人類審查 diff 執行。
- 把 `features.shell_tool` 設為 `false` 只關閉 shell。agent 仍可能用其他工具改檔。
- branch protection 只保護遠端的指定分支。它不能阻止本機 commit，也不能阻止 push 到其他分支。
- 無效的 push URL 可以被改回。它防止意外，不防止刻意的操作。

## 8. 紀錄

| 紀錄 | 何時寫 | 內容 |
|---|---|---|
| 工作計畫 | 每個 Bolt 開始時，狀態改變時更新 | 任務編號、agent、輸入版本、交付物、依賴、完成條件、狀態、人工停止點 |
| 關卡審查 | 每個關卡 | 審查對象與版本、發現的問題、處置、核准人、時間 |
| AI Usage Log | 每次使用 agent | 工具與模型、要求內容、接受或拒絕與理由、AI 錯誤案例、節省或損失的時間 |
| Transcript | 每個 Bolt 結束時 | 去敏後的 Codex session 紀錄 |
| 工時 | 每個步驟開始與結束時 | 人類工時與 agent 執行時間分開記錄 |

## 9. 三組比較的共同規則

三組使用相同的主題與相同的需求範圍，才可以比較。

| 項目 | 規則 |
|---|---|
| 輸入 | 三組使用同一份訪談筆記。各組不可以看其他組的產出，直到各自完成 Requirement Analysis。 |
| 工時 | 分開記錄：人類撰寫、人類審查、AI 執行、重做。單位為分鐘。 |
| 品質指標 | 需求數量；被拒絕的 AI 產出數量；AMBIGUOUS、MISSING、CONFLICT、INVENTED 各類問題數量；核准後的變更申請數量；追溯表中沒有對應的需求或 UML 元素數量 |
| 共用資料 | 完成後，三組交換需求清單，標出彼此缺少的需求。 |
| 「AI in our process」表 | 三組使用同一個欄位格式：step / what AI did / who approved / what was rejected |

注意：作業中「PRD/SRS 至少三次審查過的變更」是 Waterfall + AI 組的要求。本組的 PR 不能代替 Waterfall 組的變更歷史。

## 10. 初始化步驟

1. 安裝 Spec Kit 並初始化 Codex 模式：

    ```bash
    uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
    specify init --here --ai codex --ai-skills
    specify check
    ```

2. 確認 `specify check` 顯示 Codex 可用。如果指令名稱與本文件不同，以實際版本為準，並更新本文件。
3. 把 `.codex/agents/` 中的模型名稱改成你們帳號可用的模型。
4. 執行 `scripts/setup-agent-worktree.sh <bolt-branch>` 建立 agent 專用 worktree。
5. 在 GitHub 設定 `main` 的 branch protection，並修改 `.github/CODEOWNERS` 中的帳號。
6. 兩位人類在 Codex 中執行 `$speckit-constitution`，審查並簽核憲章（G0）。

## 參考資料

Amazon Web Services. (2025, July 31). *AI-driven development life cycle: Reimagining software engineering*. AWS DevOps & Developer Productivity Blog. https://aws.amazon.com/cn/blogs/devops/ai-driven-development-life-cycle/

DerKodex. (n.d.). *spec-driven-development-kit* [Fork of github/spec-kit]. GitHub. https://github.com/DerKodex/spec-driven-development-kit

GitHub. (n.d.). *Spec Kit*. https://github.com/github/spec-kit

OpenAI. (n.d.-a). *Sandbox*. OpenAI Developers. https://developers.openai.com/codex/concepts/sandboxing.md

OpenAI. (n.d.-b). *Subagents*. ChatGPT Learn. https://learn.chatgpt.com/docs/agent-configuration/subagents
