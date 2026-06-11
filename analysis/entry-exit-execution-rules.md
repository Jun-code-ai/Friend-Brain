# Friend's Entry & Exit Execution Rules — Complete Protocol

> Every entry condition, exit trigger, timing rule, and execution sequence from Week 1 Day 2 & 3

---

## 1. PRE-ENTRY CHECKLIST (Must Complete Before Every Trade)

### 1.1 The Big Picture Scan (30 seconds)
```
□ Open Monthly chart → Note overall trend direction
□ Open Weekly chart → Note structural S/R levels
□ Open Daily chart → Note MACD position relative to zero axis
□ DECISION: With-trend only? Or counter-trend if strong divergence?
```

### 1.2 The MACD Timeframe Scan (2 minutes)
```
□ Start from 45-Day → scan down to 15-minute
□ WHICH timeframe's MACD is at/near zero axis?
□ Is that timeframe being SUPPORTED or RESISTED?
□ → SUPPORTED = uptrend continuation → look LONG
□ → RESISTED = downtrend continuation → look SHORT
□ → NEITHER = no trade, wait for zero-axis interaction
```

### 1.3 Structure Mapping (2 minutes)
```
On 4H and 1H:
□ Draw horizontal lines at all structural swing highs (3+ touches = key)
□ Draw horizontal lines at all structural swing lows
□ Mark flipped S/R zones (old support → new resistance, etc.)
□ Draw trendlines: any triangles or channels?
□ Note: Is price currently AT a drawn level?

On Daily/Weekly:
□ Draw macro S/R levels that may act as major targets
```

### 1.4 Fibonacci Deployment (1 minute)
```
□ Identify the LAST COMPLETED WAVE
□ Draw Fibonacci from wave start → wave end (left to right)
□ Is price currently in the 0.5 / 0.618 / 0.786 hunting range?
□ If NO → wait. Price hasn't entered the zone yet.
□ If YES → proceed to next step.
```

### 1.5 Indicator Confirmation (30 seconds)
```
STO (9,3,3):
□ Is STO in超买区 (>80) → Looking to SELL?
□ Is STO in超卖区 (<20) → Looking to BUY?
□ Is STO showing divergence with price?

MACD:
□ Is MACD at/near zero axis on the active timeframe?
□ Is divergence forming?
□ Are fast/slow lines converging (potential cross)?
```

### 1.6 Candlestick Watch (Until Signal Appears)
```
□ Watch the active level for a candle CLOSE:
  □ 美女 (hammer/inverted hammer) — reversal signal
  □ 吞没形态 (engulfing) — strong reversal signal
  □ 早晨之星 (morning star) — bullish reversal at bottom
  □ 黄昏之星 (evening star) — bearish reversal at top
  
□ Is the candle at a KEY LEVEL? (Must be yes)
□ Is the candle CLOSED (not still forming)?
□ Is the body-to-wick ratio appropriate?
  □ Reversal: long wick ≥ 2× body
  □ Continuation: thick body, small wicks

IF candle confirms at a key level → PREPARE TO ENTER
IF no candle yet → CONTINUE WATCHING, do not enter
```

---

## 2. ENTRY EXECUTION PROTOCOLS

### 2.1 Limit Entry (挂单 — Pending Order)
```
USE WHEN: Price is approaching a clear level but hasn't reached it yet

PROTOCOL:
  1. Identify exact entry price from S/R + Fibonacci confluence
  2. Place LIMIT ORDER at that price
  3. Set stop loss immediately (no naked orders)
  4. Set take profit immediately
  5. Walk away — let the market do the work

EXAMPLE (Day 2 BTC short):
  Entry: 62,100 (Fibonacci 0.5 + 4H resistance confluence)
  "你们等吧，等他到62100价格可能是这样子走"
  WAIT for 美女 candle at 62,100 → THEN enter
```

