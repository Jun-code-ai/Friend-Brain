/**
 * Monte Carlo — FRIEND'S PURE STRATEGY ONLY
 * No FVG. His exact decision sequence. His exact entry logic.
 *
 * $10K capital, 10x leverage, 10% risk/trade
 * 100 trades across 8 pairs (BTC, ETH, SOL, BNB, XRP, ADA, DOGE, GOLD)
 * Multi-TF MACD scan → EMA52 → Fibonacci → STO → Candle → RR → Pyramid
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// Config
// ============================================================
const START_CAPITAL = 10000;
const RISK_PER_TRADE = 0.10;
const MIN_RR = 3;
const MAX_FWD_CANDLES = 400; // ~2.7 months at 4H
const SIM_COUNT = 100;
const ENTRY_TF = '4h';

// ============================================================
// Load data
// ============================================================
const APP_DIR = 'C:/Users/2junf/fvg-analyzer-v2.7-20260524-015625';
const cache = JSON.parse(fs.readFileSync(path.join(APP_DIR, 'mc-cache.json'), 'utf8'));

// Map pairs to their data keys
const PAIRS = [
  { name: 'BTC', key4h: 'btc', key1d: 'btc1d', key1w: 'btc1w' },
  { name: 'ETH', key4h: 'eth', key1d: 'eth1d', key1w: 'eth1w' },
  { name: 'SOL', key4h: 'sol', key1d: 'sol1d', key1w: 'sol1w' },
  { name: 'BNB', key4h: 'bnb', key1d: 'bnb1d', key1w: 'bnb1w' },
  { name: 'XRP', key4h: 'xrp', key1d: 'xrp1d', key1w: 'xrp1w' },
  { name: 'ADA', key4h: 'ada', key1d: 'ada1d', key1w: 'ada1w' },
  { name: 'DOGE', key4h: 'doge', key1d: 'doge1d', key1w: 'doge1w' },
  { name: 'GOLD', key4h: 'gold', key1d: 'gold1d', key1w: null },
];

// ============================================================
// FRIEND'S INDICATORS (exact implementations)
// ============================================================

function calcEMA(data, period, field) {
  field = field || 'close';
  if (data.length < period) return [];
  var ema = [], k = 2 / (period + 1);
  var sum = 0;
  for (var i = 0; i < period; i++) sum += data[i][field];
  ema.push(sum / period);
  for (var i = period; i < data.length; i++) {
    ema.push(data[i][field] * k + ema[ema.length - 1] * (1 - k));
  }
  return ema;
}

function calcMACD(data) {
  if (data.length < 52) return null;
  var ema12 = calcEMA(data, 12);
  var ema26 = calcEMA(data, 26);
  var macdLine = [], signalLine = [], histogram = [];
  var offset = Math.min(ema12.length, ema26.length) - 1;
  for (var i = 0; i <= offset; i++) {
    var i12 = ema12.length - offset - 1 + i;
    var i26 = ema26.length - offset - 1 + i;
    if (i12 >= 0 && i26 >= 0) macdLine.push(ema12[i12] - ema26[i26]);
  }
  if (macdLine.length < 9) return null;
  var sigK = 2 / 10;
  var sigSum = 0;
  for (var j = 0; j < 9; j++) sigSum += macdLine[j];
  signalLine.push(sigSum / 9);
  for (var j = 9; j < macdLine.length; j++) {
    signalLine.push(macdLine[j] * sigK + signalLine[signalLine.length-1] * (1 - sigK));
  }
  for (var m = 0; m < signalLine.length; m++) {
    var mi = macdLine.length - signalLine.length + m;
    histogram.push(macdLine[mi] - signalLine[m]);
  }
  return { macdLine, signalLine, histogram };
}

// Friend's MACD zero-axis assessment
function assessMACD(data) {
  var macd = calcMACD(data);
  if (!macd) return null;
  var len = macd.macdLine.length;
  var lastMACD = macd.macdLine[len-1];
  var lastSignal = macd.signalLine[macd.signalLine.length-1];
  var lastHist = macd.histogram[macd.histogram.length-1];
  var prevHist = macd.histogram.length > 1 ? macd.histogram[macd.histogram.length-2] : 0;
  var price = data[data.length-1].close;
  var zeroThreshold = price * 0.003; // 0.3% of price ≈ "at zero"

  return {
    macdValue: lastMACD,
    signalValue: lastSignal,
    histValue: lastHist,
    prevHist: prevHist,
    atZero: Math.abs(lastMACD) < zeroThreshold,
    nearZero: Math.abs(lastMACD) < price * 0.01,
    aboveZero: lastMACD > zeroThreshold,
    belowZero: lastMACD < -zeroThreshold,
    histRising: lastHist > prevHist,
    histFalling: lastHist < prevHist,
    // Divergence detection (simplified)
    histTurningUp: lastHist > prevHist && lastHist < 0 && prevHist < 0,
    histTurningDown: lastHist < prevHist && lastHist > 0 && prevHist > 0
  };
}

// Friend's Multi-TF MACD Scan
function multiTFScan(pairData) {
  var scan = {};
  var tfs = [
    { name: '1W', data: pairData.key1w ? cache[pairData.key1w] : null },
    { name: '1D', data: cache[pairData.key1d] },
    { name: '4H', data: cache[pairData.key4h] }
  ];

  for (var t = 0; t < tfs.length; t++) {
    var tf = tfs[t];
    if (!tf.data || tf.data.length < 100) continue;
    var macd = assessMACD(tf.data);
    if (macd) scan[tf.name] = macd;
  }

  // Find active TF (closest to zero axis)
  var activeTF = null;
  var minDist = Infinity;
  for (var tfName in scan) {
    var dist = Math.abs(scan[tfName].macdValue);
    if (dist < minDist) { minDist = dist; activeTF = tfName; }
  }

  return { scan: scan, activeTF: activeTF };
}

// EMA52 position
function checkEMA52(data) {
  var ema52 = calcEMA(data, 52);
  if (ema52.length === 0) return null;
  var price = data[data.length-1].close;
  var ema = ema52[ema52.length-1];
  var distPct = (price - ema) / price * 100;
  return {
    emaValue: ema,
    price: price,
    distancePct: distPct,
    touching: Math.abs(distPct) < 0.3,
    near: Math.abs(distPct) < 1.5,
    priceAbove: distPct > 0
  };
}

// Fibonacci hunting range (from last completed swing wave)
function checkFibonacci(data, direction, lookback) {
  lookback = lookback || 200;
  var recent = data.slice(-lookback);
  var high = -Infinity, low = Infinity;
  var highIdx = 0, lowIdx = 0;
  for (var i = 0; i < recent.length; i++) {
    if (recent[i].high > high) { high = recent[i].high; highIdx = i; }
    if (recent[i].low < low) { low = recent[i].low; lowIdx = i; }
  }
  var range = high - low;
  if (range === 0) return null;
  var price = data[data.length-1].close;

  // Friend draws fib from wave start to wave end
  var retraceFromHigh = (high - price) / range;
  var retraceFromLow = (price - low) / range;

  var fib382 = high - range * 0.382;
  var fib500 = high - range * 0.500;
  var fib618 = high - range * 0.618;
  var fib786 = high - range * 0.786;

  // Is price in the 0.5-0.786 hunting range?
  var inRange = retraceFromHigh >= 0.382 && retraceFromHigh <= 0.786;

  return {
    inRange: inRange,
    retraceFromHigh: retraceFromHigh,
    fib382: fib382, fib500: fib500, fib618: fib618, fib786: fib786,
    swingHigh: high, swingLow: low,
    fibLevel: retraceFromHigh < 0.382 ? 'above_382' :
              retraceFromHigh < 0.5 ? 'at_382_500' :
              retraceFromHigh < 0.618 ? 'at_500_618' :
              retraceFromHigh < 0.786 ? 'at_618_786' : 'below_786'
  };
}

// STO proxy using RSI (friend uses STO 9,3,3 — approximate with RSI 14)
function checkRSI(data, period) {
  period = period || 14;
  if (data.length < period + 1) return null;
  var gains = 0, losses = 0;
  for (var i = data.length - period; i < data.length; i++) {
    var change = data[i].close - data[i-1].close;
    if (change > 0) gains += change; else losses -= change;
  }
  if (losses === 0) return 100;
  if (gains === 0) return 0;
  var rs = (gains/period) / (losses/period);
  var rsi = 100 - (100/(1+rs));
  return {
    value: rsi,
    overbought: rsi > 75,
    oversold: rsi < 25,
    atExtreme: rsi > 75 || rsi < 25
  };
}

// Candle beauty check (friend's 腿细不细)
function checkCandleBeauty(data, direction) {
  var c = data[data.length-1];
  var prevC = data.length > 1 ? data[data.length-2] : null;
  var body = Math.abs(c.close - c.open);
  var range = c.high - c.low;
  if (range === 0) return { isBeautiful: false, type: 'doji' };

  var upperWick = c.close > c.open ? c.high - c.close : c.high - c.open;
  var lowerWick = c.close > c.open ? c.open - c.low : c.close - c.low;
  var wickRatio = body > 0 ? Math.max(upperWick, lowerWick) / body : 99;
  var bodyRatio = body / range;

  var isBeautiful = false;
  var type = 'none';

  // Friend's beauty criteria:
  // SHORT: inverted hammer = long UPPER wick, small body
  // LONG:  hammer = long LOWER wick, small body

  if (direction === 'short') {
    if (upperWick >= body * 2 && upperWick > 0) {
      isBeautiful = true; type = 'inverted_hammer';
    } else if (c.close < c.open && bodyRatio < 0.4) {
      // Bearish engulfing style - thick red body
      isBeautiful = true; type = 'bearish_momentum';
    }
  } else {
    if (lowerWick >= body * 2 && lowerWick > 0) {
      isBeautiful = true; type = 'hammer';
    } else if (c.close > c.open && bodyRatio > 0.4) {
      // Bullish engulfing style
      isBeautiful = true; type = 'bullish_momentum';
    }
  }

  return { isBeautiful, type, wickRatio, bodyRatio, upperWick, lowerWick, body, range };
}

// Find structural swings for stop placement
function findSwings(data, lookback) {
  lookback = lookback || 100;
  var recent = data.slice(-lookback);
  var swingHigh = -Infinity, swingLow = Infinity;
  for (var i = 0; i < recent.length; i++) {
    if (recent[i].high > swingHigh) swingHigh = recent[i].high;
    if (recent[i].low < swingLow) swingLow = recent[i].low;
  }
  return { swingHigh, swingLow };
}

// ============================================================
// FRIEND'S COMPLETE DECISION SEQUENCE
// ============================================================

function friendDecisionSequence(pair, candleIndex) {
  var candles4h = cache[pair.key4h];
  var candles1d = cache[pair.key1d];

  if (!candles4h || candleIndex < 200 || candleIndex >= candles4h.length - 50) return null;

  // Get data windows
  var buf4h = candles4h.slice(Math.max(0, candleIndex - 200), candleIndex);
  if (buf4h.length < 150) return null;

  var currentPrice = candles4h[candleIndex].close;
  var currentTime = candles4h[candleIndex].time;

  // === STEP 1: MACD Multi-TF Scan ===
  var mtfScan = multiTFScan(pair);
  if (!mtfScan || !mtfScan.scan['4H']) return null;
  var macd4h = mtfScan.scan['4H'];

  // MACD must show directional conviction (friend's GATE 1)
  if (!macd4h.atZero && !macd4h.nearZero) return null; // Must be at/near zero

  var direction = null;
  if ((macd4h.atZero || macd4h.nearZero) && macd4h.histTurningUp) {
    direction = 'long'; // Zero-axis reversal bullish
  } else if ((macd4h.atZero || macd4h.nearZero) && macd4h.histTurningDown) {
    direction = 'short'; // Zero-axis reversal bearish
  } else if (macd4h.aboveZero && macd4h.histRising) {
    direction = 'long'; // Trend continuation bullish
  } else if (macd4h.belowZero && macd4h.histFalling) {
    direction = 'short'; // Trend continuation bearish
  }

  if (!direction) return null;

  // === STEP 2: EMA52 Check ===
  var ema52 = checkEMA52(buf4h);
  if (!ema52) return null;

  // Friend's rule: for short, price must be AT or BELOW EMA52
  // For long, price must be AT or ABOVE EMA52
  if (direction === 'short' && ema52.priceAbove && !ema52.touching) {
    // Only allow if MACD is strongly bearish
    if (!macd4h.belowZero) return null;
  }
  if (direction === 'long' && !ema52.priceAbove && !ema52.touching) {
    if (!macd4h.aboveZero) return null;
  }

  // === STEP 3: Fibonacci Hunting Range ===
  var fib = checkFibonacci(buf4h, direction, 200);
  if (!fib) return null;

  // Friend prefers price in 0.382-0.786 zone
  // For shorts: price should have retraced up into the zone
  // For longs: price should have retraced down into the zone

  // === STEP 4: STO Extreme Check ===
  var rsi = checkRSI(buf4h, 14);
  if (!rsi) return null;

  // For shorts: want overbought (RSI > 75)
  // For longs: want oversold (RSI < 25)
  var stoAligned = (direction === 'short' && rsi.overbought) || (direction === 'long' && rsi.oversold);

  // === STEP 5: Candle Beauty ===
  var candle = checkCandleBeauty(buf4h, direction);

  // === STEP 6: Confluence Scoring ===
  var score = 0;
  if (macd4h.atZero) score += 2; // Friend's highest weight
  else if (macd4h.nearZero) score += 1;
  if (ema52.touching) score += 2;
  else if (ema52.near) score += 1;
  if (fib.inRange) score += 1;
  if (stoAligned) score += 1;
  if (candle.isBeautiful) score += 2;

  // Friend's threshold: ≥4 = high confidence, ≥3 = acceptable, <3 = pass
  if (score < 3) return null;

  // === STEP 7: Calculate Entry, Stop, Target ===
  var swings = findSwings(buf4h, 100);
  var entryPrice = ema52.emaValue; // Friend enters AT the EMA52!

  // Stop: swing + 50% buffer (friend's Method B)
  var stopDistance;
  if (direction === 'short') {
    stopDistance = ((swings.swingHigh - entryPrice) / entryPrice) * 1.5;
    if (stopDistance < 0.02) stopDistance = 0.03; // Min 3% if swing too close
  } else {
    stopDistance = ((entryPrice - swings.swingLow) / entryPrice) * 1.5;
    if (stopDistance < 0.02) stopDistance = 0.03;
  }
  var stopPrice = direction === 'short' ? entryPrice * (1 + stopDistance) : entryPrice * (1 - stopDistance);

  // Target: opposite S/R (friend's rule)
  // For short from EMA52 resistance: target = nearest swing low (support)
  // For long from EMA52 support: target = nearest swing high (resistance)
  var targetDistance;
  if (direction === 'short') {
    targetDistance = (entryPrice - swings.swingLow) / entryPrice;
  } else {
    targetDistance = (swings.swingHigh - entryPrice) / entryPrice;
  }
  if (targetDistance < stopDistance * MIN_RR) {
    // If target is too close, extend to Fib extension
    targetDistance = stopDistance * MIN_RR;
  }

  // Friend also uses Fibonacci extension for targets
  if (direction === 'short' && fib.retraceFromHigh > 0.5) {
    // Extend to fib 1.0 or beyond
    targetDistance = Math.max(targetDistance, (entryPrice - fib.fib786) / entryPrice * 0.8);
  }

  var targetPrice = direction === 'short' ? entryPrice * (1 - targetDistance) : entryPrice * (1 + targetDistance);

  // === STEP 8: R:R Verification ===
  var rr = targetDistance / stopDistance;
  if (rr < MIN_RR) return null;

  return {
    pair: pair.name,
    time: new Date(currentTime * 1000).toISOString(),
    index: candleIndex,
    direction: direction,
    entryPrice: entryPrice,
    stopPrice: stopPrice,
    targetPrice: targetPrice,
    stopDistance: stopDistance * 100,
    targetDistance: targetDistance * 100,
    rr: rr,
    score: score,
    details: {
      macdAtZero: macd4h.atZero,
      macdNearZero: macd4h.nearZero,
      ema52Touching: ema52.touching,
      ema52DistPct: ema52.distancePct,
      fibInRange: fib.inRange,
      fibLevel: fib.fibLevel,
      stoAligned: stoAligned,
      rsiValue: rsi.value,
      candleBeautiful: candle.isBeautiful,
      candleType: candle.type
    },
    allCandles: candles4h,
    buf4h: buf4h
  };
}

// ============================================================
// TRADE EXECUTION WITH PYRAMIDING
// ============================================================

function executeTradeWithPyramid(signal, capital) {
  var direction = signal.direction;
  var entryPrice = signal.entryPrice;
  var stopPrice = signal.stopPrice;
  var targetPrice = signal.targetPrice;
  var allCandles = signal.allCandles;
  var startIdx = signal.index;
  var stopDistance = signal.stopDistance / 100;
  var targetDistance = signal.targetDistance / 100;

  // Initial position: risk 10% of capital
  var riskDollars = capital * RISK_PER_TRADE;
  var initPosition = riskDollars / stopDistance;
  if (initPosition > capital * 0.5) initPosition = capital * 0.5; // Max 50% of capital
  if (initPosition < 20) return null;

  var totalPosition = initPosition;
  var totalRisk = riskDollars;
  var pyramidAdds = [];
  var outcome = 'open', exitPrice = null, exitBars = 0;
  var peakPosition = initPosition;
  var ema52 = signal.details.ema52Touching ? calcEMA(signal.buf4h, 52) : null;

  // Forward simulate
  var endIdx = Math.min(allCandles.length, startIdx + MAX_FWD_CANDLES);

  for (var j = startIdx + 1; j < endIdx; j++) {
    var c = allCandles[j];
    exitBars++;

    // Check stop (aggregate)
    if (direction === 'short') {
      if (c.high >= stopPrice) { outcome = 'stopped'; exitPrice = stopPrice; break; }
    } else {
      if (c.low <= stopPrice) { outcome = 'stopped'; exitPrice = stopPrice; break; }
    }

    // Check target
    if (direction === 'short') {
      if (c.low <= targetPrice) { outcome = 'target'; exitPrice = targetPrice; break; }
    } else {
      if (c.high >= targetPrice) { outcome = 'target'; exitPrice = targetPrice; break; }
    }

    // === PYRAMIDING: Add at EMA52 retest ===
    // Every ~50 candles, check if price returned to EMA52
    if (pyramidAdds.length < 3 && exitBars > 40 && exitBars % 40 === 0) {
      var recentCandles = allCandles.slice(Math.max(0, j - 60), j);
      var emaCheck = checkEMA52(recentCandles);
      if (emaCheck && emaCheck.touching && capital > 0) {
        // Reversal candle at retest?
        var addCandle = checkCandleBeauty(recentCandles, direction);
        if (addCandle.isBeautiful) {
          // Add position (friend: "只要回归零轴，我就加仓")
          var addSize = initPosition * 0.5; // Half the initial position
          totalPosition += addSize;
          pyramidAdds.push({
            bar: exitBars,
            price: c.close,
            addSize: addSize,
            emaTouch: emaCheck.touching
          });
          peakPosition = Math.max(peakPosition, totalPosition);

          // Adjust stop behind new swing
          var addSwings = findSwings(recentCandles, 40);
          if (direction === 'short') {
            var newStop = addSwings.swingHigh * 1.005; // +0.5% above new swing
            if (newStop < stopPrice) stopPrice = newStop; // Only tighten, never loosen
          } else {
            var newStop2 = addSwings.swingLow * 0.995;
            if (newStop2 > stopPrice) stopPrice = newStop2;
          }
        }
      }
    }
  }

  if (outcome === 'open') {
    exitPrice = allCandles[endIdx - 1].close;
    var pnl = direction === 'short' ? (entryPrice - exitPrice) / entryPrice : (exitPrice - entryPrice) / entryPrice;
    outcome = pnl > 0 ? 'time_win' : 'time_loss';
  }

  // Calculate P&L
  var basePnl = direction === 'short' ? (entryPrice - exitPrice) / entryPrice * initPosition : (exitPrice - entryPrice) / entryPrice * initPosition;
  var addPnl = 0;
  for (var a = 0; a < pyramidAdds.length; a++) {
    var add = pyramidAdds[a];
    addPnl += direction === 'short' ? (add.price - exitPrice) / add.price * add.addSize : (exitPrice - add.price) / add.price * add.addSize;
  }
  var totalPnlDollars = basePnl + addPnl;

  return {
    entryPrice, stopPrice, targetPrice, exitPrice,
    initPosition, totalPosition, peakPosition,
    basePnl, addPnl, totalPnlDollars,
    stopDistance: stopDistance * 100,
    targetDistance: targetDistance * 100,
    rr: signal.rr, score: signal.score,
    outcome, exitBars, direction: signal.direction,
    pyramidAdds: pyramidAdds.length,
    details: signal.details
  };
}

// ============================================================
// MAIN SIMULATION
// ============================================================
console.log('═══════════════════════════════════════════════');
console.log('  MONTE CARLO — FRIEND\'S PURE STRATEGY');
console.log('  Multi-TF MACD → EMA52 → Fib → STO → Candle → Pyramid');
console.log('═══════════════════════════════════════════════');
console.log('');
console.log('Capital: $' + START_CAPITAL.toLocaleString());
console.log('Risk/Trade: ' + (RISK_PER_TRADE*100) + '%');
console.log('Min R:R: 1:' + MIN_RR);
console.log('Max hold: ' + MAX_FWD_CANDLES + ' 4H candles (~2.7 months)');
console.log('Pairs: ' + PAIRS.map(function(p){return p.name;}).join(', '));
console.log('');

// Generate signals using friend's complete decision sequence
console.log('Scanning ' + PAIRS.length + ' pairs with friend\'s decision sequence...');
var allSignals = [];
var pairStats = {};

for (var p = 0; p < PAIRS.length; p++) {
  var pair = PAIRS[p];
  var candles4h = cache[pair.key4h];
  if (!candles4h || candles4h.length < 200) continue;
  var pairSignals = 0;

  // Scan every 10th candle to avoid overlapping signals
  for (var i = 200; i < candles4h.length - 50; i += 10) {
    var signal = friendDecisionSequence(pair, i);
    if (signal) {
      allSignals.push(signal);
      pairSignals++;
    }
  }
  pairStats[pair.name] = pairSignals;
}
console.log('Total qualified signals: ' + allSignals.length);
console.log('Per pair: ' + JSON.stringify(pairStats));
console.log('');

// Run scenarios
var scenarios = [
  {
    name: 'FULL FRIEND STRATEGY (score ≥3, all gates)',
    filter: function(s) { return s.score >= 3; }
  },
  {
    name: 'HIGH CONFIDENCE ONLY (score ≥4 + candle beautiful)',
    filter: function(s) { return s.score >= 4 && s.details.candleBeautiful; }
  },
  {
    name: 'SCORE ≥3, EMA52 TOUCHING REQUIRED',
    filter: function(s) { return s.score >= 3 && s.details.ema52Touching; }
  },
  {
    name: 'SCORE ≥3, MACD AT ZERO (strict) REQUIRED',
    filter: function(s) { return s.score >= 3 && s.details.macdAtZero; }
  }
];

var seed = 42;
function seededRand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length-1; i > 0; i--) {
    var j = Math.floor(seededRand() * (i+1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

for (var sc = 0; sc < scenarios.length; sc++) {
  var scenario = scenarios[sc];
  var filtered = allSignals.filter(scenario.filter);
  var pool = shuffle(filtered);
  var tradesToSim = pool.slice(0, SIM_COUNT);

  if (tradesToSim.length < 20) {
    console.log(scenario.name + ': Only ' + tradesToSim.length + ' trades. Skipping.');
    continue;
  }

  // Estimate monthly trades
  var pairTradeRates = {};
  for (var pp = 0; pp < PAIRS.length; pp++) {
    var pn = PAIRS[pp].name;
    var perPair = filtered.filter(function(s){ return s.pair === pn; }).length;
    pairTradeRates[pn] = (perPair / 22).toFixed(1); // ~22 months
  }
  var totalMonthly = Object.values(pairTradeRates).reduce(function(s,v){return s+parseFloat(v);}, 0);

  // Run trades
  var capital = START_CAPITAL;
  var equityCurve = [capital];
  var results = [];
  var maxDrawdown = 0, peakCapital = capital;

  for (var t = 0; t < tradesToSim.length; t++) {
    var trade = executeTradeWithPyramid(tradesToSim[t], capital);
    if (!trade) continue;

    capital += trade.totalPnlDollars;
    if (capital < 50) capital = 50;
    equityCurve.push(capital);
    if (capital > peakCapital) peakCapital = capital;
    var dd = (peakCapital - capital) / peakCapital * 100;
    if (dd > maxDrawdown) maxDrawdown = dd;
    results.push(trade);
  }

  var targetWins = results.filter(function(r){return r.outcome==='target';});
  var stopped = results.filter(function(r){return r.outcome==='stopped';});
  var timeExits = results.filter(function(r){return r.outcome.indexOf('time')===0;});
  var actualTrades = results.length;

  var grossProfit = targetWins.reduce(function(s,r){return s+r.totalPnlDollars;},0);
  var grossLoss = Math.abs(stopped.reduce(function(s,r){return s+r.totalPnlDollars;},0));
  var profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 99;
  var totalReturn = (capital - START_CAPITAL) / START_CAPITAL * 100;
  var targetRate = actualTrades > 0 ? targetWins.length / actualTrades * 100 : 0;
  var avgWin = targetWins.length > 0 ? grossProfit / targetWins.length : 0;
  var avgLoss = stopped.length > 0 ? grossLoss / stopped.length : 0;
  var pyramided = results.filter(function(r){return r.pyramidAdds > 0;}).length;

  // Monthly projection
  var monthlyReturn = totalReturn / 22;

  console.log('\n' + '═'.repeat(60));
  console.log(scenario.name);
  console.log('─'.repeat(60));
  console.log('  Pool: ' + filtered.length + ' | ~' + totalMonthly.toFixed(0) + ' trades/month across all pairs');
  console.log('  Simulated: ' + actualTrades + ' trades');
  console.log('  ─── OUTCOMES ───');
  console.log('  Target:  ' + targetWins.length + ' (' + targetRate.toFixed(0) + '%) | +$' + avgWin.toFixed(0) + ' avg');
  console.log('  Stopped: ' + stopped.length + ' (' + (stopped.length/actualTrades*100).toFixed(0) + '%) | -$' + avgLoss.toFixed(0) + ' avg');
  console.log('  Time:    ' + timeExits.length + ' (' + (timeExits.length/actualTrades*100).toFixed(0) + '%)');
  console.log('  Pyramided: ' + pyramided + ' trades');
  console.log('  ─── METRICS ───');
  console.log('  Profit Factor: ' + profitFactor.toFixed(1) + 'x');
  console.log('  Final Capital: $' + capital.toFixed(2));
  console.log('  Total Return: ' + (totalReturn>0?'+':'') + totalReturn.toFixed(1) + '%');
  console.log('  Est. Monthly: ' + (monthlyReturn>0?'+':'') + monthlyReturn.toFixed(1) + '%');
  console.log('  Max Drawdown: ' + maxDrawdown.toFixed(1) + '%');
  console.log('  Peak Capital: $' + peakCapital.toFixed(2));
  console.log('  Avg exit bars: ' + (results.reduce(function(s,r){return s+r.exitBars;},0)/actualTrades).toFixed(0));
  console.log('  Avg score: ' + (results.reduce(function(s,r){return s+r.score;},0)/actualTrades).toFixed(1) + '/6');
}

console.log('\n═══════════════════════════════════════════════');
console.log('  ANALYSIS COMPLETE');
console.log('═══════════════════════════════════════════════');
