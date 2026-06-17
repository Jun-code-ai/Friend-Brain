# Friend's Executable Decision Logic — Complete Step-by-Step Sequence

> **This is the algorithmic representation of the friend's brain.**
> Follow these steps EXACTLY in order. Each step maps to a specific action he takes.
> Compile from 3 full training sessions (Week 1 Day 2, Day 3 & Week 2 Day 1).
> **v2.0 — Added Wallet Initialization (Phase -1), Probability Calculation (Phase 7), Post-Trade Management (Phase 12)**

---

## PHASE 0: ENVIRONMENT SETUP

```
STEP 0.1 — Open TradingView (or Binance/OKX with TradingView charts)
STEP 0.2 — Set up chart layout:
  □ Main chart: Candlestick (normal, not Heikin Ashi)
  □ Overlay: EMA52 (white, period 52)
  □ Indicator panel 1: MACD (12, 26, 9) — standard
  □ Indicator panel 2: STO (9, 3, 3) — modified for sensitivity
  □ Drawing tools: Fibonacci retracement, Trendline, Horizontal line ready
STEP 0.3 — Set Fibonacci tool:
  □ Levels: 0, 0.236, 0.382, 0.5, 0.618, 0.786, 1, -1.618
  □ Extend: Right only
  □ Background: Off
  □ Labels: Right side, font 10-11
STEP 0.4 — Configure timeframes in watchlist:
  □ 45D, 40D, 21D, 15D, 10D, 5D, 4D, 3D, 2D
  □ 12H, 8H, 6H, 4H, 3H, 2H, 90m, 45m, 30m, 15m
  □ Monthly, Weekly, Daily (standard)
STEP 0.5 — Check economic calendar:
  □ Any FOMC/NFP/CPI today? If YES → EXTRA CAUTION
  □ Current session: Asia/London/NY? → Note expected liquidity
STEP 0.6 — Confirm platform:
  □ Computer or tablet (NOT phone for analysis)
  □ Account segregated: copy-trading vs self-trading
```

---

## PHASE 1: MACRO CONTEXT (5 minutes)

```
1.1 — OPEN MONTHLY CHART
  □ Draw horizontal lines at major swing highs and lows
  □ Note: Is the macro trend UP, DOWN, or RANGING?
  □ Record the nearest monthly S/R levels → these are MAJOR targets

1.2 — OPEN WEEKLY CHART
  □ Draw horizontal lines at structural swing points
  □ Compare with monthly S/R → do they align? (Stronger if yes)
  □ Note overall trend direction (higher highs = up, lower lows = down)

1.3 — OPEN DAILY CHART
  □ Draw horizontal lines at recent swing highs and lows
  □ Check MACD position: Above or below zero axis?
  □ > Zero = bullish regime | < Zero = bearish regime
  □ Check: Is MACD approaching zero axis? → Potential reversal zone

DECISION: Is there a clear macro trend?
  YES → Proceed. Trade WITH the trend primarily.
  NO (ranging) → Proceed. Trade both directions at range edges.
```

---

## PHASE 2: ACTIVE TIMEFRAME IDENTIFICATION (3 minutes)

```
2.1 — MACD MULTI-TIMEFRAME SCAN (TOP → DOWN)

  SCAN SEQUENCE:
    45D → 40D → 21D → 15D → 10D → 5D → 4D → 3D → 2D
    → 12H → 8H → 6H → 4H → 3H → 2H → 90m → 45m → 30m → 15m

  For EACH timeframe, ask:
    Is MACD fast/slow line near (touching or very close to) the ZERO AXIS?
    
    YES → THIS IS THE ACTIVE TIMEFRAME. Stop scanning.
    NO  → Continue to next timeframe down.

2.2 — DETERMINE DIRECTION ON ACTIVE TIMEFRAME:
  MACD ABOVE zero axis → BULLISH regime → Look for LONGS
  MACD BELOW zero axis → BEARISH regime → Look for SHORTS
  MACD AT zero axis → TRANSITION → Either direction possible (use other factors)

2.3 — CHECK EMA52 ON PRICE CHART:
  Is price above or below EMA52?
  Above = confirms bullish | Below = confirms bearish
  
  Is price touching EMA52 RIGHT NOW?
  YES → HIGH probability reversal/continuation zone. Focus here.
  NO  → Wait for price to approach EMA52.

RECORD:
  Active timeframe: _____ (e.g., 4-Day)
  Direction: LONG / SHORT
  EMA52 status: Price above/below/touching EMA52
```

