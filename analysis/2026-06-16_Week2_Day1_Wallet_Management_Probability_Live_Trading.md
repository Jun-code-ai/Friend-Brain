# Week 2 Day 1 — Complete Session Analysis

> **Session Date:** 2026-06-16 (Tuesday) 14:58-16:48 GMT+8 (~1h50m)
> **Trainer:** Topman 高总, Executive President — 豪门社区
> **Session Title:** 合约技术学习 (Contract Technical Learning) — Period 4
> **Video:** 2160×1080, 30fps, 6588s, 199,635 frames, 273MB
> **Frames Extracted:** 220 periodic + 32 scene-change + 358 chart-segment frames

---

## SESSION OVERVIEW

Week 2 Day 1 represents a significant evolution in the training curriculum. The session had two distinct halves:

**First Half (00:00-46:00):** Pure live market analysis — BTC, Gold, Silver, NEAR — with the 6-step checklist applied at speed to 4 different assets. Two live trades placed. This was the "application layer" demonstrating that Week 1's theoretical framework is now operational knowledge.

**Second Half (56:27-01:48:00):** Two MAJOR new frameworks introduced:
1. **Wallet Management (钱包管理)** — Complete 3-layer capital allocation system + Bullet Method
2. **Probability Stacking Framework** — Mathematical probability model replacing simple confidence scoring

These two frameworks are the bridge between theory (Week 1) and sustainable practice. They answer the question: "I know HOW to trade, but how do I MANAGE the money?"

## PART 0: FRAME-VERIFIED VISUAL ANALYSIS (Pixel-Level)

> All findings in this section are backed by direct Python PIL pixel measurements.

### 0.1 Scene-Change Frame Classification (32 frames analyzed)

| Frame | Timestamp | Size | Luma | Type | Key Findings |
|-------|-----------|------|------|------|-------------|
| scene_0003 | 00:00.1 | 10KB | 0 | TALK | Pure black (session start) |
| scene_0009 | 00:00.3 | 15KB | 31 | TALK | White text visible |
| scene_86535 | 48:04 | 23KB | 1 | TALK | Gold_key, brown_trend, orange present |
| scene_86929 | 48:18 | 133KB | 32 | **CHART_DARK** | **TEAL_EMA52(2139px)**, **ORANGE_ACCENT(4683px)** — massive orange signature |
| scene_87145 | 48:25 | 125KB | 32 | **CHART_DIM** | **TEAL_EMA52(2391px)**, **ORANGE_ACCENT(4702px)** |
| scene_92460 | 51:22 | 121KB | 21 | CHART_DIM | BROWN_TREND(361px), WHITE_TEXT(2388px) |
| scene_102734 | 57:04 | 181KB | 38 | CHART_DARK | Wallet Mgmt start — PURPLE_SR(125px) |
| scene_193259 | 1:47:22 | 176KB | **138** | **CHART_LIGHT** ⭐ | **FIRST LIGHT THEME** — 42% white, GOLD_KEY(77px), BROWN_TREND(115px) |
| scene_193706 | 1:47:37 | 197KB | 25 | CHART_DARK | Theme switch back — TEAL_EMA52(30px), RED_CANDLE(121px) |
| scene_193917 | 1:47:44 | 176KB | 138 | **CHART_LIGHT** | Back to light theme — WHITE_TEXT(10829px) |
| scene_194207 | 1:47:54 | 181KB | 138 | **CHART_LIGHT** | WHITE_TEXT(11753px) — max annotation density |
| scene_194621 | 1:48:07 | 196KB | 25 | CHART_DARK | Final dark theme return |
| scene_197607 | 1:49:47 | 34KB | **231** | **SLIDE** | Wallet PPT — near-uniform white, BLUE_ACCENT(33px) |

### 0.2 NEW PIXEL SIGNATURE: ORANGE_ACCENT (#D09010)

**Discovery:** Frame scene_86929 at 48:18-48:25 (Gold analysis continuation during break)

- **Color:** RGB(208, 144, 16) / hex #D09010
- **Massive presence:** 4683-4702 pixel hits per frame (MORE than TEAL_EMA52 at 2139-2391)
- **NOT in Week 1 reference palette** — this is a brand new drawing color
- **Context:** Gold (XAUUSD) chart analysis
- **Likely use:** Custom zone marker, horizontal ray, or indicator color specific to precious metals

