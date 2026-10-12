# 中文 AI 简历：本地运行基线（F001）

本指南用于 fork 的开发和核心浏览器验收。功能范围和状态见[开发计划](../plans/chinese-ai-resume-development.plan.md)、[功能跟踪表](../plans/chinese-ai-resume-feature-tracker.md)。后续实现仍须从最新 `origin/dev` 建独立 feature 分支，PR 指向 `dev`。

## 1. 工具链

以根目录 `package.json`、`.nvmrc` 和锁文件为准：Node **24.x**，pnpm **12.11.2**。先核对实际版本，不能仅凭 `node@24` 目录名判断。

```sh
node --version
pnpm --version
pnpm install --frozen-lockfile
```

已有版本管理器时选择 Node 24。若系统工具链冲突，可在临时目录安装本次基线使用的版本，不修改系统链接：

```sh
npm install --prefix /private/tmp/reactive-resume-baseline-tools node@24.21.0 pnpm@12.11.2
export PATH=/private/tmp/reactive-resume-baseline-tools/node_modules/.bin:$PATH
node --version
pnpm --version
pnpm install --frozen-lockfile
```

工具目录被清理后需重装。安装依赖不得顺手升级包或重写锁文件。pnpm 12 的入口依赖原生安装步骤；若出现 `ENOEXEC`，可用 `node /private/tmp/reactive-resume-baseline-tools/node_modules/pnpm/bin/pnpm.mjs --version` 完成入口初始化，再核对 `pnpm --version`。若 npm 明确阻止生命周期脚本，先查看提示并仅批准这两个工具包的安装脚本。

## 2. 隔离数据库与文件存储

[compose.baseline.yml](../../compose.baseline.yml) 使用固定 PostgreSQL 18.3 Alpine 镜像、独立 Compose 项目和命名卷。先启动 Docker：

```sh
docker compose -f compose.baseline.yml up -d --wait postgres
docker compose -f compose.baseline.yml --profile test up -d --wait postgres_e2e
docker compose -f compose.baseline.yml --profile test ps
```

| 用途       | PostgreSQL 地址   | 数据库                         | 应用端口            | 本地存储目录                       |
| ---------- | ----------------- | ------------------------------ | ------------------- | ---------------------------------- |
| 开发       | `localhost:55431` | `reactive_resume_baseline`     | Web 3100 / API 3101 | `<仓库绝对路径>/data/baseline-dev` |
| 浏览器验收 | `localhost:55433` | `reactive_resume_baseline_e2e` | 生产服务 3200       | `<仓库绝对路径>/data/baseline-e2e` |

数据库映射仅绑定 `127.0.0.1`。用户名/密码 `postgres/postgres` 仅用于该本机环境。不要连接已有业务数据库或生产数据。端口占用时调整 Compose 和相应环境文件，保留两套环境的隔离。

F001 使用 `STORAGE_BACKEND=local`，单进程运行，无需 SeaweedFS 或 Redis。后续多进程限流、AI 恢复、staging 等功能应按各自 feature 增加依赖。停止服务用 `docker compose -f compose.baseline.yml --profile test stop`；保留卷，不用删除卷或重置数据库解决配置问题。

## 3. 本地配置

从仓库根目录运行。已有 `.env.local` 时先核对并保留原配置，不覆盖：

```sh
test -e .env.local || cp .env.example .env.local
```

设置以下值；`LOCAL_STORAGE_PATH` 必须替换为实际绝对路径：

```dotenv
APP_URL=http://localhost:3100
PORT=3100
SERVER_PORT=3101
DATABASE_URL=postgresql://postgres:postgres@localhost:55431/reactive_resume_baseline
STORAGE_BACKEND=local
LOCAL_STORAGE_PATH=<仓库绝对路径>/data/baseline-dev
STRICT_SCHEMA_CHECK=true
FLAG_DISABLE_SIGNUPS=false
FLAG_DISABLE_EMAIL_AUTH=false
FLAG_ALLOW_UNSAFE_AI_BASE_URL=false
FLAG_ALLOW_UNSAFE_OAUTH_REDIRECT_URI=false
```