---

## PHASE 3: STRUCTURE MAPPING (5 minutes)

```
3.1 — ON 4H CHART (PRIMARY S/R TIMEFRAME):
  □ Identify ALL swing highs (peaks where price reversed down)
  □ Draw horizontal line at each swing high
  □ Mark with count: how many touches? (3+ = STRONG)
  □ Identify ALL swing lows (troughs where price reversed up)
  □ Draw horizontal line at each swing low
  □ Mark flipped levels: old support now acting as resistance? Vice versa?

3.2 — ON 1H CHART (SECONDARY S/R REFINEMENT):
  □ Refine 4H lines to precise candle body/wick touches
  □ Add any 1H-specific S/R not visible on 4H
  □ Cross-check: Do 1H levels align with 4H levels? (Stronger if yes)

3.3 — ON ACTIVE TIMEFRAME (from Phase 2):
  □ Draw S/R levels specific to this timeframe
  □ These are the MOST RELEVANT levels for the current setup

3.4 — DRAW TRENDLINES & PATTERNS:
  □ Connect 2+ swing highs → upper trendline
  □ Connect 2+ swing lows → lower trendline
  □ Identify pattern: Triangle? Channel? Wedge?
  □ If triangle: Which type? (上升/下降/对称)
  □ Note: Is price at a trendline boundary RIGHT NOW?

3.5 — IDENTIFY THE NEAREST S/R TO CURRENT PRICE:
  Above price: Nearest RESISTANCE = _____ (price level)
  Below price: Nearest SUPPORT = _____ (price level)
  
  Which side is price closer to? 
  → If closer to resistance in downtrend → potential SHORT entry
  → If closer to support in uptrend → potential LONG entry
```

---

## PHASE 4: FIBONACCI HUNTING RANGE (2 minutes)

```
4.1 — IDENTIFY THE LAST COMPLETED WAVE:
  Look LEFT of current price.
  Find the most recent clear swing that has COMPLETED.
  
  UPTREND wave: Clear swing LOW → Clear swing HIGH (a rally)
  DOWNTREND wave: Clear swing HIGH → Clear swing LOW (a decline)

4.2 — DRAW FIBONACCI:
  UPTREND (looking for long on pullback):
    Anchor 0 at: WAVE LOW
    Anchor 1 at: WAVE HIGH
    → Levels project DOWNWARD (retracement from the high)
    
  DOWNTREND (looking for short on rally):
    Anchor 0 at: WAVE HIGH  
    Anchor 1 at: WAVE LOW
    → Levels project UPWARD (retracement from the low)

4.3 — CHECK HUNTING RANGE STATUS:
  Is current price within 0.5 - 0.786 zone?
  
  YES → Price is in the HUNTING RANGE (狩猎范围内)
        → Proceed to indicator confirmation
  
  NO → Price is OUTSIDE hunting range
       → If price is ABOVE 0.786 (too extended): WAIT for pullback
       → If price is BELOW 0 (broke the low/high): Wave invalidated → Redraw

4.4 — CHECK S/R + FIB CONFLUENCE:
  Does the Fibonacci level overlap with a drawn S/R level?
  
  Example: 0.618 Fibonacci = 63,000 AND structural resistance = 63,200
  → CONFLUENCE ZONE: 63,000-63,200
  → This is the HIGHEST PROBABILITY entry zone
  
  Record the confluence zone: _____ to _____
```

---

## PHASE 5: INDICATOR CONFIRMATION (2 minutes)

