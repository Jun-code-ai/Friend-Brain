# Friend's Trading Formulas & Calculations — Complete Compendium

> Every formula, mathematical method, and calculation logic extracted from Week 1 Day 2, Day 3 & Week 2 Day 1
> **Updated:** 2026-06-17 with Wallet Management + Probability formulas from Week 2 Day 1

---

## 1. RISK-TO-REWARD (R:R) CALCULATIONS

### 1.1 Core R:R Formula
```
R:R = 盈利点数 (Profit Points) ÷ 亏损点数 (Loss Points)

For SHORT:
  Profit Points = Entry Price - Target Price
  Loss Points = Stop Loss Price - Entry Price
  R:R = (Entry - Target) ÷ (Stop - Entry)

For LONG:
  Profit Points = Target Price - Entry Price
  Loss Points = Entry Price - Stop Loss Price
  R:R = (Target - Entry) ÷ (Entry - Stop)
```

### 1.2 Breakeven Win Rate Formula
```
Breakeven WR = 1 ÷ (1 + R:R)

Examples:
  R:R 1:1 → Breakeven WR = 1/(1+1) = 50% (needs 60%+ realistically per trainer)
  R:R 1:2 → Breakeven WR = 1/(1+2) = 33.3% (per trainer: 40% comfortably)
  R:R 1:3 → Breakeven WR = 1/(1+3) = 25% (per trainer: 30% comfortably)
  R:R 1:4 → Breakeven WR = 1/(1+4) = 20%
  R:R 1:5 → Breakeven WR = 1/(1+5) = 16.7%
```

### 1.3 Net Profit/Loss Calculation (Walk-through Method)
```
Given: R:R = 1:3, Win Rate = 30%, Risk per trade = 100U, 10 trades

  Total Losses = (1 - WR) × Num_Trades × Risk
                = 0.7 × 10 × 100 = 700U

  Total Profits = WR × Num_Trades × (Risk × R:R)
                = 0.3 × 10 × 300 = 900U

  Net = 900 - 700 = +200U ✓

Trainer's spoken math:
  "10个单，我亏7个单，一单100是不是亏了700？我只要简单赚三个单，一单300，
   300盈利我们就900-700，来你还赚多少" → 200U net profit
```

### 1.4 Trainer's Personal R:R Standards
```
Minimum acceptable (基础范围):  1:3
Typical achieved:              1:10 to 1:14
Best historic:                 1:26
Current BTC short (Day 3):     1:2.56 (short-term target for students)
                               1:12.37 (his held position shown on Day 3)
Current BTC short (Day 2):     1:3.48
ETH short (Day 3):             1:2.56
Gold short (Day 3):            1:3 (approx: 4113.5→4024 = 89.5pts / 4143.5→4113.5 = 30pts)
```

### 1.5 R:R Table (Presented Live)

| R:R | Required WR | 10 trades (100U risk) | Net at 40% WR |
|-----|------------|----------------------|---------------|
| 1:1 | 60%+ | 6W: +600, 4L: -400 → +200 | 4W: +400, 6L: -600 → -200 ✗ |
| 1:2 | 40% | 4W: +800, 6L: -600 → +200 | 4W: +800, 6L: -600 → +200 ✓ |
| 1:3 | 30% | 3W: +900, 7L: -700 → +200 | 4W: +1200, 6L: -600 → +600 ✓ |
| 1:4 | 20% | 2W: +800, 8L: -800 → 0 | 4W: +1600, 6L: -600 → +1000 ✓ |
| 1:5 | ~17% | 2W: +1000, 8L: -800 → +200 | 4W: +2000, 6L: -600 → +1400 ✓ |

---

## 2. POSITION SIZING FORMULAS

### 2.1 Account Tier Classification
```
大资金 (Large Capital):  ≥ 50,000 U
小资金 (Small Capital):  ≤ 10,000 U
极小资金 (Tiny Capital): ~500 U
```

