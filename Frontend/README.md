# NPLTK Website

React + Vite + Tailwind CSS website for the **NPLTK** (Nepali Language Toolkit) open-source project.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Folder Structure

```
npltk/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Router + route definitions
    ├── index.css             # Tailwind + global design tokens
    │
    ├── layouts/
    │   ├── RootLayout.jsx    # Navbar + Footer wrapper (all non-docs pages)
    │   └── DocsLayout.jsx    # Navbar + Sidebar + Footer wrapper (docs)
    │
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── DocsPage.jsx
    │   ├── PlaygroundPage.jsx
    │   ├── OpenSourcePage.jsx
    │   └── TeamPage.jsx
    │
    ├── components/
    │   ├── Navbar.jsx        # Sticky top nav with active link highlighting
    │   ├── Footer.jsx        # Minimal footer with links
    │   ├── Sidebar.jsx       # Docs sidebar with scroll-spy
    │   ├── CodeBlock.jsx     # Prism.js syntax highlighted code block
    │   ├── SimpleButton.jsx  # Reusable button (primary / outline / accent)
    │   ├── InputArea.jsx     # Labeled textarea for Playground
    │   └── MemberItem.jsx    # Team member card
    │
    └── data/
        ├── features.js       # Core module list (used on Home)
        ├── team.js           # Team member records
        └── docs.js           # Sidebar nav config, POS tags, NER labels
```

## Design System

| Token        | Value     | Usage                            |
|--------------|-----------|----------------------------------|
| `--primary`  | `#250735` | Headings, navbar logo, avatars   |
| `--accent`   | `#b800d8` | Sidebar active, feature tags     |
| `--bg`       | `#ffffff` | Page background                  |
| `--bg-subtle`| `#f8f8f9` | Panel headers, footer            |
| `--border`   | `#e5e7eb` | All borders                      |
| `--text`     | `#111118` | Body text                        |
| `--text-muted`| `#6b7280`| Secondary text                   |
| `--code-bg`  | `#f4f4f6` | Code block background            |

Fonts: **IBM Plex Sans** (body) · **IBM Plex Mono** (code, labels, tags)

## Pages

| Route         | Component           | Layout       |
|---------------|---------------------|--------------|
| `/`           | `HomePage`          | `RootLayout` |
| `/docs`       | `DocsPage`          | `DocsLayout` |
| `/playground` | `PlaygroundPage`    | `RootLayout` |
| `/opensource` | `OpenSourcePage`    | `RootLayout` |
| `/team`       | `TeamPage`          | `RootLayout` |

## Tech Stack

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)
- [React Router 6](https://reactrouter.com)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Prism.js](https://prismjs.com) — syntax highlighting

## License

MIT