```
5.1 — STO (9,3,3) CHECK:
  Current STO reading: _____
  
  Looking for LONG:  Is STO in or near 超卖区 (<20)?
  Looking for SHORT: Is STO in or near 超买区 (>80)?
  
  Is STO showing DIVERGENCE?
    Compare price peaks/troughs with STO peaks/troughs.
    Price higher high + STO lower high = Bearish divergence
    Price lower low + STO higher low = Bullish divergence

5.2 — MACD DIVERGENCE CHECK ON ACTIVE TIMEFRAME:
  Identify two consecutive swing highs (for bearish) or lows (for bullish)
  
  Bearish check: Price HH → MACD LH? → Divergence → DROP signal
  Bullish check: Price LL → MACD HL? → Divergence → RALLY signal

5.3 — MACD ZERO AXIS CHECK:
  Is MACD at/near zero axis on the active timeframe?
  YES → This is a STRUCTURAL level → higher conviction
  NO → Trade still possible but lower conviction

5.4 — CONFLUENCE SCORE:
  Count how many of these align at the same zone:
  □ S/R level (Phase 3) → +1
  □ Fibonacci level 0.5-0.786 (Phase 4) → +1
  □ STO extreme/divergence → +1
  □ MACD zero axis → +1
  □ Trendline/pattern boundary → +1
  □ EMA52 touch → +1

  SCORE: _____ / 6

  ≥ 4 → HIGH CONVICTION → Size: Full position
  3   → ACCEPTABLE → Size: 75% of full position
  2   → WAIT → One more confirmation needed
  ≤ 1 → NO TRADE → Pass, wait for next setup
```

---

## PHASE 6: CANDLESTICK WATCH (Wait Until Signal)

```
6.1 — SWITCH TO ENTRY TIMEFRAME (30m or 15m):
  Monitor price action at the identified confluence zone.

6.2 — WATCH FOR REVERSAL CANDLE AT THE LEVEL:
  
  For LONG entry (at support zone):
    WATCH FOR:
    □ 美女 (Hammer) — small body, long LOWER wick, at support
    □ 吞没 (Bullish Engulfing) — green body engulfs prior red body
    □ 早晨之星 (Morning Star) — 3-candle: down, small, up
    
  For SHORT entry (at resistance zone):
    WATCH FOR:
    □ 美女 (Inverted Hammer) — small body, long UPPER wick, at resistance
    □ 吞没 (Bearish Engulfing) — red body engulfs prior green body
    □ 黄昏之星 (Evening Star) — 3-candle: up, small, down

6.3 — CANDLE VALIDATION CHECKLIST:
  □ Is the candle at the IDENTIFIED KEY LEVEL (not random)?
    "你们不要每一个都看了，以为他真的要转头，你一定是要在关键位置"
  
  □ Is the candle CLOSED (not still forming)?
    "减肥" = not ready yet. Wait for close.
  
  □ Body-to-wick ratio appropriate?
    Reversal hammer: wick ≥ 2× body
    Engulfing: body completely covers previous body
  
  □ Is body THICK (for continuation/breakout candles)?
    "蜡烛很粗很大支的，它会跟你说它的意思它很有力量"

6.4 — IF CANDLE CONFIRMS → PROCEED TO EXECUTION
  IF NO CANDLE YET → CONTINUE WATCHING
    "没有行情，我逼着你们去进场，不可能的"
    DO NOT ENTER without candle confirmation.
```

---

## PHASE 7: EXECUTION (Immediate)

