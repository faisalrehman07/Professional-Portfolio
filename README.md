# Faisal Rehman — Professional Software Engineer Portfolio

A modern, high-performance, and visually captivating personal portfolio website engineered for **Faisal Rehman** — Software Engineer, Full-Stack Developer, and Artificial Intelligence & Data Science Graduate.

Designed and engineered as a modern, ultra-clean, and high-impact light-themed portfolio tailored for software engineering job postings, recruitment teams, and hiring managers in Dubai & the UAE, India, and globally. Features strict fidelity to verified resume credentials, interactive 3D skill visualization, and clean architectural case studies.

---

## Highlights & Key Features

- **Strict Source of Truth**: Every credential, experience, skill, metric, and achievement is directly sourced from Faisal Rehman's verified resume (`FAISAL_REHMAN.pdf`). Zero fabricated seniority, unsupported years of experience, or inflated skill percentages.
- **Interactive 3D Skills Universe Globe (Three.js)**:
  - 30 resume skills mapped across Fibonacci spherical coordinates with category-coded glowing nodes.
  - Interactive raycasting with floating hover tooltips, drag/touch rotation, auto-spin toggle, zoom controls, and camera reset.
  - Reactive node inspector card that provides skill details and automatically filters corresponding projects.
  - Graceful WebGL fallback with 2D category pills for lower-end hardware.
- **Hero & Developer Telemetry**:
  - Direct positioning headline: *"Building Practical Software. Integrating Intelligent AI."*
  - Supporting narrative highlighting full-stack engineering, scalable APIs, and applied AI systems.
  - Quick action buttons: **Explore My Projects**, **Contact Me**, and direct **Download Resume (PDF)**.
  - Interactive live developer telemetry card featuring syntax-highlighted code and real-time status badges.
- **Editorial About Section**:
  - First-person narrative covering B.E. in AI & Data Science (Navkis College of Engineering / VTU, 8.2 CGPA).
  - Practical full-stack internship experience at CifTech Solutions and digital advisory experience at [24]7.ai.
  - Career focus emphasizing readiness for modern tech ecosystems in Dubai and the UAE.
- **Comprehensive Project Showcase (8 Real Projects)**:
  - **4 Featured Systems**:
    1. *Personal AI Voice Assistant* (Python, SpeechRecognition, pyttsx3, AI Automation)
    2. *Hotel Management Website* (Full-Stack, JavaScript, HTML5/CSS3, MySQL, Booking UX)
    3. *Healthcare and Hospital Management System* (Python, Django, PostgreSQL, RESTful APIs, RBAC)
    4. *Finance Tracking Wallet* (JavaScript, LocalStorage, Canvas/Chart.js, Expense Analytics)
  - **4 Additional Systems**:
    5. *Car Parking Management System* (C++, Algorithms, Data Structures)
    6. *Loan Eligibility Prediction* (Python, Scikit-learn, Machine Learning)
    7. *Heart Rate Monitoring & Stress-Level Prediction using rPPG* (Computer Vision, OpenCV, Signal Processing)
    8. *Self and Manual Driven Rover* (Arduino/IoT, Motor Drivers, RF Controllers)
  - Custom SVG architectural illustrations, verified technology tags, live project dossier modals with copyable specs, and real GitHub repository links.
- **Experience Timeline**:
  - Chronological roadmap detailing exact dates and responsibilities:
    - **[24]7.ai** — Digital Advisor *(09/2025 – 12/2026)*
    - **CifTech Solutions** — Full-Stack Web Development Intern *(2024 – 2025)*
    - **NICC** — Cyber Security Intern *(10/2023 – 11/2023)*
- **Education & Training**:
  - Bachelor of Engineering in Artificial Intelligence & Data Science (8.2 / 10 CGPA).
  - Training & certifications from IEEE Project Expo 2025, Mini Project Expo 2024, NICC VAPT, 10 Seconds, GUVI, be10X, and atingi.
- **Transmission & Contact Terminal**:
  - *"Let's Build Something Meaningful."* headline with direct email (`faisalshaikhrehmani@gmail.com`), LinkedIn, GitHub, and Bangalore live time HUD.
  - Working client-side contact form with validation and mailto routing.
