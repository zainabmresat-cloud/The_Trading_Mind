# Product Requirements Document (PRD)

## Project: The Trading Mind (An Interactive Educational Simulation)
**Version:** 1.0  
**Target Environment:** Web Browser (HTML5/CSS3/JavaScript + Three.js) with Python Backend Service  
**Audience:** University Students, Academic Evaluators, and Novice Traders  

---

## 1. Executive Summary & Objectives

### 1.1 Executive Summary
**"The Trading Mind"** is an interactive, browser-based educational presentation designed to demonstrate how cognitive biases—such as FOMO, panic selling, loss aversion, overconfidence, and boredom—dictate financial market outcomes. Rather than presenting static theory, the platform embeds a live, 5-scenario virtual trading simulator ($10,000 starting capital) directly inside a 10-slide presentation deck. The presentation integrates real-time JavaScript chart execution, an animated 3D WebGL emotional telemetry orb, and a quantitative Python behavioral analytics engine that scores the user's psychological discipline upon completion.

### 1.2 Core Objectives
* **Pedagogical Impact:** Enable students to *feel* emotional market pressures in real-time and observe how irrational instincts destroy trading capital.
* **Active Learning:** Replace passive slide decks with turn-based interactive trading challenges where student decisions alter subsequent slide outcomes.
* **Multi-Disciplinary Tech Stack:** Demonstrate cohesive, non-trivial integration of HTML5/CSS3 for presentation flow, JavaScript for client simulation and charting, Three.js for 3D psychological visualization, and Python for quantitative risk modeling and behavioral scoring.
* **Academic Feasibility:** Keep the architecture lightweight, modular, and easy to run locally for grading and live presentation.

---

## 2. Target Audience & Presentation Context

* **Primary Users:** University finance, economics, software engineering, or psychology students.
* **Evaluation Context:** Academic project presentation (15–20 minutes total runtime) combining live speaking points with embedded interactive demonstrations.
* **User Personas:**
  * *The Academic Evaluator / Professor:* Wants to verify technical soundness, clear separation of concerns across languages, reproducible setup, and pedagogical clarity.
  * *The Student Participant:* Wants an intuitive, visually striking interface (dark-mode terminal aesthetic) that responds instantly to their trade choices.

---

## 3. High-Level Technical Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BROWSER PRESENTATION DECK                       │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   Slide Controller    │  │       3D Emotional Stress Orb         │  │
│  │  - 10 HTML Slide Views│  │       (Three.js / WebGL HUD)          │  │
│  │  - Keyboard Nav (←/→) │  │  - Color: Cyan ➔ Gold ➔ Pulsing Red   │  │
│  │  - Terminal CSS Theme │  │  - Mesh Distortion = Market Drawdown  │  │
│  └───────────┬───────────┘  └───────────────────▲───────────────────┘  │
│              │                                  │                      │
│              ▼                                  │ Telemetry Events     │
│  ┌──────────────────────────────────────────────┴───────────────────┐  │
│  │              JavaScript Simulation & Charting Engine             │  │
│  │  - $10,000 Virtual Portfolio Ledger (Cash, Equity, Positions)    │  │
│  │  - Candlestick Playback & Price Feed Engine (5 Scenarios)        │  │
│  │  - Order Execution: Buy / Sell / Hold & Position Sizing Slider   │  │
│  │  - Decision Log Collector (Timestamps, Price, Sizing, Hesitation)│  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │ HTTP POST / WebSocket
                                      │ (Session Trade Logs)
                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│               PYTHON QUANTITATIVE & BEHAVIORAL ENGINE                  │
│                   (FastAPI / Flask Lightweight API)                    │
│                                                                        │
│  - Disposition Effect Model: Realized Gains vs. Paper Loss Holding     │
│  - FOMO Index: Distance of entry from local momentum peaks            │
│  - Panic Capitulation Index: Exit timing vs. local volatility spikes   │
│  - Monte Carlo Risk-of-Ruin: 1,000 simulated iterations of user sizing │
│  - Behavioral Archetype Classifier & JSON Diagnostic Report Generator  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 10-Slide Presentation Structure

