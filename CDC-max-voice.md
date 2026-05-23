---
type: cdc
project: max-voice
phase-archi: C
layer: contract
created: 2026-05-23
parent: '@Fluxcaler'
tags: [max-voice, fork, tauri, speech-to-text]
---

# CDC — Max Voice

> Fork de [cjpais/Handy](https://github.com/cjpais/Handy) (MIT) — app desktop de dictée vocale offline rebrandée aux couleurs Hello-Max.

## État actuel (2026-05-23)

- ✅ **v0.1.0 + v0.1.1** publiées sur https://github.com/businessarchi/MAX-VOICE/releases
- ✅ Auto-update Tauri opérationnel (clé minisign signée)
- ✅ Rebrand complet : nom, icônes (dock + tray + Windows Store + Android), theme CSS Hello-Max, i18n 20 langues
- ✅ Whisper Large v3 utilisable en français
- ⚠️ Parakeet V3 EN-only (limitation lib upstream, voir Roadmap)
- ⚠️ Sans code-signing Apple ($99/an) — chaque update force re-autorisation accessibilité/micro

## Decisions

| Date | Décision | Pourquoi |
|------|----------|----------|
| 2026-05-23 | Nom = **Max Voice** | Cohérent famille produit Hello-Max ; positionnement "voice" explicite |
| 2026-05-23 | Charte = **Hello-Max** (`@Fluxcaler/2 R-Ressources/branding/hello-max.css`) | Famille produit unifiée web + desktop |
| 2026-05-23 | Repo **GitHub public** `businessarchi/MAX-VOICE` | Pivot 2026-05-23 — visibilité open-source, distribution facile via releases GitHub |
| 2026-05-23 | Upstream `cjpais/Handy` conservé en remote `upstream` | Pull les updates futures du projet source |
| 2026-05-23 | Local path : `/Users/melodie/Documents/Code/max-voice/` | Repo séparé d'archi-lab (artefacts binaires) |
| 2026-05-23 | Identifier bundle = `fr.business-architecte.maxvoice` | Reverse domain BA |
| 2026-05-23 | Sans code-signing Apple pour l'instant | Validation usage avant investissement $99/an |
| 2026-05-23 | Auto-update Tauri activé (minisign, pas Apple signing) | Distribution facile sans Developer Account |
| 2026-05-23 | Workaround Parakeet EN-only → recommander Whisper Large v3 | Lib `transcribe-rs 0.3.x` hardcode `languages: &["en"]` |

## Stack héritée (Handy)

- **Tauri 2** (Rust + WebView) — multi-plateforme Mac/Windows/Linux
- **Frontend** : React 18 + TypeScript + Vite + Tailwind 4
- **i18n** : i18next + react-i18next (20 langues, ~200 strings rebrandées Handy→Max Voice)
- **State** : Zustand + Immer
- **Audio backend** : `transcribe-rs 0.3.8` (whisper-cpp + Parakeet V3 ONNX)
- **Package manager** : Bun (lock = `bun.lock`)

## Modifications appliquées vs upstream Handy

### Configuration (rebrand)
- `tauri.conf.json` : productName "Max Voice", identifier `fr.business-architecte.maxvoice`, version 0.1.1, retiré signCommand Azure cjpais
- `package.json` + `src-tauri/Cargo.toml` : name `max-voice`, version 0.1.1
- `src-tauri/src/cli.rs` : commande `max-voice`
- `src-tauri/src/tray.rs` : label "Max Voice v..."
- `src-tauri/src/llm_client.rs` : User-Agent + X-Title "Max Voice"
- `src-tauri/src/lib.rs` : window title "Max Voice"

### Updater (auto-update)
- `tauri.conf.json` plugins.updater :
  - `pubkey` = clé publique minisign générée 2026-05-23
  - `endpoints` : `https://github.com/businessarchi/MAX-VOICE/releases/latest/download/latest.json`
  - `createUpdaterArtifacts: true`
- **Clé privée signing** : `~/.tauri/max-voice-updater.key` + 1Password "Max Voice — Tauri Updater Signing Key" (Perso - Mélodie)
- **Password clé** : `MaxVoice2026Updater`
- **GitHub Secrets** :
  - `TAURI_SIGNING_PRIVATE_KEY` = contenu de la clé privée
  - `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` = `MaxVoice2026Updater`

### Branding visuel
- `src/App.css` : theme Hello-Max (fond `#000`, texte `#f5f5f5`, accent `#ff0000`, font Satoshi via Fontshare)
- `src/components/icons/HandyTextLogo.tsx` : remplacé par mascotte flame embed base64
- `src/assets/max-mascotte-flame.svg` : asset mascotte (depuis `@Fluxcaler/2 R-Ressources/branding/assets/`)
- `src/components/icons/{Cancel,Transcription,Microphone}Icon.tsx` : couleur rose `#FAA2CA` → rouge `#ff0000`
- `src/components/ui/AudioPlayer.tsx` : progress bar rouge
- `src/overlay/RecordingOverlay.css` : background `#faa2ca33` → `#ff0000` overlay
- `src/components/settings/about/AboutSettings.tsx` : bouton Donate retiré

### Icônes app
- Source : `/tmp/max-icon-1024.png` (rsvg-convert depuis `max-mascotte-flame.svg`)
- Generated via `bun run tauri icon` : `icon.icns` (Mac), `icon.ico` (Windows), 32/64/128/128@2x PNG, Android mipmaps, iOS Square*
- Tray icons (9 PNGs `src-tauri/resources/*.png`) : tous remplacés par mascotte 44×44

### i18n
- 20 langues × ~10 strings = ~200 mentions "Handy" remplacées par "Max Voice"
- Mentions Gerganov + Whisper.cpp neutralisées dans les credits/about

### URL UI redirections
- "Voir source code" → `github.com/businessarchi/MAX-VOICE`
- "Portable update" → `github.com/businessarchi/MAX-VOICE/releases`

## Workflow release (procédure)

### Build local (Mac arm64 uniquement)

```bash
cd /Users/melodie/Documents/Code/max-voice

# Bump version dans 3 fichiers (package.json, tauri.conf.json, Cargo.toml)
# puis :
export TAURI_SIGNING_PRIVATE_KEY="$(cat ~/.tauri/max-voice-updater.key)"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD="MaxVoice2026Updater"
bun run tauri build

# Artefacts :
# - src-tauri/target/release/bundle/dmg/Max Voice_<ver>_aarch64.dmg
# - src-tauri/target/release/bundle/macos/Max Voice.app.tar.gz (updater payload)
# - src-tauri/target/release/bundle/macos/Max Voice.app.tar.gz.sig (signature)
```

### Publication release

```bash
# Tag + push
git tag v<ver> && git push origin v<ver>

# Créer release avec latest.json manifest
SIG=$(cat "src-tauri/target/release/bundle/macos/Max Voice.app.tar.gz.sig")
cat > /tmp/latest.json << EOF
{
  "version": "<ver>",
  "notes": "<changelog>",
  "pub_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "platforms": {
    "darwin-aarch64": {
      "signature": "$SIG",
      "url": "https://github.com/businessarchi/MAX-VOICE/releases/download/v<ver>/Max.Voice.app.tar.gz"
    }
  }
}
EOF

gh release create v<ver> -R businessarchi/MAX-VOICE \
  --title "Max Voice v<ver>" \
  --notes "..." \
  "src-tauri/target/release/bundle/dmg/Max Voice_<ver>_aarch64.dmg" \
  "src-tauri/target/release/bundle/macos/Max Voice.app.tar.gz#Max.Voice.app.tar.gz" \
  "src-tauri/target/release/bundle/macos/Max Voice.app.tar.gz.sig#Max.Voice.app.tar.gz.sig" \
  "/tmp/latest.json"
```

### Build cloud multi-plateforme (Mac Intel + Windows + Linux)

À déclencher via GitHub Actions UI → workflow Release. Demande secrets `TAURI_SIGNING_PRIVATE_KEY` + `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` (déjà configurés).

## Reset TCC (si update casse les permissions)

```bash
pkill -f "max-voice" 2>&1
tccutil reset Accessibility fr.business-architecte.maxvoice
tccutil reset Microphone fr.business-architecte.maxvoice
open -a "Max Voice"
```

## Open Issues

1. **Parakeet V3 EN-only** (#1 sur GitHub) — Détail dans Roadmap ci-dessous.
2. **Permissions perdues à chaque update** — Sans code-signing Apple Developer ID, chaque build a une signature ad-hoc différente → macOS révoque l'accessibilité/micro. Fix = $99/an Apple Developer Program.
3. **macOS Gatekeeper warning** au 1er lancement — Sans notarisation, l'utilisateur doit Ctrl+clic → Ouvrir. Fix = Apple Developer Account + notarisation.
4. **Windows SmartScreen** au 1er lancement — Sans Azure Trusted Signing (~$10/mois), warning "Unknown publisher". Fix = certificat code-signing Windows.
5. **Pas de builds Intel/Windows/Linux publiés** — Workflow CI doit être déclenché manuellement par Mélodie via UI GitHub Actions (PAT n'a pas le scope `workflow`).

## Crédit upstream (obligatoire MIT)

> Built on top of [Handy](https://github.com/cjpais/Handy) by cjpais — a free, open-source, offline speech-to-text application. MIT license preserved.

LICENSE file conservé verbatim avec copyright cjpais (exigence MIT).

## 🔬 Roadmap technique

### v0.2.0 — Parakeet V3 multilangue (issue #1)

**Problème** : `transcribe-rs 0.3.x` marque Parakeet `languages: &["en"]` (English-only). Sherpa-onnx supporte les TDT transducers mais n'a pas de modèle Parakeet V3 multilangue préconverti (seulement V2 EN + JA-only).

**Workaround actuel (v0.1.x)** : utiliser **Whisper Large v3** pour FR/multilangue.

**Plan fix** (2-3 jours dédiés) :
1. **Conversion modèle** : NVIDIA Parakeet TDT 0.6B v3 (NeMo, HuggingFace `nvidia/parakeet-tdt-0.6b-v3`) → format sherpa-onnx (encoder.onnx + decoder.onnx + joiner.onnx + tokens.txt)
   - Install Python NeMo (1-2 GB deps PyTorch)
   - Run sherpa-onnx export script (`scripts/nemo/parakeet-tdt-export.py`)
   - Test sur audio FR de référence
2. **Refactor backend** : ajouter `sherpa-rs 0.6.x` à Cargo.toml en parallèle de transcribe-rs (Whisper reste sur transcribe-rs)
3. Modifier `src-tauri/src/managers/transcription.rs` : pour `EngineType::Parakeet`, utiliser sherpa-rs avec le modèle converti
4. Modifier `src-tauri/src/managers/model.rs` ligne 323 : `supports_language_selection: false → true` pour Parakeet V3
5. Pass `validated_language` dans les params sherpa-rs transducer
6. Tests réels FR/EN/ES/DE/IT/PT
7. Bump v0.2.0, release

**Effort estimé** : 2-3 jours en focus continu (ML + Rust + tests).

### v0.3.0+ — Code signing (investissement)

- Apple Developer Program ($99/an) → notarisation, suppression Gatekeeper warning, **permissions préservées entre updates**
- Azure Trusted Signing (~$10/mois) → suppression SmartScreen Windows
- À décider quand 5+ clients réels installés.

### v0.4.0+ — Distribution

- Test install par un client Windows réel via Releases GitHub
- README screenshots
- Page de download dédiée sur `hello-max.com/desktop` (à coordonner avec site Fluxcaler)

## Crédit upstream (obligatoire MIT)

> Built on top of [Handy](https://github.com/cjpais/Handy) by cjpais — MIT license preserved in LICENSE file.

## Reprendre cette session

Pour reprendre le travail Max Voice plus tard :

```bash
cd /Users/melodie/Documents/Code/max-voice
git pull
# Lire ce CDC pour contexte complet
# Issue GitHub #1 pour Parakeet multilangue : https://github.com/businessarchi/MAX-VOICE/issues/1
```

**Mémoires Claude relatives** :
- `tauri-disable-updater-pattern.md` — pattern Tauri disable updater (3 steps)
- `fluxcaler-brand-source.md` — charte Hello-Max source de vérité
- `charte-primitives-obligatoires.md` — règle 5 primitives
