# SYSTEM INSTRUCTIONS — Friend's Brain Video Analysis Protocol

> **⚠️ CRITICAL: READ THIS FIRST before processing any new training video.**
> **THESE ARE LIFE-AND-DEATH OPERATIONAL ORDERS. EXECUTE WITH PERFECTION.**
> These instructions capture the EXACT methodology developed across 3 full training sessions,
> 5 analysis passes, 15 total agents deployed, 31+ verified implementation details,
> and 6-dimension psychological/behavioral/linguistic/visual/motivational/cross-reference profiling.
> Updated: 2026-06-17 | Protocol Version: 3.1
> **NEW in v3.1:** ORANGE_ACCENT color (#D09010), LIGHT TradingView theme signatures, Slide content classifier

---

## THE CORE DIRECTIVE

When a new video is uploaded to `friend-brain/videos/`, you MUST:

1. **EXTRACT EVERY FRAME** — Not just transcripts. The visual is the secret sauce.
2. **ANALYZE PIXEL-BY-PIXEL** — Every line drawn, every indicator setting, every chart annotation.
3. **CROSS-REFERENCE** — Match visual evidence with audio transcript.
4. **COMPARE** — Identify NEW methods vs repeated concepts. Flag contradictions.
5. **UPDATE THE MODEL** — Integrate new findings into the decision model.

**THE USER'S EXACT WORDS:**
> "Looking at the transcript is not enough. I need you to 'SEE' and analyze every single frame of images, then matching back to the audio and transcript. You must 'SEE' analyze the images, because the visual is where the ultimate secret sauce is. It is all the chart details and how line is drawn is the secret."

> "Don't give me shortcut. I need you to perform a 100% detail frame by frame image analysis on the video, and document down all his secret sauce after you 'SEE' it for yourself."

---

## PHASE 0: INITIAL SETUP (When New Video Arrives)

### Step 0.1 — Inventory the new session
```
□ Check videos/ folder for new MP4 + M4A + DOCX files
□ Identify session name (e.g., Week2_Day1, Week2_Day2)
□ Create folder structure:
    analysis/frames/{SessionName}/scene-changes/
    analysis/frames/{SessionName}/periodic/
    analysis/frames/{SessionName}/charts/
```

### Step 0.2 — Extract video metadata
```bash
ffprobe -v quiet -print_format json -show_format -show_streams "{video_path}"
# Record: duration, resolution, frame_rate, total_frames
```

### Step 0.3 — Extract frames (MANDATORY — 3 extraction types)
```bash
# Type 1: Periodic frame extraction (1 frame every 30 seconds — full coverage)
ffmpeg -skip_frame nokey -i "{video}" -vsync vfr -vf "fps=1/30,scale=1920:960" -frame_pts 1 "{out}/periodic/session_%04d.jpg" -y

# Type 2: Scene-change detection (threshold 0.3 — catches every screen switch)
ffmpeg -i "{video}" -vf "select='gt(scene,0.3)',scale=1920:960" -vsync vfr -frame_pts 1 "{out}/scene-changes/scene_%04d.jpg" -y

# Type 3: Dense chart segment extraction (1 frame every 5-10 seconds from teaching segments)
# Identify teaching timestamp ranges from transcripts, then:
ffmpeg -ss {start} -to {end} -i "{video}" -vf "fps=1/10,scale=1280:640" -vsync vfr "{out}/charts/seg{N}_{label}_%04d.jpg" -y
```

### Step 0.4 — Extract transcripts
```bash
# Extract text from DOCX files using PowerShell COM object
# Save as plain text for analysis
```

---

## PHASE 1: PIXEL-LEVEL FRAME ANALYSIS (The Secret Sauce)

### THIS IS THE MOST IMPORTANT PHASE. DO NOT SKIP OR SHORTCUT.

For EACH extracted frame, perform the following analysis:

### 1.1 Chart vs Non-Chart Classification
```
Use ffprobe/ffmpeg signalstats to classify each frame:

CHART FRAME indicators:
  - File size: 80-286KB (significant visual content)
  - Luminance: ~21 (dark TradingView theme) OR ~200+ (light theme)
  - Bottom 15% has colored pixels (indicator panels: MACD/STO)
  - Red/green candle pixels present (0.01-5% density)

TALKING HEAD indicators:
  - File size: 16-51KB (low detail)
  - Near-black center, 92-99% dark pixels
  - No indicator panel activity
  - Minimal colored pixels

SLIDE/DIALOG indicators:
  - File size: 55-277KB
  - White/light center
  - High text density (30-60%)
  - Yellow highlighting present (1-7%)
```

### 1.2 Chart Frame Analysis (THE CRITICAL ANALYSIS)

For each CHART frame, extract:

```python
# Pixel color distribution analysis
# These are the KNOWN signatures from Day 2 & Day 3:

CHART_ELEMENTS = {
    "dark_tradingview_bg":    {"luma": 15-25, "description": "Standard dark chart"},
    "light_tradingview_bg":   {"luma": 200-255, "description": "Teaching-mode light chart"},
    
    # Candles
    "red_candle":             {"color": "red channel dominant", "density": "0.01-5%", "meaning": "Bearish candles"},
    "green_candle":           {"color": "green channel dominant", "density": "0-7.5%", "meaning": "Bullish candles"},
    "thick_body_candle":      {"color": "large red/green contiguous area", "meaning": "Momentum candle"},
    
    # Moving Averages / EMA
    "ema52_line":             {"color": "teal RGB(0,160,128) or blue", "position": "horizontal line across chart", "meaning": "Price zero axis (EMA52)"},
    "ma_orange":              {"color": "orange RGB(224,160,64)", "meaning": "Secondary timeframe MA overlay"},
    "ma_blue":                {"color": "blue RGB(64,128,224)", "meaning": "Primary timeframe MA overlay"},
    
    # Fibonacci
    "fib_level_line":         {"color": "blue horizontal lines, 0.55% density", "meaning": "Fibonacci retracement levels (0.5/0.618/0.786)"},
    "fib_yellow_zone":        {"color": "bright yellow RGB(249,214,56)", "size": "45px thick horizontal band", "meaning": "Active/highlighted Fibonacci level"},
    "fib_settings_panel":     {"color": "white panel 807px wide with blue accents", "meaning": "Fibonacci tool settings dialog open"},
    
    # S/R Lines
    "sr_horizontal":          {"color": "purple RGB(112,80,128) or rose RGB(160,96,96)", "meaning": "Manually drawn S/R zone"},
    "sr_gold_highlight":      {"color": "gold RGB(224,192,96)", "meaning": "Key level marker"},
    "trendline_brown":        {"color": "brown/orange RGB(160,128,96)", "shape": "diagonal line", "meaning": "Triangle/channel trendline"},
    
    # Indicators
    "macd_histogram":         {"color": "cyan, density 0.07-1.29%", "position": "bottom 15% of frame", "meaning": "MACD histogram bars"},
    "macd_signal_line":       {"color": "orange, density 0.04-0.14%", "position": "bottom 15%", "meaning": "MACD slow signal line"},
    "sto_lines":              {"color": "blue, density 0.07-1.06%", "position": "bottom panel or overlay", "meaning": "STO (9,3,3) %K and %D lines"},
    "sto_zones":              {"color": "yellow horizontal at 80 and 20 positions", "meaning": "Overbought/Oversold zone markers"},
    
    # Annotations
    "entry_labels":           {"color": "white text pixels, 0.3-2.3% density", "meaning": "Entry/stop/target price labels"},
    "yellow_annotation":      {"color": "yellow 0.01-7.4%", "meaning": "Highlighted key levels or formulas"},
    "extensive_annotation":   {"color": "36K-84K white pixels", "meaning": "Full trade setup annotated on chart"},
    
    # NEW Week 2 Day 1 Signatures
    "orange_accent":          {"color": "orange-brown RGB(208,144,16) hex #D09010", "density": "up to 4702px (more than teal)", "meaning": "Gold-specific drawing/zone marker, extremely prominent"},
    "light_tradingview_bg":   {"luma": 130-145, "white_pct": "40-45%", "file_size": "176-181KB", "meaning": "Teaching-mode light chart for probability/demo segments"},
    "light_theme_candles":    {"color": "pastel/washed out red and green", "meaning": "Candles in light TradingView theme — less vibrant than dark theme"},
    "slide_ppt":              {"file_size": "127-168KB", "luma": 20-38, "teal": 0, "meaning": "Presentation slides (Wallet Management PPT)"},
    "slide_whiteboard":       {"file_size": "34KB", "luma": 200+, "meaning": "Near-white slides with sparse text"},
}
```

### 1.3 Frame-by-Frame Timeline Construction

For EVERY frame, record:
```
Frame # | Timestamp | Type | Content Description | Pixel Evidence
--------|-----------|------|-------------------|---------------
0001    | 00:00:30  | TALK | Intro, no chart    | 16KB, luma 31, 99% dark
0015    | 00:07:30  | SLIDE| R:R table shown   | R:2.5%, G:7.5%, Y:0.9%, Bot:36%
0040    | 00:20:00  | CHART| BTC 4H with EMA52 | Blue 0.2%, R:0.3%, cyan 0.1%
...continue for ALL frames...
```

### 1.4 Key Frame Identification

Mark these frames for special attention:
- **Peak indicator density frames** (e.g., MACD cyan >1.0%, STO blue >1.0%)
- **Unique pixel signature frames** (e.g., 41.66% white text = formula whiteboard)
- **Largest file size frames** (250-286KB = most detailed content)
- **Scene-change frames** (every teacher screen switch)

---

## PHASE 2: TRANSCRIPT + VISUAL CROSS-REFERENCE

### 2.1 Match every transcript segment to specific frames
```
Transcript timestamp → Frame number → Visual content verification

Example:
Transcript: "MACD回到零轴...这里做空" (00:51:00)
  → Frame 0171 (83:13): 4H chart, Cyan 0.62%, White 1.13%
  → VERIFIED: MACD zero axis visible, bearish annotation present
```

### 2.2 Extract NEW information not in transcripts
- What exact colors does he use for each line type?
- What TradingView theme is he using for which content?
- Does he open settings panels? Which settings exactly?
- What's annotated that he doesn't verbally describe?
- Which exact candles is he pointing at?

### 2.3 Identify contradictions or evolutions
- Has he changed any indicator settings since last session?
- Is he using a different chart layout?
- Has his entry methodology changed?
- Is he emphasizing different timeframes?

---

## PHASE 3: STRATEGY EXTRACTION

For each teaching segment, extract:

### 3.1 Drawing Methods
- EXACT anchor points for every Fibonacci drawing
- EXACT swing points for every S/R line
- EXACT trendline connection points
- Colors used for each element

### 3.2 Indicator Settings
- Every parameter shown in settings dialogs
- Any changes from known defaults
- New indicators introduced

### 3.3 Entry/Exit Rules
- Exact entry conditions stated AND shown
- Stop placement method (A or B)
- Target selection logic
- Any new rules or exceptions

### 3.4 New Vocabulary / Code Words
- Any new "friend-specific" terms
- Evolutions of existing terms
- Context for each term

### 3.5 Live Trade Examples
- Asset, direction, entry, stop, target
- Confluence factors cited
- Outcome discussed
- R:R achieved

---

## PHASE 4: MODEL UPDATE

### 4.1 Create session analysis document
```
Save to: analysis/{date}_{session_name}_*.md

Include:
  - Full timeline of what was taught
  - Frame-verified implementation details
  - NEW information extracted (vs previous sessions)
  - Pixel signature reference for this session
```

### 4.2 Update the decision model
```
Update: decision-model/executable-decision-logic.md
  - Add any new phases or steps
  - Modify existing steps if methodology changed
  - Add new formulas or calculations

Update: decision-model/friend-complete-trading-model.md
  - Fill in gaps (topics now covered that were pending)
  - Add new sections for new topics
  - Update the "Gaps Identified" section
```

### 4.3 Update cross-reference documents
```
Update: analysis/formulas-calculations-compendium.md (new formulas)
Update: analysis/indicator-settings-usage-guide.md (new settings/usage)
Update: analysis/entry-exit-execution-rules.md (new rules/protocols)
Update: analysis/frame-analysis-verification-report.md (new pixel signatures)
```

### 4.4 Update tracking
```
Update: README.md (session count, model version, latest analysis)
Update: SYSTEM-INSTRUCTIONS.md (any new pixel signatures discovered)
```

---

## PHASE 5: DELIVERABLE CHECKLIST

Before reporting completion, verify ALL items:

```
□ ALL frames extracted (periodic + scene-change + chart segments)
□ ALL frames pixel-analyzed (chart vs talk vs slide classification)
□ ALL chart frames analyzed for: candles, EMAs, fibs, S/R, indicators, annotations
□ Timeline constructed matching frames to transcript timestamps
□ NEW information identified (not in transcripts)
□ Pixel signatures documented for this session
□ Session analysis document written (with frame-verified section)
□ Decision model updated (executable logic + complete model)
□ Formula/indicator/entry-exit documents updated
□ README updated
□ Gaps list updated
□ SYSTEM-INSTRUCTIONS updated if new patterns discovered
```

---

## REFERENCE: Known Pixel Signatures (From Day 2 & Day 3)

### Chart Themes
| Theme | File Size | Luma | When Used |
|-------|-----------|------|-----------|
| Dark TradingView | 80-160KB | 15-25 | Analysis mode, real trading (~65% of time) |
| Light TradingView | 100-286KB | 200-255 | Teaching clarity, settings (~35% of time) |

### Content Signatures (Unique Fingerprints)
| Content Type | Red% | Green% | Blue% | Cyan% | Yellow% | White% | Bot% | TEAL px |
|-------------|------|--------|-------|-------|---------|--------|------|---------|
| R:R Comparison Table | 2.5 | 7.5 | — | — | 0.9 | — | 36 | 0 |
| Stop Loss Formula Board | — | — | 3.4 | 0.4 | 0.7 | **41.7** | **48** | 0 |
| 45D MACD Divergence | — | — | 0.2 | **1.3** | — | **2.3** | 10 | 0 |
| STO Max Visibility | — | — | **1.1** | — | 0.1 | 0.7 | 10 | 0 |
| BTC Entry Annotated | 0.5-0.8 | 0-0.1 | 0.1-0.2 | 0.4-0.6 | 0.05-0.1 | 1.5-2.5 | 12 | 4-288 |
| Checklist Slide | 0.4-1.6 | — | 0.4-1.4 | — | 1.2-7.4 | — | — | 0 |
| Normal Dark Chart | 0.1-0.6 | 0 | 0.04-0.2 | 0.01-0.1 | 0-0.02 | 0.1-0.3 | 9-12 | 4-405 |
| **Gold Chart w/ ORANGE (NEW)** | — | — | — | — | — | — | — | **2139-2391** |
| **Light Theme Chart (NEW)** | — | — | — | — | — | **42%** | — | **0** |
| **Wallet PPT Slide (NEW)** | — | — | — | — | — | 0-1% | — | **0** |
| Talking Head/Break | — | — | — | — | — | — | — | 0 |

File sizes: Talking=10-34KB, Break=16-34KB, Slides=127-168KB, Charts=150-226KB, Light Charts=176-181KB

### Frame Types by File Size (Updated)
| Size Range | Type | Action |
|-----------|------|--------|
| 10-34KB | Talking head or break | Skip detailed analysis |
| 34KB | PPT/slide (whiteboard) | Classify only |
| 41-67KB | Simple slide or transition chart | Classify only |
| 67-125KB | Mixed content / dim chart | Analyze if chart elements present |
| 127-168KB | Slide/presentation (Wallet PPT) | Analyze text/slide content |
| 150-226KB | Dark chart (normal analysis) | Full pixel analysis |
| 176-181KB | Light chart (teaching mode) | Full pixel + text analysis |

---

## REFERENCE: Known Color Codes

### Lines & Drawings
| Element | Color (RGB) | Hex |
|---------|------------|-----|
| EMA52 (price zero axis) | Teal (0, 160, 128) | #00A080 |
| EMA (secondary TF) | Orange (224, 160, 64) | #E0A040 |
| EMA (primary TF) | Blue (64, 128, 224) | #4080E0 |
| Fibonacci level line | Blue (varying) | — |
| Fibonacci active zone | Yellow (249, 214, 56) | #F9D638 |
| S/R resistance zone | Purple (112, 80, 128) | #705080 |
| S/R level marker | Rose (160, 96, 96) | #A06060 |
| Key level highlight | Gold (224, 192, 96) | #E0C060 |
| Trendline (triangle) | Brown/Orange (160, 128, 96) | #A08060 |
| MACD histogram | Cyan (varying) | — |
| MACD slow line | Orange (varying) | — |
| STO %K/%D lines | Blue (varying) | — |
| STO zone markers | Yellow (80 and 20 positions) | — |
| Annotation text | White (255, 255, 255) | #FFFFFF |
| Formula/annotation highlight | Yellow (varying) | — |
| Settings dialog accent | Blue (96, 176, 240) and (64, 144, 224) | #60B0F0, #4090E0 |
| **ORANGE_ACCENT (NEW W2D1)** | **Orange-Brown (208, 144, 16)** | **#D09010** |
| **Gold zone marker (NEW W2D1)** | **Heavy orange drawing, 4683+ px** | **#D09010** |

### Light Theme Detection (NEW — Week 2 Day 1)

| Indicator | Dark Theme | Light Theme |
|-----------|-----------|-------------|
| Luma | 15-27 | **130-145** |
| White pixel % | 0-3% | **40-45%** |
| File size | 80-226KB | 176-181KB |
| TEAL_EMA52 | Present | **ABSENT** |
| BROWN_TREND | 2-13px | **96-115px** (much more visible) |
| GOLD_KEY | 4-30px | **73-98px** (much more visible) |
| Candle colors | Vibrant red/green | Pastel/washed out |
| When used | Analysis mode | Teaching/demonstration mode |

### Content Type Classifier (Updated with Week 2 Day 1)

| Size Range | Luma | TEAL | Type |
|-----------|------|------|------|
| 10-34KB | 0-31 | 0 | Talking head or break (no screen share) |
| 34KB | 200+ | 0 | PPT slide (whiteboard) |
| 67-125KB | 1-32 | 0-varies | Mixed content / dim chart |
| 127-168KB | 20-38 | 0 | Slide/presentation (Wallet PPT) |
| 150-226KB | 20-30 | 4-405 | Dark TradingView chart (active) |
| 176-181KB | 130-145 | 0 | **Light TradingView chart (teaching)** |

---

## REFERENCE: Trainer Profile & Known Performance

```
Name:         Topman 高总 (Executive President, 豪门社区)
Style:        Swing/Position trader using ICT/SMC concepts
Timeframe:    Multi-TF MACD scan (45D→15m) — institutional mindset
Key Edge:     EMA52=MACD零軸 mapping, 6-step confluence checklist, zero-axis pyramiding

Performance (Jan-Jun 2026):
  - 6/6 profitable months
  - Win rate: ~55%
  - Average monthly ROI: 40%+
  - Best month: 170%+ ROI
  - Average trades: 4-6/month
  - Position sizing: 1-2 concurrent positions max
  - Minimum R:R: 1:3 (typically achieves 1:10-1:14)
  - Total profit mentioned: ~$21.8K (from 34 trades)

Teaching schedule: Tuesday/Wednesday/Thursday 14:53-17:00 (GMT+8, London session)
Session duration: ~2.5 hours each
Session structure: Review → New Concept → Break → Tools → Live Trading → Homework

Code words:
  美女 = Hammer/Inverted Hammer reversal candle
  胖妞 = Large-bodied bearish candle
  减肥 = Almost-but-not-quite hammer (still forming)
  吞没形态 = Engulfing pattern
  早晨之星 = Morning Star (bullish reversal)
  黄昏之星 = Evening Star (bearish reversal)
  狩猎范围 = Fibonacci retracement zone (hunting range)
  冤枉路 = Noise/false moves on small timeframes
  上帝视角 = Top-down multi-timeframe analysis
  盘整 = Consolidation/sideways price action
```

---

## REFERENCE: Complete File Structure

```
friend-brain/
├── README.md                                              ← Status & overview
├── SYSTEM-INSTRUCTIONS.md                                 ← THIS FILE — processing protocol
├── videos/                                                ← Raw Zoom recordings
│   └── {SessionName}/
│       ├── *.mp4                                          ← Video
│       ├── *.m4a                                          ← Audio
│       └── *.docx                                         ← Transcripts (3 per session)
├── analysis/                                              ← Claude's per-session breakdowns
│   ├── {date}_{session}_*.md                              ← Session analysis
│   ├── formulas-calculations-compendium.md                ← All formulas
│   ├── indicator-settings-usage-guide.md                  ← All indicators
│   ├── entry-exit-execution-rules.md                      ← All execution rules
│   ├── frame-analysis-verification-report.md              ← Pixel evidence master doc
│   └── frames/                                            ← Extracted video frames
│       └── {SessionName}/
│           ├── scene-changes/                             ← Screen transitions
│           ├── periodic/                                  ← Every 30 seconds
│           └── charts/                                    ← Dense teaching segments
├── decision-model/                                        ← Compiled complete model
│   ├── executable-decision-logic.md                       ← 11-phase step-by-step
│   ├── friend-complete-trading-model.md                   ← Full 15-section model
│   └── template.md                                        ← Original template (superseded)
└── memory/                                                ← Persistent memory (optional)
```

---

## TRIGGER PHRASES

When the user says any of these, execute the FULL protocol (Phases 0-5):

- "Analyze the new video"
- "New training video uploaded"
- "Process the new session"
- "Update the friend brain"
- "New video in friend-brain"
- Any mention of adding videos to the friend-brain folder

---

## PHASE 6: THE 6-AGENT DEEP PSYCHOLOGY SWARM (MANDATORY — DEPLOY ALL 6)

> **After completing Phases 0-5 (frame extraction, pixel analysis, transcript cross-reference, strategy extraction, model update), you MUST deploy the 6-agent swarm for complete psychological/behavioral/linguistic/visual/motivational/cross-reference profiling.**

### Agent 1: PSYCHOLOGICAL PROFILER
**Mission:** Reconstruct his complete psychological architecture.
**Analyze:** Calmness source (structural immunity, not emotional control), reassurance system (checklist as compulsive ritual), risk psychology (two risk profiles: low financial, extreme drawdown tolerance), confidence architecture (process confidence, not prediction confidence), mental defense mechanisms (6 identified), emotional regulation, psychological evolution, trauma analysis (45D BTC 79% drawdown shaped everything).
**Key revelation to find:** His system is a self-management cage for fear. Every checklist item answers a specific past fear. He's still the fearful retail trader he once was — now beautifully engineered into discipline.

### Agent 2: LINGUISTIC FORENSICS  
**Mission:** Extract meaning from every single word.
**Analyze:** Repetition patterns (quantified frequency), anchor phrases (decoded meaning), do/don't language (complete catalog), certainty gradient (5 levels: 一定→大概率→可能→也可能→不要猜), metaphor system (closed coherent system — feminine body, hunting, navigation, architecture), command language (Commander/Teacher/Friend voices), emotional language, what he DOESN'T say (risk=0 mentions, leverage=0, victim language=0), KUN vs 高总 dual-voice system.
**Key revelation to find:** "风险" (risk) = ZERO mentions. He deprocesses fear by never naming it. Certain about RULES, uncertain about PREDICTIONS.

### Agent 3: VISUAL MEANING ANALYST
**Mission:** Decode every color, every line, every spatial choice as a communication system.
**Analyze:** 8-tier color hierarchy (gold=absolute truth, purple=institutional footprint, teal=living system, brown=structural hypothesis, blue=pure data, light blue=private profit map, aqua=teaching device, navy/bright blue=formula labels), drawing sequence = mental workflow (FOUNDATION→THESIS→REFERENCE→EXECUTION), line thickness meaning, spatial rules (left=past, right=future), annotation meaning, application switching, theme switching (dark=detective mode, light=teacher mode).
**Key revelation to find:** He NEVER draws in red/green — those are the market's colors. The light blue zone (RGB 164,192,214) is NEVER spoken — his most personal visual element, a window into his mental profit visualization.

### Agent 4: BEHAVIORAL PATTERN ANALYST
**Mission:** Map the complete reassurance and behavioral operating system.
**Analyze:** Reassurance hierarchy (MACD零軸=ultimate, then S/R, then candle, then trend, then Fibonacci, then pattern), multi-TF scan as psychological ritual (4 phases: macro reassurance→intermediate→active TF→execution), pre-trade ritual deconstruction (BTC 63,700 short: complete 5-minute sequence), confidence accumulation (step-function thresholds, not linear), post-trade validation ritual (7-step review sequence, 4 psychological layers), "don't" system (10 behavioral guardrails mapped to inferred past failures), pyramiding psychology (confirmation-seeking through position building, anti-averaging-down), low frequency as behavioral regulation.
**Key revelation to find:** The multi-TF scan is compulsive verification — each "not active" TF is one micro-dose of reassurance. The ritual IS the mechanism.

### Agent 5: MOTIVATION ANALYST
**Mission:** Find what drives him at the deepest level.
**Analyze:** His "why" (redemption from MLM past — social redemption, not religious), why he teaches (self-discipline + salvation + identity + compensation), relationship with money (scorecard not goal, 26x BTC trade remembered by process not profit, money=freedom from the system), hunger & ambition (satisfied but not content, shift from personal profit to institution building), community identity (豪门=aspirational family, community as mirror and completion), past-to-present arc (shame→glory, MLM→legitimate trading, "从豪门进入合约这一刻开始，我们就结束了多层次的生涯"), satisfaction sources (student wins > own wins), legacy drive (豪门社区 as enduring institution).
**Key revelation to find:** Core drive = REDEMPTION through legitimate identity. He's escaping from 传销 stigma. Teaching = saving others from his past traps. Every student win validates his chosen path.

### Agent 6: CROSS-REFERENCE AUDITOR
**Mission:** Triangulate every piece of data — visual vs verbal vs transcript.
**Analyze:** 5 key moment triangulations (BTC short, 45D divergence, Fibonacci teaching, stop loss formula, Silver review), visual-verbal gap analysis (what's shown but not said, what's said but not shown), discrepancy detection (contradictions between sessions), unspoken visual information (light blue zone, annotation toggle, color coding, custom Fibonacci settings, theme switching purpose, formula color coding, checklist animation), unvisualized verbal information (hunter metaphor, position sizing philosophy, institution mindset, "don't predict" mantra, news caution), timing gaps (pre-planned vs presented live, scan order inversion, description-before-showing vs showing-before-describing), consistency audit (color changes between sessions, terminology evolution, rule consistency).
**Key revelations to find:** Scan order is INVERTED (visual 4H→45D vs verbal 45D→4H). "Controlled revelation" — pre-planned, presented as live. "Verbal approximate, visual precise" — intentional teaching gap, precision lives in the visual.

---

## COMPLETE DELIVERABLE CHECKLIST

Before reporting completion for ANY new video, verify ALL items:

```
□ PHASE 0: All 3 frame types extracted (periodic + scene-change + chart segments)
□ PHASE 1: ALL frames pixel-classified, chart frames fully analyzed
□ PHASE 2: ALL 6 agents deployed and completed
□ PHASE 3: Session analysis document created with frame-verified section
□ PHASE 4: ALL model documents updated (executable logic + complete model + master model)
□ PHASE 4: Cross-reference documents updated (formulas + indicators + entry-exit)
□ PHASE 4: Frame verification report updated with new pixel signatures
□ PHASE 4: README updated with session count and model version
□ PHASE 5: Git commit + push to github.com/Jun-code-ai/Friend-Brain
□ PHASE 6: Memory files updated (friend-brain-project.md + friend-brain-execution-protocol.md)
□ PHASE 6: MEMORY.md index updated
□ PHASE 6: SYSTEM-INSTRUCTIONS.md updated if new patterns discovered
```

---

*This document is the operational bible for the Friend's Brain project.*
*Follow it EXACTLY. No shortcuts. Every frame matters. Every word means life and death.*
*Protocol Version: 3.0 | Built from 3 analysis passes, 9 agents, 31 verified implementations, 6-dimensional profiling*