| Slide # | Slide Title | Conceptual Focus | Interactive & Simulation Elements |
| :---: | :--- | :--- | :--- |
| **01** | **The Market is a Mirror** | Introduction to trading psychology. The paradox: *90% of retail traders fail despite accessible information*. | Live Title Screen with animated 3D "Calm Mind" orb. Introduction of the $10,000 virtual challenge and rule breakdown. |
| **02** | **System 1 vs. System 2 Thinking** | Behavioral economics foundation (Kahneman): Fast, emotional instincts (System 1) vs. slow, deliberate probability calculations (System 2). | Interactive dual-speed cognitive response test; preview of how the simulator records emotional triggers. |
| **03** | **Scenario 1: The Parabolic Run** | **FOMO & Social Proof.** What happens when asset prices double rapidly and social media headlines scream "Don't get left behind!" | **Simulation Stage 1:** Fast rising ticker ($50 ➔ $120). Student decides when to buy. Tests if student enters late at the peak out of greed. |
| **04** | **Scenario 2: The Flash Crash** | **Fear & Capitulation.** Sudden liquidity crunch and violent -40% drop. | **Simulation Stage 2:** Fast collapse with alarming headlines. Tests panic-selling at the bottom vs. disciplined stop execution. |
| **05** | **Scenario 3: The Slow Bleed** | **Loss Aversion & Disposition Effect.** Ticker drifts steadily downward over weeks. | **Simulation Stage 3:** Tests refusal to take small losses ("It's not a loss until I sell") and willingness to bag-hold dead capital. |
| **06** | **Scenario 4: The Winning Streak** | **Overconfidence & Revenge Trading.** Experiencing rapid consecutive wins alters risk tolerance. | **Simulation Stage 4:** Tests position sizing discipline: Does the student bet 50–100% of their stack after a lucky gain? |
| **07** | **Scenario 5: The Choppy Grind** | **Boredom & Overtrading.** Sideways, non-directional market chop. | **Simulation Stage 5:** Tests patience and ability to hold cash without taking low-probability random trades. |
| **08** | **The Diagnostic Report** | **Quantitative Behavioral Profile.** Revealing the student's psychological profile through data. | **Python Diagnostics:** Pulls Python API calculations. Displays Spider/Radar Chart of biases, Max Drawdown, and Monte Carlo Ruin probability. |
| **09** | **The Antidote: Quantitative Rules** | Systematic risk management: 1% risk rule, asymmetric risk/reward ratios, and hard automated stop-losses. | Interactive Position Size Calculator demonstrating how proper sizing prevents psychological breakdown. |
| **10** | **Conclusion & Sandbox Mode** | Final takeaways and open reflection: Mastery over oneself, not mastery over the market. | **Free-Play Simulator:** Unlimited procedural candlestick generator to practice disciplined trading with real-time feedback. |

---

## 5. Detailed Specifications for the Five Trading Scenarios

### Scenario 1: The Parabolic Run (Bias: FOMO & Euphoria)
* **Asset:** "NOVA Tech"
* **Starting Price:** $50.00
* **Tick Count:** 10 discrete intervals.
* **Price Trajectory:** $50 ➔ $58 ➔ $72 ➔ $95 ➔ $125 (Peak) ➔ $110 ➔ $78 (Correction).
* **Headlines Triggered:** "Influencers call $500 target!", "Institutional buying detected!", "Retail volume breaks records!"
* **Psychological Trap:** Waiting through the early rise, then buying 100% at $120–$125 out of fear of missing out, right before the drop.
* **Disciplined Action:** Observing without chasing, or entering early with a predefined tight trailing stop.