- **Global Command Palette (`Ctrl+K` / `Cmd+K`)**:
  - Keyboard-driven navigation across all sections, project filtering, and instant resume download.

---

## Technology Stack

- **Frontend Core**: React 19 + TypeScript
- **Build Tool & Dev Server**: Vite 8.3
- **3D Graphics & Visualizations**: Three.js (r183)
- **Styling**: Tailwind CSS + Vanilla CSS Tokens & Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVG Brand Vectors (GitHub, LinkedIn, Terminal)
- **Typography**: Space Grotesk (Display & Headings), Plus Jakarta Sans (Body), JetBrains Mono (Telemetry & Code)

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or later recommended)
- `npm` or `yarn` / `pnpm`

### 1. Installation
Clone or navigate to the repository directory and install dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 3. Production Build & Preview
To compile TypeScript and create an optimized production bundle:
```bash
npm run build
```
The compiled output is generated in the `dist/` folder. Preview the build locally:
```bash
npm run preview
```

---

## Project Structure

```
├── public/
│   ├── FAISAL_REHMAN.pdf          # Verified resume PDF download
│   └── favicon.svg                # Custom geometric brand favicon
├── src/
│   ├── components/
│   │   ├── About.tsx              # Editorial narrative, academic metrics & UAE focus
│   │   ├── BeyondCode.tsx         # Creative pursuits & technical problem-solving
│   │   ├── Certifications.tsx     # Training, expos & certified credentials hub
│   │   ├── CommandPalette.tsx     # Fuzzy keyboard search (Ctrl+K)
│   │   ├── Contact.tsx            # Contact terminal, Bangalore time & direct channels
│   │   ├── CosmicBackground.tsx   # Canvas ambient particles & glowing nebulae
│   │   ├── Education.tsx          # Navkis College / VTU degree breakdown
│   │   ├── ExperienceTimeline.tsx # Vertical interactive career timeline
│   │   ├── Footer.tsx             # Social links, resume trigger & copyright
│   │   ├── Hero.tsx               # Primary headline, live status & code telemetry card
│   │   ├── Navbar.tsx             # Responsive navigation with resume download CTA
│   │   ├── ProjectModal.tsx       # In-depth architectural case-study dossier
│   │   ├── Projects.tsx           # 8 projects (4 featured + 4 additional) with tags & filter
│   │   ├── SkillConstellation.tsx # Categorized 30-skill domain matrix
│   │   └── SkillUniversalGlobe.tsx# Three.js 3D Skills Universe Globe with raycasting
│   ├── data/
│   │   └── resume.ts              # Single source of truth for all portfolio data
│   ├── hooks/
│   │   ├── useSound.ts            # Optional synthesized micro-interactions
│   │   └── useTheme.ts            # Dark/light theme persistence
│   ├── App.tsx                    # Main layout coordinator and state bridge
│   ├── index.css                  # CSS tokens, glassmorphism, and custom animations
│   └── main.tsx                   # React root entrypoint
├── index.html                     # SEO metadata, OpenGraph tags & Schema.org JSON-LD
├── vite.config.ts                 # Relative base path config ('./') for GitHub Pages
└── package.json                   # Dependencies and scripts
```

---

## Deploying to GitHub Pages

The project is pre-configured with `base: './'` in `vite.config.ts`, making it completely compatible with GitHub Pages or any static host.

### Option A: Using the `gh-pages` Package
1. Install `gh-pages` as a dev dependency:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```bash
   npm run deploy
   ```

### Option B: GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Contact & Links

- **Faisal Rehman**
- **Location**: Bengaluru, India *(Open to relocation to Dubai & the UAE, and global remote opportunities)*
- **Email**: [faisalshaikhrehmani@gmail.com](mailto:faisalshaikhrehmani@gmail.com)
- **LinkedIn**: [linkedin.com/in/faisal-rehman-377731237/](https://www.linkedin.com/in/faisal-rehman-377731237/)
- **GitHub**: [github.com/faisalrehman07/](https://github.com/faisalrehman07/)
