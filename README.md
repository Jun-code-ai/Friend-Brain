# Brain of My Friend — Trading Decision Model

This folder contains the complete recorded trading knowledge of my friend — a consistently profitable trader with 6/6 profitable months, ~55% win rate, and $21.8K profit from 34 trades (Jan-Jun 2026).

## Purpose

To build a comprehensive standalone decision-making model from his live Zoom training sessions. This becomes the "secret sauce" reference layer for the FVG Signal Analyzer trading app.

## Folder Structure

```
friend-brain/
├── videos/           ← Raw Zoom recordings (MP4)
├── transcripts/      ← Extracted audio transcripts (TXT)
├── analysis/         ← Claude's per-session breakdowns (MD)
├── decision-model/   ← Compiled complete model (MD)
└── README.md         ← This file
```

## Processing Pipeline

1. ✅ **Upload**: New Zoom recordings go into `videos/` — 2 sessions loaded
2. ✅ **Transcribe**: Audio extracted to text in `transcripts/` — 6 transcripts extracted
3. ✅ **Analyze**: Claude Code dissects frame-by-frame in `analysis/` — 2 sessions analyzed
4. ✅ **Compile**: Insights merged into `decision-model/` — v1.0 compiled

## What Claude Code Extracts

- Which charts and timeframes he uses for each action
- How he draws support and resistance lines
- Entry and exit timing judgment
- RR setting methodology
- Candlestick pattern identification (hammer, inverted hammer, engulfing, etc.)
- Multi-timeframe cross-referencing logic
- Multi-pair analysis (crypto, gold, silver)
- News avoidance rules (FOMC, NFP, CPI)
- Human intuition and discretionary judgment
- Reversal identification techniques
- Playing range and discount/premium zone assessment
- Dow Theory implementation

## Usage

Tell Claude Code:
- "Analyze the new video in friend-brain/videos/"
- "Update the decision model with the latest analysis"
- "Compare friend's latest strategy against the FVG app implementation"
- "Find gaps between friend's manual approach and the algorithm"

## Status

- Videos: 2 uploaded (Week 1 Day 2 & Day 3 — MP4 + M4A audio)
- Transcripts: 6 extracted (3 per session, .docx — meeting notes + timeline + full transcript)
- Video frames: **779 extracted + pixel-analyzed** (384 Day2 + 395 Day3)
- Pixel-level verification: **17 elements CONFIRMED** across both sessions
- Sessions analyzed: 2 (fully dissected with frame-level evidence)
- Decision model version: **v2.0** (complete executable logic with pixel-verified implementation)

### Latest Analysis
| Session | Date | Topics | Analysis File |
|---------|------|--------|---------------|
| Week 1 Day 2 | 2026-06-10 | Triangle patterns, Fibonacci, timeframe hierarchy, candlestick codes | `analysis/2026-06-10_Week1_Day2_*.md` |
| Week 1 Day 3 | 2026-06-11 | Position sizing, R:R math, STO, MACD divergence, trading checklist | `analysis/2026-06-11_Week1_Day3_*.md` |

### Decision Model Coverage
- ✅ Timeframe hierarchy (standard + proprietary 45D-15m MACD scan)
- ✅ 6-step trading checklist with confidence scoring
- ✅ Candlestick code system (美女/胖妞/吞没/早晨之星/黄昏之星)
- ✅ S/R drawing methodology (3-touch + flipped + EMA52)
- ✅ Entry timing (limit/stop/market/scale-in protocols)
- ✅ Exit timing & trade duration definitions
- ✅ R:R mathematics (breakeven table + position sizing formula)
- ✅ Stop loss calculation (Brainless Method A + Chart Method B)
- ✅ Multi-pair analysis (BTC dominance cascade, correlation matrix)
- ✅ News avoidance (FOMC/NFP/CPI + 21:00 US open reversal pattern)
- ✅ MACD zero-axis multi-timeframe system
- ✅ STO (9,3,3) indicator settings and usage
- ✅ Fibonacci hunting range methodology
- ✅ Trader psychology & discretionary layer
- ⬜ MACD timeframe deep dive (promised for Week 2)
- ⬜ Fibonacci reverse extension (promised for future)
- ⬜ Position pyramiding strategy (mentioned, not detailed)
- ⬜ Trailing stop methodology (referenced, not taught)
