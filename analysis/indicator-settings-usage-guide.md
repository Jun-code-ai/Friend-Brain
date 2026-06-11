# Friend's Indicator Settings & Usage — Complete Reference

> Every indicator parameter, configuration, and application rule from Week 1 Day 2 & 3

---

## 1. MACD (Moving Average Convergence Divergence)

### 1.1 Configuration
```
Settings:  Fast EMA: 12 | Slow EMA: 26 | Signal SMA: 9  (STANDARD - unchanged)
Place:     Below price chart (bottom panel)
Style:     Blue fast line, Orange slow line, Cyan/Red histogram
```

### 1.2 What To Look At

| Element | Visual | Meaning |
|---------|--------|---------|
| **快线 (Blue/Fast Line)** | Blue line | Short-term price momentum |
| **慢线 (Orange/Slow Line)** | Orange line | Longer-term price momentum |
| **柱状图 (Histogram)** | Cyan (+), Red (-) bars | Difference magnitude between fast & slow |
| **零轴 (Zero Axis)** | Horizontal midline | THE KEY — multi-timeframe S/R anchor |

### 1.3 The Zero Axis Method (trainer's EDGE)

```
CONCEPT: MACD Zero Axis = EMA52 on price chart
  → When MACD returns to zero axis, price is at EMA52
  → This is where reversals/continuations happen

UPTREND:
  MACD above zero axis
  Price above EMA52
  Pullback to zero axis/EMA52 = SUPPORT → BUY opportunity
  Target = Opposite S/R level

DOWNTREND:
  MACD below zero axis  
  Price below EMA52
  Rally to zero axis/EMA52 = RESISTANCE → SELL opportunity
  Target = Opposite S/R level
```

### 1.4 Golden/Death Cross Critique
```
STANDARD METHOD (trainer REJECTS):
  Golden Cross (金叉): Blue crosses above Orange → BUY
  Death Cross (死叉): Blue crosses below Orange → SELL
  
PROBLEM: LAG (滞后性)
  "你只是凭着金叉死叉去玩的话，肯定你不会拿到好的结果"
  Demonstrated: Signal came 15% after actual low
  Stop loss would need 9.23% — completely impractical

TRAINER'S FIX:
  Don't wait for the cross. Use:
  → Zero axis touch + 美女 candle at EMA52
  → This gets in MUCH earlier than waiting for the cross
  "看到美女了要干嘛，回头看到美女要回头"
```

### 1.5 MACD Divergence (The HIGHEST CONVICTION Signal)

```
顶背离 (Bearish Divergence):
  PRICE:  Higher High
  MACD:   Lower High (快慢线 peaks declining)
  SIGNAL: Uptrend exhausting → DROP coming
  "一旦有背离，通常都会发生"

底背离 (Bullish Divergence):
  PRICE:  Lower Low  
  MACD:   Higher Low (快慢线 troughs rising)
  SIGNAL: Downtrend exhausting → RALLY coming

DIVERGENCE SETUP (The Sweet Spot):
  1. MACD returns to zero axis
  2. Price touches EMA52
  3. A reversal candle (美女/吞没) appears at the touch
  4. Divergence begins forming → price will get PULLED
  5. ENTER at step 3 (BEFORE divergence completes)

Trainer: "还没背离之前，你在这里去做动作是对的，
        因为它会产生一种新的背离，就会让价格掉得很低"
```

### 1.6 Multi-Timeframe MACD Scanning Sequence
```
SCAN ORDER (Top → Down, find the active timeframe):

45-Day → 40-Day → 21-Day → 15-Day → 10-Day → 5-Day → 4-Day
  → 3-Day → 2-Day → 12H → 8H → 6H → 4H → 3H → 2H
  → 90min → 45min → 30min → 15min

RULE: Find which timeframe has MACD at or nearest to zero axis
      → THAT is the timeframe CONTROLLING current price action
      → Trade in that timeframe's direction
      → Use next smaller timeframe for entry precision

DIFFERENTIATOR: Standard traders use only 6 TFs (M/W/D/4H/1H/30m/15m).
                Trainer adds ~14 intermediate TFs to match institution behavior.
                "因为我要跟机构的思维做事情"
```

