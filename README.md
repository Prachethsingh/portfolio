# Pracheth Singh — Portfolio

Personal portfolio with a GSAP scroll-driven computing-to-AI hero, project case studies, a searchable public GitHub directory, and a source-linked retrieval chatbot.

## Preview locally

```sh
python -m http.server 8000 --directory docs
```

Open http://localhost:8000. No package installation is required.

## Publish with GitHub Pages

In repository Settings → Pages, choose Deploy from a branch, select main and /docs, then Save. The docs directory is ready to serve as-is.

## Edit

The docs/ directory is both the readable source and the published site. Project data lives in docs/js/content.js. Knowledge chunks live in docs/js/knowledge.js. The chatbot is retrieval-only; no generative model is connected and no secrets are required.

## Checks

```sh
npm run check
npm test
```

Personal photos are omitted from this public repository pending explicit approval to publish those assets. GSAP license headers are preserved in the vendored files; see https://gsap.com/standard-license/.
