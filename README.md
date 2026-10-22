# Pracheth Singh — Portfolio

Personal portfolio built as a dependency-free static site. Features a GSAP scroll-driven three-era hero animation, filterable project case studies, a live GitHub repository directory, a source-linked retrieval chatbot, and a separate résumé page.

## 🌐 Live Demo

**[https://pracheth-singh-portfolio.peppymug8.chatgpt.site](https://pracheth-singh-portfolio.peppymug8.chatgpt.site)**

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Running Locally](#running-locally)
- [Editing Content](#editing-content)
- [Chatbot](#chatbot)
- [Publishing](#publishing)
- [Checks & Tests](#checks--tests)
- [License](#license)

---

## Features

| Feature | Description |
|---|---|
| **Era Journey Hero** | A scroll-driven GSAP + Canvas animation narrating the evolution from the Machine Age → Connected Age → Intelligence Age |
| **Project Case Studies** | Four filterable project cards (AI/ML, Software, Data) that open a detail dialog with problem, approach, contribution, system flow, and limitations |
| **GitHub Repository Directory** | Live-fetched list of all public repos from the GitHub API, with a client-side search/filter |
| **Retrieval Chatbot** | A floating Q&A assistant that answers questions using keyword retrieval over a local knowledge base — no LLM or API key required |
| **Résumé Page** | Standalone `resume.html` with its own stylesheet |
| **Zero Dependencies** | No npm install, no bundler, no framework — just static HTML, CSS, and native ES modules |
| **Accessibility** | Skip link, ARIA roles/labels, `aria-live` regions, keyboard-navigable dialogs, semantic HTML throughout |
| **SEO & Performance** | Meta description, Open Graph tags, lazy-loaded images, WebP assets, and a `.nojekyll` marker for GitHub Pages |

---

## Project Structure

```
portfolio/
├── docs/                        # Published site root (served as-is)
│   ├── index.html               # Main portfolio page
│   ├── resume.html              # Standalone résumé page
│   ├── styles.css               # Global design system & component styles
│   ├── era.css                  # Era Journey hero styles
│   ├── proportions.css          # Layout proportion utilities
│   ├── resume.css               # Résumé-specific styles
│   ├── .nojekyll                # Disables Jekyll processing on GitHub Pages
│   ├── assets/
│   │   ├── favicon.svg          # Site favicon
│   │   ├── pracheth-portrait.webp
│   │   └── pracheth-connect-event.webp
│   ├── js/
│   │   ├── app.js               # Entry point — renders all dynamic content
│   │   ├── content.js           # ★ Edit this to update projects, skills, topics
│   │   ├── knowledge.js         # ★ Edit this to update chatbot knowledge chunks
│   │   ├── chat.js              # Chatbot UI & dialog controller
│   │   ├── retrieval.js         # Keyword-based retrieval engine
│   │   ├── repositories.js      # GitHub API fetcher & renderer
│   │   ├── era-journey.js       # GSAP ScrollTrigger + Canvas hero animation
│   │   ├── network-scene.js     # Canvas network node animation
│   │   ├── project-art.js       # SVG schematic artwork per project
│   │   └── resume.js            # Résumé page script
│   └── vendor/
│       ├── gsap.min.js          # GSAP core (vendored)
│       └── ScrollTrigger.min.js # GSAP ScrollTrigger plugin (vendored)
├── tests/
│   └── retrieval.test.js        # Node.js built-in test runner tests for retrieval
├── package.json                 # Scripts only — no runtime dependencies
└── README.md
```

---

## Architecture

The site is a **plain ES module application** with no build step.

```
index.html
  └── <script type="module" src="js/app.js">
        ├── content.js        → projects, skills, studyTopics, experiments data
        ├── project-art.js    → SVG schematic artwork per project ID
        ├── repositories.js   → fetch() GitHub API → render repo cards
        ├── era-journey.js    → GSAP + Canvas three-era scroll animation
        └── chat.js
              └── retrieval.js → keyword search over knowledge.js chunks
```

**Chatbot retrieval flow:**
1. User types a question.
2. `retrieval.js` tokenises the query and scores each knowledge chunk in `knowledge.js` by keyword overlap.
3. The top-scoring chunks are returned as text + source links.
4. `chat.js` renders the answer and citation links — no network request is made, no data leaves the browser.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS (custom properties, Grid, Flexbox) |
| Scripting | Native ES Modules (no transpilation) |
| Animation | GSAP 3 + ScrollTrigger (vendored, no CDN dependency) |
| Canvas | HTML5 Canvas API (era hero + network scene) |
| Data fetching | `fetch()` → GitHub REST API v3 |
| Testing | Node.js built-in `node:test` runner |
| Hosting | GitHub Pages (`/docs` branch deployment) |

---

## Running Locally

No installation required. Serve the `docs/` directory with any static server:

### Python (recommended — usually pre-installed)
```sh
python -m http.server 8000 --directory docs
```
Open [http://localhost:8000](http://localhost:8000)

### Node.js
```sh
npx serve docs
```

### VS Code
Right-click `docs/index.html` → **Open with Live Server**.

> ⚠️ You must use a server — opening `index.html` directly as a `file://` URL will block ES module imports due to CORS.

---

## Editing Content

All portfolio data lives in two files. No other file needs to change for a content update.

### Projects, Skills & Experiments → [`docs/js/content.js`](docs/js/content.js)

```js
// Add or edit a project
export const projects = [
  {
    id: 'agent',          // unique slug, used by project-art.js for artwork
    category: 'ai',       // 'ai' | 'software' | 'data'  (drives filter buttons)
    title: 'Memory-Augmented AI Agent',
    subtitle: 'An agent that carries experience into its next task.',
    tags: ['FastAPI', 'Qdrant', 'React', 'PostgreSQL'],
    caption: 'PERSISTENT MEMORY / AGENT SYSTEMS',
    problem: '...',
    approach: '...',
    contribution: '...',
    flow: ['Step 1', 'Step 2', '...'],
    limitation: '...',
    url: 'https://...',         // optional — live demo link
    repository: 'https://...',  // optional — source link
  },
  // ...
];
```

The `skills`, `studyTopics`, and `experiments` arrays in the same file drive the Knowledge section and Workbench section respectively.

### Chatbot Knowledge → [`docs/js/knowledge.js`](docs/js/knowledge.js)

Each chunk is a plain object with a `text` string and a `sources` array:

```js
export const knowledgeChunks = [
  {
    text: 'Pracheth built a memory-augmented AI agent using FastAPI...',
    sources: [{ title: 'Memory-Augmented AI Agent', href: '#work' }],
  },
  // ...
];
```

Add a chunk for any new project, experience, or fact you want the chatbot to surface.

---

## Chatbot

The floating **"Ask about Pracheth"** button opens a modal Q&A assistant.

- **Retrieval-only** — no generative model is connected; no API key is required.
- Answers are assembled from `knowledge.js` chunks scored by keyword match.
- All messages are held in DOM memory and cleared on page reload — nothing is transmitted.
- Suggested questions: *Projects*, *Education*, *Experience*, *Contact*.

To extend the chatbot, add entries to [`docs/js/knowledge.js`](docs/js/knowledge.js).

---

## Publishing

### GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **`main`** branch and **`/docs`** folder.
5. Click **Save**. The site will be live at `https://<username>.github.io/<repo>/`.

The `docs/.nojekyll` file ensures GitHub Pages serves the directory without Jekyll processing.

### Custom Domain

Add a `CNAME` file inside `docs/` containing your domain, then configure DNS:

```
docs/CNAME
---
yourcustomdomain.com
```

---

## Checks & Tests

### Syntax check all JS modules
```sh
npm run check
```
Runs `node --check` on every JS file — validates syntax without executing.

### Run retrieval unit tests
```sh
npm test
```
Uses the Node.js built-in `node:test` runner. Tests live in [`tests/retrieval.test.js`](tests/retrieval.test.js).

---

## Projects Showcased

| Project | Category | Stack | Links |
|---|---|---|---|
| Memory-Augmented AI Agent | AI/ML | FastAPI · Qdrant · React · PostgreSQL | [Demo](https://self-learning-ai-agent-one.vercel.app) · [Repo](https://github.com/Prachethsingh/self-learning-AI-agent) |
| Smart Alert System for Deaf | AI/ML | Audio ML · Python | — |
| BUSINESS.IN | Data/Simulation | Python · Monte Carlo · Geospatial | [Demo](https://business-in.onrender.com) · [Repo](https://github.com/Prachethsingh/business.in) |
| Full-Stack Operations ERP | Software | React · FastAPI · PostgreSQL · Docker | [Repo](https://github.com/Prachethsingh/Full-Stack-Mini-Operations-ERP) |

---

## License

Personal photos are included with the portfolio owner's authorization.
GSAP license headers are preserved in the vendored files — see [https://gsap.com/standard-license/](https://gsap.com/standard-license/).