### 1.7 MACD Entry Protocol (Long Setup Example)
```
1. SCAN: 45D → 15m. Found: 4-Day MACD being SUPPORTED at zero axis
2. DIRECTION: MACD above zero = UPTREND → look for LONG
3. WAIT: Price pulls back to EMA52
4. CONFIRM: 美女/早晨之星 candle at EMA52 touch
5. TIMING: Switch to 4H/1H for precise entry
6. ENTER: After reversal candle close
7. STOP: Beyond the candle's wick
8. TARGET: Next resistance level (opposite S/R from zero axis)
9. ADD: Each time price returns to zero axis on this timeframe → add position
10. PARTIAL TP: When MACD divergence appears on timeframe → take 20-30%
11. EXIT: When MACD crosses below zero axis OR major divergence forms

EXAMPLE (BTC 17K Long):
  45D MACD returned to zero axis + 底背离
  → Entered small at ~17,700
  → Added at 2D zero axis touch
  → Added again at 3D zero axis touch
  → Partial TP at divergence signal
  → Held remainder through multiple zero-axis touches
  → Final: ~26x return
```

---

## 2. EMA52 (Price Chart Zero Axis)

### 2.1 Configuration
```
Type:     EMA (Exponential Moving Average)
Period:   52
Color:    White (trainer's chart)
Overlay:  On price chart (MAIN chart)

Note: The trainer changed from default EMA9 to EMA52 specifically.
"你点出来，通常他给你一个九的参数的，我们改为52"
```

### 2.2 Usage Rules
```
IDENTITY: EMA52 on price chart = MACD Zero Axis conceptually
  "价格里的EMA52就是MACD里的零轴，你们这么理解它"

UPTREND:
  Price stays ABOVE EMA52
  EMA52 acts as DYNAMIC SUPPORT
  Each touch of EMA52 = potential BUY/add zone
  
DOWNTREND:
  Price stays BELOW EMA52
  EMA52 acts as DYNAMIC RESISTANCE
  Each touch of EMA52 = potential SELL zone

ZERO AXIS TOUCH = HIGH PROBABILITY REVERSAL/CONTINUATION:
  When both MACD AND price touch their respective zero axes:
    → VERY high probability setup
    → Look for candle confirmation
    → The opposite S/R level becomes the target
```

### 2.3 Comparison with Standard Cross Signals
```
KUN: "EMA52它的反馈的信息会不会比刚才所说的MACD的金叉或者死叉来得更快？"
Trainer: "一定会" (100% YES — faster than MACD cross)

Because EMA52 + candle confirmation at the touch point gives entry
BEFORE the MACD crossover even happens.
```

---

## 3. STO — Stochastic Oscillator (随机强弱指标)

### 3.1 Configuration
```
Parameters: (9, 3, 3)
  %K Length:      9   (灵敏度调整)
  %K Smoothing:   3   (changed from default for sensitivity)
  %D Smoothing:   3   (changed from default for sensitivity)

Default was DIFFERENT. Trainer MODIFIED for higher sensitivity.
"你打开设置...正常不是933的...把长度改成九，顺度改成三，然后D顺线改成三"
```

### 3.2 Visual Elements
```
Lines:   Fast %K line (faster), Slow %D line (slower)
Zones:   - Gray region (20-80): Neutral zone
         - Dark blue region BELOW 20: 超卖区 (Oversold)
         - Dark blue region ABOVE 80: 超买区 (Overbought)

Horizontal reference lines: 20 (bottom), 80 (top)
```

### 3.3 Primary Uses

**Use #1 — WAVE ENDPOINT CONFIRMATION**
```
When STO reaches超买区 (>80):
  → This IS a wave TOP
  → Confirms resistance line you've drawn
  → Look to SELL

When STO reaches超卖区 (<20):
  → This IS a wave BOTTOM
  → Confirms support line you've drawn
  → Look to BUY

Trainer: "它只要到了这种区域，其实就是一个波段的终点"
```

**Use #2 — RANGE TRADING (箱体震荡)**
```
1. Identify the range using STO extremes
2. Draw horizontal lines at the price extremes corresponding to STO extremes
3. BUY at超卖区 (bottom of range) → target超买区 (top of range)
4. SELL at超买区 (top of range) → target超卖区 (bottom of range)
5. Range is VALID until price breaks out (confirmed by STO divergence)

"我们就在箱体里交易"
```

