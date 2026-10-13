# 中文 AI 简历产品：Feature 跟踪表

范围/验收见 [开发计划](chinese-ai-resume-development.plan.md)，执行要求见 [AGENTS.md](../../AGENTS.md)。PR 固定目标：`ryan-deng98/reactive-resume:dev`。

状态：`planned`、`in_progress`、`blocked`、`draft_pr`、`pr_open`、`merged`、`cancelled`。只有 `merged` 满足依赖。空 PR/证据字段表示尚未完成，不能推断已验证。

当前集成基线：`dev` 从 `main@4891443812b497acfc6cdb0572840f05bfe674b4` 初始化。功能开始时再从最新 `origin/dev` 建分支。

## 功能任务板

| ID   | 模块 | 优先级 | 功能                   | 分支                                        | 依赖                                                   | 状态    | PR / 合并提交 |
| ---- | ---- | ------ | ---------------------- | ------------------------------------------- | ------------------------------------------------------ | ------- | ------------- |
| F000 | M00  | P0     | 流程与开发计划         | `codex/feature/f000-development-workflow`   | —                                                      | merged  | [#1][f000-pr] |
| F001 | M00  | P0     | 本地运行基线           | `codex/feature/f001-runtime-baseline`       | F000                                                   | pr_open | [#2][f001-pr] |
| F002 | M00  | P0     | dev CI 集成            | `codex/feature/f002-dev-ci`                 | F001                                                   | planned | —             |
| F003 | M01  | P0     | 品牌与中文首页         | `codex/feature/f003-brand-homepage`         | F001                                                   | planned | —             |
| F004 | M01  | P0     | 默认简体中文           | `codex/feature/f004-zh-cn-defaults`         | F001                                                   | planned | —             |
| F005 | M01  | P0     | 邮箱验证与 AI 资格     | `codex/feature/f005-email-verification`     | F001,F004                                              | planned | —             |
| F006 | M02  | P0     | 中文模板与 PDF         | `codex/feature/f006-chinese-pdf`            | F001,F004                                              | planned | —             |
| F007 | M02  | P0     | 中文导入体验           | `codex/feature/f007-resume-import`          | F004,F006                                              | planned | —             |
| F008 | M03  | P0     | 平台统一模型           | `codex/feature/f008-managed-ai-provider`    | F001                                                   | planned | —             |
| F009 | M03  | P0     | AI 准入与入口封锁      | `codex/feature/f009-ai-access-policy`       | F008,F013,F017,F018,F019                               | planned | —             |
| F010 | M03  | P0     | 中文单段润色           | `codex/feature/f010-experience-rewrite`     | F004,F009                                              | planned | —             |
| F011 | M03  | P0     | 中文简历审查           | `codex/feature/f011-resume-review`          | F006,F009                                              | planned | —             |
| F012 | M03  | P0     | 岗位定制建议           | `codex/feature/f012-job-tailoring`          | F006,F009                                              | planned | —             |
| F013 | M03  | P0     | AI 脱敏与日志          | `codex/feature/f013-ai-data-minimization`   | F008                                                   | planned | —             |
| F014 | M04  | P0     | 账单数据模型           | `codex/feature/f014-billing-schema`         | F001                                                   | planned | —             |
| F015 | M04  | P0     | SKU 与订单服务         | `codex/feature/f015-order-service`          | F014                                                   | planned | —             |
| F016 | M04  | P0     | 积分账本核心           | `codex/feature/f016-credit-ledger`          | F014                                                   | planned | —             |
| F017 | M04  | P0     | VIP 权益周期           | `codex/feature/f017-vip-entitlements`       | F015,F016                                              | planned | —             |
| F018 | M04  | P0     | 试用积分发放           | `codex/feature/f018-trial-credits`          | F005,F016                                              | planned | —             |
| F019 | M03  | P0     | AI 执行预算与恢复      | `codex/feature/f019-ai-runtime-budget`      | F008,F016,F017,F018                                    | planned | —             |
| F020 | M05  | P0     | 微信 Native 适配器     | `codex/feature/f020-wechat-native`          | F015                                                   | planned | —             |
| F021 | M05  | P0     | VIP 购买与二维码页     | `codex/feature/f021-vip-checkout`           | F020,F022,F025                                         | planned | —             |
| F022 | M05  | P0     | 支付通知与权益发放     | `codex/feature/f022-payment-webhook`        | F020,F016,F017                                         | planned | —             |
| F023 | M05  | P0     | 查单补偿与对账         | `codex/feature/f023-payment-reconciliation` | F020,F022                                              | planned | —             |
| F024 | M05  | P0     | 退款与权益回收         | `codex/feature/f024-refunds`                | F022,F023,F028                                         | planned | —             |
| F025 | M06  | P0     | 会员中心与价格展示     | `codex/feature/f025-membership-center`      | F004,F015,F017,F018                                    | planned | —             |
| F026 | M06  | P0     | 用户协议与售后界面     | `codex/feature/f026-product-policies`       | F003,F025                                              | planned | —             |
| F027 | M06  | P0     | AI 来源与导出标识      | `codex/feature/f027-ai-content-provenance`  | F006,F009,F010,F011,F012                               | planned | —             |
| F028 | M07  | P0     | 运营权限与审计         | `codex/feature/f028-billing-operations`     | F014,F015,F017                                         | planned | —             |
| F029 | M07  | P0     | 模型成本与告警         | `codex/feature/f029-usage-observability`    | F019,F028                                              | planned | —             |
| F030 | M07  | P0     | staging 与发布候选部署 | `codex/feature/f030-deployment-readiness`   | F002,F029                                              | planned | —             |
| F031 | M07  | P0     | 转化漏斗事件           | `codex/feature/f031-product-analytics`      | F003,F010,F021                                         | planned | —             |
| F032 | M08  | P0     | 首发 E2E 与恢复验收    | `codex/feature/f032-mvp-e2e`                | F007,F010,F011,F012,F019,F021,F023,F024,F027,F029,F030 | planned | —             |
| F033 | M08  | P0     | 中文指南与发布门禁     | `codex/feature/f033-release-handbook`       | F026,F027,F030,F031,F032                               | planned | —             |
| F034 | M09  | P1     | 中文求职信             | `codex/feature/f034-chinese-cover-letters`  | F027,F032                                              | planned | —             |
| F035 | M09  | P1     | AI Word 导入           | `codex/feature/f035-ai-docx-import`         | F007,F019,F027,F032                                    | planned | —             |
| F036 | M09  | P1     | 手机便捷支付           | `codex/feature/f036-mobile-payments`        | F024,F025,F032                                         | planned | —             |
| F037 | M09  | P1     | VIP 积分加购           | `codex/feature/f037-credit-topups`          | F024,F025,F032                                         | planned | —             |
| F038 | M09  | P2     | 中文职业知识与教练     | `codex/feature/f038-career-coach`           | F019,F027,F032                                         | planned | —             |
| F039 | M09  | P2     | 中文面试练习           | `codex/feature/f039-interview-practice`     | F038                                                   | planned | —             |
| F040 | M09  | P2     | 自动岗位发现           | `codex/feature/f040-job-discovery`          | F019,F029,F032                                         | planned | —             |
| F041 | M09  | P1     | 中文投递管理           | `codex/feature/f041-application-tracker`    | F012,F032                                              | planned | —             |
| F042 | M09  | P2     | Offer 中文对比         | `codex/feature/f042-offer-comparison`       | F038,F041                                              | planned | —             |
| F043 | M10  | P2     | 年度预付 VIP           | `codex/feature/f043-annual-vip`             | F017,F024,F037                                         | planned | —             |
| F044 | M10  | P2     | 自动续费               | `codex/feature/f044-auto-renewal`           | F036,F043                                              | planned | —             |
| F045 | M10  | P2     | 优惠券                 | `codex/feature/f045-coupons`                | F015,F024,F032                                         | planned | —             |
| F046 | M10  | P2     | 邀请奖励               | `codex/feature/f046-referrals`              | F018,F029,F045                                         | planned | —             |

## 当前交接记录

### F000 — 流程与开发计划

- 状态：merged；分支：`codex/feature/f000-development-workflow`；目标：`dev`。
- 范围：三个规划文件与 AGENTS.md 强制交付流程；dev 已从核对的 main 基线建立。
- PR：[#1 — 开发流程与计划](https://github.com/ryan-deng98/reactive-resume/pull/1)，GitHub 已确认合并到 `dev`。
- 检查：47 个 ID/分支唯一；11 个模块；34 个 P0；计划与 tracker 的分支/依赖一致；依赖图无环、B0–B5 顺序可执行；本地相对链接与 Markdown fences 检查通过。Oxfmt 0.72.0 已按仓库配置格式化，提交前复查；`git diff --check` 通过。
- 根脚本：尝试 `pnpm lint:agent`、`pnpm format:check`，均被 pnpm 自管理版本的目录权限阻止（`EPERM`，`~/Library/pnpm/.tools`）。文档格式使用临时缓存内锁定的 Oxfmt 0.72.0 等效检查；本次无 JavaScript/TypeScript 变更，Oxlint 代码检查不适用。
- 应用测试/构建：仅文档变更，不适用；现有项目依赖尚未安装。
- CI：GitHub 暂未返回检查结果，workflow 列表查询为空；不能标记 CI 通过。F002 必须核验并建立 dev 的实际检查流程；本次文档验收已有独立本地证据。
- 下一步：F001 已从最新 `origin/dev` 启动。后续功能分支按最新 dev 逐个创建，未提前创建其余 46 个分支。
- 合并证据：GitHub PR #1 于 2026-10-12 合并；merge commit：`804005f0987328a66ca95caa09821b31d59214c6`。

### F001 — 本地运行基线

- 状态：pr_open；分支：`codex/feature/f001-runtime-baseline`；目标：`dev`。
- PR：[#2 — 本地运行基线](https://github.com/ryan-deng98/reactive-resume/pull/2)，GitHub 已核对为 `OPEN`、非草稿、base=`dev`；已附加到当前 chat，尚未合并。
- 验证提交：`2ff68b97153fd74735795aba7b5bf4c983ceb7f4`；后续交接提交仅更新本跟踪表，文档格式/diff 重新检查。
- 范围：Node 24.21.0 / pnpm 12.11.2 冻结锁文件安装；新增 `compose.baseline.yml` 隔离开发/测试数据库和本地存储；新增本机 Chrome 可选 Playwright 配置；[运行指南](../development/chinese-ai-resume-baseline.md)记录配置、验证及缺陷。AGENTS.md pnpm 版本已同步；无应用业务代码、迁移、依赖升级。
- 验收：登录、简历编辑、保存、PDF 导出与一次生产构建；依赖 F000 已确认合并。
- 检查：`pnpm install --frozen-lockfile`、显式注入 `.env.baseline-e2e` 的 `pnpm build`（3 个任务）、`pnpm typecheck`（19 个包）、`pnpm lint:agent`、`pnpm format:check`、`pnpm exec turbo boundaries`、Compose config、`git diff --check` 通过。开发首页/API 200，DB/本地存储健康。
- API 单测：`pnpm exec dotenvx run -f .env.baseline-e2e -- pnpm --filter @reactive-resume/api test`，382 passed / 68 skipped；4 个额外 DB suite 未配置专用变量而跳过，未将其计作通过。
- 浏览器：使用 `playwright.system-chrome.config.ts` 和 Chrome 154.0.8037.98，首轮 auth/section-editing/builder-save-navigation/pdf-text 6 项中 5 项通过，auth 因缺少录像 ffmpeg 失败；补齐 ffmpeg 1013 后单独重跑 auth，1 项通过。6 项核心场景均已验收，原断言与失败证据设置保留。
- 环境发现：系统 Node 26 / pnpm 原生入口未完成安装，已使用临时目录的正确工具链解决；未修改系统链接。Chromium 156 下载已因低速停止，未宣称其通过。生产构建有两个现存非阻塞提示，详见指南。
- CI：GitHub 当前 head 的 `statusCheckRollup`、check-runs 均为空，workflow 列表为空；不能标记 CI 通过。dev CI 属于 F002。
- 发布：Git HTTPS push 连接超时，已用 GitHub Git Data API 发布同一提交；5 个 blob、完整 tree 与 commit SHA 均与本地一致，未强推。环境文件、凭据、数据与测试产物未提交。
- 阻塞：应用验收无；等待 PR 审查/合并。配置撤回无需业务数据迁移；保留本地卷，不删除数据。
- 下一步：审查并合并 F001 的 PR #2；GitHub 确认并入 dev 后，才从最新 dev 启动 F002。其余未合并依赖不能提前视为就绪。

## 新记录模板

功能开始后添加或更新该功能的交接段落。不要把重要状态只放在聊天中。

```markdown
### FNNN — 功能名称

- 状态：in_progress / draft_pr / pr_open / blocked / merged。
- 分支：codex/feature/fNNN-short-name；目标：dev。
- PR：完整 URL；若已合并，附 merge commit。
- 范围/变化：本次实现与验收条目；拆分/调整原因。
- 检查：精确命令、结果、当前 head；CI pending/fail/pass 分开列。
- 文档/迁移/翻译：已完成项和未完成项。
- 阻塞：原因、负责人、解除条件；没有则写无。
- 下一步：修复、等待审查/合并，或下个已经就绪的功能。
```

外部审批 X01–X07 的证据与状态单独维护在开发计划第 17 节；它们不等同于某个 feature PR 的 merged 状态。

[f000-pr]: https://github.com/ryan-deng98/reactive-resume/pull/1
[f001-pr]: https://github.com/ryan-deng98/reactive-resume/pull/2