### Scenario 2: The Flash Crash (Bias: Panic & Panic-Selling)
* **Asset:** "AeroDynamics"
* **Starting Price:** $100.00
* **Tick Count:** 10 discrete intervals.
* **Price Trajectory:** $100 ➔ $96 ➔ $94 ➔ $62 (Violent Crash) ➔ $58 (Capitulation Bottom) ➔ $74 ➔ $88 (V-Shape Recovery).
* **Headlines Triggered:** "Regulator investigation rumored!", "Margin calls trigger automated liquidation cascade!"
* **Psychological Trap:** Selling at $58 out of pure terror at the exact local bottom.
* **Disciplined Action:** Sticking to an initial predetermined stop-loss (-8% at $92) or scaling in rationally after volatility subsides.

### Scenario 3: The Slow Bleed (Bias: Loss Aversion & Disposition Effect)
* **Asset:** "Titan Energy"
* **Starting Price:** $80.00
* **Tick Count:** 12 discrete intervals.
* **Price Trajectory:** $80 ➔ $82 ➔ $77 ➔ $73 ➔ $69 ➔ $64 ➔ $61 ➔ $57 ➔ $52 ➔ $48 (Consistent lower lows).
* **Headlines Triggered:** "Quarterly earnings slightly miss", "Analysts downgrade target to neutral", "Sector headwinds continue".
* **Psychological Trap:** Refusing to cut a 5% loss, rationalizing holding all the way down to a 40% loss ("I'll just wait for breakeven").
* **Disciplined Action:** Taking an early controlled stop or rotating out of the stagnant/decaying asset.

### Scenario 4: The Winning Streak (Bias: Overconfidence & Martingale Instincts)
* **Asset:** "BioPulse Pharma"
* **Starting Price:** $30.00
* **Tick Count:** 10 discrete intervals.
* **Price Trajectory:** 3 predictable small up-swings (allowing easy wins), followed by an unpredictable high-volatility reversal.
* **Psychological Trap:** After 3 consecutive winning trades, doubling down with 100% account equity on the 4th trade, erasing all prior gains.
* **Disciplined Action:** Maintaining fixed fractional position sizing (e.g., risking max 2–5% of account equity per trade) regardless of win streaks.

### Scenario 5: The Choppy Grind (Bias: Boredom & Overtrading)
* **Asset:** "Global Retail Index"
* **Starting Price:** $150.00
* **Tick Count:** 12 discrete intervals.
* **Price Trajectory:** Random oscillations between $148 and $152 with high spread and no discernible trend.
* **Headlines Triggered:** Contradictory macroeconomic noise with zero net momentum.
* **Psychological Trap:** Forcing trades out of restlessness, racking up churn losses and transaction drag.
* **Disciplined Action:** Holding 100% Cash until an identifiable trend breakout occurs.

---

## 6. Simulation Engine Rules & Mechanics

1. **Initial Portfolio Balance:** `$10,000.00 USD` (Virtual Cash).
2. **Account Ledger Fields:**
   * `CashBalance`: Unallocated cash.
   * `SharesHeld`: Integer count of units currently owned.
   * `AvgEntryPrice`: Weighted average cost basis.
   * `CurrentMarketPrice`: Latest price tick.
   * `UnrealizedPnL`: `(CurrentMarketPrice - AvgEntryPrice) * SharesHeld`.
   * `RealizedPnL`: Accumulated profits/losses from closed trades.
   * `TotalEquity`: `CashBalance + (SharesHeld * CurrentMarketPrice)`.
   * `PeakEquity`: Highest historical total equity achieved.
   * `MaxDrawdown`: `(PeakEquity - TotalEquity) / PeakEquity * 100%`.
3. **Execution Options:**
   * **Buy:** Allocates chosen capital amount. Presets: `25%`, `50%`, `75%`, `100% (All-In)`.
   * **Sell:** Liquidates either partial (`50%`) or total (`100%`) open position at market price.
   * **Hold / Next Step:** Advances to the next price candle without executing orders.
   * **Risk Controls (Optional Toggle):** Pre-set Stop-Loss % and Take-Profit % target prices.