**Use #3 — S/R VALIDATION**
```
When you've drawn a support/resistance line:
  → Check if STO confirms it as a wave endpoint
  → If STO shows oversold at your support line → line is VALID
  → If STO shows overbought at your resistance line → line is VALID
  → If NOT confirmed → the line may not be a real S/R

"这个指标的用意就是来你要确认你画的线，这个支撑阻力对与不对"
```

**Use #4 — DIVERGENCE DETECTION**
```
Same logic as MACD divergence but on STO:

Bearish Divergence:
  Price: Higher high
  STO:   Lower high ("喇叭式的开口" — megaphone opening)
  → DROP coming

Bullish Divergence:
  Price: Lower low
  STO:   Higher low
  → RALLY coming

Trainer: "价格往上抬，数据往下...反过来的喇叭...做了以后他干嘛？往上走"
```

### 3.4 STO vs RSI
```
KUN: "STO比RSI更加灵敏" (STO is MORE SENSITIVE than RSI)
Trainer: Agreed. This is why he chose STO over RSI.

The (9,3,3) setting makes it even more responsive than default.
```

---

## 4. FIBONACCI RETRACEMENT TOOL

### 4.1 Configuration
```
Levels:  0, 0.236, 0.382, 0.5, 0.618, 0.786, 1, -1.618
Format:  Percentage display

Visual Settings:
  Extend:         Right side only (into future)
  Background:     REMOVED (transparent) — "颜色这是背景颜色把它拉掉"
  Label position: Right side (右边)
  Label location: Top (上面) — "我通常是放右手边，右手边好看一点"
  Font size:      10-11 — "稍微小一点，没有问题1110都可以"
  Colors:         Trainer has custom colors (modified from default)

Trainer: "我的数列大概就这些就足够了，不用太多，当然我有加多一个"
→ He added ONE extra level beyond standard

Setting location: TradingView → Left sidebar → 3rd panel → First tool
                  Or Binance/OKX built-in TradingView charts
```

### 4.2 Drawing Protocol

**For UPTREND Pullback (Looking for Long):**
```
1. Identify COMPLETED wave: clear swing LOW → clear swing HIGH
2. Anchor fib at: WAVE LOW (left) → WAVE HIGH (right)
3. Levels project downward from high
4. Hunting range: 0.5 (50%), 0.618 (61.8%), 0.786 (78.6%)
5. Wait for price to enter hunting range
6. Look for 美女/早晨之星 candle at a fib level
7. Enter when candle confirms

Trainer: "从整个波段的低点往右边拉，拉到整个波段的高点"
```

**For DOWNTREND Rally (Looking for Short):**
```
1. Identify COMPLETED wave: clear swing HIGH → clear swing LOW
2. Anchor fib at: WAVE HIGH (left) → WAVE LOW (right)
3. Levels project upward from low
4. Hunting range: 0.5 (50%), 0.618 (61.8%), 0.786 (78.6%)
5. Wait for price to enter hunting range
6. Look for 美女/吞没 candle at a fib level
7. Enter when candle confirms

Trainer: "从波段的左边最高点往波段最右边拉...结合起来你就找到一个回调点了"
```

### 4.3 The "Hunting Range" Concept
```
FIBONACCI ZONES ARE PROBABILITY ZONES, NOT GUARANTEES.

"它只是个狩猎范围，不是说价格一定在那里停止...
 我们只要他一进入我们的狩猎范围，我们就干嘛？猎杀他嘛！
 我们现在像猎人一样，他进入我们的狩猎范围，我们就猎杀他"

KEY: Don't enter just because price is in the zone.
     Wait for price to SHOW ITS HAND (react at the level with a candle).
     THEN hunt it.
```

### 4.4 Invalidation & Extension
```
FIB INVALIDATION:
  "冲出去，来这些一切的数值都不算...因为被破了"
  → When price breaks THROUGH a Fibonacci level decisively
  → That wave's Fibonacci is NULLIFIED
  → Wait for NEW wave to complete
  → Draw NEW Fibonacci from the new structure

FIB EXTENSION (for targets):
  "我们可以延伸多一个波段来看"
  → Extend Fibonacci to the next wave structure
  → This projects the NEXT target zone
```

