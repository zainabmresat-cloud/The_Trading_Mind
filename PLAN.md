# Implementation Plan (PLAN.md)

## Project: The Trading Mind (An Interactive Educational Simulation)
**Reference Document:** [PRD.md](file:///C:/Users/ragha/OneDrive/Desktop/The_Trading_Mind/PRD.md)  
**Standard:** Modular, testable, and realistic for a university-level computer science / finance project.

---

## Development Philosophy & Architecture Guidelines
1. **Separation of Concerns:** Keep presentation styling, simulation ledger mechanics, 3D WebGL graphics, and Python analytics strictly decoupled in their dedicated directories.
2. **Defensive Design & Graceful Degradation:** The presentation and trading simulation must run smoothly in any modern browser. If the Python backend is offline during an evaluation, a built-in client-side fallback mode will handle diagnostics with simulated metrics so the presentation never crashes.
3. **Incremental Verification:** Each milestone concludes with verifiable testing criteria and a specific Git commit message.

---

## Milestone Breakdown

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Milestone 1  │ ──► │ Milestone 2  │ ──► │ Milestone 3  │ ──► │ Milestone 4  │ ──► │ Milestone 5  │
│ Presentation │     │  JavaScript  │     │    Python    │     │   Three.js   │     │   Testing &  │
│  Deck Shell  │     │  Sim Engine  │     │  Analytics   │     │   3D Visual  │     │    Docs      │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

### Milestone 1: HTML/CSS Presentation Structure & Slide Navigation

* **Objective:** Establish the master single-page application (SPA) slide deck architecture, the Bloomberg/TradingView dark-terminal aesthetic, and responsive keyboard/click navigation across all 10 slides.
* **Target Files:**
  * `index.html` (Base structure, 10 slide containers, HUD slots)
  * `css/presentation.css` (Slide layouts, flex/grid viewports, typography, transitions)
  * `css/terminal.css` (Terminal color palette, glassmorphism cards, badges, buttons)
  * `js/app.js` (Slide controller, keyboard listeners, progress bar update)

* **Implementation Tasks:**
  1. Create `index.html` containing 10 semantic `<section class="slide">` elements with slide headings, speaker prompts, and interactive container slots.
  2. Implement `css/presentation.css` and `css/terminal.css` with a high-contrast dark theme (slate/charcoal background, monospace accents, emerald green and crimson status indicators).
  3. Write `js/app.js` with a lightweight, state-driven `SlideDeck` class:
     * Keyboard navigation: `ArrowRight` / `Space` (next slide), `ArrowLeft` (previous slide), `Home` (slide 1).
     * Slide indicators: Progress bar at the top, bottom slide numbering (`Slide 03 / 10`), and clickable dot navigation.
     * Slide lifecycle hooks (`onSlideEnter`, `onSlideLeave`) to mount and dismount simulation components cleanly.

* **Testing Criteria:**
  * [ ] Navigating forward and backward through all 10 slides works reliably with keyboard and mouse clicks.
  * [ ] Slide transitions are smooth with no layout shifts or content overflow.
  * [ ] Direct URL hash navigation (e.g., `#slide-3`) loads the correct slide.
  * [ ] Viewport scales properly on standard laptop resolutions (1366x768 to 1920x1080).

* **Expected Git Commit:**  
  `feat(presentation): build 10-slide deck layout and keyboard navigation engine`

---

### Milestone 2: JavaScript Trading Simulation Engine & Five Scenarios

* **Objective:** Build the virtual trading simulator, the $10,000 cash ledger, the 5 scripted behavioral scenarios, and an interactive HTML5 Canvas candlestick/line chart.
* **Target Files:**
  * `js/scenarios.js` (Data definitions for Scenarios 1–5: price ticks, news flashes, bias targets)
  * `js/chart.js` (Canvas-based candlestick/line chart with volume histogram and glowing current-price line)
  * `js/simulator.js` (Portfolio ledger, order matching, P&L math, position sizing, telemetry recorder)
  * `css/simulator.css` (Order entry buttons, position sliders, HUD metric cards)

* **Implementation Tasks:**
  1. Author `js/scenarios.js` with structured data for:
     * Scenario 1: NOVA Tech (Parabolic FOMO run: $50 ➔ $125 ➔ $78)
     * Scenario 2: AeroDynamics (Flash crash panic: $100 ➔ $58 bottom ➔ $88)
     * Scenario 3: Titan Energy (Slow bleed loss aversion: $80 ➔ $48 drift)
     * Scenario 4: BioPulse Pharma (Win streak overconfidence: 3 easy swings ➔ volatility trap)
     * Scenario 5: Global Retail Index (Choppy sideways grind: $148–$152 oscillations)
  2. Implement `js/chart.js` rendering an interactive price chart directly onto an HTML5 `<canvas>`:
     * Dynamic auto-scaling Y-axis (price) and X-axis (ticks/time).
     * Renders green/red candlestick bodies with high/low wicks and volume bars.
     * Visual trade execution markers (green Buy tags, red Sell tags) plotted at execution points.
  3. Implement `js/simulator.js`:
     * Starting balance `$10,000.00`.
     * Action handlers for `BUY`, `SELL`, and `HOLD / NEXT CANDLE`.
     * Sizing controls: 25%, 50%, 75%, 100% allocation buttons + dynamic slider.
     * Precise financial math: cash, shares, average cost, unrealized P&L, realized P&L, and equity peak drawdown.
     * Telemetry collection: records timestamps, decision speed (hesitation in milliseconds), and price actions into a session log array.

* **Testing Criteria:**
  * [ ] Starting balance is exactly $10,000; cash balance cannot become negative.
  * [ ] Buying shares reduces cash and increases inventory; selling shares credits cash and locks in realized P&L.
  * [ ] Candlestick chart advances one tick per step with clean animations and correct marker overlays.
  * [ ] Dynamic news headline cards appear at their designated tick intervals.
  * [ ] Session log captures all actions with accurate metrics and timestamps.

* **Expected Git Commit:**  
  `feat(simulator): implement 5-scenario market simulation, canvas charting, and trade ledger`

---

### Milestone 3: Python Behavioral Analytics Integration

* **Objective:** Develop the quantitative Python backend service to process session telemetry logs, compute academic behavioral finance metrics (Disposition Effect, FOMO Index, Risk of Ruin), and integrate the diagnostic report into Slide 8.
* **Target Files:**
  * `backend/requirements.txt` (FastAPI, Uvicorn, NumPy)
  * `backend/server.py` (FastAPI web server with CORS and `/api/analyze` POST endpoint)
  * `backend/analytics/metrics.py` (Formulas for Disposition Effect, FOMO Index, Panic Capitulation)
  * `backend/analytics/monte_carlo.py` (1,000-trial Monte Carlo Risk of Ruin simulator)
  * `backend/analytics/archetypes.py` (Trader archetype classification rules)
  * `js/api.js` (Frontend bridge that sends telemetry and renders Slide 8 scorecard with client-side fallback)

* **Implementation Tasks:**
  1. Create `backend/requirements.txt` with minimal, stable dependencies (`fastapi`, `uvicorn`, `numpy`).
  2. Implement `backend/analytics/metrics.py`:
     * **Disposition Effect Ratio ($DER$):** Calculates the ratio of realized gains vs. held unrealized losses.
     * **FOMO Entry Index ($FEI$):** Measures proximity of buy orders to 5-period local highs.
     * **Panic Capitulation Score ($PCS$):** Measures correlation between sell orders and maximum downward candle momentum.
  3. Implement `backend/analytics/monte_carlo.py`:
     * Takes user’s empirical win/loss ratio and position sizing variance.
     * Runs 1,000 synthetic paths of 100 trades to calculate probability of catastrophic drawdown (>50% equity drop).
  4. Implement `backend/analytics/archetypes.py`:
     * Classifies trader profile: *The Disciplined Stoic*, *The FOMO Chaser*, *The Bagholder*, or *The Reckless Gambler*.
  5. Build `backend/server.py` exposing:
     * `GET /api/health`: Health status.
     * `POST /api/analyze`: Receives trade log payload, returns computed JSON report.
  6. Build `js/api.js`:
     * Dispatches telemetry when entering Slide 8.
     * Renders an interactive diagnostic scorecard with metric bars, archetype badge, and Monte Carlo ruin probability.
     * Includes a graceful fallback: if the Python server is offline, runs client-side calculations so the presentation continues seamlessly.

* **Testing Criteria:**
  * [ ] Server starts with `python backend/server.py` and returns `{"status": "ok"}` on `/api/health`.
  * [ ] `POST /api/analyze` accepts sample telemetry and returns expected metric calculations and archetypes.
  * [ ] Slide 8 renders the diagnostic report within 150ms of slide entry.
  * [ ] If the backend server is stopped, the client gracefully falls back to local calculations without throwing unhandled exceptions.

* **Expected Git Commit:**  
  `feat(analytics): add Python quantitative behavioral diagnostic engine and API bridge`

---

### Milestone 4: Interactive Animated 3D Psychological Stress Visualization (Three.js)

* **Objective:** Integrate an animated WebGL 3D "Stress Orb" (or "Mind Sphere") into the presentation HUD that reacts in real time to the user's trading decisions, drawdown, and market volatility.
* **Target Files:**
  * `js/visualizer3d.js` (Three.js scene setup, procedural geometry, custom vertex noise, lighting, and reactive update loop)
  * `index.html` (Three.js canvas mount point and HUD container)
  * `css/presentation.css` (3D HUD styling and positioning)

* **Implementation Tasks:**
  1. Set up Three.js with an optimized WebGLRenderer, PerspectiveCamera, and dynamic lighting inside a designated HUD widget.
  2. Create a procedural 3D orb using `IcosahedronGeometry` with wireframe/particle or smooth surface shaders.
  3. Implement an interactive render loop (`requestAnimationFrame`):
     * Idle state: Slow, organic breathing rotation.
     * User interaction: Mouse-drag orbit controls to rotate and inspect the orb.
  4. Build dynamic reactive state bindings (`updateStressOrb(drawdownPct, volatility, sentiment)`):
     * **Stoic/Neutral State:** Calm cyan/teal glow, smooth spherical geometry.
     * **Greed/Euphoria State:** Radiant emerald/gold hue with accelerated spin and particle bloom during winning trades.
     * **Panic/Stress State:** Pulsing crimson red with erratic vertex noise and spiky distortion proportional to portfolio drawdown.

* **Testing Criteria:**
  * [ ] Three.js scene maintains a stable 60 FPS in modern browsers without frame drops.
  * [ ] Color transitions smoothly interpolate (lerp) without abrupt visual snapping.
  * [ ] When a simulated flash crash occurs or drawdown exceeds 15%, the orb visibly shifts to pulsing crimson distortion.
  * [ ] Visualizer resizes cleanly when browser window is adjusted.

* **Expected Git Commit:**  
  `feat(3d): integrate Three.js psychological stress orb reacting to live simulation state`

---

### Milestone 5: Testing, Improvements, and Final Documentation

* **Objective:** Perform end-to-end rehearsal testing, optimize UI polish, build a 1-click startup script for university evaluators, and write comprehensive presentation documentation.
* **Target Files:**
  * `README.md` (Project overview, academic context, architecture, quick-start guide, speaking tips)
  * `run_app.bat` (Windows 1-click startup script: starts Python server and opens browser)
  * `tests/test_analytics.py` (Python unit tests for analytical metrics and Monte Carlo simulation)
  * Cross-file polish across CSS and JavaScript.

* **Implementation Tasks:**
  1. Write `tests/test_analytics.py` verifying metric calculations (Disposition Effect, FOMO index, Monte Carlo ruin bounds).
  2. Conduct a full end-to-end dry run:
     * Complete all 5 scenarios with different trading styles (aggressive, passive, disciplined).
     * Verify Slide 8 diagnostic output updates accurately to reflect each style.
     * Ensure Slide 9 position sizing calculator works interactively.
     * Ensure Slide 10 free-play sandbox functions properly.
  3. Create `run_app.bat` for instant evaluation:
     * Checks Python environment, installs dependencies if missing, launches `server.py`, and opens `index.html` in the default browser.
  4. Write `README.md` with:
     * Project description and behavioral economics background.
     * Step-by-step setup and manual launch instructions.
     * Evaluator walkthrough guide explaining how each technology contributes.
     * 15-minute presentation script/cheat sheet for the student.

* **Testing Criteria:**
  * [ ] Python unit tests in `tests/test_analytics.py` pass with 100% success.
  * [ ] `run_app.bat` launches the complete application with zero manual troubleshooting.
  * [ ] Zero unhandled errors in browser developer tools console across the entire 10-slide journey.
  * [ ] Documentation provides clear instructions and transparent explanations of all models.

* **Expected Git Commit:**  
  `chore(release): end-to-end testing, quickstart scripts, and documentation`

---

## Verification & Acceptance Checklist

| Milestone | Deliverables | Verification Command / Check |
| :--- | :--- | :--- |
| **M1: Deck Shell** | `index.html`, `presentation.css`, `terminal.css`, `app.js` | Open `index.html`, test `←` / `→` / `Space` keys across 10 slides. |
| **M2: Simulation** | `scenarios.js`, `chart.js`, `simulator.js`, `simulator.css` | Execute trades in Scenarios 1–5; verify ledger math and canvas chart updates. |
| **M3: Python Backend**| `server.py`, `metrics.py`, `monte_carlo.py`, `archetypes.py`, `api.js` | `python backend/server.py`, trigger Slide 8, verify diagnostic JSON response. |
| **M4: 3D Visualizer** | `visualizer3d.js` | Observe 3D orb color and vertex distortion as drawdown increases. |
| **M5: Testing & Docs**| `README.md`, `run_app.bat`, `tests/test_analytics.py` | `pytest tests/` passes; `run_app.bat` launches seamless full-stack run. |