4. **Execution Protocol:**
   * Stepped progression: Each scenario advances tick-by-tick via a "Next Candle" button or a steady 2-second auto-step timer with a pause toggle.
   * Real-time ledger calculation on every tick.

---

## 7. Responsibilities of Each Technology

### 7.1 JavaScript (Presentation State, Sim Engine & Telemetry)
* **Deck Controller:** Manages slide active states, keyboard bindings (`Left`/`Right` arrows, `Space` for step, `R` for reset), and slide progress indicators.
* **Interactive Chart Component:** Lightweight canvas or SVG candlestick/line rendering component displaying historical and active price candles with volume bars.
* **Order Management System (OMS):** Validates sufficient cash, tracks open positions, calculates real-time floating P&L, and enforces order rules.
* **Telemetry Logger:** Records every user event into a structured JSON log:
  ```json
  {
    "scenario_id": 1,
    "tick_index": 4,
    "timestamp": 1741234567890,
    "action": "BUY",
    "price": 95.50,
    "shares": 52,
    "position_sizing_pct": 50,
    "hesitation_time_ms": 3420,
    "unrealized_pnl_at_action": 0.0
  }
  ```
* **API Bridge:** Asynchronously dispatches the complete session log to the Python analytics backend when the user reaches Slide 8.

### 7.2 Python (Quantitative Modeling & Behavioral Analysis)
Python serves as the analytical brain of the project, executing quantitative calculations that go beyond simple front-end math:
* **Disposition Effect Ratio ($DER$):**
  $$\text{DER} = \frac{\text{Proportion of Realized Gains}}{\text{Proportion of Realized Losses}}$$
  Detects whether the user consistently cuts winners too early while letting losers run.
* **FOMO Entry Index ($FEI$):** Measures how close trade entries occurred to the rolling 5-period price peaks. High values identify impulsive momentum chasing.
* **Panic Capitulation Score ($PCS$):** Evaluates if selling occurred during maximum negative candle velocity (panic liquidation at bottoms).
* **Monte Carlo Risk of Ruin Engine:**
  * Runs 1,000 synthetic simulations using the user’s empirical win rate, average risk-to-reward ratio, and position sizing variance.
  * Calculates the mathematical probability that the user’s current trading style would lead to total portfolio liquidation (>50% drawdown) over 100 consecutive trades.
* **Trader Archetype Classification:** Assigns the user to an archetype based on decision clustering:
  * *The Gambler:* High position sizing (>75%), frequent trading, large drawdowns.
  * *The Hesitant Observer:* Low participation, late entries, misses opportunities.
  * *The Bagholder:* Extreme loss-holding duration, refuses to sell at a loss.
  * *The Disciplined Stoic:* Consistent small sizing (10–25%), early cut of losers, steady equity curve.
* **Deployment Format:** Lightweight FastAPI or Flask service running on `localhost:8000` with clean CORS configuration and a `/api/analyze` endpoint.

### 7.3 Three.js / WebGL (Interactive 3D Psychological HUD)
* **The "Psychological Stress Orb":** A persistent 3D interactive element embedded in the HUD or slide border representing the trader's emotional equilibrium.
* **Shader & Material Dynamics:**
  * **Neutral/Stoic (Balanced):** Smooth, slow-pulsing cyan/blue geometric sphere.
  * **Greed / Euphoria:** Bright golden-green hue with accelerated rotation speed and particle flare as profits surge.
  * **Panic / High Drawdown:** Deep crimson red, frantic pulsation, and noisy vertex displacement (spikes/shaking) proportional to account drawdown percentage.
* **Interactive Controls:** OrbitControls for mouse click-and-drag rotation, conveying an immersive, modern trading terminal feel.

