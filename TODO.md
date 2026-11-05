# Project Task Checklist (TODO.md)

## Project: The Trading Mind (An Interactive Educational Simulation)
**References:** [PRD.md](file:///C:/Users/ragha/OneDrive/Desktop/The_Trading_Mind/PRD.md) | [PLAN.md](file:///C:/Users/ragha/OneDrive/Desktop/The_Trading_Mind/PLAN.md)  
**Status:** Inception & Planning Complete; Ready for Milestone 1 Implementation.

---

## Milestone 0: Project Inception & Planning
- [x] Define realistic project scope, 10-slide outline, and multi-tech division of labor
- [x] Author comprehensive Product Requirements Document ([PRD.md](file:///C:/Users/ragha/OneDrive/Desktop/The_Trading_Mind/PRD.md))
- [x] Author 5-milestone implementation roadmap ([PLAN.md](file:///C:/Users/ragha/OneDrive/Desktop/The_Trading_Mind/PLAN.md))
- [x] Create project tracking checklist ([TODO.md](file:///C:/Users/ragha/OneDrive/Desktop/The_Trading_Mind/TODO.md))

---

## Milestone 1: HTML/CSS Presentation Structure & Slide Navigation
### 1.1 Implementation Tasks
- [x] Create base directory layout (`css/`, `js/`, `backend/`, `backend/analytics/`, `tests/`)
- [x] Author `index.html` structure:
  - [x] Slide deck container with 10 semantic `<section class="slide">` elements
  - [x] Top persistent HUD slot (Progress bar, Cash/Equity badges, 3D orb container)
  - [x] Bottom controls (Slide counter `01 / 10`, Back/Next buttons, keyboard hint tags)
- [x] Implement `css/presentation.css`:
  - [x] Modern responsive full-screen viewport layout (flex/grid)
  - [x] Clean slide transitions and slide visibility logic
  - [x] Typography scale (headers, body text, speaker notes)
- [x] Implement `css/terminal.css`:
  - [x] Bloomberg/TradingView dark terminal theme (charcoal, slate, neon accents)
  - [x] Glassmorphism cards, stat counters, and action button styles
- [x] Implement `js/app.js`:
  - [x] State-driven `SlideDeck` class tracking current slide index (0 to 9)
  - [x] Keyboard navigation listeners (`ArrowRight`, `ArrowLeft`, `Space`, `Home`)
  - [x] URL hash routing (`#slide-1` to `#slide-10`)
  - [x] Slide lifecycle hooks (`onSlideEnter`, `onSlideLeave`)

### 1.2 Testing & Verification Tasks
- [x] Verify keyboard navigation (`←`, `→`, `Space`) across all 10 slides
- [x] Verify click controls (Next, Prev buttons, slide indicator dots)
- [x] Verify layout responsiveness across resolutions (1366x768 to 1920x1080)
- [x] Confirm zero console errors in browser developer tools

### 1.3 Git Checkpoint
- [x] Stage and commit Milestone 1 files:  
  `git add index.html css/ js/app.js`  
  `git commit -m "feat(presentation): build 10-slide deck layout and keyboard navigation engine"`

### 1.4 Reflection & Documentation Checkpoint
- [x] Review slide transition performance and visual readability
- [x] Document slide lifecycle hooks in code comments for Milestone 2 hook-ins

---

## Milestone 2: JavaScript Trading Simulation Engine & Five Scenarios
### 2.1 Implementation Tasks
- [ ] Author `js/scenarios.js`:
  - [ ] Define dataset for Scenario 1: NOVA Tech (Parabolic FOMO run: $50 ➔ $125 ➔ $78)
  - [ ] Define dataset for Scenario 2: AeroDynamics (Flash crash panic: $100 ➔ $58 bottom ➔ $88)
  - [ ] Define dataset for Scenario 3: Titan Energy (Slow bleed loss aversion: $80 ➔ $48)
  - [ ] Define dataset for Scenario 4: BioPulse Pharma (Win streak overconfidence: 3 swings ➔ reversal)
  - [ ] Define dataset for Scenario 5: Global Retail Index (Choppy sideways grind: $148–$152)
  - [ ] Attach contextual news headlines and sentiment flags to specific ticks
- [ ] Author `js/chart.js`:
  - [ ] HTML5 Canvas candlestick and line chart renderer
  - [ ] Auto-scaling Y-axis (price range) and X-axis (ticks)
  - [ ] Green/Red candle bodies with wicks and volume bars
  - [ ] Visual buy/sell markers plotted at execution points
- [ ] Author `js/simulator.js`:
  - [ ] Core portfolio ledger: `$10,000.00` starting cash, shares held, average cost basis
  - [ ] Real-time math: Unrealized P&L, Realized P&L, Total Equity, Peak Drawdown %
  - [ ] Order execution logic: `BUY`, `SELL` (partial 50% or full 100%), `HOLD / NEXT TICK`
  - [ ] Position sizing controls (25%, 50%, 75%, 100% All-In preset buttons + custom slider)
  - [ ] Telemetry collector: record timestamps, decision delay (hesitation ms), order price, and sizing
- [ ] Implement `css/simulator.css`:
  - [ ] Order entry console, position sliders, and trade confirmation badges
  - [ ] News ticker ticker alert styling (flashing breaking news banners)

### 2.2 Testing & Verification Tasks
- [ ] Verify ledger math: starting balance $10,000, zero share execution when cash is insufficient
- [ ] Verify P&L updates correctly as prices tick up and down
- [ ] Test all 5 scenarios to ensure scripted price curves and headlines fire on designated ticks
- [ ] Verify execution markers display correctly on canvas candlesticks
- [ ] Confirm telemetry log captures structured action objects accurately

### 2.3 Git Checkpoint
- [ ] Stage and commit Milestone 2 files:  
  `git add js/scenarios.js js/chart.js js/simulator.js css/simulator.css`  
  `git commit -m "feat(simulator): implement 5-scenario market simulation, canvas charting, and trade ledger"`

### 2.4 Reflection & Documentation Checkpoint
- [ ] Inspect simulated trade logs for accuracy and completeness
- [ ] Verify that telemetry payload format matches Python backend contract

---

## Milestone 3: Python Behavioral Analytics Integration
### 3.1 Implementation Tasks
- [ ] Setup Python environment configuration:
  - [ ] Create `backend/requirements.txt` (`fastapi`, `uvicorn`, `numpy`)
- [ ] Implement `backend/analytics/metrics.py`:
  - [ ] Disposition Effect Ratio ($DER$): realized gain ratio vs. unrealized paper loss holding
  - [ ] FOMO Entry Index ($FEI$): proximity of buy orders to 5-period local highs
  - [ ] Panic Capitulation Score ($PCS$): sell correlation with negative candle momentum spikes
- [ ] Implement `backend/analytics/monte_carlo.py`:
  - [ ] Monte Carlo Risk-of-Ruin simulation (1,000 runs over 100 trades based on user sizing)
  - [ ] Calculate probability of account ruin (>50% drawdown)
- [ ] Implement `backend/analytics/archetypes.py`:
  - [ ] Classify trader archetype (*The Disciplined Stoic*, *The FOMO Chaser*, *The Bagholder*, *The Gambler*)
  - [ ] Generate qualitative summary feedback and psychological prescription
- [ ] Implement `backend/server.py`:
  - [ ] FastAPI app with CORS middleware
  - [ ] `GET /api/health` status endpoint
  - [ ] `POST /api/analyze` processing trade logs and returning diagnostic JSON report
- [ ] Implement `js/api.js`:
  - [ ] Slide 8 bridge sending session trade logs to backend on slide entry
  - [ ] Render behavioral scorecard (radar/bar metrics, archetype badge, ruin probability)
  - [ ] Graceful client-side fallback: computes metrics locally in JavaScript if Python server is offline

### 3.2 Testing & Verification Tasks
- [ ] Verify server starts cleanly with `python backend/server.py`
- [ ] Test `GET /api/health` returns `{"status": "ok"}`
- [ ] Test `POST /api/analyze` with sample payload returns valid JSON metrics and archetype
- [ ] Verify Slide 8 renders scorecard cleanly in browser
- [ ] Verify graceful client fallback triggers seamlessly when server process is terminated

### 3.3 Git Checkpoint
- [ ] Stage and commit Milestone 3 files:  
  `git add backend/ js/api.js`  
  `git commit -m "feat(analytics): add Python quantitative behavioral diagnostic engine and API bridge"`

### 3.4 Reflection & Documentation Checkpoint
- [ ] Review mathematical accuracy of behavioral formulas
- [ ] Ensure API contract is documented in docstrings

---

## Milestone 4: Interactive Animated 3D Psychological Stress Visualization (Three.js)
### 4.1 Implementation Tasks
- [ ] Add Three.js dependency (via local bundle or lightweight CDN import in `index.html`)
- [ ] Author `js/visualizer3d.js`:
  - [ ] Scene, PerspectiveCamera, and WebGLRenderer initialization in HUD container
  - [ ] Dynamic ambient and directional lighting setup
  - [ ] Procedural "Psychological Stress Orb" mesh (`IcosahedronGeometry` with wireframe/particle material)
  - [ ] Mouse orbit controls for user interaction (click-and-drag rotation)
- [ ] Implement reactive state updates in `js/visualizer3d.js`:
  - [ ] `updateStressOrb(drawdownPct, volatility, sentiment)` function
  - [ ] Dynamic color interpolation (Cyan/Stoic $\to$ Emerald Gold/Greed $\to$ Pulsing Crimson/Panic)
  - [ ] Vertex noise displacement / chaotic vibration triggered during drawdowns and flash crashes
  - [ ] Idle organic breathing animation loop via `requestAnimationFrame`

### 4.2 Testing & Verification Tasks
- [ ] Verify 3D scene renders cleanly at stable 60 FPS in browser
- [ ] Verify color transitions lerp smoothly without flickering or abrupt jumps
- [ ] Verify vertex noise deforms visibly when simulated drawdown exceeds 15%
- [ ] Ensure canvas resizes cleanly with browser window adjustments
- [ ] Confirm no memory leaks or duplicate animation loops when navigating slides

### 4.3 Git Checkpoint
- [ ] Stage and commit Milestone 4 files:  
  `git add js/visualizer3d.js index.html css/presentation.css`  
  `git commit -m "feat(3d): integrate Three.js psychological stress orb reacting to live simulation state"`

### 4.4 Reflection & Documentation Checkpoint
- [ ] Review visual harmony between 3D orb and 2D terminal UI
- [ ] Verify GPU usage remains minimal on standard laptops

---

## Milestone 5: Testing, Improvements, and Final Documentation
### 5.1 Implementation Tasks
- [ ] Implement unit test suite:
  - [ ] Create `tests/test_analytics.py` verifying metric calculations and Monte Carlo bounds
- [ ] Build evaluator quick-start automation:
  - [ ] Create `run_app.bat` (Windows 1-click launcher: checks python, installs deps, starts server, opens browser)
- [ ] Interactive polish & educational extras:
  - [ ] Slide 9: Position Sizing Calculator with interactive risk % sliders
  - [ ] Slide 10: Infinite procedural sandbox generator for post-presentation practice
  - [ ] Audio toggle (optional subtle terminal click sounds for trade executions)
- [ ] Write comprehensive documentation:
  - [ ] Author `README.md` with academic rationale, architecture diagram, setup instructions, and presentation guide

### 5.2 Testing & Verification Tasks
- [ ] Execute `pytest tests/` or `python -m unittest tests/test_analytics.py` (100% pass)
- [ ] Run full 15-minute presentation rehearsal from Slide 1 to 10
- [ ] Verify `run_app.bat` launches cleanly on a fresh terminal session
- [ ] Audit developer tools console for zero warnings and zero unhandled errors

### 5.3 Git Checkpoint
- [ ] Stage and commit Milestone 5 files:  
  `git add README.md run_app.bat tests/`  
  `git commit -m "chore(release): end-to-end testing, quickstart scripts, and documentation"`

### 5.4 Reflection & Documentation Checkpoint
- [ ] Final self-review against university grading rubric
- [ ] Prepare rehearsal notes and speaker prompts for the live classroom demo
