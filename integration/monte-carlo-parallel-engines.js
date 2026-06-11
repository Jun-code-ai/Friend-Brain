/**
 * Monte Carlo — TWO PARALLEL ENGINES (Right Mix)
 *
 * Engine A: FVG App — generates gap-based signals with AI scoring
 * Engine B: Friend — generates EMA52/MACD zero-axis signals
 *
 * Both run independently on same data. Same capital pool.
 * CONFLUENCE: Both fire on same candle → full size (1.5x)
 * STANDALONE: Only one fires → reduced size (0.75x)
 *
 * $10K capital, 10% risk/trade, shared risk management
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// Config
// ============================================================
const START_CAPITAL = 10000;
const RISK_PER_TRADE = 0.10;
const MIN_RR = 3;
const MAX_FWD_CANDLES = 400;
const SIM_COUNT = 100;

// ============================================================
// Node shim + load FVG modules
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

const PAIRS = [
  { name: 'BTC', key4h: 'btc', key1d: 'btc1d', key1w: 'btc1w' },
  { name: 'ETH', key4h: 'eth', key1d: 'eth1d', key1w: 'eth1w' },
  { name: 'SOL', key4h: 'sol', key1d: 'sol1d', key1w: 'sol1w' },
  { name: 'BNB', key4h: 'bnb', key1d: 'bnb1d', key1w: 'bnb1w' },
  { name: 'XRP', key4h: 'xrp', key1d: 'xrp1d', key1w: 'xrp1w' },
  { name: 'ADA', key4h: 'ada', key1d: 'ada1d', key1w: 'ada1w' },
  { name: 'DOGE', key4h: 'doge', key1d: 'doge1d', key1w: 'doge1w' },
];

// ============================================================
// FRIEND'S INDICATORS
// ============================================================
function calcEMA(data, period, field) {
  field = field || 'close';
  if (data.length < period) return [];
  var ema = [], k = 2 / (period + 1);
  var sum = 0; for (var i = 0; i < period; i++) sum += data[i][field];
  ema.push(sum / period);
  for (var i = period; i < data.length; i++) ema.push(data[i][field] * k + ema[ema.length - 1] * (1 - k));
  return ema;
}

function calcMACD(data) {
  if (data.length < 52) return null;
  var ema12 = calcEMA(data, 12), ema26 = calcEMA(data, 26);
  var macdLine = [], signalLine = [], histogram = [];
  var offset = Math.min(ema12.length, ema26.length) - 1;
  for (var i = 0; i <= offset; i++) {
    var i12 = ema12.length - offset - 1 + i, i26 = ema26.length - offset - 1 + i;
    if (i12 >= 0 && i26 >= 0) macdLine.push(ema12[i12] - ema26[i26]);
  }
  if (macdLine.length < 9) return null;
  var sigK = 2 / 10, sigSum = 0;
  for (var j = 0; j < 9; j++) sigSum += macdLine[j];
  signalLine.push(sigSum / 9);
  for (var j = 9; j < macdLine.length; j++) signalLine.push(macdLine[j] * sigK + signalLine[signalLine.length - 1] * (1 - sigK));
  for (var m = 0; m < signalLine.length; m++) histogram.push(macdLine[macdLine.length - signalLine.length + m] - signalLine[m]);
  return { macdLine, signalLine, histogram };
}

function assessMACD(data) {
  var macd = calcMACD(data);
  if (!macd) return null;
  var len = macd.macdLine.length;
  var lastMACD = macd.macdLine[len-1], lastHist = macd.histogram[macd.histogram.length-1];
  var prevHist = macd.histogram.length > 1 ? macd.histogram[macd.histogram.length-2] : 0;
  var price = data[data.length-1].close;
  var zeroThreshold = price * 0.003;
  return {
    macdValue: lastMACD, histValue: lastHist, prevHist: prevHist,
    atZero: Math.abs(lastMACD) < zeroThreshold,
    nearZero: Math.abs(lastMACD) < price * 0.01,
    aboveZero: lastMACD > zeroThreshold, belowZero: lastMACD < -zeroThreshold,
    histRising: lastHist > prevHist, histFalling: lastHist < prevHist,
    histTurningUp: lastHist > prevHist && lastHist < 0,
    histTurningDown: lastHist < prevHist && lastHist > 0
  };
}

function checkEMA52(data) {
  var ema52 = calcEMA(data, 52);
  if (ema52.length === 0) return null;
  var price = data[data.length-1].close, ema = ema52[ema52.length-1];
  var distPct = (price - ema) / price * 100;
  return { emaValue: ema, price: price, distancePct: distPct, touching: Math.abs(distPct) < 0.3, near: Math.abs(distPct) < 1.5, priceAbove: distPct > 0 };
}

function checkFibonacci(data, lookback) {
  lookback = lookback || 200;
  var recent = data.slice(-lookback), high = -Infinity, low = Infinity;
  for (var i = 0; i < recent.length; i++) {
    if (recent[i].high > high) high = recent[i].high;
    if (recent[i].low < low) low = recent[i].low;
  }
  var range = high - low;
  if (range === 0) return null;
  var price = data[data.length-1].close, retraceFromHigh = (high - price) / range;
  return { inRange: retraceFromHigh >= 0.382 && retraceFromHigh <= 0.786, retraceFromHigh: retraceFromHigh, fib382: high - range * 0.382, fib500: high - range * 0.5, fib618: high - range * 0.618, fib786: high - range * 0.786, swingHigh: high, swingLow: low };
}

function checkRSI(data, period) {
  period = period || 14;
  if (data.length < period + 1) return null;
  var gains = 0, losses = 0;
  for (var i = data.length - period; i < data.length; i++) {
    var change = data[i].close - data[i-1].close;
    if (change > 0) gains += change; else losses -= change;
  }
  if (losses === 0) return 100; if (gains === 0) return 0;
  var rs = (gains/period) / (losses/period);
  return 100 - (100/(1+rs));
}

function checkCandleBeauty(data, direction) {
  var c = data[data.length-1], body = Math.abs(c.close - c.open), range = c.high - c.low;
  if (range === 0) return { isBeautiful: false, type: 'doji' };
  var upperWick = c.close > c.open ? c.high - c.close : c.high - c.open;
  var lowerWick = c.close > c.open ? c.open - c.low : c.close - c.low;
  var wickRatio = body > 0 ? Math.max(upperWick, lowerWick) / body : 99;
  var isBeautiful = false, type = 'none';
  if (direction === 'short' && upperWick >= body * 2 && upperWick > 0) { isBeautiful = true; type = 'inverted_hammer'; }
  else if (direction === 'long' && lowerWick >= body * 2 && lowerWick > 0) { isBeautiful = true; type = 'hammer'; }
  else if (body / range < 0.35) { isBeautiful = true; type = 'small_body'; }
  return { isBeautiful, type, wickRatio, bodyRatio: body/range };
}

function findSwings(data, lookback) {
  lookback = lookback || 100;
  var recent = data.slice(-lookback), swingHigh = -Infinity, swingLow = Infinity;
  for (var i = 0; i < recent.length; i++) {
    if (recent[i].high > swingHigh) swingHigh = recent[i].high;
    if (recent[i].low < swingLow) swingLow = recent[i].low;
  }
  return { swingHigh, swingLow };
}

// ============================================================
// ENGINE A: FVG (unchanged from app)
// ============================================================
function fvgGenerateSignals() {
  var signals = [];
  for (var p = 0; p < PAIRS.length; p++) {
    var pair = PAIRS[p], candles = cache[pair.key4h];
    if (!candles || candles.length < 200) continue;
    for (var i = 200; i < candles.length - 50; i += 5) {
      var buf = candles.slice(Math.max(0, i - 200), i);
      if (buf.length < 150) continue;
      var analysis;
      try { analysis = AIAnalyzer.analyze(buf, {}); } catch(e) { continue; }
      if (!analysis || !analysis.ready || !analysis.bestSignal) continue;
      var sig = analysis.bestSignal;
      if (!sig.qualifies || sig.total < 35) continue;
      var fvg = sig.fvg, rr = sig.rr;
      if (!rr || !rr.qualifies || (rr.bestRRNumeric || 0) < MIN_RR) continue;
      signals.push({ engine: 'FVG', pair: pair, index: i, time: candles[i].time, price: candles[i].close, direction: fvg.direction, score: sig.total, rr: rr.bestRRNumeric || 0, candles: candles, buf: buf });
    }
  }
  return signals;
}

// ============================================================
// ENGINE B: FRIEND'S PURE STRATEGY
// ============================================================
function friendGenerateSignals() {
  var signals = [];
  for (var p = 0; p < PAIRS.length; p++) {
    var pair = PAIRS[p], candles = cache[pair.key4h];
    if (!candles || candles.length < 200) continue;
    for (var i = 200; i < candles.length - 50; i += 10) {
      var buf = candles.slice(Math.max(0, i - 200), i);
      if (buf.length < 150) continue;

      var macd = assessMACD(buf);
      if (!macd || (!macd.nearZero && !macd.atZero)) continue;

      var direction = null;
      if (macd.atZero && macd.histTurningUp) direction = 'long';
      else if (macd.atZero && macd.histTurningDown) direction = 'short';
      else if (macd.aboveZero && macd.histRising) direction = 'long';
      else if (macd.belowZero && macd.histFalling) direction = 'short';
      if (!direction) continue;

      var ema52 = checkEMA52(buf);
      if (!ema52) continue;
      if (direction === 'short' && ema52.priceAbove && !ema52.touching && !macd.belowZero) continue;
      if (direction === 'long' && !ema52.priceAbove && !ema52.touching && !macd.aboveZero) continue;

      var fib = checkFibonacci(buf, 200);
      if (!fib) continue;

      var rsi = checkRSI(buf, 14);
      var stoAligned = (direction === 'short' && rsi > 70) || (direction === 'long' && rsi < 30);

      var candle = checkCandleBeauty(buf, direction);

      // Friend's score
      var score = 0;
      if (macd.atZero) score += 2; else if (macd.nearZero) score += 1;
      if (ema52.touching) score += 2; else if (ema52.near) score += 1;
      if (fib.inRange) score += 1;
      if (stoAligned) score += 1;
      if (candle.isBeautiful) score += 2;
      if (score < 3) continue;

      var swings = findSwings(buf, 100);
      var entryPrice = ema52.emaValue;
      var stopDistance, targetDistance;
      if (direction === 'short') {
        stopDistance = ((swings.swingHigh - entryPrice) / entryPrice) * 1.5;
        if (stopDistance < 0.02) stopDistance = 0.03;
        targetDistance = (entryPrice - swings.swingLow) / entryPrice;
      } else {
        stopDistance = ((entryPrice - swings.swingLow) / entryPrice) * 1.5;
        if (stopDistance < 0.02) stopDistance = 0.03;
        targetDistance = (swings.swingHigh - entryPrice) / entryPrice;
      }
      if (targetDistance < stopDistance * MIN_RR) targetDistance = stopDistance * MIN_RR;
      if (direction === 'short' && fib.retraceFromHigh > 0.5) targetDistance = Math.max(targetDistance, (entryPrice - fib.fib786) / entryPrice * 0.8);

      var rr = targetDistance / stopDistance;
      if (rr < MIN_RR) continue;

      signals.push({ engine: 'FRIEND', pair: pair, index: i, time: candles[i].time, price: entryPrice, direction: direction, score: score, rr: rr, stopDistance: stopDistance, targetDistance: targetDistance, swings: swings, ema52: ema52, fib: fib, candles: candles, buf: buf });
    }
  }
  return signals;
}

// ============================================================
// EXECUTION (shared between engines)
// ============================================================
function executeTrade(signal, capital, sizeMultiplier) {
  var direction = signal.direction;
  var candles = signal.candles;
  var startIdx = signal.index;

  // Stop/Target calculation
  var stopDist, targetDist, entryPrice;
  if (signal.engine === 'FRIEND') {
    stopDist = signal.stopDistance;
    targetDist = signal.targetDistance;
    entryPrice = signal.price;
  } else {
    entryPrice = signal.price;
    // FVG: 3% default stop
    stopDist = 0.03;
    targetDist = stopDist * signal.rr;
  }

  var stopPrice = direction === 'short' ? entryPrice * (1 + stopDist) : entryPrice * (1 - stopDist);
  var targetPrice = direction === 'short' ? entryPrice * (1 - targetDist) : entryPrice * (1 + targetDist);

  // Position size (adjusted by multiplier)
  var riskDollars = capital * RISK_PER_TRADE * sizeMultiplier;
  var position = riskDollars / stopDist;
  if (position > capital * 0.5) position = capital * 0.5;
  if (position < 20) return null;

  // Forward simulate
  var outcome = 'open', exitPrice = null, exitBars = 0;
  var endIdx = Math.min(candles.length, startIdx + MAX_FWD_CANDLES);
  for (var j = startIdx + 1; j < endIdx; j++) {
    var c = candles[j]; exitBars++;
    if (direction === 'short') {
      if (c.high >= stopPrice) { outcome = 'stopped'; exitPrice = stopPrice; break; }
      if (c.low <= targetPrice) { outcome = 'target'; exitPrice = targetPrice; break; }
    } else {
      if (c.low <= stopPrice) { outcome = 'stopped'; exitPrice = stopPrice; break; }
      if (c.high >= targetPrice) { outcome = 'target'; exitPrice = targetPrice; break; }
    }
  }
  if (outcome === 'open') {
    exitPrice = candles[endIdx - 1].close;
    outcome = (direction === 'short' ? entryPrice > exitPrice : exitPrice > entryPrice) ? 'time_win' : 'time_loss';
  }

  var pnl = direction === 'short' ? (entryPrice - exitPrice) / entryPrice * position : (exitPrice - entryPrice) / entryPrice * position;
  return { entryPrice, stopPrice, targetPrice, exitPrice, position, pnl, outcome, exitBars, direction, engine: signal.engine, rr: signal.rr, score: signal.score, sizeMultiplier };
}

// ============================================================
// CONFLUENCE DETECTION
// ============================================================
function findConfluence(fvgSignals, friendSignals) {
  // Match signals that fire on the same or adjacent candles
  var confluenceTrades = [];
  var fvgMatched = {}, friendMatched = {};

  for (var f = 0; f < fvgSignals.length; f++) {
    for (var fr = 0; fr < friendSignals.length; fr++) {
      if (fvgSignals[f].pair.name !== friendSignals[fr].pair.name) continue;
      if (fvgSignals[f].direction !== friendSignals[fr].direction) continue;
      var idxDiff = Math.abs(fvgSignals[f].index - friendSignals[fr].index);
      if (idxDiff <= 3) { // Within 3 candles = confluence
        fvgMatched[f] = true;
        friendMatched[fr] = true;
        // Use friend's entry price (at EMA52 — more precise), FVG's RR
        var fvg = fvgSignals[f], friend = friendSignals[fr];
        confluenceTrades.push({
          engine: 'CONFLUENCE',
          pair: fvg.pair,
          index: Math.round((fvg.index + friend.index) / 2),
          time: fvg.time,
          price: friend.price, // Friend's EMA52 entry
          direction: fvg.direction,
          score: Math.max(fvg.score, friend.score),
          rr: Math.max(fvg.rr, friend.rr),
          stopDistance: friend.stopDistance || 0.03,
          targetDistance: friend.targetDistance || (0.03 * Math.max(fvg.rr, friend.rr)),
          candles: fvg.candles,
          buf: fvg.buf
        });
        break;
      }
    }
  }

  // Standalone signals (not in confluence)
  var standaloneFVG = [], standaloneFriend = [];
  for (var ff = 0; ff < fvgSignals.length; ff++) if (!fvgMatched[ff]) standaloneFVG.push(fvgSignals[ff]);
  for (var frr = 0; frr < friendSignals.length; frr++) if (!friendMatched[frr]) standaloneFriend.push(friendSignals[frr]);

  return { confluence: confluenceTrades, standaloneFVG, standaloneFriend };
}

// ============================================================
// MAIN
// ============================================================
console.log('═══════════════════════════════════════════════');
console.log('  TWO PARALLEL ENGINES — Right Mix');
console.log('  Engine A: FVG  |  Engine B: Friend');
console.log('  Confluence = both fire → 1.5x size');
console.log('  Standalone = one fires → 0.75x size');
console.log('═══════════════════════════════════════════════');
console.log('');
console.log('Capital: $' + START_CAPITAL.toLocaleString() + ' | Risk/Trade: ' + (RISK_PER_TRADE*100) + '%');
console.log('Min RR: 1:' + MIN_RR + ' | Max Hold: ' + MAX_FWD_CANDLES + ' candles');
console.log('');

// Generate signals
console.log('Generating FVG signals...');
var fvgSignals = fvgGenerateSignals();
console.log('FVG: ' + fvgSignals.length + ' signals');

console.log('Generating Friend signals...');
var friendSignals = friendGenerateSignals();
console.log('Friend: ' + friendSignals.length + ' signals');

// Find confluence
var match = findConfluence(fvgSignals, friendSignals);
console.log('Confluence: ' + match.confluence.length + ' | Standalone FVG: ' + match.standaloneFVG.length + ' | Standalone Friend: ' + match.standaloneFriend.length);
console.log('');

// Build combined trade pool with size multipliers
var allTrades = [];
for (var c = 0; c < match.confluence.length; c++) allTrades.push({ signal: match.confluence[c], multiplier: 1.5 });
for (var s = 0; s < match.standaloneFVG.length; s++) allTrades.push({ signal: match.standaloneFVG[s], multiplier: 0.75 });
for (var sf = 0; sf < match.standaloneFriend.length; sf++) allTrades.push({ signal: match.standaloneFriend[sf], multiplier: 0.75 });

// Shuffle
var seed = 42;
function seededRand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
for (var i = allTrades.length - 1; i > 0; i--) {
  var j = Math.floor(seededRand() * (i + 1));
  var tmp = allTrades[i]; allTrades[i] = allTrades[j]; allTrades[j] = tmp;
}

// ============================================================
// SCENARIOS
// ============================================================
var scenarios = [
  {
    name: 'ALL TRADES: Confluence(1.5x) + Both Standalone(0.75x)',
    pool: allTrades
  },
  {
    name: 'CONFLUENCE ONLY: Both engines agree',
    pool: allTrades.filter(function(t){ return t.signal.engine === 'CONFLUENCE'; })
  },
  {
    name: 'FVG STANDALONE ONLY: FVG alone (0.75x)',
    pool: allTrades.filter(function(t){ return t.signal.engine === 'FVG'; })
  },
  {
    name: 'FRIEND STANDALONE ONLY: Friend alone (0.75x)',
    pool: allTrades.filter(function(t){ return t.signal.engine === 'FRIEND'; })
  },
  {
    name: 'AVOID CONFLICT: FVG + Friend standalone, skip opposing signals',
    pool: allTrades.filter(function(t){ return t.signal.engine !== 'CONFLUENCE' || t.multiplier >= 1.0; })
  }
];

for (var sc = 0; sc < scenarios.length; sc++) {
  var scenario = scenarios[sc];
  var pool = scenario.pool;
  var tradesToSim = pool.slice(0, SIM_COUNT);

  if (tradesToSim.length < 20) {
    console.log(scenario.name + ': Only ' + tradesToSim.length + ' trades in pool. Skipping.');
    continue;
  }

  var capital = START_CAPITAL;
  var equityCurve = [capital];
  var results = [];
  var maxDrawdown = 0, peakCapital = capital;
  var engineStats = { CONFLUENCE: { trades: 0, pnl: 0 }, FVG: { trades: 0, pnl: 0 }, FRIEND: { trades: 0, pnl: 0 } };

  for (var t = 0; t < tradesToSim.length; t++) {
    var trade = executeTrade(tradesToSim[t].signal, capital, tradesToSim[t].multiplier);
    if (!trade) continue;

    capital += trade.pnl;
    if (capital < 50) capital = 50;
    equityCurve.push(capital);
    if (capital > peakCapital) peakCapital = capital;
    var dd = (peakCapital - capital) / peakCapital * 100;
    if (dd > maxDrawdown) maxDrawdown = dd;
    results.push(trade);
    engineStats[trade.engine].trades++;
    engineStats[trade.engine].pnl += trade.pnl;
  }

  var actualTrades = results.length;
  var targetWins = results.filter(function(r){ return r.outcome === 'target'; });
  var stopped = results.filter(function(r){ return r.outcome === 'stopped'; });
  var timeExits = results.filter(function(r){ return r.outcome.indexOf('time') === 0; });
  var grossProfit = targetWins.reduce(function(s,r){ return s + r.pnl; }, 0);
  var grossLoss = Math.abs(stopped.reduce(function(s,r){ return s + r.pnl; }, 0));
  var pf = grossLoss > 0 ? grossProfit / grossLoss : 99;
  var totalReturn = (capital - START_CAPITAL) / START_CAPITAL * 100;
  var targetRate = actualTrades > 0 ? targetWins.length / actualTrades * 100 : 0;
  var avgWin = targetWins.length > 0 ? grossProfit / targetWins.length : 0;
  var avgLoss = stopped.length > 0 ? grossLoss / stopped.length : 0;
  var monthlyRet = totalReturn / 22;

  console.log('\n' + '═'.repeat(60));
  console.log(scenario.name);
  console.log('─'.repeat(60));
  console.log('  Pool: ' + pool.length + ' | Simulated: ' + actualTrades);
  console.log('  ─── BY ENGINE ───');
  for (var eng in engineStats) {
    if (engineStats[eng].trades > 0) console.log('  ' + eng + ': ' + engineStats[eng].trades + ' trades, PnL: $' + engineStats[eng].pnl.toFixed(0));
  }
  console.log('  ─── OUTCOMES ───');
  console.log('  Target:  ' + targetWins.length + ' (' + targetRate.toFixed(0) + '%) | +$' + avgWin.toFixed(0));
  console.log('  Stopped: ' + stopped.length + ' (' + (stopped.length/actualTrades*100).toFixed(0) + '%) | -$' + avgLoss.toFixed(0));
  console.log('  Time:    ' + timeExits.length + ' (' + (timeExits.length/actualTrades*100).toFixed(0) + '%)');
  console.log('  ─── METRICS ───');
  console.log('  Profit Factor: ' + pf.toFixed(1) + 'x');
  console.log('  Final Capital: $' + capital.toFixed(2));
  console.log('  Total Return: ' + (totalReturn > 0 ? '+' : '') + totalReturn.toFixed(1) + '%');
  console.log('  Est. Monthly: ' + (monthlyRet > 0 ? '+' : '') + monthlyRet.toFixed(1) + '%');
  console.log('  Max Drawdown: ' + maxDrawdown.toFixed(1) + '%');
  console.log('  Peak Capital: $' + peakCapital.toFixed(0));
}

console.log('\n═══════════════════════════════════════════════');
console.log('  ANALYSIS COMPLETE');
console.log('═══════════════════════════════════════════════');