分别运行两次 `openssl rand -hex 32`，填入 `AUTH_SECRET` 和 `ENCRYPTION_SECRET`。移除模板中的 `REDIS_URL`，或按实际配置连接独立 Redis。未配置 SMTP 时邮件输出到本地服务日志；勿把日志中的验证链接或用户信息提交到仓库。

环境文件已被 `.gitignore` 排除，可执行 `chmod 600 .env.local`。环境文件、文件存储、生成结果均不提交。

```sh
pnpm db:migrate
pnpm dev
```

访问 `http://localhost:3100`；API 健康检查为 `http://localhost:3101/api/health`。邮件预览保留端口 3002。开发脚本通过 dotenvx 加载 `.env.local`，应用启动也会检查/应用迁移。

## 4. 核心浏览器验收

创建独立 `.env.baseline-e2e`，使用另一组生成的测试 secret。配置与开发相同，但替换以下值：

```dotenv
APP_URL=http://localhost:3200
PORT=3200
SERVER_PORT=3201
DATABASE_URL=postgresql://postgres:postgres@localhost:55433/reactive_resume_baseline_e2e
LOCAL_STORAGE_PATH=<仓库绝对路径>/data/baseline-e2e
FLAG_DISABLE_API_RATE_LIMIT=true
```

保留 `STORAGE_BACKEND=local`、注册/邮箱登录开启、`STRICT_SCHEMA_CHECK=true`、两个 unsafe flag 为 false。本次仅测试核心简历流程，不需要 AI Key。此处关闭限流只适用于独立浏览器测试安装，开发环境保留默认限流。

安装 Chromium 和 PDF 文本检查工具：

```sh
pnpm exec playwright install chromium
# macOS；Linux 对应 poppler-utils
brew install poppler
pdftotext -v
```

根构建、测试脚本不会自动加载 `.env.local`，使用外层 dotenvx 显式注入测试环境。测试数据库迁移直接调用 DB 包，避免混用开发配置：

```sh
pnpm exec dotenvx run -f .env.baseline-e2e -- pnpm --filter @reactive-resume/db db:migrate
pnpm exec dotenvx run -f .env.baseline-e2e -- pnpm build
pnpm exec dotenvx run -f .env.baseline-e2e -- pnpm test:e2e tests/e2e/specs/auth.spec.ts tests/e2e/specs/section-editing.spec.ts tests/e2e/specs/builder-save-navigation.spec.ts tests/e2e/specs/pdf-text.spec.ts --workers=1
```

Playwright 以直接 Node 命令启动构建后的生产服务，等待健康检查；测试使用虚构账户/简历。覆盖注册、退出后登录、编辑并保存后刷新、保存失败后重试、浏览器 PDF 下载与文本校验。不修改现有测试来绕过失败；失败输出记录为基线缺陷。

若下载受网络影响且本机已安装 Google Chrome，可使用[本机 Chrome 配置](../../playwright.system-chrome.config.ts)运行相同测试。该配置仅选择浏览器 channel，保留原测试、断言、服务启动和失败证据设置；默认配置仍使用 Playwright 管理的 Chromium。

```sh
pnpm exec playwright install ffmpeg
pnpm exec dotenvx run -f .env.baseline-e2e -- pnpm test:e2e --config playwright.system-chrome.config.ts tests/e2e/specs/auth.spec.ts tests/e2e/specs/section-editing.spec.ts tests/e2e/specs/builder-save-navigation.spec.ts tests/e2e/specs/pdf-text.spec.ts --workers=1
```

结果必须注明使用的浏览器及版本。不能把本机 Chrome 的通过结果写成已验收下载版 Chromium，CI 的浏览器安装和执行仍由 F002 交付。