### 0.3 NEW PIXEL SIGNATURE: LIGHT TRADINGVIEW THEME

**Discovery:** Frames at 1:47:22-1:48:09 (Probability stacking Q&A segment)

- **Theme characteristics:** luma ~138 (vs dark 21-27), 42% white pixels
- **Background:** RGB(~245, 246, 250) — very light blue-gray
- **Key difference from dark theme:**
  - BROWN_TREND massively more visible (96-115px vs 2-13px in dark)
  - GOLD_KEY more prominent (73-98px vs 4-30px in dark)
  - TEAL_EMA52: **NOT DETECTED** (absent in light theme layout)
  - Candles: pastel/washed out vs vibrant in dark theme
- **Usage context:** Probability demonstration with heavy annotations. Trainer switches to light theme for teaching clarity.
- **Theme switch pattern:** Dark(1:47:22)→Light→Dark(1:47:37)→Light(1:47:44)→Dark(1:48:07) — rapid toggling (every 5-15s) during Q&A

### 0.4 TEAL_EMA52 Timeline (Verified Zero-Axis Presence)

```
SEGMENT                           TEAL_EMA52    MEANING
─────────────────────────────────────────────────────────
BTC Analysis (00:00-10:22)        4-288 px      Chart active, EMA52 visible
Gold Analysis (10:22-19:51)       86-405 px     HIGHEST teal density of session
Silver Analysis (19:51-25:31)     83-294 px     Chart active
NEAR/HYPE (33:17-46:00)           80-170 px     Chart active
Break charts (48:18-48:25)        2139-2391 px  Peak Gold chart (massive orange too)
Wallet Management (59:30-86:00)   **ZERO**      Pure slides — NO chart visible
Probability demo (86:00-107:00)   Returns       Charts return
Light theme (107:22-108:09)       0             No EMA52 on light layout
```

### 0.5 Break Period Correction

The transcript labels 46:00-56:27 as "BREAK." However, frame analysis reveals:
- **48:04-51:22:** Active Gold chart analysis CONTINUES (TEAL_EMA52 at peak levels, massive ORANGE_ACCENT signature)
- **51:30-56:30:** Mixed talking head/dim chart content
- Actual music-only break: ~46:00-48:00 and 51:30-56:27
- **Correction:** Trainer continued analyzing Gold charts silently during break period

### 0.6 Content Classifier (Refined for Week 2 Day 1)

| File Size | Luma | Type |
|-----------|------|------|
| 150-226KB | 20-30 | DARK_TV Chart (active TradingView) |
| 127-168KB | 20-25 | SLIDE (presentation content) |
| 176-181KB | 130-145 | **LIGHT_TV Chart** (teaching mode) |
| 34KB | 200+ | WHITEBOARD/SLIDE (PPT) |
| 10-67KB | 0-31 | TALKING HEAD / WEBCAM |

---

## PART 1: LIVE MARKET ANALYSIS (First Half)

### 1.1 BTC Analysis (00:00-10:22)

**Multi-TF Scan Sequence:** Weekly → Daily → 4D → 12H → 1H

| TF | Finding | Action |
|----|---------|--------|
| Weekly | Downtrend, wave incomplete | Bearish bias |
| Daily | "下跌要反弹了" — downtrend with bounce potential | Fibonacci hunting range identified |
| Daily | Triangle pattern (三角形) | ~73,000-74,000 potential target zone |
| 4D | Price hit EMA52 resistance → dropped. MACD lines back to zero axis → falling. **DIVERGENCE appearing** | Divergence suggests upward potential before further down |
| 12H | Being suppressed (压制) | "空间更大" — more downside room (20% vs 10%) |
| 1H | "被主力顶住" — suppressed by smart money | Wait for 美女 at ~67,900 → SHORT |

**Key Insight — Divergence ≠ Immediate Reversal:**
> "背离出现了，只是证明它确实有可能要往上走一点，但是不一定是走上涨趋势，所以不要这么快去定义它会走上涨趋势"

Divergence means "it MIGHT go up a bit" — NOT "the trend reversed." This is critical nuance beyond Week 1's teaching.

**BTC Entry Plan:** Wait for price to reach ~67,900 → wait for 美女 on 1H → SHORT
- NOT entered during session (price not at level yet)