```
7.1 — DETERMINE ENTRY TYPE:
  
  LIMIT ORDER:
    Price is approaching but hasn't reached the zone yet
    → Place limit at exact confluence price
    → Wait for fill
  
  STOP ENTRY (Conditional):
    Breakout trade — price must break level first
    → Place stop-entry above resistance (long) or below support (short)
    → "过了才进场" — only enter AFTER trigger
  
  MARKET ORDER:
    Price IS at the zone + candle JUST closed confirming
    → Enter at market immediately

7.2 — CALCULATE STOP LOSS (Method B — Chart-Based):
  
  FOR SHORT:
    Find nearest swing HIGH above entry:
    Swing_High = _____ (use the WICK, not body)
    Raw_Stop = Swing_High - Entry
    Buffer = Raw_Stop × 0.5
    Stop = Entry + Raw_Stop + Buffer
    
  FOR LONG:
    Find nearest swing LOW below entry:
    Swing_Low = _____ (use the WICK, not body)
    Raw_Stop = Entry - Swing_Low
    Buffer = Raw_Stop × 0.5
    Stop = Entry - Raw_Stop - Buffer

  ALTERNATIVE (Brainless Method A):
    Profit_Points = |Entry - Target|
    Stop = Entry ± (Profit_Points ÷ 3)

7.3 — CALCULATE TARGET:
  
  PRIMARY TARGET:
    Find the OPPOSITE S/R level from entry:
    "反过来的地方你的目标价"
    
    For SHORT from resistance: Target = Next SUPPORT below
    For LONG from support: Target = Next RESISTANCE above
    
  SECONDARY TARGET (Fibonacci Extension):
    Draw reversed Fibonacci from opposite wave anchor
    Extension levels = further targets
    
  Record: Target = _____ (R:R = _____)

7.4 — VERIFY R:R BEFORE ENTERING:
  R:R = |Target - Entry| ÷ |Stop - Entry|
  
  R:R ≥ 3.0 → ACCEPTABLE (trainer's minimum)
  R:R ≥ 5.0 → GOOD
  R:R ≥ 10.0 → EXCELLENT
  R:R < 3.0 → REJECT THIS TRADE — R:R too low
  
  "盈亏比例是非常重要的，别的都不重要"

7.5 — CALCULATE POSITION SIZE:
  
  Max Loss = Account_Size × Risk_Percentage
    Large account (≥50K): Max Loss = Account × 0.05 (5%)
    Small account (≤10K): Max Loss = Account × 0.10 (10%)
    Tiny account (~500): Max Loss = Account × 0.10 (10%)
  
  Position Size → Use AI:
    "[Asset]进场价[Entry]，止损价[Stop]，最大亏损[MaxLoss]U，请问手数多少？"
    → Record lot size: _____

7.6 — MAXIMUM CONCURRENT CHECK:
  Current open positions: _____
  If ≥ 2 → DO NOT open new position
  If = 1 → Can open 1 more (if different setup)
  If = 0 → Open position

7.7 — EXECUTE THE ORDER:
  □ Place entry order (limit/stop/market)
  □ Set stop loss IMMEDIATELY
  □ Set take profit target
  □ Record in trade journal:
    - Date/time
    - Asset, direction
    - Entry price, stop price, target price
    - R:R ratio
    - Confluence score (from Phase 5)
    - Active MACD timeframe
    - Screenshot with all lines visible
```

---

## PHASE 8: TRADE MANAGEMENT (During Trade)

```
8.1 — DAILY CHECK (for swing trades):
  □ Has price reached target? → Close or partial
  □ Has price hit stop? → Accept loss, move on
  □ Has MACD on active timeframe changed?
    - Crossed zero axis opposite direction? → Consider early exit
    - Still trending same direction? → HOLD

8.2 — ZERO AXIS RETEST (opportunity to add):
  Price returns to EMA52/MACD zero axis on active timeframe
  AND reversal candle (美女) confirms
  
  → ADD small position (not full size)
  → Adjust aggregate stop to new structure
  "只要它回归零轴，我就会去加仓"

8.3 — DIVERGENCE SIGNAL (opportunity to partial):
  MACD divergence forms on active timeframe
  
  → Take 20-30% partial profit
  → Move stop to breakeven on remainder
  → Let rest run to original target
  
  "这里我就开始平了一点仓，平了20%还是30%"

8.4 — AT 1:3 R:R (student exit option):
  Price reaches 1:3 R:R
  
  → OPTIONAL: Take full profit here
  → Trainer: Continues holding if structure intact
  "你们到了一对1:3，你想止盈是可以的"

8.5 — STOP ADJUSTMENT:
  After new structural swing forms in trade direction:
  → Move stop behind the new swing (trailing)
  → Maintain 50% buffer above/below new swing
  → NEVER move stop FURTHER from entry (only tighter)
```

---

## PHASE 9: EXIT EXECUTION

