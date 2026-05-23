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

## Decisions

| Date | Décision | Pourquoi |
|------|----------|----------|
| 2026-05-23 | Nom = **Max Voice** | Cohérent famille produit Hello-Max ; positionnement "voice" explicite |
| 2026-05-23 | Charte = **Hello-Max** (`@Fluxcaler/2 R-Ressources/branding/hello-max.css`) | Famille produit unifiée web + desktop |
| 2026-05-23 | Repo **GitHub public** `businessarchi/MAX-VOICE` | Pivot 2026-05-23 — visibilité open-source, distribution facile via releases GitHub |
| 2026-05-23 | Upstream `cjpais/Handy` conservé en remote `upstream` | Pull les updates futures du projet source |
| 2026-05-23 | Local path : `/Users/melodie/Documents/Code/max-voice/` | Repo séparé d'archi-lab (artefacts binaires) |
| 2026-05-23 | Identifier bundle = `fr.business-architecte.maxvoice` | Reverse domain BA |
| 2026-05-23 | Version reset à 0.1.0 | Notre versioning indépendant (trace upstream via tags) |

## Stack héritée (Handy)

- **Tauri 2** (Rust + WebView) — multi-plateforme Mac/Windows/Linux
- **Frontend** : React 18 + TypeScript + Vite + Tailwind 4
- **i18n** : i18next + react-i18next
- **State** : Zustand + Immer
- **Audio backend** : whisper-rs (GPU) + transcribe-rs / Parakeet V3 (CPU)
- **Package manager** : Bun (lock = `bun.lock`)

## Changelog

- 2026-05-23 — Fork initial, clone local, rebrand config minimal (tauri.conf.json + package.json + Cargo.toml metadata). Sign command + updater cjpais retirés. Plus à venir : assets (icon mascotte Max), theme CSS Hello-Max, README, build Windows.

## Vérifications

- [ ] `bun install` complet sans erreur
- [ ] `bun tauri dev` lance l'app sur Mac
- [ ] Window title affiche "Max Voice"
- [ ] Theme CSS reprend tokens Hello-Max (gradient rouge signature, font Satoshi)
- [ ] Icône dock = mascotte Max (`max-mascotte.svg` rendue en .icns)
- [ ] Build Windows fonctionnel (test sur VM ou utilisateur Windows)

## Crédit upstream (obligatoire MIT)

> Built on top of [Handy](https://github.com/cjpais/Handy) by cjpais — a free, open-source, offline speech-to-text application. MIT license preserved.

## 🔬 Roadmap technique

### Parakeet V3 multilangue (issue ouverte)

**État** : transcribe-rs 0.3.x marque Parakeet comme English-only (`languages: &["en"]`). Sherpa-onnx supporte les TDT transducers mais n'a pas de modèle Parakeet V3 multilangue préconverti.

**Workaround actuel (v0.1.x)** : utiliser Whisper Large v3 pour FR/multilangue.

**Plan fix (v0.2.0+)** :
1. Convertir NVIDIA Parakeet TDT 0.6B v3 (NeMo) → format sherpa-onnx (encoder+decoder+joiner+tokens)
2. Remplacer transcribe-rs par sherpa-rs côté backend Parakeet uniquement (Whisper reste sur transcribe-rs)
3. Activer `supports_language_selection: true` pour Parakeet V3
4. Passer `validated_language` dans les params sherpa-rs transducer
5. Tester FR/EN/ES/DE en transcription réelle

**Effort estimé** : 2-3 jours (ML conversion + Rust refactor + tests).
**Tracker** : voir GitHub issue dédiée.