### 1.2 Gold (XAUUSD) Analysis (10:22-19:51)

**Multi-TF Scan:** Weekly → Daily → 8H → 6H → 45m → 30m → 1H

| TF | Finding |
|----|---------|
| Weekly | Downtrend, but weekly candle has 美女 (hammer) → potential bounce |
| Daily | Fibonacci hunting range entered. Triangle pattern. **MACD 底背离** (bullish divergence) |
| 6H/8H | Both suppressed → 6H is preferred active TF |
| 45m/30m/1H | All favoring long entry |

**NEW CONCEPT — Divergence Chain:**
> "更小的背离才形成大背离" — Smaller TF divergences combine to form the larger TF divergence

**Gold Long Setup (ANALYZED but NOT actively traded by trainer):**
- Entry: 4,306
- Stop: 4,285.9
- Target: 4,369
- R:R: 1:3
- **Post-session:** Trade was profitable

**Gold Short Setup (CONDITIONAL — waiting):**
- Entry: ~4,370.28 (only if 美女 candle forms there)
- Target: ~4,180
- Duration: 3-7 days
- Reason: 8H resistance zone

### 1.3 Silver (XAGUSD) Long — LIVE TRADE #1 (19:51-25:31)

**Multi-TF Scan:** Weekly → Daily → Fibonacci → 6H → 8H → 1H

| TF | Finding |
|----|---------|
| Weekly | Triangle (三角形) — "整个波段都是一个三角形" — consolidation |
| Daily | Mixed — "模糊" — confused signals. Resolved by following Gold's direction |
| Fibonacci | From swing low to range high → "整幅都是狩猎范围" — whole range is hunting zone |
| 6H/8H | Both suppressed (same as Gold) |
| 1H | "更好看" (cleaner) — market order entry trigger |

**Trade Specs:**
- Direction: LONG
- Type: Market order (市价做多)
- Stop: 68.85
- Target: 71.30
- R:R: ~1:1.5 (BELOW usual 1:3 minimum — trainer acknowledged: "盈亏比例不好...可以玩玩")
- Status: Profitable. Reached ~1:1 by mid-session
- Special rule: Close by 11:30PM if still ranging (metal rule)

**Mid-Trade Management Applied:**
> "把止损点移到你的进场价位，你待会哪怕他真的往下打，你亏的话，就亏个手续费"
— Move SL to breakeven at 1:1 R:R. First explicit teaching of this rule.

### 1.4 NEAR Long — LIVE TRADE #2 (33:17-46:00)

**Multi-TF Scan:** Weekly → Daily → 12H → 8H → 6H → 4H → 2H → 1H → 45m

| TF | Finding |
|----|---------|
| Weekly | **UPTREND** — price broke previous high, pulled back, re-rising |
| Daily | CONTRADICTION (矛盾体) — "高点更高，突然间又变个高点更低了" |
| 12H/8H/6H/4H | NO resistance on ANY timeframe ("都豁出去了") |
| 2H/1H | Clean — no obstacles |
| 45m | **Golden cross executing NOW** — "刚刚金叉就是我们进场的这个点位" |

**Key Rule — Weekly Overrides Daily:**
> "日图跟周图我会选择周图作为我的老大。因为天图它可能你分辨不出来，那你就用周图来分辨"
— When Daily and Weekly contradict, WEEKLY WINS. Only use Daily when it confirms Weekly.

**Trade Specs:**
- Direction: LONG
- Type: Market order (市价进场)
- Entry: ~2.28 (market)
- Stop: 2.287
- Target: 3.079
- R:R: ~1:1.4 (below usual minimum)
- Duration: Multi-day ("拿个几天的")
- Conviction: "B确定性蛮高的" — Very high
- Rationale for lower R:R: 5+ factors aligned, no resistance on ANY TF — "几乎必须的状态"

**Confluence Score:** MAXIMUM (5+ factors)
- Trend confirmed (Weekly bullish)
- S/R identified (broke prior high, retested)
- Pattern (breakout + retest)
- MACD (45m golden cross + daily MACD up)
- Fibonacci (hunting range entered + moving)
- NO resistance on ANY timeframe (rare — unique to this setup)

### 1.5 HYPE Review (33:17-35:14)

- Previous session trade: "差一点" (missed by a hair)
- Now near target: 1:4 R:R potential
- Trainer emotion: "浪费了，我也没进到" — Slight frustration but accepting
- Lesson: Even missed trades validate the system

