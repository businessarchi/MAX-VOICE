<div align="center">

# Max Voice

**La dictée vocale qui reste sur ta machine.**

Speech-to-text desktop offline · Mac · Windows · Linux

[![License](https://img.shields.io/badge/license-MIT-ff0000?style=flat-square)](LICENSE)
[![Site](https://img.shields.io/badge/site-hello--max.com-ff6b35?style=flat-square)](https://hello-max.com)

</div>

---

## Pourquoi Max Voice

- **Local-first** — ta voix ne quitte jamais ton ordinateur. Aucun cloud, aucune télémétrie.
- **Rapide** — appuie sur un raccourci, parle, relâche : le texte apparaît dans ton champ actif.
- **Multilingue** — détection automatique de langue, transcription FR/EN/ES/DE/IT/JA/ZH et autres.
- **Open-source** — MIT, fork it, ship it.

## Installation

### Mac

Télécharger le `.dmg` depuis [Releases](https://github.com/businessarchi/MAX-VOICE/releases/latest).

Ou builder depuis les sources :

```bash
git clone https://github.com/businessarchi/MAX-VOICE.git max-voice
cd max-voice
bun install
bun run tauri build
# .app dans src-tauri/target/release/bundle/macos/
```

### Windows

Télécharger le `.msi` depuis [Releases](https://github.com/businessarchi/MAX-VOICE/releases/latest).

### Linux

AppImage / .deb / .rpm depuis [Releases](https://github.com/businessarchi/MAX-VOICE/releases/latest).

## Utilisation

1. Lancer Max Voice (dock / barre des tâches).
2. Régler le raccourci dans Settings → Shortcuts (par défaut : ⌥ Espace).
3. Appuyer-maintenir le raccourci, parler, relâcher → le texte est inséré.

## Stack technique

- **Tauri 2** (Rust + WebView) — multi-plateforme natif
- **React + TypeScript + Tailwind** — interface
- **Whisper (GPU) + Parakeet (CPU)** — reconnaissance vocale embarquée
- **Bun** — package manager

## Build local

```bash
bun install               # deps
bun run tauri dev         # mode dev (hot-reload)
bun run tauri build       # bundle prod (.app, .dmg, .msi)
```

## Licence

[MIT](LICENSE) — fork freely.

---

<sub>Max Voice est un produit [Hello-Max](https://hello-max.com) par [Business Architecte](https://businessarchitecte.com). Construit en s'appuyant sur du travail open-source ; voir [LICENSE](LICENSE) pour le détail.</sub>