### 2.2 Partition Formula
```
Large Capital (≥50K):
  Partitions: 50+
  Per-Part Size = Total Capital ÷ 50
  Max Loss Per Trade = 5% of Total Capital
  Example: 50,000U ÷ 50 = 1,000U per part
           Max loss = 50,000 × 5% = 2,500U

Small Capital (≤10K):
  Partitions: 10-20
  Per-Part Size = Total Capital ÷ Partitions
  Max Loss Per Trade = 10% of Total Capital
  Example: 10,000U ÷ 10 = 1,000U per part
           Max loss = 10,000 × 10% = 1,000U

Tiny Capital (~500U):
  Partitions: 5 minimum
  Per-Part Size = 500 ÷ 5 = 100U
  Max Loss Per Trade = 10% × 500 = 50U
```

### 2.3 Position Size from Max Loss (AI Method)
```
Prompt template:
  "[Asset]进场价[Entry]，止损价[Stop]，最大亏损[MaxLoss]U，请问手数多少？"

Example:
  "BTC进场价63700，止损价65600，最大亏损100U，请问手数多少？"
  → AI Result: 0.05 lots

  "BTC进场价63700，止损价65600，最大亏损170U，请问手数多少？"
  → AI Result: 0.08 lots

  "BTC进场价63700，止损价65600，最大亏损50U，请问手数多少？"
  → AI Result: 0.025 lots
```

### 2.4 Maximum Concurrent Positions
```
Personal rule (trainer):  1 position at a time
Community rule:           2 positions maximum at a time

"我到今天为止，只要我开这单，我是不会开第二个单的"
"每次下单不要一次过下5个单，6个单，每次下单最多两个"
```

---

## 3. STOP LOSS CALCULATIONS

### 3.1 Method A: "无脑算法" (Brainless Algorithm)
```
For SHORT:
  Step 1: Profit_Points = Entry - Target
  Step 2: Stop_Distance = Profit_Points ÷ 3  [RECOMMENDED - wider, safer]
           OR = Profit_Points ÷ 4             [Tighter - riskier]
  Step 3: Stop_Loss = Entry + Stop_Distance

For LONG:
  Step 1: Profit_Points = Target - Entry
  Step 2: Stop_Distance = Profit_Points ÷ 3
  Step 3: Stop_Loss = Entry - Stop_Distance

BTC Day 3 Example (Short):
  Entry: 63,700
  Target: 59,100
  Profit_Points = 63,700 - 59,100 = 4,600
  Stop_Distance (÷3) = 4,600 ÷ 3 = 1,533.33
  Stop_Loss = 63,700 + 1,533 = 65,233

  Stop_Distance (÷4) = 4,600 ÷ 4 = 1,150
  Stop_Loss = 63,700 + 1,150 = 64,850

Trainer's comment: "少三倍最好，因为空间比较大...少四倍它就这样的，空间很小，很危险"
→ Divide by 3 is BEST (gives room). Divide by 4 is tight and risky.
```

### 3.2 Method B: "盘面算法" (Chart-Based Algorithm - ADVANCED)
```
For SHORT:
  Step 1: Identify nearest structural SWING HIGH
  Step 2: Raw_Stop = Swing_High - Entry
  Step 3: Buffer = Raw_Stop × 0.5 (50% added)
  Step 4: Stop_Loss = Entry + Raw_Stop + Buffer
  Simplified: Stop_Loss = Entry + (Swing_High - Entry) × 1.5

For LONG:
  Step 1: Identify nearest structural SWING LOW
  Step 2: Raw_Stop = Entry - Swing_Low
  Step 3: Buffer = Raw_Stop × 0.5
  Step 4: Stop_Loss = Entry - Raw_Stop - Buffer
  Simplified: Stop_Loss = Entry - (Entry - Swing_Low) × 1.5

BTC Day 3 Example (Short):
  Entry: 63,700
  Swing_High: 64,437 (using the highest wick)
  
  Raw_Stop = 64,437 - 63,700 = 737
  Buffer = 737 × 0.5 = 368.5
  Stop_Final = 737 + 368.5 = 1,105.5
  Stop_Loss = 63,700 + 1,105.5 = 64,805.5

Live calculation recorded (KUN and trainer together):
  "737的50% = 737 × 0.5 = 368.5"
  "368 + 737 = 1105.5"
  "63700 + 1105.5 = 64805.5"
  → Stop Loss = 64,805.5

Trainer's reasoning: "看波段的高点，看它的针...是整个波段整个亏损是一对...我通常会加50%"
→ Look at the swing HIGH's WICK. Add 50% buffer on top.
```