```
9.1 — EXIT AT TARGET:
  Price reaches primary target S/R
  
  ACTION: Close full position OR close 70-80%, leave runner
  
9.2 — EXIT AT DIVERGENCE:
  Major MACD divergence forms on active timeframe
  
  ACTION: Close full position
  "一旦有背离，通常都会发生"

9.3 — EXIT AT REVERSAL:
  Price forms clear reversal candle AT the target zone
  
  ACTION: Close full position
  "看到美女要回头"

9.4 — EXIT AT STOP:
  Price reaches stop loss
  
  ACTION: Accept loss. DO NOT:
    ✗ Remove stop to "give it more room"
    ✗ Immediately re-enter revenge trade
    ✗ Double position size on next trade
  
  Review: Was stop placement correct? Did price reverse after stopping out?
```

---

## PHASE 10: POST-TRADE REVIEW (Mandatory)

```
10.1 — DOCUMENT THE TRADE:
  □ Screenshot final chart with entry, stop, target, and result
  □ Record actual R:R achieved (not planned)
  □ Record actual hold time
  
10.2 — THE "WHY DID IT HAPPEN?" ANALYSIS:
  
  WIN: What went right?
  □ Checklist confluence score? (was it high?)
  □ Did price respect the identified S/R?
  □ Was the target reasonable?
  □ Was the stop appropriate (not hit prematurely)?
  
  LOSS: What went wrong?
  □ Did I ignore a checklist item?
  □ Was confluence score too low?
  □ Did I enter before candle confirmation?
  □ Was stop too tight? (Method A ÷4 instead of ÷3?)
  □ Was there a news event I missed?
  □ Did the MACD timeframe actually NOT support the trade?

10.3 — UPDATE MENTAL MODEL:
  Add any new pattern, exception, or insight to your personal trading notes.
  "我每次交易完，不管赚不赚钱，我都会做个简单的复盘"
```

---

## PHASE 11: SESSION & NEWS AWARENESS

```
11.1 — TIME OF DAY CHECK:
  Current time (GMT+8): _____
  
  Asia (07:00-15:00): Low liquidity → small moves, possible fakeouts
  London (15:00-00:00): Moderate → teaching window, tradable
  New York (20:00-05:00): HIGH → best entries, most liquidity
  NY-London overlap (20:00-00:00): MAXIMUM → prime trading
  
  For day trades: Only during London or NY
  For swing trades: Any time (level-based, not time-based)

11.2 — 21:00 REVERSAL PATTERN CHECK:
  If it's around 21:00 AND price has been drifting one way all day:
  → EXPECT a liquidity grab spike followed by reversal
  → This is a HIGH PROBABILITY setup if other factors align
  
  "美国开市之前，美国很喜欢做一种反方向的操作...
   一踏入9点的第一个第一时间，他就往上冲了一下，
   拿了流动性就直接反方向了"

11.3 — NEWS EVENT CHECK:
  Today: FOMC? NFP? CPI?
  
  If YES → STAND ASIDE or REDUCE SIZE
  "我通常有新闻，我是会...等他先想往上走的时候我才走，我才做"
  → Wait for the news to pass
  → Let the market establish direction first
  → Then enter on the established direction
```

---

## COMPLETE DECISION FLOW DIAGRAM

```
START
  │
  ├─→ PHASE 0: Setup charting environment, configure indicators
  │
  ├─→ PHASE 1: Macro context (M/W/D trend direction)
  │     │
  │     └─→ No clear trend? → Ranging mode
  │
  ├─→ PHASE 2: MACD multi-TF scan (45D→15m)
  │     │
  │     ├─→ Found active TF at zero axis → Proceed
  │     └─→ No TF at zero axis → WAIT (no setup)
  │
  ├─→ PHASE 3: Draw S/R (4H/1H) + Trendlines + Patterns
  │
  ├─→ PHASE 4: Draw Fibonacci from last completed wave
  │     │
  │     ├─→ Price in 0.5-0.786 hunting range → Proceed
  │     └─→ Price outside range → WAIT
  │
  ├─→ PHASE 5: Indicator confirmation (STO + MACD)
  │     │
  │     ├─→ Score ≥ 4 → HIGH CONVICTION
  │     ├─→ Score = 3 → ACCEPTABLE
  │     └─→ Score ≤ 2 → WAIT
  │
  ├─→ PHASE 6: Watch for 美女/吞没 at the zone
  │     │
  │     ├─→ Candle confirms at key level → Proceed
  │     └─→ No candle → KEEP WATCHING
  │
  ├─→ PHASE 7: EXECUTION
  │     ├─→ Calculate Stop (Method B: swing + 50%)
  │     ├─→ Calculate Target (opposite S/R)
  │     ├─→ Verify R:R ≥ 3.0
  │     ├─→ Calculate Position Size (≤10% max loss)
  │     └─→ Place Order + Stop + Target
  │
  ├─→ PHASE 8: TRADE MANAGEMENT
  │     ├─→ Zero axis retest → Add position
  │     ├─→ Divergence → Partial TP 20-30%
  │     └─→ New swing → Trail stop
  │
  ├─→ PHASE 9: EXIT
  │     ├─→ Target reached → Full/partial exit
  │     ├─→ Divergence → Full exit
  │     └─→ Stop hit → Accept loss
  │
  └─→ PHASE 10: REVIEW → Document → Learn → NEXT SETUP
```

