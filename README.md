<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=🌾%20AgriSathi&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=ffffff&desc=Smart%20Farmer%20Assistant&descSize=28&descAlignY=60" width="100%" />

<!-- Typing SVG -->
<a href="https://github.com/YashwanthNavari/agrisathi--smart-farmer-assistant">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=22&duration=3000&pause=800&color=2ECC71&center=true&vCenter=true&multiline=true&width=700&height=80&lines=AI-Powered+Smart+Farmer+Assistant+🌱;Crop+Disease+Detection+%7C+Market+Prices+%7C+Govt+Schemes;Built+for+Indian+Farmers+%F0%9F%87%AE%F0%9F%87%B3" alt="Typing SVG" />
</a>

<br/>

<!-- Badges -->
<p>
  <img src="https://img.shields.io/badge/Status-Live%20%F0%9F%9F%A2-brightgreen?style=for-the-badge&logo=vercel" alt="Status"/>
  <img src="https://img.shields.io/badge/Made%20with-React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/AI-Gemini%201.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Built%20by-Yashwanth%20Navari-FF6B6B?style=for-the-badge&logo=github" alt="Author"/>
</p>

<p>
  <img src="https://img.shields.io/github/stars/YashwanthNavari/agrisathi--smart-farmer-assistant?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/YashwanthNavari/agrisathi--smart-farmer-assistant?style=social" alt="Forks"/>
  <img src="https://img.shields.io/github/watchers/YashwanthNavari/agrisathi--smart-farmer-assistant?style=social" alt="Watchers"/>
</p>

</div>

---

<div align="center">

## 🚀 Live Demo

<a href="https://yashwanthnavari.github.io/agrisathi--smart-farmer-assistant/" target="_blank">
  <img src="https://img.shields.io/badge/🌾_LAUNCH_AGRISATHI-Click_to_Open_Live_App-2ECC71?style=for-the-badge&labelColor=1a7a4a&color=2ECC71" height="60" alt="Launch App" />
</a>

</div>

---

## 📖 About AgriSathi

> **AgriSathi** (meaning *"Farmer's Friend"* in Hindi) is a full-stack, mobile-first AI application built from the ground up to empower Indian farmers with technology.

Millions of Indian farmers face daily challenges — crop diseases spread undetected, market prices are hidden behind middlemen, and government schemes never reach those who need them most. **AgriSathi changes that.**

This project integrates **Google Gemini AI** directly via REST API (no intermediary SDKs) to deliver:
- **Real-time plant disease diagnosis** from a simple photo
- **AI-powered expert advice** through a conversational chatbot
- **Live market price intelligence** with trend analysis
- **Government scheme navigation** with eligibility checks
- **Farm lifecycle management** with crop tracking

---

## ✨ Key Features

<table>
  <tr>
    <td align="center" width="200">
      <h3>🩺 Disease Detector</h3>
      <sub>Upload a photo of your crop → Get instant AI diagnosis with organic & chemical treatment options</sub>
    </td>
    <td align="center" width="200">
      <h3>🤖 AI Expert Chat</h3>
      <sub>Ask anything about farming in natural language. Supports voice input for low-literacy users</sub>
    </td>
    <td align="center" width="200">
      <h3>🛒 Mandi Marketplace</h3>
      <sub>Browse buy/sell listings for crops, seeds, fertilizers & equipment rentals</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="200">
      <h3>🏛️ Schemes Portal</h3>
      <sub>PM-Kisan, PMFBY, KCC — all central & state agricultural schemes in one place</sub>
    </td>
    <td align="center" width="200">
      <h3>🌱 Farm Management</h3>
      <sub>Track crop lifecycle stages — sowing to harvest — with visual progress indicators</sub>
    </td>
    <td align="center" width="200">
      <h3>☁️ Weather Dashboard</h3>
      <sub>3-day forecast with real-time humidity, wind speed & rainfall alerts</sub>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS (CDN) + Custom CSS |
| **AI Engine** | Google Gemini 1.5 Flash (REST API) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Markdown** | React Markdown |
| **Build Tool** | Vite 6 |
| **Deployment** | GitHub Pages (GitHub Actions CI/CD) |

</div>

---

## 🏗️ Project Structure

```
agrisathi/
├── 📂 components/
│   ├── Dashboard.tsx       # Home screen with weather & quick actions
│   ├── DiseaseDetector.tsx # AI-powered plant health analyzer
│   ├── ExpertChat.tsx      # Gemini chatbot + Community forum
│   ├── FarmManagement.tsx  # Crop lifecycle tracker
│   ├── Header.tsx          # Navigation header
│   ├── Marketplace.tsx     # Buy/Sell/Rent marketplace
│   └── Schemes.tsx         # Government scheme browser
├── 📂 services/
│   └── geminiService.ts    # Gemini REST API integration
├── 📂 .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Pages deployment
├── App.tsx                 # Root component & routing
├── index.tsx               # React entry point
├── types.ts                # TypeScript interfaces
├── vite.config.ts          # Vite build configuration
└── .env.example            # Environment variable template
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- A **Google Gemini API Key** (free at [aistudio.google.com](https://aistudio.google.com))

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YashwanthNavari/agrisathi--smart-farmer-assistant.git
cd agrisathi--smart-farmer-assistant
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment
```bash
cp .env.example .env.local
# Edit .env.local and paste your Gemini API key
```

```env
GEMINI_API_KEY=your_api_key_here
```

### 4️⃣ Start development server
```bash
npm run dev
```
Open **http://localhost:3000** in your browser 🚀

### 5️⃣ Build for production
```bash
npm run build
```

---

## 🖥️ Screenshots

<div align="center">

| Dashboard | Disease Detector |
|-----------|-----------------|
| ![Dashboard](https://via.placeholder.com/400x250/1a7a4a/ffffff?text=📊+Dashboard+View) | ![Disease Detector](https://via.placeholder.com/400x250/c0392b/ffffff?text=🩺+Disease+Detector) |

| AI Expert Chat | Government Schemes |
|----------------|--------------------|
| ![Expert Chat](https://via.placeholder.com/400x250/2980b9/ffffff?text=🤖+AI+Expert+Chat) | ![Schemes](https://via.placeholder.com/400x250/f39c12/ffffff?text=🏛️+Govt+Schemes) |

</div>

---

## 🚀 Deployment

This project auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

**Manual deployment steps:**
1. Go to **Repository → Settings → Pages**
2. Set source to **GitHub Actions**
3. Add `GEMINI_API_KEY` in **Settings → Secrets → Actions**
4. Push to `main` — deployment is automatic! ✅

---

## 🌍 Social Impact

<div align="center">

| 🇮🇳 Target | 📊 Stat |
|-----------|---------|
| Indian farmers using smartphones | **250 million+** |
| Crop losses due to undetected disease | **₹9,000 Cr / year** |
| Farmers unaware of PM-Kisan | **~40%** |
| AgriSathi helps bridge this gap | **🌾** |

</div>

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** this repository
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/YashwanthNavari.png" width="120" style="border-radius:50%" alt="Yashwanth Navari" />

### Yashwanth Navari

[![GitHub](https://img.shields.io/badge/GitHub-YashwanthNavari-181717?style=for-the-badge&logo=github)](https://github.com/YashwanthNavari)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yashwanth-navari)

*"Technology should empower every farmer, not just the privileged few."*

</div>

---

<div align="center">

<!-- Footer wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=twinkling" width="100%" />

**⭐ Star this repo if AgriSathi inspired you! | 🌾 Built with ❤️ for Indian Farmers**

<sub>AgriSathi © 2025 Yashwanth Navari | MIT License</sub>

</div>