### 1.6 Session Break (46:00-56:27)

- MC Yang Moyu hosted music break
- 10-minute intermission
- Trainer checked trades during break (Silver + NEAR both profitable)

---

## PART 2: WALLET MANAGEMENT (钱包管理) — Second Half

### 2.1 Why This Matters (Trainer's Opening)

> "不管你多会技术。钱包管理是永远最重要的，哪怕你真的不会技术，你只会钱包管理跟仓位管理你都可以把它玩的非常溜"

Translation: Even with ZERO technical skill, wallet management alone can make you profitable. Combined with technical skill, it's the unlock.

> "只改变了钱包管理以后，整个的交易历程是开挂的"

"After I changed my wallet management, my entire trading journey became god-mode."

### 2.2 The 3-Layer Capital Allocation

```
┌────────────────────────────────────────────────────────────┐
│                 TOTAL NET WORTH (总资产)                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  LAYER 1: 生存支出 (Survival) — ~50%                       │
│  ├── Living expenses (food, rent, utilities, insurance)    │
│  ├── DEBT REPAYMENT (housing, car, personal loans)          │
│  └── Multi-year runway (trainer: 10+ years secured)        │
│                                                            │
│  LAYER 2: 备用金 (Emergency) — 20-30%                      │
│  ├── Medical emergencies (family, self)                    │
│  ├── Accidents / unexpected major events                   │
│  └── Do NOT touch for investment                           │
│                                                            │
│  LAYER 3: 投资资金 (Investment Capital) — remaining ~30%   │
│  ├── ONLY this layer goes into trading/investing           │
│  ├── Aggressive: closer to 30% (if L1+L2 fully funded)     │
│  └── Conservative: 10-20%                                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Critical Rule:**
> "不管你投资什么...一定是在你的投资资金里面的其中一份"
— Whatever you invest in, it MUST be from Layer 3, and it must be ONE PORTION of Layer 3, not all of it.

### 2.3 The Bullet Method (子弹法)

```
FORMULA:
  Per-Bullet Size = Investment Capital ÷ 100

  Then allocate bullets:
  ├─ Testing / low conviction: 1 bullet (1%)
  ├─ Supportive investment: 3-5 bullets (3-5%)
  ├─ High conviction project: 5-10 bullets (5-10%)
  ├─ Trading allocation: 10-20 bullets (10-20%)
  └─ Max for anything: ~20 bullets (20%)