---

## 8. Technical Architecture & File Organization

```
The_Trading_Mind/
├── PRD.md                       # This document (Project Specification)
├── index.html                   # Master single-page presentation deck (10 slides)
├── css/
│   ├── presentation.css         # Slide layout, animations, typography, dark theme
│   ├── terminal.css             # Bloomberg/TradingView terminal UI styling
│   └── simulator.css            # Order entry modal, charts, scoreboard styling
├── js/
│   ├── app.js                   # Application orchestrator & slide deck navigator
│   ├── simulator.js             # Trading ledger, account state & order execution
│   ├── scenarios.js             # Dataset for Scenarios 1–5 (prices, news, triggers)
│   ├── chart.js                 # Canvas-based candlestick/line chart renderer
│   ├── visualizer3d.js          # Three.js 3D Stress Orb scene, mesh & shaders
│   └── api.js                   # Client-side communication with Python analytics
└── backend/
    ├── requirements.txt         # FastAPI, Uvicorn, NumPy, Pandas, Scipy
    ├── server.py                # REST API endpoint (/api/analyze, /api/health)
    └── analytics/
        ├── metrics.py           # Disposition Effect, FOMO index, Drawdown formulas
        ├── monte_carlo.py       # 1,000-run Risk of Ruin Monte Carlo simulation
        └── archetypes.py        # Behavioral classification & diagnosis logic
```

---

## 9. Acceptance Criteria (University Project Grade Benchmarks)

### 9.1 Functional Requirements
- [ ] **Slide Navigation:** All 10 slides navigate seamlessly via keyboard arrows and on-screen controls without reload or UI jumping.
- [ ] **Simulation Mechanics:** Virtual portfolio starts at $10,000; accurately tracks cash, shares, unrealized P&L, realized P&L, and peak drawdown.
- [ ] **5 Complete Scenarios:** Each scenario features distinct price curves, dynamic news flash triggers, and order options (Buy, Sell, Hold).
- [ ] **JavaScript Charting:** Interactive price rendering showing updated candles/ticks as the simulation advances.
- [ ] **3D Visualizer:** Three.js canvas renders smoothly (60 FPS) and dynamically shifts its color and vertex displacement based on portfolio drawdown and volatility.
- [ ] **Python Analytics Integration:** Real HTTP request from the front-end sends session trade logs to `http://localhost:8000/api/analyze` and receives a rich JSON diagnostic report.
- [ ] **Behavioral Scorecard (Slide 8):** Renders the Python-computed Disposition Effect, FOMO index, and Monte Carlo ruin probability.

### 9.2 Non-Functional & Academic Quality Requirements
- [ ] **Zero External Paid Dependencies:** Runs entirely on standard open-source web and Python libraries.
- [ ] **Ease of Execution:** Evaluator can launch the project with simple steps:
  1. `pip install -r backend/requirements.txt && python backend/server.py`
  2. Open `index.html` in any modern web browser.
- [ ] **Clean Code Standards:** Modular code with comprehensive docstrings, consistent variable naming, and separation of UI, simulation logic, and analytical models.
- [ ] **Responsive Visual Design:** Professional, dark-themed financial terminal UI (Bloomberg/TradingView inspired) with legible fonts and clear contrast.

---

## 10. Implementation Roadmap

1. **Milestone 1:** Architecture & PRD Specification *(Completed)*.
2. **Milestone 2:** HTML5/CSS3 10-Slide Deck Shell & Slide Controller.
3. **Milestone 3:** JavaScript Simulation Engine, Scenarios Data, & Candlestick Chart.
4. **Milestone 4:** Python Quantitative & Behavioral Analytics Backend (FastAPI).
5. **Milestone 5:** Three.js 3D Psychological Stress Orb Visualizer.
6. **Milestone 6:** End-to-End Integration, Scenario Balancing, & Final Polish.