### 3.3 Stop Loss Placement Rule (For 美女/吞没 Candle Entry)
```
When entering on a reversal candle:
  Stop Loss = BEYOND the candle's wick (影线以外)
  
  For SHORT: Stop = Above the 美女's upper wick
  For LONG:  Stop = Below the 美女's lower wick

Trainer: "止损就放在美女线的...上面一点类似这样子吧"
```

### 3.4 Trainer's Method Preference
```
PRIMARY:   Method B (Chart-Based) — uses actual market structure
SECONDARY: Method A (Brainless ÷3) — for beginners who can't read structure yet
```

---

## 4. TAKE PROFIT / TARGET CALCULATIONS

### 4.1 Primary Method: Opposite S/R
```
Rule: "止盈就是你找到了主力点或者支撑点，它反过来的地方你的目标价"

For SHORT from resistance:
  Target = Next SUPPORT level below entry
  
For LONG from support:
  Target = Next RESISTANCE level above entry
```

### 4.2 Fibonacci Extension for Targets
```
Method (introduced Day 3, to be detailed in future):
  1. Identify completed wave
  2. Draw Fibonacci from OPPOSITE direction:
     - For downtrend targets: Low → High of wave
     - For uptrend targets: High → Low of wave
  3. Extension levels (1.618, etc.) project targets

BTC Current Example:
  Reversed fib from low to high
  → Two red zones: 51,181 and 45,776 as potential downside targets
```

### 4.3 Wave Percentage Measurement (For Continuation Targets)
```
Method shown on BTC:
  "第一波下跌用了36%，第二波下跌也用了38%
   来平均一下...33%...35%
   那他就到五万四五万三千多"

Process:
  1. Measure Wave 1 decline: (High1 - Low1) / High1 = 36%
  2. Measure Wave 2 decline: (High2 - Low2) / High2 = 38%
  3. Average: (36% + 38%) / 2 ≈ 35-37%
  4. Project Wave 3: Current_High × (1 - 0.35) ≈ 54,000-53,000 target

This is a FIBONACCI-BASED wave equality projection method.
```

### 4.4 Partial Take Profit Rule
```
At 1:3 R:R → Optional partial TP of 20-30%
"你们到了一对1:3，你想止盈是可以的，自己可以止盈的"

Trainer holds longer but allows students to take partials at 3R.
He personally took 20-30% partial at a divergence signal on his BTC long.
```

---

## 5. FIBONACCI DRAWING FORMULAS

### 5.1 Uptrend Retracement (Looking for Long Entry on Pullback)
```
Drawing Direction: LEFT → RIGHT (past → future)
Anchor Points:     Wave LOW → Wave HIGH

Result: Fibonacci levels project DOWNWARD from the high
        → 0.5 = 50% retracement = potential BUY zone
        → 0.618 = 61.8% retracement = golden ratio BUY zone
        → 0.786 = 78.6% retracement = deep BUY zone

Trainer: "从整个波段的低点往右边拉，拉到整个波段的高点"
```

### 5.2 Downtrend Retracement (Looking for Short Entry on Rally)
```
Drawing Direction: LEFT → RIGHT
Anchor Points:     Wave HIGH → Wave LOW

Result: Fibonacci levels project UPWARD from the low
        → 0.5 = 50% retracement = potential SELL zone
        → 0.618 = 61.8% retracement = golden ratio SELL zone
        → 0.786 = 78.6% retracement = deep SELL zone

Trainer: "从波段的左边最高点往波段最右边拉...结合起来你就找到一个回调点了"
```

