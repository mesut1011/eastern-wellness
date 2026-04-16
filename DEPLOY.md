# Eastern Wellness 部署指南

## 方式一：部署到 Vercel（推荐）

### 步骤 1：创建 GitHub 仓库

1. 登录 GitHub
2. 创建新仓库 `eastern-wellness`
3. 不要初始化 README

### 步骤 2：上传代码

```bash
# 在本地创建项目
mkdir eastern-wellness && cd eastern-wellness

# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 关联远程仓库
git remote add origin https://github.com/你的用户名/eastern-wellness.git
git push -u origin main
```

### 步骤 3：部署到 Vercel

1. 登录 https://vercel.com
2. 点击 "Import Project"
3. 选择 GitHub 仓库
4. 添加环境变量：
   - `QWEN_API_KEY`: sk-1ec5b9b5c27c4ff29b47a70defdc6c73
5. 点击 Deploy

部署完成后，你会得到一个免费域名如 `eastern-wellness.vercel.app`

---

## 方式二：本地运行

```bash
cd eastern-wellness
npm install
npm run dev
```

访问 http://localhost:3000

---

## 配置邮件通知（可选）

1. 注册 Resend：https://resend.com
2. 获取 API Key
3. 在 Vercel 环境变量添加 `RESEND_API_KEY`

配置后，每次用户提交问卷，你会收到邮件通知到 645386789@qq.com

---

## 自定义域名（可选）

1. 在 Cloudflare 或 Namecheap 购买域名
2. 在 Vercel 项目设置中添加自定义域名
3. 更新 DNS 记录指向 Vercel

推荐域名：
- easternwellness.health
- easternwellness.clinic
- tcmwellness.com