复查开发服务器：保持 `.env.local` 的开发数据库配置运行 `pnpm dev`，通过健康检查和首页确认开发启动正常。浏览器自动化验收针对独立测试安装，不使用开发账号或真实简历。

## 5. 基线结果与缺陷记录

2026-10-12 本机验收结果。运行环境为 Node 24.21.0、pnpm 12.11.2、PostgreSQL 18.3、Google Chrome 154.0.8037.98、Poppler 26.09.0。所有账号与简历均为测试生成的虚构数据。

| 项目                     | 当前结果                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Node / pnpm              | 临时目录工具链已核对：24.21.0 / 12.11.2                                                                       |
| 数据库隔离               | 两个独立数据库服务、端口及命名卷已启动并健康                                                                  |
| 锁文件安装               | `pnpm install --frozen-lockfile` 通过；manifest 和锁文件未改动                                                |
| 生产构建                 | 显式注入测试环境的 `pnpm build` 通过，3 个构建任务完成                                                        |
| 登录 / 编辑 / 保存 / PDF | 6 个现有测试均完成验收；首轮 5 项通过，登录测试补齐 ffmpeg 后单独重跑通过                                     |
| 开发服务启动             | `pnpm dev` 通过；Web 3100、API 3101 返回 200，数据库和本地存储健康                                            |
| 类型检查                 | `pnpm typecheck` 通过，19 个包完成检查                                                                        |
| API 单测                 | 显式注入测试环境的 API 包测试：382 passed / 68 skipped；未设置额外 DB 集成测试变量的 4 个 suite 跳过          |
| 本地检查                 | `pnpm lint:agent`、`pnpm format:check`、`pnpm exec turbo boundaries`、Compose config、`git diff --check` 通过 |
| CI                       | 未宣称通过；dev CI 配置属于 F002，PR 检查状态见功能跟踪表                                                     |

核心浏览器命令与第 4 节一致，使用 `playwright.system-chrome.config.ts`。首轮登录测试在创建 page 时因 ffmpeg 1013 缺失失败；执行 `pnpm exec playwright install ffmpeg` 后，仅重跑 `auth.spec.ts --workers=1`，注册、退出、重新登录及跳转断言全部通过（1 passed）。其他 5 项在首轮通过，无失败断言被删除或放宽。PDF 测试包含四种脚本/emoji 的下载文本校验及不支持字符的拒绝路径；中文字体专项验收仍属于 F006。

生产构建保留两个现有非阻塞提示：TypeScript 7 API 尚为实验性；ATS PDF 模块同时被静态/动态导入，动态导入无法单独拆 chunk。F001 不修改这些无关代码。

| 发现                                      | 影响与处理                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| 宿主 `node@24` 链接实际指向 Node 26.5.0   | 不符合根 engines；改用隔离安装的 Node 24.21.0，未修改系统链接                        |
| pnpm 自管理入口为未完成安装的文本占位文件 | `ENOEXEC` 阻止安装；改用隔离 pnpm 12.11.2 并完成原生入口初始化                       |
| AGENTS.md pnpm 版本落后于 manifest        | 已同步为 12.11.2；以后以 manifest / 锁文件为准                                       |
| Chromium 下载速度慢                       | 停止大体积下载；使用本机 Chrome 配置完成同一组验收，未把结果宣称为 Chromium 156 通过 |
| 首次运行缺少 Playwright ffmpeg 1013       | 已补齐并重跑登录测试通过；保留录像/trace 设置                                        |

无阻塞应用启动或上述验收流程的未解决问题。没有修改应用业务逻辑、生成数据库迁移、引入依赖升级或接通真实付费。撤回 F001 配置只需移除新增 Compose/浏览器配置与指南；停止其容器即可，保留本地数据库卷与存储。

F001 仅修复阻塞运行的问题；品牌、中文默认语言、VIP、支付、CI 分别在对应 feature 中实现。PR 未合并前，F001 不能作为后续依赖已完成的证据。