### 5.3 Extension for Targets (Reverse Drawing)
```
For DOWNTREAD targets:
  Draw from: Wave LOW → Wave HIGH (reverse direction)
  Look at: Extension levels (1.618, -0.618, etc.)
  These project potential downside targets

Trainer: "反过来以后它有出现两个红色的...51181和45776"
```

### 5.4 Fibonacci Settings (Trainer's Custom)
```
Display levels: 0, 0.236, 0.382, 0.5, 0.618, 0.786, 1, -1.618
Format:          Percentage
Extend:          Right side only (extend into future)
Background:      Removed (transparent)
Label position:  Right side (右边)
Font size:       10-11

Trainer: "我有加多一个...差不多就这些就足够了，不用太多"
```

### 5.5 Fibonacci Invalidation Rule
```
When a Fibonacci level is BROKEN significantly:
  → That wave's Fibonacci is INVALIDATED
  → Extend to the NEW wave structure
  → Recalculate from the new completed wave

Trainer: "冲出去...一切的这些数值都不算了...因为被破了...我们只能说延伸多一个波段来看"
```

---

## 6. INDICATOR FORMULAS & PARAMETERS

### 6.1 MACD Settings
```
Fast EMA:    12 (default, unchanged)
Slow EMA:    26 (default, unchanged)
Signal SMA:  9  (default, unchanged)

Key Elements:
  Blue Line = Fast EMA (快线)
  Orange Line = Slow EMA (慢线)
  Histogram = Difference between fast & slow
  Zero Axis = The horizontal midline
```

### 6.2 EMA52 (Price Chart "Zero Axis")
```
Type:    EMA (Exponential Moving Average)
Period:  52
Color:   White (in trainer's setup)
Role:    Maps to MACD zero axis on price chart

Trainer: "价格里的EMA52就是MACD里的零轴"
```

### 6.3 STO (Stochastic Oscillator) Settings
```
%K Length:      9  (changed from default)
%K Smoothing:   3  (changed from default)
%D Smoothing:   3  (changed from default)

Final: (9, 3, 3) — optimized for higher sensitivity

Zones:
  Overbought:  Above 80 → Wave TOP, look to SELL
  Oversold:    Below 20 → Wave BOTTOM, look to BUY

Trainer: "把长度改成九，顺度改成三，然后D顺顺线改成三就可以了"
KUN: "比RSI更加灵敏"
```

---

## 7. POSITION LOT SIZE CALCULATION (Manual)

### 7.1 Using AI Method (Recommended)
```
Tools: 豆包 (Doubao), DeepSeek, ChatGPT
Input: "[Asset]进场价[Price]，止损价[Stop]，最大亏损[Amount]U，请问手数多少？"
Output: Exact lot size

Trainer: "AI已经帮你计算好了...你算点数能算得出来是ok的，不然你就用AI帮助你"
```

### 7.2 Account Segregation Rule
```
TMGM/MT5:
  Account 1 → Copy-trading (跟单专用) — separate capital
  Account 2 → Self-trading (自主交易) — separate capital
  
金玉: "一定要分开来一个账户是跟单的，然后再申请一个账户是专门自己打的"
→ Ensures copy-trading capital isn't accidentally used for manual trades
```

### 7.3 Capital Allocation Formula
```
Total Capital = 100%
  → 80% in copy-trading account (跟单)
  → 20% in self-trading account (自主练习)

"比如说你有1万...把80%放在你的账号点击跟单...2000你就放在你的手里自己去熟悉操作"
```

---

## 8. TRADING TIME & SESSION CALCULATIONS

### 8.1 Session Schedule (GMT+8)
```
Asia/Tokyo:    07:00 - 15:00  (Low liquidity)
London:        15:00 - 00:00  (Moderate-High, "有一点行情了")
New York:      20:00 - 05:00  (Highest liquidity)
NY-London:     20:00 - 00:00  (Maximum overlap, BEST trading)

Trainer's teaching window: Tue/Wed/Thu 15:00-17:00 (London session)
```