---

## QUICK REFERENCE CARD

```
┌─────────────────────────────────────────────────────────┐
│                 FRIEND'S TRADING MANTRA                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  "相信照做，拿到结果" — Trust the process, get results    │
│                                                         │
│  TREND:       Monthly → Weekly → Daily                  │
│  S/R:         4H + 1H (MOST IMPORTANT)                  │
│  ENTRY:       30m/15m with 美女 candle                   │
│                                                         │
│  STOP:        Swing + 50% buffer                        │
│  TARGET:      Opposite S/R level                        │
│  MIN R:R:     1:3                                       │
│                                                         │
│  MACD SCAN:   45D→15m (find active zero-axis TF)        │
│  EMA52:       Dynamic S/R on price chart                │
│  STO:         (9,3,3) — 80+ = sell, 20- = buy          │
│  FIB:         0.5/0.618/0.786 = hunting range            │
│                                                         │
│  CANDLE:      美女 at key level = REVERSAL              │
│              厚体蜡烛 = MOMENTUM continuation           │
│                                                         │
│  RISK:        10% max per trade (5% for large)           │
│  MAX POS:     2 concurrent (1 personally)                │
│  NEWS:        Stand aside for FOMC/NFP/CPI              │
│                                                         │
│  PSYCHOLOGY:  Hunter's patience. 中庸 (balance).        │
│               Greed with LOGIC. Self-critique.           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## PHASE -1: WALLET INITIALIZATION (Week 2 Day 1 — NEW)

```
BEFORE any trading session begins, verify capital structure:

STEP -1.1 — Calculate total net worth
  □ Sum all assets (cash, investments, property equity)

STEP -1.2 — Apply 3-Layer Split
  □ L1 Survival (生存支出): Total × 50% → living expenses + debt
  □ L2 Emergency (备用金): Total × 20-30% → untouchable
  □ L3 Investment (投资资金): Remaining → ONLY this for trading

STEP -1.3 — Calculate Bullet Size
  □ Per-Bullet = L3 Investment Capital ÷ 100

STEP -1.4 — Split Trading Allocation (10-20 bullets)
  □ 50% Spot/DCA → long-term passive
  □ 50% Contract/FX → active trading

STEP -1.5 — Verify Platform Distribution
  □ NOT all funds on one exchange
  □ NOT all funds in one wallet
  □ Spread across multiple platforms

STEP -1.6 — Determine Per-Trade Bullet Allocation
  □ Low conviction → 1-3 bullets
  □ Moderate → 3-5 bullets
  □ High → 5-10 bullets (max 20 for anything)

FOR SMALL ACCOUNTS (<$1,000):
  □ Skip 3-layer split
  □ 100% in contracts
  □ 70-80% copy-trade, 20-30% self-trade
  □ Still split into 10-20 parts
```

---

## PHASE 6.5: PROBABILITY CALCULATION (Week 2 Day 1 — NEW)

```
After completing Phases 1-6 (the 6-step checklist):