### 2.2 Stop Entry (条件单 — Conditional Order)
```
USE WHEN: Confirmation needed BEFORE entry (breakout/breakdown)

PROTOCOL:
  1. Identify the TRIGGER price (breakout level)
  2. Place STOP-ENTRY order ABOVE resistance (for longs) or BELOW support (for shorts)
  3. Set stop loss on the other side of the structure
  4. Set take profit
  5. DO NOT enter BEFORE the trigger — "过了才进场"

EXAMPLE (Day 2 NEAR long):
  Trigger: 2.1 (breakout above resistance)
  Stop: 1.95 (below support)
  Target: 2.8+ 
  "过了两块一才进场...止损放1.95"
  
TRAINER'S WARNING when student entered early:
  "你开这什么鬼...过了两块一才开吗？你现在就开。不应该开！"
  → DO NOT enter before trigger price is reached
```

### 2.3 Market Entry (市价单 — Immediate)
```
USE WHEN: High conviction + price IS at the zone RIGHT NOW
         + candle just closed confirming
         + multiple checklist items aligned (4+)

PROTOCOL:
  1. Verify checklist: 4+ items confirmed
  2. Verify candle just closed with reversal signal
  3. Enter at MARKET immediately
  4. Set stop loss (Method B preferred)
  5. Set take profit

EXAMPLE (Day 3 Silver short):
  "白银现价进场...现价止损在64.9止盈在61.6"
  Trainer entered live during session.
```

### 2.4 Scale-In Entry (分批进场)
```
USE WHEN: Entry zone is a RANGE not a single price
         OR when uncertainty is higher

PROTOCOL:
  1. Define entry range (e.g., "66.5-68.4")
  2. Split position into 2-3 parts
  3. Enter Part 1 at first touch of zone
  4. Enter Part 2 if price goes deeper into zone
  5. Enter Part 3 if price reaches the extreme of zone
  6. ALL parts share same stop loss
  7. ALL parts share same target

EXAMPLE (Day 2 Silver):
  Entry range: 66.5-68.4 (scale in)
  Stop: 70.8 (above the range)
  Target: 63.4
```

---

## 3. STOP LOSS PLACEMENT RULES

### 3.1 Chart-Based Stop (PRIMARY — Trainer's Method)
```
SHORT TRADE:
  Stop = Entry + (Nearest_Swing_High - Entry) × 1.5

LONG TRADE:
  Stop = Entry - (Entry - Nearest_Swing_Low) × 1.5

The 1.5x multiplier (50% buffer) is CRITICAL:
  "我通常会加50%...看它的针...整个亏损...加50%"

The BUFFER above/below the swing point:
  → Prevents stop-hunting (liquidity grabs at obvious levels)
  → Accounts for wick noise
  → Gives trade room to breathe
```

### 3.2 Brainless Stop (SECONDARY — For Beginners)
```
SHORT: Stop = Entry + (Entry - Target) ÷ 3
LONG:  Stop = Entry + (Target - Entry) ÷ 3

DIVIDE BY 3 → RECOMMENDED (adequate room)
DIVIDE BY 4 → RISKY (too tight)

Trainer: "少三倍最好，因为空间比较大...少四倍...空间很小，很危险"
```

### 3.3 Candle-Based Stop
```
When entering on a reversal candle signal:
  SHORT: Stop = Above the candle's HIGHEST WICK
  LONG:  Stop = Below the candle's LOWEST WICK
  
  "止损就放在美女线的...上面一点"
  Slightly beyond the wick, not exactly at it.
```

### 3.4 Stop Loss — NON-NEGOTIABLE RULES
```
✓ EVERY trade MUST have a stop loss — "必须设置止损，不得抱有侥幸心理"
✓ Stop is set IMMEDIATELY upon entry — not "later"
✓ Stop is NEVER moved further away — only tightened (trailing)
✓ Maximum loss per trade ≤ 10% of account (5% for large accounts)
✓ Maximum 2 concurrent positions with stops
```

---

## 4. TAKE PROFIT RULES

