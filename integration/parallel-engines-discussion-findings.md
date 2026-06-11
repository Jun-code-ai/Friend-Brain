# Parallel Engines Discussion — Key Findings

> **Off-the-record analysis. 2026-06-12.**
> **Comparing FVG App vs Friend's Strategy — how they actually interact.**

---

## 1. The Zero Confluence Discovery

**FVG and Friend's strategy fire on completely different candles.** Across 1,489 FVG signals and 115 Friend signals, there were **zero overlaps.** They cannot be mixed as filters on each other.

---

## 2. Why Zero Confluence — The MACD Difference

| | FVG App's MACD Gate | Friend's MACD Gate |
|---|---|---|
| **What it checks** | MACD **momentum direction** | MACD **zero-axis proximity** |
| **The question** | "Is the trend strong?" | "Is price at the institution's cost basis?" |
| **Market condition** | **Trending** — momentum established | **Reversal/Continuation at structure** |
| **Entry timing** | Middle of the trend | Very beginning of the move |

When MACD is strong enough for FVG (histogram above zero + rising), MACD is too far from zero for Friend. When MACD is at zero for Friend, the histogram is crossing — which FVG flags as "weak/neutral." They are **timing-different, not contradictory.**

---

## 3. The Parallel Engine Simulation Results

| Engine | Trades | Target Hit | Stopped | Return | MaxDD |
|--------|--------|-----------|---------|--------|-------|
| **FVG alone (0.75x)** | 100 | 15% | 84% | **-15.8%** | 38.5% |
| **Friend alone (0.75x)** | 100 | 9% | 44% | **+610.3%** | 26.1% |
| Mixed together | 100 | 15% | 83% | -15.0% | 40.4% |

**Key finding:** FVG at reduced size (0.75x) loses money — it needs full aggressive sizing. Friend at reduced size still prints +610% with 26.1% maxDD. They should NOT share the same entry rules.

---

## 4. Entry Timing vs Compounding Speed

| | Friend (beginning of move) | FVG (middle of move) |
|---|---|---|
| % of move captured when right | ~80-100% | ~40-60% |
| How often right (target hit) | 9-17% | 35-37% |
| Expected value per trade | ~17 units | ~17.5 units |
| **Trades per year** | **~16** | **~100** |
| Wins per year | ~2.7 | ~35 |

**Expected value per trade is nearly identical.** The difference is compounding frequency. FVG fires 6x more trades, which drives faster compounding. But FVG also has higher maxDD at aggressive sizing (93% vs 34%).

---

## 5. The Right Architecture — Portfolio Allocation, Not Mixing

```
$10,000 capital
  ├── $5,000 → FVG Engine (trend-following, momentum-confirmed)
  │              Middle of trend. High frequency. Aggressive sizing needed.
  │              
  └── $5,000 → Friend Engine (structural, mean-reversion)
                 Beginning of move. Low frequency. Conservative sizing works.
                 
  When trending markets → FVG prints
  When choppy/reversals → Friend prints
  Combined: smoother equity curve, better diversification
```

---

## 6. Pure Strategy Comparison (Best Runs)

| Metric | FVG Conservative 2% | FVG Conservative 5% | FVG Conservative 10% | Friend Pure 10% |
|--------|--------------------|--------------------|--------------------|-----------------|
| Final Capital | $37,395 | $216,566 | $737,913 | $127,154 |
| Total Return | +274% | +2,066% | +7,279% | +1,171% |
| Est. Monthly | ~12% | ~94% | ~330% | ~53% |
| Win Rate | **35%** | 34% | 37% | 17% |
| Profit Factor | **2.1x** | **2.8x** | **5.1x** | **0.8x** |
| Max Drawdown | 42% | 76% | 93% | **34%** |

**FVG wins on consistency (PF 2.1x+). Friend wins on drawdown control (34%).**

---

## 7. Bottom Line

- FVG and Friend are **complementary at portfolio level**, not filter level
- FVG = machine gunner (volume of fire). Friend = sniper (big payoff per shot)
- Neither is strictly better — they thrive in different market conditions
- Run as **separate sub-strategies** with separate capital, not nested filters
- Friend's 0.8x profit factor needs improvement — time-exit dependency is fragile
- FVG's 5.1x profit factor at 10% risk comes with 93% maxDD — practically unusable
- The best FVG profile is Conservative 2%: PF 2.1x, 35% WR, 42% maxDD, +12%/month

---

*Saved for future reference. Off the record.*