### 8.2 The 21:00 Reversal Pattern Formula
```
Time: 21:00 GMT+8 (US Market Open)
Pattern:
  08:00-20:00 → Price slowly creeps ONE direction (low volume drift)
  21:00 sharp  → SPIKE continuing same direction (liquidity grab)
  After spike  → REVERSAL in opposite direction (real move begins)

Trainer: "美国开市之前，美国很喜欢做一种反方向的操作...
        一踏入9点的第一个第一时间，他就往上冲了一下，
        拿了流动性就直接反方向了"

TRADEABLE: Enter AFTER the spike reverses, in the reversal direction
```

---

## 9. CANDLE CONFIRMATION RULES (Quantitative)

### 9.1 Reversal Candle Validity
```
Valid 美女 (Hammer/Inverted Hammer):
  ✓ Located at a key S/R level or Fibonacci zone
  ✓ Long wick (lower for bullish, upper for bearish) ≥ 2× body
  ✓ Small real body
  ✓ CLOSED candle (not during formation)

Invalid 美女:
  ✗ Random location (not at S/R or Fibonacci)
  ✗ Still forming ("减肥" — body still too fat)
  ✗ Body too large relative to wick
```

### 9.2 Breakout Candle Confirmation
```
Valid breakout:
  ✓ THICK body (粗大) — "很有力量"
  ✓ Consecutive thick bodies after breakout ("pop pop pop")
  ✓ Breaks through drawn trendline/SR clearly
  
Trainer: "蜡烛很粗很大支的，它会跟你说它的意思它很有力量...
        它只要有一个很粗的，通常它都会连着去的"
```

### 9.3 Candle Body Momentum Rule
```
Thick consecutive bodies in one direction = MOMENTUM
  → The direction is REAL and will CONTINUE
  → Don't fade it, FOLLOW it

Weak/small bodies = INDECISION
  → Wait for confirmation
  → Price may reverse or consolidate
```

---

## 10. WAVE MEASUREMENT FORMULAS

### 10.1 Wave Equality Projection
```
Used to project continuation targets:

Measure Wave 1: %_move_1 = |High1 - Low1| / High1 (for downtrend)
Measure Wave 2: %_move_2 = |High2 - Low2| / High2
Average: (Wave1% + Wave2%) / 2
Project Wave 3: Starting_High × (1 - Average%)

BTC Example:
  Wave 1: 36% decline
  Wave 2: 38% decline
  Average: ~35%
  Wave 3 target: Current price × (1 - 0.35)

NOTE: Trainer uses this as supplementary confirmation, not primary.
"It's just one way I sometimes look at it."
```

---

## 11. CONFIDENCE SCORING FORMULA

### 11.1 Checklist Item Weighting (Implicit)
```
6 items maximum in the trading checklist:
  1. Trend direction (趋势)
  2. S/R levels (支撑阻力)
  3. Trendline/Pattern (趋势线/形态)
  4. MACD timeframe (MACD时间级别)
  5. Fibonacci hunting range (斐波那契狩猎范围)
  6. Reversal candle (反转蜡烛)

Confidence:
  4-6 items → HIGH CONFIDENCE trade
  3 items   → ACCEPTABLE trade
  <3 items  → PASS (don't trade)

Trainer: "三个到四个是四个以上对应的，来这个单就把握性很高"
```

---

## 14. WALLET MANAGEMENT FORMULAS (Week 2 Day 1 — NEW)

### 14.1 Three-Layer Capital Allocation
```
Layer 1 (生存支出 - Survival):  Total Net Worth × 50%
Layer 2 (备用金 - Emergency):    Total Net Worth × 20-30%
Layer 3 (投资资金 - Investment):  Total Net Worth × 20-30%

Validation: L1 + L2 + L3 = Total Net Worth
```

