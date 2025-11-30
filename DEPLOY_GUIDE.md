
# AI 房產估價師 - Vercel 部署指南

本文件將引導您透過 GitHub 將應用程式部署到 Vercel，讓全世界都能透過網址存取您的網站。

## ✅ 為什麼選擇 Vercel？
1.  **完全免費**：提供免費的 SSL 憑證與託管服務。
2.  **支援後端 API**：我們專案中的郵件發送功能 (`api/send-email.js`) 可以直接在 Vercel 上運作 (Serverless Functions)，無需額外租用伺服器。
3.  **自動更新**：每次您將程式碼推送到 GitHub，Vercel 會自動重新部署。

---

## 🚀 第一階段：上傳程式碼到 GitHub

如果您已經有 GitHub Repository，請跳過建立步驟，直接推送更新。

### 1. 初始化 Git
在專案根目錄（看到 `package.json` 的那一層）開啟終端機 (Terminal / CMD)，執行：

```bash
git init
```

### 2. 建立 GitHub 倉庫 (Repository)
1.  登入 [GitHub](https://github.com)。
2.  點擊右上角 **「+」** -> **「New repository」**。
3.  **Repository name**: 輸入 `ai-property-appraiser` (或您喜歡的名字)。
4.  **Visibility**: 選擇 **Public** (公開) 或 **Private** (私人) 皆可。
5.  **Initialize this repository with**: **什麼都不要勾選** (不要勾 README, .gitignore 等)，因為我們本地已經有了。
6.  點擊 **「Create repository」**。

### 3. 推送程式碼
在 GitHub 建立完成的頁面上，複製 **"…or push an existing repository from the command line"** 下方的指令，並在您的終端機執行：

```bash
# 1. 將所有檔案加入暫存區 (注意有個點 .)
git add .

# 2. 提交版本紀錄
git commit -m "Initial deployment to Vercel"

# 3. 設定遠端倉庫 (請將下方網址換成您自己的 GitHub 網址)
git remote add origin https://github.com/您的帳號/ai-property-appraiser.git
# (如果已經設定過 origin，可以跳過這行，或用 git remote set-url origin ...)

# 4. 確保分支名稱為 main
git branch -M main

# 5. 推送到 GitHub
git push -u origin main
```

---

## ⚡ 第二階段：在 Vercel 進行部署

### 1. 匯入專案
1.  前往 [Vercel Dashboard](https://vercel.com/dashboard) 並登入 (建議使用 GitHub 帳號登入)。
2.  點擊 **"Add New..."** -> **"Project"**。
3.  在 **"Import Git Repository"** 列表中，您應該會看到剛剛上傳的 `ai-property-appraiser`。
4.  點擊該專案旁邊的 **"Import"** 按鈕。

### 2. 設定專案 (Configure Project)
Vercel 會自動偵測這是 **Vite** 專案，通常預設值就是正確的：

*   **Framework Preset**: `Vite`
*   **Root Directory**: `./`
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Install Command**: `npm install`

**環境變數 (Environment Variables):**
*   **Gemini API Key**: 不需要設定。因為本應用程式設計為讓使用者在瀏覽器端輸入自己的 Key，所以不需要在伺服器端設定。
*   **SMTP 設定 (Email)**: **不需要在此設定**。我們使用管理員後台的「系統設定」來動態管理 SMTP 資訊，這樣您隨時可以在網頁上修改，而不需要重新部署。

### 3. 開始部署
點擊藍色的 **"Deploy"** 按鈕。
Vercel 會開始安裝套件、建置網頁、並部署 API。過程約需 1-2 分鐘。

### 4. 成功！
當畫面出現滿天彩帶與 **"Congratulations!"** 時，代表部署成功。
點擊 **"Continue to Dashboard"**，然後點擊 **"Visit"** 按鈕，即可看到您的網站。

---

## 🛠 第三階段：功能驗證與設定

網站上線後，請務必執行以下設定以確保功能完整：

### 1. 設定郵件發送功能 (重要)
由於 Vercel 是全新的環境，您需要重新輸入 SMTP 資訊。

1.  以管理員身分登入網站 (預設帳密: `admin@mazylab.com` / `admin123`)。
2.  點擊右上角 **「管理員後台」** (紫色盾牌圖示)。
3.  在左側 **「系統設定」** 區塊，輸入您的 SMTP 資訊：
    *   **Host**: 例如 `smtp.gmail.com`
    *   **Port**: `587`
    *   **User**: 您的 Gmail 信箱
    *   **Password**: **應用程式密碼 (App Password)** (非 Gmail 登入密碼)
    *   **PayPal Client ID**: 若有申請 PayPal，也請在此填入 Live ID。
4.  點擊 **「儲存系統設定」**。

### 2. 測試
1.  嘗試在「管理後台」點擊 **「發送帳號通知信」** 測試按鈕，確認是否能收到信件。
2.  到前台「設定」輸入您的 **Gemini API Key**，測試 AI 估價功能。

---

## ❓ 常見問題 (FAQ)

**Q: 為什麼網頁版不能使用「匯入 CSV」功能？**
A: 網頁版受限於瀏覽器安全性，無法像桌面版那樣直接讀取檔案路徑。網頁版可以正常使用，但使用者必須透過「選擇檔案」對話框手動選取 CSV 檔。

**Q: 我更新了程式碼，如何更新網站？**
A: 非常簡單！只要在您的電腦上執行 `git add .` -> `git commit -m "更新說明"` -> `git push`。Vercel 偵測到 GitHub 有新版本後，會自動觸發重新部署，您不需要做任何事。

**Q: 發生 404 錯誤？**
A: 我們已經新增了 `vercel.json` 檔案來處理路由問題。如果您遇到重新整理頁面後出現 404，請確認 `vercel.json` 是否有成功上傳到 GitHub。