EXAMPLE (Trainer's Personal):
  50,000 U investment capital ÷ 100 = 500 U per bullet
  Trading: 20 bullets = 10,000 U for trading
  └─ 5,000 U spot (50%) + 5,000 U contract (50%)
```

### 2.4 Within-Trading Sub-Allocation

```
TRADING CAPITAL (e.g., 20 bullets):
  ├─ 50% = Spot/DCA (现货/定投) — long-term, passive
  └─ 50% = Contract/FX (合约/外汇) — active trading

PLATFORM SEPARATION RULE:
  ├─ NEVER keep all funds on one exchange
  ├─ NEVER keep all funds in one wallet
  └─ Spread across multiple platforms
```

### 2.5 Small Account Special Rules

| Account Size | Wallet Split | Trading Strategy |
|-------------|-------------|-----------------|
| <$1,000 | Skip 3-layer split — all-in to contracts | 70-80% copy-trade, 20-30% self-trade |
| $1,000-$10,000 | Simplified split | 10-20 parts within trading |
| ≥$10,000 | FULL 3-layer system | Bullet Method, 50/50 spot/contract |

> "1万以下，你就把它 all in 是没有问题的！因为你才八九千，你也发不了财，你才1000，他也发不了财，你有什么急用，他也可能不够用"

For tiny accounts: all-in on trading is acceptable BECAUSE $8K-9K spread across 3 layers can't generate meaningful returns. But you still split within trading!

### 2.6 The FTX/Luna Warning

> "币安的有一个对头是不是很牛逼的，在FTX的爆炸头...这么大的一个平台，它可以瞬间就爆发"

Even the biggest platforms can collapse overnight. Legal recourse is useless ("他都把钱花光了"). Diversification across exchanges/wallets is mandatory survival behavior, not optional.

### 2.7 Regular Rebalancing

> "每次换每次在重整我的钱包多了，我又继续定投多了，我又继续放弃我的合约，所以我的合约是哪怕资金少了，我都还会去"

Monthly/quarterly wallet audit:
- Capital grew? → Extract profits from contracts → increase spot/DCA
- Capital shrunk? → Keep within allocated bullets, don't add
- Always keep contract account at the original allocation size

---

## PART 3: PROBABILITY STACKING FRAMEWORK

### 3.1 The 50/50 Baseline

> "每一个事情的判断，第一件事他一定是五五开的5050的...没有100%的事情"

Every trade starts at exactly 50% probability. Nothing is ever guaranteed. Anyone who says "100%" is a liar ("绝对是骗子").

### 3.2 The Probability Formula

```
Trade Probability P(N) = 50% + (N × 3%)

Where N = number of confirmed checklist factors (0 ≤ N < 6)

CONFIRMED FACTORS → PROBABILITY:
  0 factors → 50% (coin flip — DO NOT TRADE)
  1 factor  → 53%
  2 factors → 56%
  3 factors → 59% (MINIMUM TRADE THRESHOLD)
  4 factors → 62%
  5 factors → 65%
  6 factors → 68% (MAXIMUM ACHIEVABLE)

Key insight: Even at maximum confluence, probability only reaches 68%.
This is why strict R:R and stop losses are NON-NEGOTIABLE.
```

### 3.3 The Rain Prediction Analogy

Live interaction with student Yang Moyu:

| Factor | Weather Signal | Probability | Trading Equivalent |
|--------|---------------|-------------|-------------------|
| Start | Random chance | 50% | No analysis |
| #1 | Is there sun? No → cloudy | +3% = 53% | Trend confirmed |
| #2 | Are clouds dark/thick? Yes | +3% = 56% | S/R level identified |
| #3 | Are ants active on ground? Yes | +3% = 59% | Pattern/trendline |
| #4 | Are swallows flying low? Yes | +3% = 62% | MACD confirmation |
| #5 | Is Jamie Hsiao performing? (humor) | +3% = 65% | Fibonacci hunting range |

Trainer's humor additions:
- Jamie Hsiao (萧敬腾 "Rain God"): If he has a concert → +1 factor for rain
- Car washing: If you just washed your car → guaranteed rain

### 3.4 The Umbrella = Stop Loss (雨伞比喻)

> "今天不管下不下雨，雨伞总得带，那万一下雨了，我们有个雨伞，它不下雨，那还是有个雨伞在车里安全安心"

| Element | Meaning |
|---------|---------|
| Going out | Entering a trade |
| Umbrella (雨伞) | Stop loss |
| Rain | Price going against you |
| No rain | Price going your way |
| Umbrella in bag | Stop loss not triggered — no harm done |
| Umbrella used | Stop loss triggered — loss bounded |

**ALWAYS bring the umbrella. Regardless of probability.**

---

## PART 4: NEW TRADING DISCIPLINE RULES

### 4.1 The "No 砍单" Rule

**Definition:** 砍单 = Removing or widening a stop loss to avoid taking a loss.

**Penalty:** PERMANENT COMMUNITY EXPULSION
> "这个群如果有人砍单的话，我就把你踢出群里面以后不能进来我们的社群。除非你改掉这个恶习"

**Why it destroys accounts:**
> "你可能现在亏个200，你下一个单，你赚的时候你可能赚个600，就已经把那200盖回去了，但是你为什么要硬拿到他亏600 700 800这样子的"

The math only works with small, bounded losses. A 200U loss with proper SL is recovered by one 600U win. But if you let a loss run to 700-800U, you need multiple wins to recover.

**The inverted mindset:**
> "赢你可以不止赢，你反过来想...输的话我是好尽快下决定要不要现在平或者等它到止损平"

Let winners run. Cut losses quickly (at your planned stop).

### 4.2 The "认输认亏" (Accept Loss) Philosophy

> "一定要认输各位。认输认亏"

Accepting losses is NOT weakness — it's the cost of doing business. Fighting the market = disrespecting money = losing it permanently.

**Money Philosophy:**
> "你要尊重钱，就跟着你，你不尊重钱，不会跟着你的，你把它浪费掉，那就肯定越来越没钱，你放心很灵的"

Respect money → money stays with you. Waste money → money leaves. "很灵的" (it's almost spiritual).

### 4.3 Metal vs Crypto Holding Duration

| Asset Class | Behavior | Holding Rule |
|-------------|----------|-------------|
| **Metals** (Gold, Silver) | "大多都是横盘的" — range-bound | Close by 11:30PM bedtime; if ranging → close regardless |
| **Crypto** (BTC, NEAR) | "往一个方向走，就走完它" — directional | Hold for days |

> "白银这种金属类别的产品...到晚上11点半睡觉前他都还没，他都还在这里徘徊，你是止盈，你是盈利的。或者亏损的请把它平掉"

### 4.4 Move SL to Breakeven at 1:1 R:R

**Trigger:** When price reaches 1:1 R:R (profit equals initial risk)
**Action:** Move stop loss to entry price
**Result:** Zero-risk trade — only cost if hit is commissions

> "把止损点移到你的进场价位，你待会哪怕他真的往下打，你亏的话，就亏个手续费，但是如果他继续走，你就止盈了"

### 4.5 Anti-Over-Trading

> "不要一次过下10个单下去，各位不要这样子操作一单一单来"

One trade at a time. Quality over quantity. Maximum 2 concurrent positions.

---

## PART 5: LIVE TRADE SUMMARY

| # | Asset | Direction | Entry | Stop | Target | R:R | Confluence | Duration | Status |
|---|-------|-----------|-------|------|--------|-----|-----------|----------|--------|
| 1 | Silver (XAGUSD) | LONG | Market | 68.85 | 71.30 | 1:1.5 | Triangle + Fib + 1H clean | Hours (intraday) | ✅ Profitable |
| 2 | NEAR | LONG | Market (~2.28) | 2.287 | 3.079 | ~1:1.4 | 5+ factors, NO resistance on ANY TF | Multi-day | ✅ Profitable |
| 3 | Gold (XAUUSD) | LONG (analyzed) | 4306 (planned) | 4285.9 | 4369 | 1:3 | 6H divergence + triangle + fib | Short-term | ✅ Profitable |
| 4 | BTC | SHORT (planned) | ~67,900 (waiting) | — | — | — | 5 factors, 12H+1H double suppression | Medium-term | ⏳ Waiting |
| 5 | Gold (Short) | SHORT (conditional) | ~4,370.28 (if 美女) | — | ~4,180 | — | 8H resistance | 3-7 days | ⏳ Waiting |

**All trades placed or analyzed during this session were profitable or still pending.** No losses incurred.

---

## PART 6: GAP ANALYSIS

### FILLED in this session:

| Gap (from Section 14) | Status |
|------------------------|--------|
| **概率判断框架** (Probability framework) | ✅ **FULLY FILLED** — 50%+(N×3%) formula, rain analogy, umbrella metaphor |
| **MACD时间级别详解** (MACD timeframe deep dive) | ⬜ **Partially** — Applied live, divergence chain concept introduced. No standalone lecture. |

### NEW GAPS CREATED:

| Gap | Expected |
|-----|----------|
| **Fibonacci反向延伸** | Still "下次再教" |
| **具体加仓策略** | Mentioned in passing, not detailed |
| **追踪止损** (Full trailing stop) | Only breakeven at 1:1 taught |
| **江恩理论** | Not addressed |
| **成交量分析** | Not addressed |
| **Wallet Management homework review** | Next session (Week 2 Day 2) |
| **BTC 67,900 setup outcome** | Track in future |
| **Gold 4,370.28 setup outcome** | Track in future |
| **NEAR trade outcome** | Track in future |

---

## PART 7: PEDAGOGICAL ANALYSIS

### 7.1 Session Structure
| Time | Content | Type |
|------|---------|------|
| 00:00-10:22 | BTC multi-TF analysis | Live chart |
| 10:22-19:51 | Gold analysis + Long setup | Live chart + trade plan |
| 19:51-25:31 | Silver analysis + LIVE TRADE #1 | Live chart + execution |
| 25:31-33:17 | TMGM logistics, copy-trade briefing | Operational |
| 33:17-42:15 | HYPE/NEAR review + LIVE TRADE #2 | Review + execution |
| 42:15-46:00 | Trade management, profit sharing | Community |
| 46:00-56:27 | BREAK (music + MC) | Break |
| 56:27-01:26:32 | WALLET MANAGEMENT (new) | PPT/slides |
| 01:26:32-01:48:00 | Probability + Q&A + Close | Interactive |

### 7.2 Teaching Style Evolution from Week 1

| Dimension | Week 1 | Week 2 Day 1 |
|-----------|--------|-------------|
| Pace | Slow, foundational | Fast, applied |
| Student interaction | Limited | High (live Q&A, student trade intervention) |
| Theory vs Practice | Theory-heavy | Practice-heavy (4 assets in 45 mins) |
| Live trades | 1-2 planned | 2 Market orders + 3 analyzed |
| Humor | Mild | More jokes (Jamie Hsiao, car wash) |
| Toughness | Encouraging | Direct ("踢出群" threat for 砍单) |
| Visual aids | Chart screen share only | PPT slides (first time) |
| MC role | None | Yang Moyu as formal MC |

---

## PART 8: WHAT TO TRACK IN NEXT SESSION (Week 2 Day 2)

1. **Wallet Management homework review** — Did students create their 3-layer splits?
2. **NEAR trade outcome** — Did it reach 3.079 target?
3. **BTC 67,900 setup** — Did price reach the level? Did 美女 form?
4. **Gold 4,370.28 level** — Did the short setup activate?
5. **Li Yanfang Gold short** — Was it resolved at stop or breakeven?
6. **"明天是我们第五期的课程"** — Week 2 Day 2 is confirmed
7. **Fibonacci Reverse Extension** — Still promised from Week 1

---

## PART 9: MODEL UPDATES REQUIRED

The following documents need updating based on this session's findings:

### Update Priority: HIGH

1. **friend-complete-trading-model.md:**
   - Add Section 16: Wallet Management System (3-layer + Bullet Method)
   - Add Section 17: Probability Stacking Framework
   - Update Section 6: Add Bullet Method as alternative position sizing
   - Update Section 10: Add probability framework + umbrella metaphor
   - Update Section 14: Mark gaps as filled/partial, add new gaps

2. **executable-decision-logic.md:**
   - Add Phase: Wallet Initialization (before Phase 1)
   - Add Phase: Probability Calculation (between checklist and execution)
   - Add Phase: Post-Trade Management (breakeven move, metal close rule)

3. **formulas-calculations-compendium.md:**
   - Add Bullet Method formula (Investment ÷ 100)
   - Add Probability formula P(N) = 50% + (N × 3%)
   - Add Copy-trade allocation formula (70-80% copy, 20-30% self)
   - Add Within-trading split (50% spot / 50% contract)

4. **entry-exit-execution-rules.md:**
   - Add Metal close-by-bedtime rule
   - Add Move SL to breakeven at 1:1 rule
   - Add No 砍单 discipline rule
   - Add Weekly overrides Daily conflict resolution rule

### Update Priority: MEDIUM

5. **README.md:** Update session count (3), model version (v3.0)
6. **MASTER-INDEX.md:** Add Week 2 Day 1 entry, new documents
7. **SYSTEM-INSTRUCTIONS.md:** Add Wallet Management PPT pixel signatures
8. **indicator-settings-usage-guide.md:** Add divergence chain concept

---

## PART 10: CRITICAL QUOTES (Verbatim)

### On Probability:
> "没有100%的事情，它只有高概率与低概率"

### On Wallet Management:
> "不管你多会技术。钱包管理是永远最重要的"

### On Never All-In:
> "你 all in 的话，我告诉你绝对输完100%不管你做什么东西"

### On Stop Loss:
> "今天不管下不下雨，雨伞总得带"

### On Accepting Loss:
> "你要尊重钱，就跟着你，你不尊重钱，不会跟着你的"

### On Discipline:
> "输的话我是好尽快下决定...不会是砍他的"

### On His Trading Evolution:
> "只改变了钱包管理以后，整个的交易历程是开挂的"

### On Market Realities:
> "这个世界上没有100%的东西...如果那个人跟你讲有100%的，我告诉你绝对是骗子"

### On Teaching Philosophy:
> "我们边赚钱边学习，是要赚钱的"

### On Patience:
> "还没到就不要去乱下，不要太紧张"

---

*Session Analysis Complete. 2 major new frameworks documented. 2 new discipline rules. 4 live trades deconstructed. 10 critical quotes captured. Model updates prepared.*