### 4.1 Primary Target: Opposite S/R
```
"止盈就是你找到了主力点或者支撑点，它反过来的地方你的目标价"

FOR SHORT from resistance:
  Target = The next SUPPORT level below
  Scan 4H/1H for structural lows → draw horizontal line → that's TP

FOR LONG from support:
  Target = The next RESISTANCE level above
  Scan 4H/1H for structural highs → draw horizontal line → that's TP
```

### 4.2 Fibonacci-Based Targets
```
Primary targets (from fib drawn on entry wave):
  - 1.0 level (full wave retrace)
  - 1.272 extension
  - 1.618 extension

Reversed fib for additional targets:
  Draw fib from OPPOSITE direction
  Extension levels project further targets
```

### 4.3 Partial Take Profit Schedule
```
At R:R 1:3 → Optional 20-30% partial (student level)
  "你们到了一对1:3，你想止盈是可以的，自己可以止盈的"

At divergence signal → Trainer takes 20-30% partial
  "这里我就开始平了一点仓，平了20%还是30%"

Remaining position → Ride until:
  - MACD crosses zero axis opposite direction
  - Major divergence forms on active timeframe
  - Price reaches next major S/R level
```

### 4.4 The "Don't Exit Early" Rule
```
Trainer explicitly addresses this:

Problem: Students see profit, panic, exit early
"大家我还听到有人说为什么高总不平仓，等下又回去了，我们不是白没赚了吗？"

Trainer's answer: "我有我的判断"
  → Trust the structure
  → If the active timeframe's MACD hasn't reversed → HOLD
  → If target S/R hasn't been reached → HOLD
  → Premature exit leaves the bulk of the move on the table

"看到趋势拿趋势我跟你一波就够赚了"
```

---

## 5. POSITION MANAGEMENT (During Trade)

### 5.1 Adding to Positions (Pyramiding)
```
WHEN TO ADD (trainer's method):
  1. Original thesis still valid (trend intact)
  2. Price returns to zero axis (EMA52/MACD) on active timeframe
  3. New reversal candle (美女) confirms at the zero axis
  4. ADD a SMALL position (not full size)
  5. Adjust aggregate stop to new structure

TRAINER'S BTC LONG EXAMPLE:
  Base:   Entered at 17,700 (45D底背离 + zero axis)
  Add #1: 2D zero axis touch → added
  Add #2: 3D zero axis touch → added  
  Add #3: After divergence pullback → added
  Result: "500块赚了很多钱，是这样子来的"

TRAINER'S RULE: "只要它回归零轴，我就会去加仓"
  → Add at every zero-axis retest on the active timeframe
  → Each add is a small increment, not doubling down
```

### 5.2 Position Reduction
```
WHEN TO REDUCE:
  1. MACD divergence forms on the active timeframe
     → Take 20-30% off
  2. Price approaches major S/R target
     → Take partial, let remainder run
  3. STO reaches extreme (overbought for longs, oversold for shorts)
     → Consider reducing
  4. Multiple checklist items no longer aligned
     → Reduce or exit
```

### 5.3 Stop Loss Adjustment (Trailing)
```
TRAINER'S METHOD (implied, not fully taught yet):
  → After partial TP at divergence → move stop to breakeven
  → After new structural swing forms → move stop behind new swing
  → "空间比较大" (give room) — don't trail too tight
  
NOT YET DETAILED: Full trailing stop methodology
  Status: Referenced but will be taught in future sessions
```

---

## 6. TRADE MANAGEMENT BY TYPE

### 6.1 Short-Term Trade (Hours to 1 Day)
```
Entry: 15m/30m candle confirmation at 1H/4H S/R
Stop:  Chart-based (Method B)
Target: Opposite S/R on 1H or 4H
Management: Set and monitor. TP at target.
Partial: At 1:3 R:R (optional)

Trainer rarely does these. "我对短线的定义不是说我什么时候随便开仓"
```

