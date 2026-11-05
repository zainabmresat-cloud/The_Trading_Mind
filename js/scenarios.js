/**
 * THE TRADING MIND - Scenario Datasets
 * Defines price ticks, OHLC data, volume, and news triggers for Scenarios 1–5.
 */

const SCENARIOS = [
  // --------------------------------------------------------------------------
  // SCENARIO 1: The Parabolic Run (Bias: FOMO & Euphoria)
  // --------------------------------------------------------------------------
  {
    id: 1,
    slideIndex: 2, // 0-indexed Slide 3
    ticker: "NOVA",
    name: "NOVA Technologies",
    bias: "FOMO & Greed",
    biasDescription: "Parabolic surge temptations. Testing if you buy at the euphoric peak.",
    startingPrice: 50.00,
    ticks: [
      {
        tick: 0,
        open: 50.00, high: 52.50, low: 49.50, close: 52.00,
        volume: 120000,
        headline: "NOVA Tech releases breakthrough quantum compute architecture preview.",
        sentiment: "bullish"
      },
      {
        tick: 1,
        open: 52.00, high: 59.00, low: 51.50, close: 58.50,
        volume: 240000,
        headline: "Tech analysts initiate coverage with $80 price target.",
        sentiment: "bullish"
      },
      {
        tick: 2,
        open: 58.50, high: 66.00, low: 57.00, close: 64.50,
        volume: 380000,
        headline: "Trading forums highlight NOVA as 'The Next Trillion-Dollar Tech Stock'.",
        sentiment: "bullish"
      },
      {
        tick: 3,
        open: 64.50, high: 75.00, low: 63.80, close: 73.00,
        volume: 520000,
        headline: "Institutional funds report substantial stake accumulation.",
        sentiment: "bullish"
      },
      {
        tick: 4,
        open: 73.00, high: 88.00, low: 72.00, close: 86.50,
        volume: 790000,
        headline: "Mainstream financial news anchors debate if NOVA can reach $300.",
        sentiment: "euphoric"
      },
      {
        tick: 5,
        open: 86.50, high: 104.00, low: 85.00, close: 102.00,
        volume: 1100000,
        headline: "BREAKING: Retail trading volume hits all-time records. #NOVAToTheMoon trending.",
        sentiment: "euphoric"
      },
      {
        tick: 6,
        open: 102.00, high: 126.50, low: 100.00, close: 125.00, // EUPHORIC PEAK
        volume: 1850000,
        headline: "Influencers boast 300% gains. Early investors urge followers: 'Don't be left behind!'",
        sentiment: "euphoric"
      },
      {
        tick: 7,
        open: 125.00, high: 127.00, low: 105.00, close: 108.00, // REVERSAL
        volume: 1600000,
        headline: "Early venture backers file notice of block share sales.",
        sentiment: "bearish"
      },
      {
        tick: 8,
        open: 108.00, high: 112.00, low: 88.00, close: 91.50,
        volume: 1350000,
        headline: "Profit taking accelerates. Margin calls begin hitting late momentum buyers.",
        sentiment: "panic"
      },
      {
        tick: 9,
        open: 91.50, high: 93.00, low: 76.00, close: 78.00, // CRASH BOTTOM
        volume: 980000,
        headline: "NOVA closes down 38% from high. Late buyers nursing devastating losses.",
        sentiment: "bearish"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // SCENARIO 2: The Flash Crash (Bias: Panic Selling & Capitulation)
  // --------------------------------------------------------------------------
  {
    id: 2,
    slideIndex: 3, // 0-indexed Slide 4
    ticker: "AERO",
    name: "AeroDynamics Corp",
    bias: "Panic & Capitulation",
    biasDescription: "Violent collapse testing emotional pain threshold and bottom dumping.",
    startingPrice: 100.00,
    ticks: [
      {
        tick: 0,
        open: 100.00, high: 101.50, low: 99.00, close: 100.50,
        volume: 85000,
        headline: "AeroDynamics stable ahead of quarterly aviation safety review.",
        sentiment: "neutral"
      },
      {
        tick: 1,
        open: 100.50, high: 101.00, low: 96.00, close: 97.00,
        volume: 130000,
        headline: "Unconfirmed rumors of safety inspection irregularities surface.",
        sentiment: "bearish"
      },
      {
        tick: 2,
        open: 97.00, high: 97.50, low: 92.50, close: 93.50,
        volume: 210000,
        headline: "Credit rating agency places AeroDynamics on negative watch.",
        sentiment: "bearish"
      },
      {
        tick: 3,
        open: 93.50, high: 94.00, low: 74.00, close: 76.00, // LIQUIDITY VACUUM
        volume: 850000,
        headline: "FLASH CRASH: Automated algorithmic selling cascade triggered across major exchanges!",
        sentiment: "panic"
      },
      {
        tick: 4,
        open: 76.00, high: 77.00, low: 57.50, close: 58.00, // MAXIMUM CAPITULATION
        volume: 1450000,
        headline: "PANIC: Aero down 42%! Pundits scream 'Bankruptcy imminent!' Retail capitulation.",
        sentiment: "panic"
      },
      {
        tick: 5,
        open: 58.00, high: 68.00, low: 56.50, close: 66.00, // V-SHAPE BOUNCE
        volume: 1200000,
        headline: "FAA issues clarification: safety audit issue resolved; company solvent and operational.",
        sentiment: "bullish"
      },
      {
        tick: 6,
        open: 66.00, high: 75.00, low: 65.00, close: 74.50,
        volume: 920000,
        headline: "Value investors and institutional desks step in with massive buy orders.",
        sentiment: "bullish"
      },
      {
        tick: 7,
        open: 74.50, high: 82.00, low: 73.00, close: 81.00,
        volume: 680000,
        headline: "Short squeeze underway as panicking short-sellers scramble to cover.",
        sentiment: "bullish"
      },
      {
        tick: 8,
        open: 81.00, high: 87.50, low: 80.00, close: 86.00,
        volume: 510000,
        headline: "AeroDynamics rebounds +48% from crash lows. Those who panic-sold locked in ruin.",
        sentiment: "bullish"
      },
      {
        tick: 9,
        open: 86.00, high: 89.00, low: 85.00, close: 88.00,
        volume: 380000,
        headline: "Market stabilizes. Textbook V-shaped recovery punishes emotional retail hands.",
        sentiment: "neutral"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // SCENARIO 3: The Slow Bleed (Bias: Loss Aversion & Disposition Effect)
  // --------------------------------------------------------------------------
  {
    id: 3,
    slideIndex: 4, // 0-indexed Slide 5
    ticker: "TTNE",
    name: "Titan Energy Holdings",
    bias: "Loss Aversion & Bagholding",
    biasDescription: "Relentless multi-month drift down. Testing if you refuse to take a small loss.",
    startingPrice: 80.00,
    ticks: [
      {
        tick: 0,
        open: 80.00, high: 82.00, low: 79.50, close: 81.50,
        volume: 95000,
        headline: "Titan Energy enters fiscal quarter at multi-year median valuation.",
        sentiment: "neutral"
      },
      {
        tick: 1,
        open: 81.50, high: 82.50, low: 78.00, close: 78.50,
        volume: 110000,
        headline: "Quarterly crude demand forecasts lowered by 3% across European markets.",
        sentiment: "bearish"
      },
      {
        tick: 2,
        open: 78.50, high: 79.50, low: 74.50, close: 75.00,
        volume: 125000,
        headline: "Titan slips below 50-day moving average. Retail traders say: 'It will bounce back.'",
        sentiment: "bearish"
      },
      {
        tick: 3,
        open: 75.00, high: 76.50, low: 71.00, close: 71.50,
        volume: 140000,
        headline: "Analyst downgrades Titan Energy target from $85 to $72.",
        sentiment: "bearish"
      },
      {
        tick: 4,
        open: 71.50, high: 73.00, low: 67.50, close: 68.00,
        volume: 160000,
        headline: "Operating margins contract. Bagholders double down to 'average down cost'.",
        sentiment: "bearish"
      },
      {
        tick: 5,
        open: 68.00, high: 69.50, low: 63.00, close: 64.00,
        volume: 175000,
        headline: "Titan now down 20% from entry. Traders rationalize: 'It's not a loss until I sell.'",
        sentiment: "bearish"
      },
      {
        tick: 6,
        open: 64.00, high: 65.50, low: 59.50, close: 60.50,
        volume: 190000,
        headline: "Dividend cut by 40% to preserve operational cash flow.",
        sentiment: "bearish"
      },
      {
        tick: 7,
        open: 60.50, high: 61.50, low: 56.00, close: 56.50,
        volume: 205000,
        headline: "Heavy institutional outflows persist. No buying interest detected.",
        sentiment: "bearish"
      },
      {
        tick: 8,
        open: 56.50, high: 57.50, low: 51.50, close: 52.00,
        volume: 220000,
        headline: "Titan hits fresh 52-week lows. Capital remains frozen in compounding loss.",
        sentiment: "bearish"
      },
      {
        tick: 9,
        open: 52.00, high: 53.00, low: 48.00, close: 48.50,
        volume: 250000,
        headline: "Titan closes down 40%. The Disposition Effect has locked capital in dead water.",
        sentiment: "bearish"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // SCENARIO 4: The Winning Streak (Bias: Overconfidence & Revenge/Martingale)
  // --------------------------------------------------------------------------
  {
    id: 4,
    slideIndex: 5, // 0-indexed Slide 6
    ticker: "BPUL",
    name: "BioPulse Pharma",
    bias: "Overconfidence & Hubris",
    biasDescription: "A series of easy wins tempts you to bet 100% stack, leading to sudden reversal.",
    startingPrice: 30.00,
    ticks: [
      {
        tick: 0,
        open: 30.00, high: 32.50, low: 29.50, close: 32.00,
        volume: 90000,
        headline: "BioPulse Pharma initiates Phase 2 clinical trials.",
        sentiment: "bullish"
      },
      {
        tick: 1,
        open: 32.00, high: 35.00, low: 31.50, close: 34.50,
        volume: 130000,
        headline: "Easy win #1: Stock rises +8%. Trader feels confident in market foresight.",
        sentiment: "bullish"
      },
      {
        tick: 2,
        open: 34.50, high: 38.00, low: 34.00, close: 37.50,
        volume: 180000,
        headline: "Easy win #2: Another green day. Trader begins feeling invincible.",
        sentiment: "bullish"
      },
      {
        tick: 3,
        open: 37.50, high: 41.50, low: 37.00, close: 41.00,
        volume: 240000,
        headline: "Easy win #3: +19% gain locked! Dopamine surges; risk aversion disappears.",
        sentiment: "euphoric"
      },
      {
        tick: 4,
        open: 41.00, high: 45.00, low: 40.50, close: 44.50,
        volume: 310000,
        headline: "FDA decision scheduled next week. The urge to go 'ALL IN' reaches peak intensity.",
        sentiment: "euphoric"
      },
      {
        tick: 5,
        open: 44.50, high: 48.00, low: 43.50, close: 47.00,
        volume: 420000,
        headline: "Speculators celebrate unprecedented winning streaks. Leverage spikes across accounts.",
        sentiment: "euphoric"
      },
      {
        tick: 6,
        open: 47.00, high: 47.50, low: 28.00, close: 29.00, // THE UNEXPECTED GAP REVERSAL
        volume: 1650000,
        headline: "SHOCK: FDA rejects application citing safety anomalies! Stock plummets -38% instant gap!",
        sentiment: "panic"
      },
      {
        tick: 7,
        open: 29.00, high: 30.50, low: 22.00, close: 23.00,
        volume: 1200000,
        headline: "Reckless sizing wipes out accounts. Traders with 100% position size face catastrophic ruin.",
        sentiment: "panic"
      },
      {
        tick: 8,
        open: 23.00, high: 24.50, low: 19.50, close: 20.00,
        volume: 850000,
        headline: "BioPulse falls below pre-trial baseline. Three small wins erased by one oversized loss.",
        sentiment: "bearish"
      },
      {
        tick: 9,
        open: 20.00, high: 21.00, low: 18.50, close: 19.00,
        volume: 620000,
        headline: "Overconfidence lesson concluded: Position sizing, not win rate, determines survival.",
        sentiment: "bearish"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // SCENARIO 5: The Choppy Grind (Bias: Boredom, Restlessness & Overtrading)
  // --------------------------------------------------------------------------
  {
    id: 5,
    slideIndex: 6, // 0-indexed Slide 7
    ticker: "GRET",
    name: "Global Retail Index",
    bias: "Boredom & Overtrading",
    biasDescription: "Non-directional sideways chop. Testing if you can stay in cash with patience.",
    startingPrice: 150.00,
    ticks: [
      {
        tick: 0,
        open: 150.00, high: 151.20, low: 149.30, close: 150.40,
        volume: 75000,
        headline: "Global Retail Index opens flat as consumer sentiment holds steady.",
        sentiment: "neutral"
      },
      {
        tick: 1,
        open: 150.40, high: 151.80, low: 149.80, close: 150.10,
        volume: 72000,
        headline: "Mixed economic reports: retail sales neutral, employment figures unchanged.",
        sentiment: "neutral"
      },
      {
        tick: 2,
        open: 150.10, high: 151.50, low: 148.90, close: 149.20,
        volume: 68000,
        headline: "Low volume sideways drift. Day traders grow restless looking for action.",
        sentiment: "neutral"
      },
      {
        tick: 3,
        open: 149.20, high: 151.90, low: 149.00, close: 151.60,
        volume: 81000,
        headline: "False upside breakout traps premature momentum buyers.",
        sentiment: "neutral"
      },
      {
        tick: 4,
        open: 151.60, high: 152.10, low: 149.40, close: 149.80,
        volume: 85000,
        headline: "Immediate mean-reversion whipsaws both long and short positions.",
        sentiment: "neutral"
      },
      {
        tick: 5,
        open: 149.80, high: 150.90, low: 148.80, close: 150.20,
        volume: 71000,
        headline: "Traders chasing micro-moves rack up transaction churn with zero net progress.",
        sentiment: "neutral"
      },
      {
        tick: 6,
        open: 150.20, high: 151.40, low: 149.60, close: 151.00,
        volume: 69000,
        headline: "Choppy rangebound oscillation continues between $149 and $152.",
        sentiment: "neutral"
      },
      {
        tick: 7,
        open: 151.00, high: 151.80, low: 148.50, close: 148.90,
        volume: 77000,
        headline: "Whipsaw move down shakes out tight stops. Disciplined traders remain in 100% Cash.",
        sentiment: "neutral"
      },
      {
        tick: 8,
        open: 148.90, high: 150.80, low: 148.70, close: 150.40,
        volume: 65000,
        headline: "Boredom is the greatest retail enemy: forcing trades without edge bleeds capital.",
        sentiment: "neutral"
      },
      {
        tick: 9,
        open: 150.40, high: 151.10, low: 149.70, close: 150.00,
        volume: 59000,
        headline: "Index finishes exactly where it started ($150.00). Only patient cash survived intact.",
        sentiment: "neutral"
      }
    ]
  }
];
