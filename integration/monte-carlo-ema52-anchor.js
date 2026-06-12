/**
 * Monte Carlo — FVG App + EMA52 ANCHOR ONLY
 * One golden nugget from friend: enter at EMA52, not at gap price.
 *
 * $10K capital, 10x leverage, 10% risk
 * Conservative (Score≥40) | Balanced (Score≥35) | Aggressive (Score≥30)
 * 100 trades each, BTC+ETH, 4000 4H candles
 */

const fs = require('fs');
const path = require('path');

// Config
const START_CAPITAL = 10000;
const RISK_PER_TRADE = 0.10;
const MIN_RR = 3;
const MAX_FWD = 400;

// Node shim + load app modules
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
// EMA52 — THE ONE GOLDEN NUGGET
// ============================================================
function calcEMA(data, period) {
  if (data.length < period) return [];
  var ema = [], k = 2 / (period + 1), sum = 0;
  for (var i = 0; i < period; i++) sum += data[i].close;
  ema.push(sum / period);
  for (var i = period; i < data.length; i++) ema.push(data[i].close * k + ema[ema.length-1] * (1 - k));
  return ema;
}

function getEMA52Anchor(candles) {
  if (candles.length < 100) return null;
  var ema52 = calcEMA(candles, 52);
  if (ema52.length === 0) return null;
  var currentPrice = candles[candles.length-1].close;
  var ema = ema52[ema52.length-1];
  var distPct = (currentPrice - ema) / currentPrice * 100;

  return {
    emaValue: ema,
    currentPrice: currentPrice,
    distancePct: distPct,
    absDist: Math.abs(distPct),
    touching: Math.abs(distPct) < 0.5,   // Within 0.5% = at EMA52
    near: Math.abs(distPct) < 2.0,        // Within 2% = near
    priceAbove: distPct > 0,
    // Whether to anchor entry at EMA52
    anchor: Math.abs(distPct) < 2.0,      // Anchor if within 2%
    anchorTight: Math.abs(distPct) < 0.5  // Perfect anchor
  };
}

// ============================================================
// SIGNAL GENERATION (app's exact logic + EMA52 anchor)
// ============================================================
function generateSignals() {
  var signals = [];
  var pairs = [
    { name: 'BTC', key4h: 'btc', key1d: 'btc1d', key1w: 'btc1w' },
    { name: 'ETH', key4h: 'eth', key1d: 'eth1d', key1w: 'eth1w' }
  ];

  for (var p = 0; p < pairs.length; p++) {
    var pair = pairs[p];
    var candles = cache[pair.key4h];
    var candles1d = cache[pair.key1d];
    if (!candles || candles.length < 200) continue;

    for (var i = 200; i < candles.length - 50; i += 5) {
      var buf = candles.slice(Math.max(0, i - 200), i);
      if (buf.length < 150) continue;

      // App's AI analysis
      var analysis;
      try { analysis = AIAnalyzer.analyze(buf, {}); } catch(e) { continue; }
      if (!analysis || !analysis.ready || !analysis.bestSignal) continue;
      var sig = analysis.bestSignal;
      if (!sig.qualifies || sig.total < 20) continue;
      var fvg = sig.fvg;
      var rr = sig.rr;
      if (!rr || !rr.qualifies || (rr.bestRRNumeric || 0) < MIN_RR) continue;

      // MACD Gate (app's existing check)
      var macdGateBuf = null;
      if (candles1d && candles1d.length >= 200) {
        macdGateBuf = candles1d.filter(function(c) { return c.time <= candles[i].time; });
      }
      if (macdGateBuf && macdGateBuf.length >= 200 && typeof TrendFilter !== 'undefined') {
        try {
          var macdCheck = TrendFilter.checkMACDMomentum(macdGateBuf);
          if (!macdCheck || !macdCheck.aligned || macdCheck.direction === 'neutral') continue;
          var preferredDir = macdCheck.direction.replace('_cross', '');
          if (preferredDir === 'neutral' || preferredDir !== fvg.direction) continue;
        } catch(e) { continue; }
      } else { continue; }

      // === THE ONE ADDITION: EMA52 ANCHOR ===
      var ema52 = getEMA52Anchor(buf);
      if (!ema52) continue;

      var entryPrice = fvg.direction === 'bullish' ? fvg.gapBottom : fvg.gapTop; // FVG gap entry
      var anchoredEntry = ema52.emaValue; // EMA52 anchor entry

      signals.push({
        pair: pair.name,
        index: i,
        time: candles[i].time,
        direction: fvg.direction,
        score: sig.total,
        rr: rr.bestRRNumeric || 0,
        fvgEntry: entryPrice,
        ema52Anchor: anchoredEntry,
        ema52: ema52,
        currentPrice: candles[i].close,
        candles: candles,
        buf: buf
      });
    }
  }
  return signals;
}

// ============================================================
// EXECUTION
// ============================================================
function executeTrade(signal, capital, useEMA52Anchor) {
  var direction = signal.direction;
  var candles = signal.candles;
  var startIdx = signal.index;

  // Entry price: EMA52 anchor OR original FVG gap
  var entryPrice = useEMA52Anchor ? signal.ema52Anchor : signal.fvgEntry;

  // Stop: 3% from entry (standard app setting)
  var stopDist = 0.03;
  var stopPrice = direction === 'short' ? entryPrice * (1 + stopDist) : entryPrice * (1 - stopDist);

  // Target: based on RR
  var targetDist = stopDist * signal.rr;
  var targetPrice = direction === 'short' ? entryPrice * (1 - targetDist) : entryPrice * (1 + targetDist);

  // Position size
  var riskDollars = capital * RISK_PER_TRADE;
  var position = riskDollars / stopDist;
  if (position > capital * 0.5) position = capital * 0.5;
  if (position < 10) return null;

  // Forward simulate
  var outcome = 'open', exitPrice = null, exitBars = 0;
  var endIdx = Math.min(candles.length, startIdx + MAX_FWD);
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
  return { entryPrice, stopPrice, targetPrice, exitPrice, position, pnl, outcome, exitBars, direction, rr: signal.rr, score: signal.score, ema52Dist: signal.ema52.absDist, anchored: useEMA52Anchor };
}