### 4.5 Live Fibonacci Decisions (From Sessions)

**BTC 17K Long (historic):**
```
Wave: Low ~17,000 → Previous high (multi-year)
Fibonacci: Drew from low to high
Decision: Price was at a Fibonacci retracement zone
         + MACD底背离
         + Zero axis touch
         → Went LONG at 17,700
         → Rode to 100,000+ 
```

**BTC 63.7K Short (Day 3):**
```
Active wave: High → Recent low
Fibonacci drawn: From high to low (downtrend)
Hunting range: 0.5-0.618 zone ≈ 63,000-64,000 area
Plus: 4H MACD resisting at zero axis
Plus: S/R resistance zone
→ SHORT at 63,700
```

**BTC Current Extension (Day 3):**
```
Reversed Fibonacci from LOW → HIGH
Two RED extension zones: 51,181 and 45,776
These are potential final downside targets
"下跌还有一点空间要走"
```

---

## 5. TRENDLINES & PATTERN DRAWING TOOLS

### 5.1 Triangle Pattern Drawing
```
TOOL: Trendline (趋势线) — multiple lines
METHOD:
  1. Find TWO connecting swing HIGHS → draw upper trendline
  2. Find TWO connecting swing LOWS → draw lower trendline
  3. Wait for THIRD touch to confirm validity
  4. Wait for BREAKOUT through either line
  5. Follow breakout direction (DO NOT PREDICT)

TYPES:
  上升三角形: Flat top, rising bottom
  下降三角形: Flat bottom, declining top
  对称三角形/楔形: Both lines converging

CRITICAL RULE: "不要去猜它一定会空...它往哪里突破，我们选哪里"
```

### 5.2 Channel Drawing
```
TOOL: Parallel channel or two parallel trendlines
METHOD:
  1. Connect swing highs → upper line
  2. Connect swing lows → lower line (must be ~parallel)
  3. BTC predominantly forms CHANNELS, not triangles
  4. Trade within the channel: sell top, buy bottom
  5. On breakout: follow the breakout direction
```

### 5.3 Horizontal S/R Lines
```
TOOL: Horizontal line (水平线)
METHOD:
  1. Find swing highs → draw resistance
  2. Find swing lows → draw support
  3. 2-3 touches = valid S/R level
  4. After breakout: resistance → support, support → resistance
  5. PRIMARY timeframe for S/R: 4H and 1H

"1小时和4小时是最重要的"
```

---

## 6. INDICATOR COMBINATION MATRIX

### 6.1 The Complete Layering System

```
LAYER 1 — STRUCTURE (naked chart):
  → Horizontal S/R lines (3+ touches)
  → Trendlines (triangles, channels)
  → Swing highs and lows marked

LAYER 2 — DYNAMIC S/R:
  → EMA52 (price zero axis)
  → MACD zero axis (indicator panel)

LAYER 3 — PROBABILITY ZONES:
  → Fibonacci retracement (0.5, 0.618, 0.786)
  → Fibonacci extension (for targets)

LAYER 4 — TIMING:
  → STO (9,3,3) — overbought/oversold
  → MACD divergence — trend exhaustion

LAYER 5 — EXECUTION:
  → Candlestick patterns (美女/吞没 at key levels)
  → Multi-timeframe MACD scan for active timeframe
```

### 6.2 Confluence Scoring (When Indicators Align)

| Scenario | MACD | EMA52 | Fib | STO | Candle | Score |
|----------|------|-------|-----|-----|--------|-------|
| Perfect setup | Zero axis | Touching | In range 0.5-0.786 | Extreme | 美女/吞没 | 5 |
| Strong setup | Zero axis | Nearby | In range 0.382-0.786 | Extreme | Forming | 4 |
| Good setup | Approaching | Nearby | In range | Approaching | Watching | 3 |
| Weak setup | Far away | Far | Outside | Mid-range | None | 2 |
| No setup | Anything | Anything | Anything | Anything | Random | 1 |

```
≥4 signals aligned → TRADE (high conviction)
3 signals aligned  → TRADE (acceptable, reduce size slightly)
2 signals aligned  → WAIT (one more confirmation needed)
≤1 signal aligned  → NO TRADE
```

---

*Compiled from transcripts + video frame analysis | June 2026*
