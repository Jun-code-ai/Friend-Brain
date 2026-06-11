/**
 * Monte Carlo v2 — Friend's Filters + FVG App, proper sequence
 *
 * $10K capital, 10x leverage, 10% risk per trade
 * MACD signal strength = FIRST GATE
 * Then: AI score → EMA52 → Fibonacci zone → Candle beauty → R:R check
 * 100-trade simulation, proper position sizing
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// Node shim
// ============================================================
global.window = { dispatchEvent(){}, addEventListener(){}, removeEventListener(){} };
global.CustomEvent = class { constructor(){ this.detail = null; } };
global.localStorage = { _data:{}, getItem(k){ return this._data[k]||null }, setItem(k,v){ this._data[k]=v } };
global.document = { querySelector(){return null}, getElementById(){return null}, querySelectorAll(){return[]}, addEventListener(){}, createElement(){return{style:{},classList:{add(){}}}} };
global.fetch = function(){ return Promise.resolve({ ok:true, json:()=>Promise.resolve({}) }) };

const APP_DIR = 'C:/Users/2junf/fvg-analyzer-v2.7-20260524-015625';
require(path.join(APP_DIR, 'public/js/trading-costs.js'));
require(path.join(APP_DIR, 'public/js/candlestick-patterns.js'));
require(path.join(APP_DIR, 'public/js/fvg-detector.js'));
require(path.join(APP_DIR, 'public/js/trend-filter.js'));
require(path.join(APP_DIR, 'public/js/whale-detector.js'));
require(path.join(APP_DIR, 'public/js/ai-analyzer.js'));
global.TradingCosts = window.TradingCosts;
global.FVGDetector = window.FVGDetector;
global.TrendFilter = window.TrendFilter;
global.AIAnalyzer = window.AIAnalyzer;
global.WhaleDetector = window.WhaleDetector;
global.CandlestickPatterns = window.CandlestickPatterns;

const cache = JSON.parse(fs.readFileSync(path.join(APP_DIR, 'mc-cache.json'), 'utf8'));

// ============================================================
// CONFIG
// ============================================================
const START_CAPITAL = 10000;
const LEVERAGE = 10;
const RISK_PER_TRADE = 0.10; // 10% of capital
const MIN_RR = 3;
const MAX_CANDLES_FWD = 400; // ~2.7 months at 4H — swing trades need time
const SIM_COUNT = 100;

// ============================================================
// INDICATORS (friend's toolkit)
// ============================================================

function calcEMA(candles, period) {
  if (candles.length < period) return [];
  var ema = [];
  var k = 2 / (period + 1);
  var sum = 0;
  for (var i = 0; i < period; i++) sum += candles[i].close;
  ema.push(sum / period);
  for (var i = period; i < candles.length; i++) {
    ema.push(candles[i].close * k + ema[ema.length - 1] * (1 - k));
  }
  return ema;
}

function calcMACD(candles) {
  var closes = candles.map(function(c) { return c.close; });
  var ema12 = calcEMA(candles, 12);
  var ema26 = calcEMA(candles, 26);
  var macdLine = [], signalLine = [], histogram = [];
  var offset = ema26.length - 1;
  for (var i = 0; i <= offset; i++) {
    var idx12 = ema12.length - ema26.length + i;
    var idx26 = i;
    if (idx12 >= 0 && idx12 < ema12.length) {
      macdLine.push(ema12[idx12] - ema26[idx26]);
    }
  }
  // Signal = 9-period EMA of MACD line
  if (macdLine.length < 9) return { macdLine: [], signalLine: [], histogram: [], strength: 'none', direction: 'neutral' };
  var sigK = 2 / 10;
  var sigSMA = 0;
  for (var j = 0; j < 9; j++) sigSMA += macdLine[j];
  signalLine.push(sigSMA / 9);
  for (var j = 9; j < macdLine.length; j++) {
    signalLine.push(macdLine[j] * sigK + signalLine[signalLine.length - 1] * (1 - sigK));
  }
  for (var m = 0; m < signalLine.length; m++) {
    var mi = macdLine.length - signalLine.length + m;
    histogram.push(macdLine[mi] - signalLine[m]);
  }
  var lastMACD = macdLine[macdLine.length - 1];
  var lastSignal = signalLine[signalLine.length - 1];
  var lastHist = histogram[histogram.length - 1];
  var prevHist = histogram.length > 1 ? histogram[histogram.length - 2] : 0;
  var price = candles[candles.length - 1].close;
  var priceRange = price * 0.02;

  // MACD STRENGTH ASSESSMENT (friend's criteria, quantified)
  var nearZero = Math.abs(lastMACD) < priceRange;
  var approachingZeroUp = lastHist > prevHist && lastMACD < 0 && lastMACD > -priceRange * 2;
  var approachingZeroDown = lastHist < prevHist && lastMACD > 0 && lastMACD < priceRange * 2;
  var aboveZero = lastMACD > priceRange;
  var belowZero = lastMACD < -priceRange;
  var histRising = lastHist > 0 && lastHist > prevHist;
  var histFalling = lastHist < 0 && lastHist < prevHist;
  var bullishDiv = lastMACD > prevHist * 2 && lastHist > 0; // Simplified divergence
  var bearishDiv = lastMACD < prevHist * 2 && lastHist < 0;

  var direction = 'neutral';
  var strength = 'none';

  // GATE 1: MACD must show directional conviction
  if (nearZero && histRising && lastMACD < 0) {
    direction = 'bullish';
    strength = 'strong'; // Zero-axis reversal — friend's favorite
  } else if (nearZero && histFalling && lastMACD > 0) {
    direction = 'bearish';
    strength = 'strong'; // Zero-axis reversal
  } else if (aboveZero && histRising) {
    direction = 'bullish';
    strength = 'strong'; // Trend continuation
  } else if (belowZero && histFalling) {
    direction = 'bearish';
    strength = 'strong'; // Trend continuation
  } else if (nearZero && lastMACD > 0 && lastHist < 0) {
    direction = 'bearish';
    strength = 'neutral'; // At zero but mixed signals
  } else if (nearZero && lastMACD < 0 && lastHist > 0) {
    direction = 'bullish';
    strength = 'neutral';
  } else if (approachingZeroUp) {
    direction = 'bullish';
    strength = 'neutral';
  } else if (approachingZeroDown) {
    direction = 'bearish';
    strength = 'neutral';
  } else if (aboveZero) {
    direction = 'bullish';
    strength = 'weak'; // In trend but not at zero
  } else if (belowZero) {
    direction = 'bearish';
    strength = 'weak';
  }

  return {
    macdLine, signalLine, histogram,
    lastMACD, lastSignal, lastHist, prevHist,
    nearZero, aboveZero, belowZero,
    direction, strength,
    histRising, histFalling
  };
}

// EMA52 position — friend's zero axis on price chart
function checkEMA52(candles) {
  var ema52 = calcEMA(candles, 52);
  if (ema52.length === 0) return { position: 'unknown', distancePct: 0 };
  var price = candles[candles.length - 1].close;
  var ema = ema52[ema52.length - 1];
  var dist = (price - ema) / price * 100;
  var touching = Math.abs(dist) < 0.5; // within 0.5%
  var near = Math.abs(dist) < 2.0;
  return {
    position: touching ? 'touching' : (dist > 0 ? 'above' : 'below'),
    distancePct: dist,
    touching: touching,
    near: near,
    emaValue: ema
  };
}

// Fibonacci hunting range
function checkFibonacci(candles, lookback) {
  lookback = lookback || 150;
  var recent = candles.slice(-lookback);
  var high = -Infinity, low = Infinity;
  for (var i = 0; i < recent.length; i++) {
    if (recent[i].high > high) high = recent[i].high;
    if (recent[i].low < low) low = recent[i].low;
  }
  var range = high - low;
  var price = candles[candles.length - 1].close;
  var retrace = (high - price) / range;
  return {
    inRange: retrace >= 0.382 && retrace <= 0.786,
    retraceLevel: retrace,
    fib382: high - range * 0.382,
    fib500: high - range * 0.5,
    fib618: high - range * 0.618,
    fib786: high - range * 0.786
  };
}

// Candle beauty check — friend's 腿细不细
function checkCandleBeauty(candles, direction) {
  var c = candles[candles.length - 1];
  var body = Math.abs(c.close - c.open);
  var range = c.high - c.low;
  if (range === 0) return { isBeautiful: false, wickRatio: 0, reason: 'doji' };

  var upperWick = c.close > c.open ? c.high - c.close : c.high - c.open;
  var lowerWick = c.close > c.open ? c.open - c.low : c.close - c.low;
  var wickRatio = body > 0 ? Math.max(upperWick, lowerWick) / body : 99;

  var isBeautiful = false;
  var reason = '';

  if (direction === 'short') {
    // Inverted hammer: long upper wick, small body, at resistance
    if (upperWick >= body * 2 && upperWick > 0) {
      isBeautiful = true;
      reason = 'inverted_hammer_upper_wick_' + wickRatio.toFixed(1) + 'x';
    } else if (lowerWick >= body * 2 && lowerWick > 0) {
      isBeautiful = true;
      reason = 'hammer_lower_wick_' + wickRatio.toFixed(1) + 'x';
    } else if (body / range < 0.3) {
      isBeautiful = true;
      reason = 'small_body_ratio_' + (body/range).toFixed(2);
    } else {
      reason = 'body_too_large_ratio_' + (body/range).toFixed(2);
    }
  } else {
    // Hammer: long lower wick, small body, at support
    if (lowerWick >= body * 2 && lowerWick > 0) {
      isBeautiful = true;
      reason = 'hammer_lower_wick_' + wickRatio.toFixed(1) + 'x';
    } else if (upperWick >= body * 3 && upperWick > 0) {
      isBeautiful = true;
      reason = 'deep_pullback_upper_wick';
    } else if (body / range < 0.3) {
      isBeautiful = true;
      reason = 'small_body_ratio_' + (body/range).toFixed(2);
    } else {
      reason = 'body_too_large_ratio_' + (body/range).toFixed(2);
    }
  }

  return { isBeautiful, wickRatio, upperWick, lowerWick, body, range, reason };
}

// ============================================================
// SIGNAL GENERATION (FVG app)
// ============================================================
function generateSignals() {
  var signals = [];
  var pairs = ['btc', 'eth', 'sol', 'bnb', 'xrp', 'ada', 'doge'];

  for (var p = 0; p < pairs.length; p++) {
    var pair = pairs[p];
    var candles = cache[pair];
    if (!candles || candles.length < 200) continue;

    for (var i = 200; i < candles.length - 100; i++) {
      var buf = candles.slice(Math.max(0, i - 200), i);
      if (buf.length < 150) continue;

      var analysis;
      try { analysis = AIAnalyzer.analyze(buf, {}); } catch(e) { continue; }
      if (!analysis || !analysis.ready || !analysis.bestSignal) continue;

      var sig = analysis.bestSignal;
      if (!sig.qualifies || sig.total < 30) continue;
      var fvg = sig.fvg;
      var rr = sig.rr;
      if (!rr || !rr.qualifies || (rr.bestRRNumeric || 0) < MIN_RR) continue;

      signals.push({
        pair: pair,
        index: i,
        time: candles[i].time,
        price: candles[i].close,
        direction: fvg.direction,
        aiScore: sig.total,
        rr: rr.bestRRNumeric || 0,
        candles: buf,
        allCandles: candles
      });
    }
  }
  return signals;
}

// ============================================================
// GATE SEQUENCE (friend's order, strictly enforced)
// ============================================================
function applyGateSequence(signal) {
  var gates = [];
  var pass = true;
  var buf = signal.candles;
  var direction = signal.direction;

  // GATE 1: MACD strength — MUST BE neutral-to-strong, direction must match
  var macd = calcMACD(buf);
  gates.push({ gate: 'MACD_STRENGTH', passed: false, detail: macd.strength + '/' + macd.direction });
  if (macd.strength === 'none') return { pass: false, gates: gates, reason: 'MACD no signal' };
  if (macd.direction !== direction && macd.strength !== 'neutral') {
    gates[0].passed = false;
    return { pass: false, gates: gates, reason: 'MACD direction mismatch: ' + macd.direction + ' vs ' + direction };
  }
  gates[0].passed = true;

  // GATE 2: EMA52 alignment — price must be on correct side or touching
  var ema52 = checkEMA52(buf);
  gates.push({ gate: 'EMA52', passed: false, detail: ema52.position + ' (' + ema52.distancePct.toFixed(1) + '%)' });
  if (direction === 'short' && ema52.position === 'below' && !ema52.touching) {
    return { pass: false, gates: gates, reason: 'EMA52: price below for short' };
  }
  if (direction === 'long' && ema52.position === 'above' && !ema52.touching) {
    return { pass: false, gates: gates, reason: 'EMA52: price above for long' };
  }
  gates[1].passed = true;

  // GATE 3: AI Score must be meaningful
  gates.push({ gate: 'AI_SCORE', passed: signal.aiScore >= 40, detail: signal.aiScore });

  // GATE 4: Fibonacci zone (loose — in range is bonus, not required)
  var fib = checkFibonacci(buf, 150);
  gates.push({ gate: 'FIBONACCI', passed: fib.inRange, detail: 'retrace=' + (fib.retraceLevel*100).toFixed(0) + '%' });
  // Fib is a bonus, not a hard gate — but we track it

  // GATE 5: Candle quality
  var candle = checkCandleBeauty(buf, direction);
  gates.push({ gate: 'CANDLE', passed: candle.isBeautiful, detail: candle.reason });

  // GATE 6: R:R verification
  gates.push({ gate: 'RR_CHECK', passed: signal.rr >= MIN_RR, detail: '1:' + signal.rr.toFixed(1) });

  var mandatoryGates = gates.filter(function(g) { return g.gate !== 'FIBONACCI'; });
  var allMandatoryPass = mandatoryGates.every(function(g) { return g.passed; });
  var bonusPassed = gates.filter(function(g) { return g.passed; }).length;

  return {
    pass: allMandatoryPass,
    gates: gates,
    bonusCount: bonusPassed,
    totalGates: gates.length,
    macdStrength: macd.strength,
    macdDirection: macd.direction,
    ema52Touching: ema52.touching,
    fibInRange: fib.inRange,
    candleBeautiful: candle.isBeautiful
  };
}

// ============================================================
// TRADE EXECUTION & OUTCOME
// ============================================================
function executeTrade(signal, capital) {
  var direction = signal.direction;
  var entryPrice = signal.price;
  var riskAmount = capital * RISK_PER_TRADE;
  var allCandles = signal.allCandles;
  var startIdx = signal.index;

  // Calculate stop distance
  var buf = signal.candles;
  var swingHigh = -Infinity, swingLow = Infinity;
  for (var s = buf.length - 50; s < buf.length; s++) {
    if (s < 0) continue;
    if (buf[s].high > swingHigh) swingHigh = buf[s].high;
    if (buf[s].low < swingLow) swingLow = buf[s].low;
  }

  var stopDistance;
  if (direction === 'short') {
    stopDistance = ((swingHigh - entryPrice) / entryPrice) * 1.5; // +50% buffer (friend's method)
    if (stopDistance < 0.01) stopDistance = 0.03; // minimum 3%
  } else {
    stopDistance = ((entryPrice - swingLow) / entryPrice) * 1.5;
    if (stopDistance < 0.01) stopDistance = 0.03;
  }

  var stopPrice = direction === 'short' ? entryPrice * (1 + stopDistance) : entryPrice * (1 - stopDistance);
  var targetPrice = direction === 'short' ? entryPrice * (1 - stopDistance * signal.rr) : entryPrice * (1 + stopDistance * signal.rr);

  // Position size — FIXED
  // Risk $X on this trade = capital * RISK_PER_TRADE
  // Stop distance = X% of entry
  // Position = risk_amount / stop_distance_pct
  var riskDollars = capital * RISK_PER_TRADE;
  var positionSize = riskDollars / stopDistance;
  // Cap at capital (no over-leverage)
  if (positionSize > capital) positionSize = capital;
  if (positionSize < 50) positionSize = 0;

  // Forward simulate
  var outcome = 'open', exitPrice = null, exitBars = 0;
  var endIdx = Math.min(allCandles.length, startIdx + MAX_CANDLES_FWD);
  var hitFirst = null;

  for (var j = startIdx + 1; j < endIdx; j++) {
    var c = allCandles[j];
    exitBars++;
    if (direction === 'short') {
      if (c.high >= stopPrice) { outcome = 'stopped'; exitPrice = stopPrice; break; }
      if (c.low <= targetPrice) { outcome = 'target'; exitPrice = targetPrice; break; }
    } else {
      if (c.low <= stopPrice) { outcome = 'stopped'; exitPrice = stopPrice; break; }
      if (c.high >= targetPrice) { outcome = 'target'; exitPrice = targetPrice; break; }
    }
  }

  if (outcome === 'open') {
    exitPrice = allCandles[endIdx - 1].close;
    outcome = (direction === 'short' ? entryPrice > exitPrice : exitPrice > entryPrice) ? 'time_win' : 'time_loss';
  }

  var pnlPct = direction === 'short' ? (entryPrice - exitPrice) / entryPrice : (exitPrice - entryPrice) / entryPrice;
  var pnlDollars = positionSize * pnlPct;

  return {
    entryPrice, stopPrice, targetPrice, exitPrice,
    positionSize, pnlDollars, pnlPct,
    stopDistance, rr: signal.rr,
    outcome, exitBars, direction
  };
}

// ============================================================
// MAIN
// ============================================================
console.log('═══════════════════════════════════════════════');
console.log('  MONTE CARLO v2 — Friend Filters + FVG App');
console.log('  Sequential Gate System');
console.log('═══════════════════════════════════════════════');
console.log('');
console.log('Capital: $' + START_CAPITAL.toLocaleString());
console.log('Leverage: ' + LEVERAGE + 'x');
console.log('Risk/Trade: ' + (RISK_PER_TRADE*100) + '%');
console.log('Min R:R: 1:' + MIN_RR);
console.log('Max trade duration: ' + MAX_CANDLES_FWD + ' 4H candles');
console.log('');

// Generate all signals
console.log('Scanning all pairs for FVG signals...');
var allSignals = generateSignals();
console.log('Total raw signals: ' + allSignals.length);

// Apply gate sequence
console.log('Applying gate sequence...');
var qualifiedSignals = [];
var gateStats = { total: allSignals.length, passed: 0, failed: {} };

for (var si = 0; si < allSignals.length; si++) {
  var result = applyGateSequence(allSignals[si]);
  if (result.pass) {
    qualifiedSignals.push({ signal: allSignals[si], gateResult: result });
    gateStats.passed++;
  } else {
    var reason = result.reason || 'unknown';
    gateStats.failed[reason] = (gateStats.failed[reason] || 0) + 1;
  }
}
console.log('Qualified signals: ' + qualifiedSignals.length + ' / ' + allSignals.length + ' (' + (qualifiedSignals.length/allSignals.length*100).toFixed(1) + '%)');
console.log('');

// Gate failure breakdown
console.log('Top gate failures:');
var failures = Object.entries(gateStats.failed).sort(function(a,b){ return b[1]-a[1]; }).slice(0,8);
failures.forEach(function(f) { console.log('  ' + f[0] + ': ' + f[1]); });
console.log('');

// Run simulation
console.log('═══════════════════════════════════════════════');
console.log('  RUNNING SIMULATION (' + SIM_COUNT + ' TRADES)');
console.log('═══════════════════════════════════════════════');

// Shuffle qualified signals for randomized selection
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

// Run multiple scenarios
var scenarios = [
  {
    name: 'FULL GATE SEQUENCE (MACD→EMA52→AI→Candle→RR)',
    description: 'All gates applied. Friend strict + FVG strict.',
    selectSignals: function(sigs) { return shuffle(sigs.slice()); } // All qualified
  },
  {
    name: 'MACD STRONG ONLY (skip candle beauty)',
    description: 'MACD strong/neutral + EMA52 + AI + RR. Candle beauty NOT required.',
    selectSignals: function(sigs) {
      return shuffle(sigs.filter(function(s) {
        return s.gateResult.macdStrength !== 'weak';
      }));
    }
  },
  {
    name: 'LOOSENED: MACD any direction match, skip EMA52 strict',
    description: 'MACD strong/neutral (any), no EMA52, AI≥40, RR≥3',
    selectSignals: function(sigs) {
      return shuffle(sigs.filter(function(s) {
        var g = s.gateResult;
        return g.macdStrength !== 'weak' && s.signal.aiScore >= 40 && s.signal.rr >= MIN_RR;
      }));
    }
  },
  {
    name: 'PRACTICAL: MACD strong only + RR≥3',
    description: 'Minimum viable: MACD must show direction, RR must qualify.',
    selectSignals: function(sigs) {
      return shuffle(sigs.filter(function(s) {
        return s.gateResult.macdStrength === 'strong' && s.signal.rr >= MIN_RR;
      }));
    }
  }
];

for (var sc = 0; sc < scenarios.length; sc++) {
  var scenario = scenarios[sc];
  var pool = scenario.selectSignals(qualifiedSignals);
  var tradesToSim = pool.slice(0, SIM_COUNT);

  if (tradesToSim.length < 10) {
    console.log('\n' + scenario.name);
    console.log('  ⚠ Only ' + tradesToSim.length + ' qualified trades available. Skipping.');
    continue;
  }

  var capital = START_CAPITAL;
  var equityCurve = [capital];
  var wins = 0, losses = 0, totalPnl = 0;
  var results = [];
  var maxDrawdown = 0, peakCapital = capital;

  for (var t = 0; t < tradesToSim.length; t++) {
    var trade = executeTrade(tradesToSim[t].signal, capital);

    if (trade.positionSize === 0) continue;

    capital += trade.pnlDollars;
    if (capital < 100) capital = 100; // Floor
    equityCurve.push(capital);

    if (capital > peakCapital) peakCapital = capital;
    var drawdown = (peakCapital - capital) / peakCapital * 100;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;

    totalPnl += trade.pnlDollars;
    // Only target = true win. Stopped = true loss. Time exits are neutral.
    if (trade.outcome === 'target') wins++;
    else if (trade.outcome === 'stopped') losses++;

    results.push(trade);
  }

  var actualTrades = results.length;
  var targetWins = results.filter(function(r){ return r.outcome==='target'; });
  var stoppedLosses = results.filter(function(r){ return r.outcome==='stopped'; });
  var timeExits = results.filter(function(r){ return r.outcome.indexOf('time')===0; });
  var targetRate = actualTrades > 0 ? (targetWins.length / actualTrades * 100) : 0;
  var stopRate = actualTrades > 0 ? (stoppedLosses.length / actualTrades * 100) : 0;

  var avgWinDollar = targetWins.length > 0 ? targetWins.reduce(function(s,r){return s+r.pnlDollars;},0) / targetWins.length : 0;
  var avgLossDollar = stoppedLosses.length > 0 ? Math.abs(stoppedLosses.reduce(function(s,r){return s+r.pnlDollars;},0) / stoppedLosses.length) : 0;

  var grossProfit = targetWins.reduce(function(s,r){return s+r.pnlDollars;},0);
  var grossLoss = Math.abs(stoppedLosses.reduce(function(s,r){return s+r.pnlDollars;},0));
  var profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 99;

  var finalCapital = capital;
  var totalReturn = (finalCapital - START_CAPITAL) / START_CAPITAL * 100;

  // Monthly estimate based on data span
  var dataMonths = 22;
  var monthlyTrades = (pool.length / dataMonths).toFixed(1);

  // Simple Sharpe-like ratio
  var returns = [];
  for (var eq = 1; eq < equityCurve.length; eq++) {
    returns.push((equityCurve[eq] - equityCurve[eq-1]) / equityCurve[eq-1]);
  }
  var avgReturn = returns.length > 0 ? returns.reduce(function(s,r){return s+r;},0) / returns.length : 0;
  var variance = returns.length > 0 ? returns.reduce(function(s,r){return s + (r-avgReturn)*(r-avgReturn);},0) / returns.length : 1;
  var stdDev = Math.sqrt(variance);
  var sharpe = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(365) : 0; // Annualized approximation

  console.log('\n' + '═'.repeat(60));
  console.log(scenario.name);
  console.log('  ' + scenario.description);
  console.log('─'.repeat(60));
  console.log('  Pool: ' + pool.length + ' signals | ~' + monthlyTrades + ' trades/month');
  console.log('  Simulated: ' + actualTrades + ' trades');
  console.log('  ─── OUTCOMES ───');
  console.log('  Target hits: ' + targetWins.length + ' (' + targetRate.toFixed(0) + '%) | Avg: +$' + avgWinDollar.toFixed(0));
  console.log('  Stopped:     ' + stoppedLosses.length + ' (' + stopRate.toFixed(0) + '%) | Avg: -$' + avgLossDollar.toFixed(0));
  console.log('  Time exits:  ' + timeExits.length + ' (' + (timeExits.length/actualTrades*100).toFixed(0) + '%)');
  console.log('  ─── METRICS ───');
  console.log('  Profit Factor: ' + profitFactor.toFixed(1) + 'x');
  console.log('  Final Capital: $' + finalCapital.toFixed(2));
  console.log('  Total Return: ' + (totalReturn>0?'+':'') + totalReturn.toFixed(1) + '%');
  console.log('  Max Drawdown: ' + maxDrawdown.toFixed(1) + '%');
  console.log('  Peak Capital: $' + peakCapital.toFixed(2));
  console.log('  Avg exit bars: ' + (results.reduce(function(s,r){return s+r.exitBars;},0)/actualTrades).toFixed(1));
  console.log('  Sharpe (approx): ' + sharpe.toFixed(2));
}

console.log('\n═══════════════════════════════════════════════');
console.log('  ANALYSIS COMPLETE');
console.log('═══════════════════════════════════════════════');
