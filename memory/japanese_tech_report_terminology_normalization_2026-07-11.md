---
title: Japanese tech report terminology normalization and output length gate
project: smj-ks-pos
type: lesson
status: archived
source:
  - Codex session 2026-07-11: review and improve japanese-tech-report spoken terminology behavior
  - skills/doc-authoring/japanese-tech-report/SKILL.md
  - skills/doc-authoring/japanese-tech-report/references/terminology-normalization.md
  - skills/doc-authoring/japanese-tech-report/references/spoken-repair-and-thinking.md
  - skills/repo-tools/skill-quality-eval/tests/pm-control-skill-tests.json
tags:
  - japanese-tech-report
  - spoken-japanese
  - terminology
  - katakana
  - thinking-pause
  - spoken-repair
  - skill-quality-eval
scope: historical
captured_at: 2026-07-11
validity: historical_context
promote_to_knowledge: false
---

# Japanese Tech Report Terminology Normalization

The `japanese-tech-report` skill was updated after inconsistent outputs were observed in spoken Japanese and Japanese/katakana terminology selection.

Key changes:

- Added an output-length gate so a sentence rewrite stays short, a single-topic explanation stays compact, and only a report or rehearsal expands into the full meeting flow with Q&A.
- Added `references/terminology-normalization.md` with a context-sensitive selection order and two canonical mappings: Japanese expressions that should normally become common katakana IT terms, and unnecessary katakana/buzzwords that should normally become clearer Japanese.
- Defined ambiguous mappings by meaning, including incident recovery versus schedule recovery and business commitment versus source-control commit.
- Normalized reusable spoken examples from raw `Mobile`, `Web`, `Front`, and `SIP Phone` to `モバイル`, `ウェブ`, `フロントエンド`, and `SIP電話` where they are generic visible terms.
- Replaced stale evaluator evidence with checks for the output-length gate, terminology matrix, canonical terms, and absence of those raw English terms in the main spoken examples.

The skill-quality score improved from `83.2` with two failed evidence items to `93.0` with no failed evidence. Skill validation and workspace rule lint passed.

## Spoken Repair And Thinking Follow-up

Later in the same session, the skill was extended with `references/spoken-repair-and-thinking.md` to support natural speech while the speaker is still thinking.

The reference separates internal and customer registers and provides reusable phrases for thinking time, short pauses, apology severity, self-correction, rephrasing, returning to a topic, partial answers, and clarification questions. The main skill now requires these phrases for live conversation, rehearsal, difficult explanations, and speaking practice when useful.

Guardrails limit support phrases to one or two per short chunk, require the speaker to return to the technical point immediately, and forbid weakening a confirmed fact merely to sound softer. Evaluator evidence was extended for all new categories and continued to pass with a `93.0` score.