### 6.2 Medium-Term Trade (~1 Week)
```
Entry: 1H/4H candle confirmation at daily/weekly S/R
Stop: Chart-based with 50% buffer
Target: Next major S/R on daily timeframe
Management: Check daily. Adjust stop after structural swing.
Partial: At 1:3 AND at divergence signals.

This is the trainer's regular swing trade style.
```

### 6.3 Long-Term Trade (2+ Weeks to Months)
```
Entry: Daily/4D/45D MACD divergence + zero axis touch
Stop: Wide — structural swing on weekly/daily
Target: Multi-year S/R levels, Fibonacci extensions
Management: Check weekly. Add at zero-axis touches. Partial at divergences.
Exit: When MACD crosses below zero axis on the active macro timeframe.

This is the trainer's PREFERRED style. Highest R:R trades.
"一波足够我做100个小单，所以我是很喜欢做长线的"
```

---

## 7. EXIT TRIGGERS — THE COMPLETE LIST

### 7.1 Primary Exit Triggers (Execute Immediately)
```
□ Target S/R level reached → EXIT full or partial
□ MACD crosses zero axis opposite to trade direction → EXIT
□ Major MACD divergence forms on active timeframe → EXIT or partial
□ Price closes BEYOND your stop loss level → EXIT (should have been stopped)
```

### 7.2 Secondary Exit Triggers (Evaluate)
```
□ STO reaches extreme opposite (overbought on long → consider)
□ Price forms reversal candle at target zone → take profit
□ News event approaching (FOMC/CPI/NFP) → consider reducing
□ Multiple smaller timeframes showing reversal → consider reducing
```

### 7.3 Emergency Exit Triggers
```
□ Account drawdown reaches 10% in a day → STOP trading
□ Consecutive losses (3 in a row) → STOP, review, reset
□ Major unexpected news (black swan) → EXIT all positions
□ Technical failure (platform issues) → EXIT if can't manage risk
```

---

## 8. POST-TRADE ANALYSIS

### 8.1 Win or Loss — Always Review
```
"我每次交易完，不管赚不赚钱，我都会做个简单的复盘"

REVIEW CHECKLIST:
□ Screenshot the trade (entry + exit with lines)
□ Document:
  □ Which checklist items triggered the entry?
  □ Did price respect the identified S/R?
  □ Did the stop placement have enough room?
  □ Was the R:R achieved?
  □ Was the exit timely or could it have been held longer?
□ File the screenshot for future reference
```

### 8.2 The "Why Did It Happen?" Analysis
```
TRAINER'S SILVER SHORT复盘 (Day 2):

1. WHEN: 21:00 (US market open)
2. WHERE: At resistance zone (主力位置)
3. WHY: 
   - Pre-open drift up (liquidity accumulation)
   - 21:00 spike up (liquidity grab)
   - Immediate reversal (real direction)
   - Confirmed by: MA touch + MACD zero axis
4. TARGET: Previous support level
5. RESULT: 4% return, over-delivered as price continued lower

This exact format should be used for every trade review.
```

---

## 9. RISK MANAGEMENT OVERRIDES

### 9.1 Never Violate These
```
1. MAX LOSS: ≤10% per trade (5% for large accounts)
2. MAX CONCURRENT: 2 positions (personal: 1)
3. STOP LOSS: Always set. No exceptions. No removing.
4. NO MARTINGALE: Never double down on losing trades
5. NO REVENGE: After a loss, wait. Don't immediately re-enter.
6. NEWS BLACKOUT: FOMC/NFP/CPI → reduce or stand aside
```

### 9.2 Account Heat Management
```
Daily loss limit: Stop trading for the day
Weekly loss limit: Review all positions and thesis
Monthly loss limit: Step back, paper trade, rebuild confidence

"严禁重仓操作" — Heavy positions are FORBIDDEN
"不得抱有侥幸心理" — No wishful thinking without stops
```

---

*Compiled from transcripts + video frame analysis | June 2026*