// ============================================================
// RUN ALL SCENARIOS
// ============================================================
console.log('═══════════════════════════════════════════════');
console.log('  EMA52 ANCHOR — The One Golden Nugget');
console.log('  FVG App + Friend EMA52 Entry Anchor');
console.log('═══════════════════════════════════════════════');
console.log('');
console.log('Capital: $' + START_CAPITAL.toLocaleString() + ' | Risk: 10% | Min RR: 1:' + MIN_RR);
console.log('');

var allSignals = generateSignals();
console.log('Signals generated: ' + allSignals.length);

// EMA52 distribution
var touching = allSignals.filter(function(s){ return s.ema52.touching; }).length;
var near = allSignals.filter(function(s){ return s.ema52.near; }).length;
var far = allSignals.length - near;
console.log('EMA52 touching (<0.5%): ' + touching + ' | Near (<2%): ' + near + ' | Far: ' + far);
console.log('');

var profiles = [
  { name: 'CONSERVATIVE', minScore: 40, label: 'Score≥40' },
  { name: 'BALANCED', minScore: 35, label: 'Score≥35' },
  { name: 'AGGRESSIVE', minScore: 30, label: 'Score≥30' },
];

var modes = [
  { name: 'BASELINE (Original FVG — no EMA52)', useEMA52: false },
  { name: 'EMA52 ANCHORED (Enter at EMA52)', useEMA52: true },
  { name: 'EMA52 SMART (Near=EMA52 entry, Far=original)', useEMA52: 'smart' },
];

var seed = 42;
function seededRand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length-1; i > 0; i--) { var j = Math.floor(seededRand() * (i+1)); var tmp = a[i]; a[i] = a[j]; a[j] = tmp; }
  return a;
}

for (var p = 0; p < profiles.length; p++) {
  var profile = profiles[p];

  for (var m = 0; m < modes.length; m++) {
    var mode = modes[m];

    var filtered = allSignals.filter(function(s) { return s.score >= profile.minScore; });
    var pool = shuffle(filtered);
    var tradesToSim = pool.slice(0, 100);

    if (tradesToSim.length < 30) {
      console.log(profile.name + ' ' + mode.name + ': Only ' + tradesToSim.length + ' trades. Skipping.');
      continue;
    }

    var capital = START_CAPITAL;
    var equityCurve = [capital];
    var results = [];
    var maxDD = 0, peakCapital = capital;

    for (var t = 0; t < tradesToSim.length; t++) {
      var useAnchor = mode.useEMA52 === 'smart' ? tradesToSim[t].ema52.near : mode.useEMA52;
      var trade = executeTrade(tradesToSim[t], capital, useAnchor);
      if (!trade) continue;

      capital += trade.pnl;
      if (capital < 50) capital = 50;
      equityCurve.push(capital);
      if (capital > peakCapital) peakCapital = capital;
      var dd = (peakCapital - capital) / peakCapital * 100;
      if (dd > maxDD) maxDD = dd;
      results.push(trade);
    }

    var actual = results.length;
    var targets = results.filter(function(r){ return r.outcome === 'target'; });
    var stopped = results.filter(function(r){ return r.outcome === 'stopped'; });
    var timeExits = results.filter(function(r){ return r.outcome.indexOf('time') === 0; });
    var grossProfit = targets.reduce(function(s,r){ return s + r.pnl; }, 0);
    var grossLoss = Math.abs(stopped.reduce(function(s,r){ return s + r.pnl; }, 0));
    var pf = grossLoss > 0 ? grossProfit / grossLoss : 99;
    var totalRet = (capital - START_CAPITAL) / START_CAPITAL * 100;
    var avgWin = targets.length > 0 ? grossProfit / targets.length : 0;
    var avgLoss = stopped.length > 0 ? grossLoss / stopped.length : 0;
    var anchoredCount = results.filter(function(r){ return r.anchored; }).length;

    console.log(profile.name + ' | ' + mode.name);
    console.log('  Pool: ' + filtered.length + ' | Trades: ' + actual);
    console.log('  Target: ' + targets.length + ' (' + (targets.length/actual*100).toFixed(0) + '%) | Stopped: ' + stopped.length + ' (' + (stopped.length/actual*100).toFixed(0) + '%) | Time: ' + timeExits.length);
    console.log('  Avg Win: +$' + avgWin.toFixed(0) + ' | Avg Loss: -$' + avgLoss.toFixed(0));
    console.log('  PF: ' + pf.toFixed(1) + 'x | Return: ' + (totalRet>0?'+':'') + totalRet.toFixed(1) + '% | MaxDD: ' + maxDD.toFixed(1) + '% | Final: $' + capital.toFixed(0));
    if (mode.useEMA52 === 'smart') console.log('  EMA52 anchored entries: ' + anchoredCount + '/' + actual);
    console.log('');
  }
}

console.log('═══════════════════════════════════════════════');
console.log('  ANALYSIS COMPLETE');
console.log('═══════════════════════════════════════════════');