STEP 6.5.1 — Count confirmed factors (N)
  □ Trend confirmed in trade direction?         (+3%)
  □ S/R level at entry zone?                    (+3%)
  □ Trendline/Pattern confirmed?                (+3%)
  □ MACD on active TF confirms direction?       (+3%)
  □ Price in Fibonacci hunting range?           (+3%)
  □ Reversal candle confirmed?                  (+3%)

STEP 6.5.2 — Calculate probability
  P = 50% + (N × 3%)
  
  N=0 → 50% (DO NOT TRADE)
  N=1 → 53% (DO NOT TRADE)
  N=2 → 56% (DO NOT TRADE)
  N=3 → 59% (MINIMUM THRESHOLD)
  N=4 → 62%
  N=5 → 65%
  N=6 → 68% (MAXIMUM)

STEP 6.5.3 — Decision
  IF P < 59% → PASS (wait for more confluence)
  IF P ≥ 59% → Continue to Phase 7 (Entry Execution)
  
  REMEMBER: Even at 68%, the trade can lose.
  This is why R:R ≥ 1:3 and SL are MANDATORY.
```

---

## PHASE 12: POST-TRADE MANAGEMENT (Week 2 Day 1 — NEW)

```
STEP 12.1 — Move SL to Breakeven at 1:1 R:R
  TRIGGER: Price reaches 1:1 R:R (profit = initial risk)
  ACTION: Move stop loss to entry price
  RESULT: Zero-risk trade (only cost if hit = commission)
  "把止损点移到你的进场价位...亏的话，就亏个手续费"

STEP 12.2 — Asset-Specific Close Rules
  FOR METALS (XAUUSD, XAGUSD):
    IF open at 11:30 PM bedtime:
      AND price is ranging (徘徊):
        → CLOSE regardless of P/L
    Reason: Metals mostly range, don't trend overnight
    
  FOR CRYPTO (BTC, NEAR, HYPE):
    IF setup still valid:
      → HOLD for days to target
    Reason: Crypto trends directionally

STEP 12.3 — NEVER 砍单
  DEFINITION: Removing/widening stop loss to avoid loss
  RULE: ABSOLUTELY FORBIDDEN
  Let SL do its job. Accept the loss if hit.
  "亏就亏，知道吧，但是亏的合理"

STEP 12.4 — Capital Extraction
  WHEN contract account exceeds original allocation:
    → Extract profits to spot/DCA or Layer 1/2
    → Keep contract account at original size
  "资金多了我都会把它拿出来变少一点再去交易"

STEP 12.5 — Regular Wallet Rebalancing
  Monthly/Quarterly:
    □ Recalculate total net worth
    □ Verify 3-layer allocation still correct
    □ Adjust bullet sizes if investment capital changed
    □ Rebalance spot/contract split
```

---

## PHASE 13: CONFLICT RESOLUTION (Week 2 Day 1 — NEW)

```
STEP 13.1 — When Timeframes Contradict
  IF Daily and Weekly timeframes disagree:
    → WEEKLY WINS (周图是老大)
    "日图跟周图我会选择周图作为我的老大"

  IF Daily confirms Weekly:
    → Use Daily for entry refinement

STEP 13.2 — Divergence Chain Validation
  Larger TF divergence must be CONFIRMED by smaller TF divergences:
    "更小的背离才形成大背离"
  
  Example: Daily MACD divergence → Check if 8H, 6H, 4H also show divergence
  Only when multiple TFs align → "大背离" confirmed

STEP 13.3 — When R:R < 1:3 (Exception Rule)
  NORMAL RULE: Minimum 1:3 R:R
  EXCEPTION: Can accept lower R:R ONLY IF:
    □ 5+ checklist factors aligned (P ≥ 65%)
    □ No resistance on ANY timeframe (rare — "都豁出去了")
    □ Position sized smaller than normal (lower conviction size)
  Example: NEAR at ~1:1.4 entered because 5+ factors + zero resistance on all TFs
```

---

*Last updated: 2026-06-17 | Based on: 3 complete training sessions (Week 1 Day 2, Day 3, Week 2 Day 1)*
*Model Version: v2.0 — Added Wallet Init, Probability Calc, Post-Trade Mgmt, Conflict Resolution*
*This model will be refined and expanded with each new video uploaded.*