### 14.2 Bullet Method Formula
```
Per-Bullet Size = Investment Capital ÷ 100

Where: Investment Capital = Layer 3 from above

Example Calculations:
  $50,000 IC → $500/bullet
  $10,000 IC → $100/bullet
  $3,000 IC  → $30/bullet
  $1,000 IC  → $10/bullet
```

### 14.3 Bullet Allocation Ranges
```
Testing/Low Conviction:      1 bullet  (1% of IC)
Moderate Conviction:        3-5 bullets (3-5% of IC)
High Conviction:           5-10 bullets (5-10% of IC)
Trading Allocation:       10-20 bullets (10-20% of IC)
Maximum Any Single Thing:    20 bullets (20% of IC) — never exceed
```

### 14.4 Within-Trading Sub-Allocation
```
Trading Capital = [10-20 bullets]
  ├─ Spot/DCA (现货/定投):   50% of Trading Capital
  └─ Contract/FX (合约/外汇): 50% of Trading Capital

Example ($10,000 Trading Capital):
  Spot:    $5,000 (DCA, long-term hold)
  Contract: $5,000 (active trading)
```

### 14.5 Copy-Trade Allocation (Small Accounts)
```
For accounts < $3,000:
  Copy Trade (跟单):  70-80% of trading capital
  Self Trade (自主):   20-30% of trading capital
  
  Self Trade Sub-Allocation:
    Divide into 10-20 parts
    Example: $1,000 × 30% = $300 → 10 parts = $30/part
```

### 14.6 Capital Extraction Rule
```
When Contract Account Profits > Original Allocation:
  → Extract excess profits
  → Keep contract account at original size
  → Move extracted profits to: Spot/DCA or Layer 1/2

Trainer: "资金多了我都会把它拿出来变少一点再去交易"
```

---

## 15. PROBABILITY STACKING FORMULAS (Week 2 Day 1 — NEW)

### 15.1 Core Probability Formula
```
P(N) = 50% + (N × 3%)

Where: N = number of confirmed checklist factors (0 ≤ N ≤ 6)

P(0) = 50% (coin flip — DO NOT TRADE)
P(1) = 53%
P(2) = 56%
P(3) = 59% (MINIMUM TRADE THRESHOLD)
P(4) = 62%
P(5) = 65%
P(6) = 68% (MAXIMUM ACHIEVABLE)

CRITICAL: Even at maximum confluence, probability never exceeds 68%.
This is why strict R:R (minimum 1:3) and stop losses are NON-NEGOTIABLE.
```

### 15.2 Factor Mapping
```
Checklist Step → Factor → Cumulative Probability
─────────────────────────────────────────────────
Start                → 50%
1. Trend confirmed   → +3% → 53%
2. S/R confirmed     → +3% → 56%
3. Pattern confirmed → +3% → 59% ← Minimum trade
4. MACD confirmed    → +3% → 62%
5. Fibonacci conf.   → +3% → 65%
6. Candle confirmed  → +3% → 68% ← Maximum
```

### 15.3 Breakeven Win Rate with Probability
```
At P(3) = 59%:  R:R > 1:0.69 needed (easily satisfied by 1:3)
At P(4) = 62%:  R:R > 1:0.61 needed
At P(5) = 65%:  R:R > 1:0.54 needed
At P(6) = 68%:  R:R > 1:0.47 needed

Formula: Required R:R = (1 - P) ÷ P
Example at P=59%: (1 - 0.59) ÷ 0.59 = 0.695 → 1:0.7 minimum
```

### 15.4 Expected Value with Probability
```
EV per trade = (P × Win_Amount) - ((1-P) × Loss_Amount)

Example: P=65%, Win=300U, Loss=100U (1:3 R:R)
  EV = (0.65 × 300) - (0.35 × 100)
     = 195 - 35
     = +160U per trade
```

---

*Compiled from transcripts + video frame analysis | Last updated: 2026-06-17*
*Sources: Week 1 Day 2, Week 1 Day 3, Week 2 Day 1*
