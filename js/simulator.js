/**
 * THE TRADING MIND - Trading Simulation Engine & Ledger Controller
 * Version: 1.0.0
 * Handles virtual cash accounting, order execution, position sizing,
 * candlestick playback, and decision telemetry logging.
 */

class TradingSimulator {
  constructor() {
    // Portfolio State
    this.initialCash = 10000.00;
    this.cash = this.initialCash;
    this.shares = 0;
    this.avgEntryPrice = 0.00;
    this.realizedPnL = 0.00;
    this.peakEquity = this.initialCash;
    this.maxDrawdownPct = 0.0;

    // Telemetry and Logs
    this.telemetryLogs = [];
    this.closedTrades = [];

    // Active Scenario State
    this.activeScenario = null;
    this.currentTickIndex = 0;
    this.visibleTicks = [];
    this.chart = null;
    this.markers = [];
    this.sizingPct = 25; // Default 25% allocation
    this.autoPlayTimer = null;
    this.isAutoPlaying = false;
    this.lastTickTimestamp = Date.now();

    // DOM References
    this.hudCash = document.getElementById('hud-cash');
    this.hudEquity = document.getElementById('hud-equity');
    this.hudDrawdown = document.getElementById('hud-drawdown');

    // Scenarios Cache
    this.scenarios = (typeof SCENARIOS !== 'undefined') ? SCENARIOS : [];
  }

  /**
   * Mounts and initializes a scenario into the target DOM container.
   * @param {number} scenarioId
   * @param {HTMLElement} container
   */
  mountScenario(scenarioId, container) {
    if (!container) return;

    // Find scenario definition
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (!scenario) {
      console.error(`Scenario ID ${scenarioId} not found.`);
      return;
    }

    this.activeScenario = scenario;
    this.currentTickIndex = 0;
    this.visibleTicks = [scenario.ticks[0]];
    this.markers = [];
    this.lastTickTimestamp = Date.now();
    this.stopAutoPlay();

    // Build Workstation DOM
    container.innerHTML = this.buildWorkstationHTML(scenario);

    // Initialize Chart
    const canvas = container.querySelector('.sim-chart-canvas');
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new MarketChart(canvas);
    this.chart.render(this.visibleTicks, this.markers, scenario.ticks.length);

    // Bind UI Event Handlers
    this.bindControls(container);

    // Sync UI Displays
    this.updateHUD();
    this.updateWorkstationUI(container);
  }

  /**
   * Generates the HTML template for the simulation workstation.
   * @param {Object} scenario
   * @returns {string}
   */
  buildWorkstationHTML(scenario) {
    const firstTick = scenario.ticks[0];
    return `
      <div class="sim-workstation" data-scenario-id="${scenario.id}">
        <!-- Header Bar -->
        <div class="sim-header-bar">
          <div class="sim-asset-info">
            <span class="sim-ticker-badge">${scenario.ticker}</span>
            <span class="sim-asset-name">${scenario.name}</span>
            <span class="badge badge-cyan">${scenario.bias}</span>
          </div>
          <div class="sim-scenario-progress">
            CANDLE: <span class="sim-tick-count">1</span> / ${scenario.ticks.length}
          </div>
        </div>

        <!-- News Ticker Banner -->
        <div class="sim-news-banner ${firstTick.sentiment || ''}">
          <span class="news-label-tag ${firstTick.sentiment === 'panic' ? 'breaking' : 'badge-cyan'}">
            ${firstTick.sentiment === 'panic' ? 'BREAKING ALERT' : 'MARKET NEWS'}
          </span>
          <span class="news-headline-text">${firstTick.headline || 'Market open.'}</span>
        </div>

        <!-- Chart Canvas -->
        <div class="sim-chart-wrapper">
          <canvas class="sim-chart-canvas"></canvas>
        </div>

        <!-- Position Strip -->
        <div class="sim-position-strip">
          <div class="sim-pos-cell">
            <span class="sim-pos-label">Current Price</span>
            <span class="sim-pos-val current-price-val">$${firstTick.close.toFixed(2)}</span>
          </div>
          <div class="sim-pos-cell">
            <span class="sim-pos-label">Shares Held</span>
            <span class="sim-pos-val shares-held-val">${this.shares}</span>
          </div>
          <div class="sim-pos-cell">
            <span class="sim-pos-label">Avg Entry</span>
            <span class="sim-pos-val avg-entry-val">$${this.avgEntryPrice.toFixed(2)}</span>
          </div>
          <div class="sim-pos-cell">
            <span class="sim-pos-label">Floating P&L</span>
            <span class="sim-pos-val floating-pnl-val">$0.00</span>
          </div>
          <div class="sim-pos-cell">
            <span class="sim-pos-label">Realized P&L</span>
            <span class="sim-pos-val realized-pnl-val">$${this.realizedPnL.toFixed(2)}</span>
          </div>
        </div>

        <!-- Control Dock -->
        <div class="sim-controls-dock">
          <!-- Sizing Row -->
          <div class="sim-sizing-row">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--text-muted); font-size: 0.75rem;">CAPITAL ALLOCATION:</span>
              <div class="sizing-presets">
                <button class="btn-preset" data-pct="10">10%</button>
                <button class="btn-preset active" data-pct="25">25%</button>
                <button class="btn-preset" data-pct="50">50%</button>
                <button class="btn-preset" data-pct="100" style="color: var(--accent-red); font-weight: 700;">100% ALL-IN</button>
              </div>
            </div>

            <div class="sizing-slider-wrapper">
              <input type="range" class="sizing-slider" min="5" max="100" step="5" value="25">
              <span class="sizing-slider-val">25%</span>
            </div>
          </div>

          <!-- Action Buttons Row -->
          <div class="sim-actions-row">
            <div class="action-btn-group-left">
              <button class="btn-sim-action btn-sim-buy" id="btn-action-buy">
                ▲ BUY <span class="buy-alloc-hint">($2,500)</span>
              </button>
              <button class="btn-sim-action btn-sim-sell" id="btn-action-sell" ${this.shares === 0 ? 'disabled' : ''}>
                ▼ SELL ALL <span class="sell-alloc-hint">(${this.shares} Shs)</span>
              </button>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn-sim-action btn-sim-hold" id="btn-action-hold" title="Hold position and advance candle (Space)">
                HOLD / NEXT CANDLE ➔
              </button>
              <button class="btn-sim-auto" id="btn-action-auto">
                ▶ Auto
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Binds user interactions and order buttons.
   * @param {HTMLElement} container
   */
  bindControls(container) {
    const btnBuy = container.querySelector('#btn-action-buy');
    const btnSell = container.querySelector('#btn-action-sell');
    const btnHold = container.querySelector('#btn-action-hold');
    const btnAuto = container.querySelector('#btn-action-auto');
    const slider = container.querySelector('.sizing-slider');
    const presets = container.querySelectorAll('.btn-preset');

    // Preset buttons
    presets.forEach(btn => {
      btn.addEventListener('click', () => {
        presets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pct = parseInt(btn.getAttribute('data-pct'), 10);
        this.sizingPct = pct;
        if (slider) slider.value = pct;
        container.querySelector('.sizing-slider-val').textContent = `${pct}%`;
        this.updateAllocHints(container);
      });
    });

    // Slider
    if (slider) {
      slider.addEventListener('input', (e) => {
        const pct = parseInt(e.target.value, 10);
        this.sizingPct = pct;
        container.querySelector('.sizing-slider-val').textContent = `${pct}%`;
        presets.forEach(b => {
          b.classList.toggle('active', parseInt(b.getAttribute('data-pct'), 10) === pct);
        });
        this.updateAllocHints(container);
      });
    }

    // Buy Action
    if (btnBuy) {
      btnBuy.addEventListener('click', () => {
        this.executeBuy(container);
      });
    }

    // Sell Action
    if (btnSell) {
      btnSell.addEventListener('click', () => {
        this.executeSell(container);
      });
    }

    // Hold / Next Candle Action
    if (btnHold) {
      btnHold.addEventListener('click', () => {
        this.executeHold(container);
      });
    }

    // Auto Play Toggle
    if (btnAuto) {
      btnAuto.addEventListener('click', () => {
        this.toggleAutoPlay(container);
      });
    }
  }

  /**
   * Executes a BUY order for the current scenario.
   */
  executeBuy(container) {
    if (!this.activeScenario) return;
    const currentTick = this.visibleTicks[this.visibleTicks.length - 1];
    const price = currentTick.close;

    const allocCash = this.cash * (this.sizingPct / 100);
    const sharesToBuy = Math.floor(allocCash / price);

    if (sharesToBuy <= 0 || allocCash < price) {
      this.flashElement(container.querySelector('#btn-action-buy'), 'shake');
      return;
    }

    const orderCost = sharesToBuy * price;
    const hesitationMs = Date.now() - this.lastTickTimestamp;

    // Portfolio Math
    const totalPreviousCost = this.shares * this.avgEntryPrice;
    this.shares += sharesToBuy;
    this.avgEntryPrice = (totalPreviousCost + orderCost) / this.shares;
    this.cash -= orderCost;

    // Log Telemetry
    const logEntry = {
      scenario_id: this.activeScenario.id,
      tick: this.currentTickIndex,
      action: 'BUY',
      price: price,
      shares: sharesToBuy,
      sizing_pct: this.sizingPct,
      cash_after: this.cash,
      hesitation_ms: hesitationMs,
      timestamp: Date.now()
    };
    this.telemetryLogs.push(logEntry);

    // Chart Marker
    this.markers.push({
      tick: this.currentTickIndex,
      type: 'BUY',
      price: price,
      text: `BUY +${sharesToBuy}`
    });

    // Advance to next candle on action
    this.advanceTick(container);
  }

  /**
   * Executes a SELL order liquidating the open position.
   */
  executeSell(container) {
    if (!this.activeScenario || this.shares <= 0) return;
    const currentTick = this.visibleTicks[this.visibleTicks.length - 1];
    const price = currentTick.close;

    const sharesToSell = this.shares;
    const proceeds = sharesToSell * price;
    const tradePnL = (price - this.avgEntryPrice) * sharesToSell;
    const hesitationMs = Date.now() - this.lastTickTimestamp;

    // Portfolio Math
    this.cash += proceeds;
    this.realizedPnL += tradePnL;
    this.closedTrades.push({
      scenario_id: this.activeScenario.id,
      shares: sharesToSell,
      entry_price: this.avgEntryPrice,
      exit_price: price,
      pnl: tradePnL,
      pnl_pct: ((price - this.avgEntryPrice) / this.avgEntryPrice) * 100
    });

    this.shares = 0;
    this.avgEntryPrice = 0.00;

    // Log Telemetry
    const logEntry = {
      scenario_id: this.activeScenario.id,
      tick: this.currentTickIndex,
      action: 'SELL',
      price: price,
      shares: sharesToSell,
      realized_pnl: tradePnL,
      cash_after: this.cash,
      hesitation_ms: hesitationMs,
      timestamp: Date.now()
    };
    this.telemetryLogs.push(logEntry);

    // Chart Marker
    const pnlPrefix = tradePnL >= 0 ? '+' : '';
    this.markers.push({
      tick: this.currentTickIndex,
      type: 'SELL',
      price: price,
      text: `SELL ${pnlPrefix}$${tradePnL.toFixed(0)}`
    });

    // Advance to next candle on action
    this.advanceTick(container);
  }

  /**
   * Executes a HOLD action and advances to the next tick.
   */
  executeHold(container) {
    if (!this.activeScenario) return;
    const currentTick = this.visibleTicks[this.visibleTicks.length - 1];
    const hesitationMs = Date.now() - this.lastTickTimestamp;

    this.telemetryLogs.push({
      scenario_id: this.activeScenario.id,
      tick: this.currentTickIndex,
      action: 'HOLD',
      price: currentTick.close,
      shares_held: this.shares,
      hesitation_ms: hesitationMs,
      timestamp: Date.now()
    });

    this.advanceTick(container);
  }

  /**
   * Advances the simulation by one candle tick.
   */
  advanceTick(container) {
    if (!this.activeScenario) return;

    if (this.currentTickIndex < this.activeScenario.ticks.length - 1) {
      this.currentTickIndex++;
      const nextTick = this.activeScenario.ticks[this.currentTickIndex];
      this.visibleTicks.push(nextTick);
      this.lastTickTimestamp = Date.now();

      // Repaint Chart
      if (this.chart) {
        this.chart.render(this.visibleTicks, this.markers, this.activeScenario.ticks.length);
      }

      // Update UI components
      this.updateHUD();
      this.updateWorkstationUI(container);

      // Check for completion
      if (this.currentTickIndex === this.activeScenario.ticks.length - 1) {
        this.stopAutoPlay();
        this.showCompletionOverlay(container);
      }
    } else {
      this.stopAutoPlay();
      this.showCompletionOverlay(container);
    }
  }

  /**
   * Toggles auto-playback of candles every 1.8 seconds.
   */
  toggleAutoPlay(container) {
    if (this.isAutoPlaying) {
      this.stopAutoPlay(container);
    } else {
      this.startAutoPlay(container);
    }
  }

  startAutoPlay(container) {
    this.isAutoPlaying = true;
    const btn = container ? container.querySelector('#btn-action-auto') : null;
    if (btn) {
      btn.classList.add('active');
      btn.textContent = '⏸ Pause';
    }

    this.autoPlayTimer = setInterval(() => {
      if (this.currentTickIndex >= this.activeScenario.ticks.length - 1) {
        this.stopAutoPlay(container);
      } else {
        this.executeHold(container);
      }
    }, 1800);
  }

  stopAutoPlay(container) {
    this.isAutoPlaying = false;
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    const btn = container ? container.querySelector('#btn-action-auto') : null;
    if (btn) {
      btn.classList.remove('active');
      btn.textContent = '▶ Auto';
    }
  }

  /**
   * Synchronizes top terminal HUD with current portfolio stats.
   */
  updateHUD() {
    const currentPrice = this.visibleTicks.length > 0 
      ? this.visibleTicks[this.visibleTicks.length - 1].close 
      : 0;
    
    const equity = this.cash + (this.shares * currentPrice);

    if (equity > this.peakEquity) {
      this.peakEquity = equity;
    }

    const drawdownPct = ((this.peakEquity - equity) / this.peakEquity) * 100;
    if (drawdownPct > this.maxDrawdownPct) {
      this.maxDrawdownPct = drawdownPct;
    }

    if (this.hudCash) this.hudCash.textContent = `$${this.cash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (this.hudEquity) {
      this.hudEquity.textContent = `$${equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      this.hudEquity.className = 'hud-stat-val ' + (equity >= this.initialCash ? 'positive' : 'negative');
    }
    if (this.hudDrawdown) {
      this.hudDrawdown.textContent = `${this.maxDrawdownPct.toFixed(1)}%`;
      this.hudDrawdown.className = 'hud-stat-val ' + (this.maxDrawdownPct > 15 ? 'negative' : '');
    }
  }

  /**
   * Updates all dynamic text and badge elements inside the workstation.
   */
  updateWorkstationUI(container) {
    if (!container || !this.activeScenario) return;
    const currentTick = this.visibleTicks[this.visibleTicks.length - 1];
    const price = currentTick.close;

    // Current price
    const elPrice = container.querySelector('.current-price-val');
    if (elPrice) elPrice.textContent = `$${price.toFixed(2)}`;

    // Shares held
    const elShares = container.querySelector('.shares-held-val');
    if (elShares) elShares.textContent = this.shares;

    // Avg entry
    const elAvg = container.querySelector('.avg-entry-val');
    if (elAvg) elAvg.textContent = `$${this.avgEntryPrice.toFixed(2)}`;

    // Floating P&L
    const elFloat = container.querySelector('.floating-pnl-val');
    if (elFloat) {
      const floatingPnL = (price - this.avgEntryPrice) * this.shares;
      const prefix = floatingPnL >= 0 ? '+' : '';
      elFloat.textContent = `${prefix}$${floatingPnL.toFixed(2)}`;
      elFloat.style.color = floatingPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)';
    }

    // Realized P&L
    const elReal = container.querySelector('.realized-pnl-val');
    if (elReal) {
      const prefix = this.realizedPnL >= 0 ? '+' : '';
      elReal.textContent = `${prefix}$${this.realizedPnL.toFixed(2)}`;
      elReal.style.color = this.realizedPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)';
    }

    // Tick Counter
    const elTick = container.querySelector('.sim-tick-count');
    if (elTick) elTick.textContent = this.currentTickIndex + 1;

    // News Banner
    const newsBanner = container.querySelector('.sim-news-banner');
    if (newsBanner) {
      newsBanner.className = `sim-news-banner ${currentTick.sentiment || ''}`;
      const newsTag = newsBanner.querySelector('.news-label-tag');
      const newsText = newsBanner.querySelector('.news-headline-text');
      if (newsTag) newsTag.textContent = currentTick.sentiment === 'panic' ? 'PANIC FLUIDITY' : 'MARKET PULSE';
      if (newsText) newsText.textContent = currentTick.headline || 'Price action in range.';
    }

    // Sizing & Order Buttons State
    const btnSell = container.querySelector('#btn-action-sell');
    if (btnSell) {
      btnSell.disabled = this.shares === 0;
      const sellHint = btnSell.querySelector('.sell-alloc-hint');
      if (sellHint) sellHint.textContent = `(${this.shares} Shs)`;
    }

    this.updateAllocHints(container);
  }

  updateAllocHints(container) {
    if (!container || !this.activeScenario) return;
    const currentTick = this.visibleTicks[this.visibleTicks.length - 1];
    const price = currentTick.close;
    const allocDollars = this.cash * (this.sizingPct / 100);
    const sharesPossible = Math.floor(allocDollars / price);

    const btnBuy = container.querySelector('#btn-action-buy');
    if (btnBuy) {
      const buyHint = btnBuy.querySelector('.buy-alloc-hint');
      if (buyHint) buyHint.textContent = `($${allocDollars.toFixed(0)} ~ ${sharesPossible} shs)`;
      btnBuy.disabled = sharesPossible <= 0;
    }
  }

  /**
   * Displays the scenario debriefing card upon completing all ticks.
   */
  showCompletionOverlay(container) {
    const existing = container.querySelector('.sim-completion-overlay');
    if (existing) existing.remove();

    const scenario = this.activeScenario;
    const currentPrice = this.visibleTicks[this.visibleTicks.length - 1].close;
    const currentEquity = this.cash + (this.shares * currentPrice);
    const scenarioPnL = currentEquity - this.initialCash;
    const isProfitable = scenarioPnL >= 0;

    const overlay = document.createElement('div');
    overlay.className = 'sim-completion-overlay';
    overlay.innerHTML = `
      <div class="completion-badge">SCENARIO ${scenario.id} COMPLETE</div>
      <h2 class="completion-title">${scenario.name}: Debrief</h2>
      <p class="completion-subtitle">
        Target Bias: <strong>${scenario.bias}</strong>. Let's inspect how your decisions held up under psychological pressure.
      </p>

      <div class="completion-metrics-row">
        <div class="completion-metric">
          <div class="completion-metric-label">Ending Portfolio</div>
          <div class="completion-metric-val" style="color: ${isProfitable ? 'var(--accent-green)' : 'var(--accent-red)'}">
            $${currentEquity.toFixed(2)}
          </div>
        </div>
        <div class="completion-metric">
          <div class="completion-metric-label">Max Drawdown</div>
          <div class="completion-metric-val" style="color: var(--accent-amber);">
            ${this.maxDrawdownPct.toFixed(1)}%
          </div>
        </div>
        <div class="completion-metric">
          <div class="completion-metric-label">Trades Executed</div>
          <div class="completion-metric-val">
            ${this.telemetryLogs.filter(l => l.scenario_id === scenario.id && l.action !== 'HOLD').length}
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn-terminal" id="btn-next-scenario">
          Proceed to Next Slide ➔
        </button>
      </div>
    `;

    container.querySelector('.sim-chart-wrapper').appendChild(overlay);

    overlay.querySelector('#btn-next-scenario').addEventListener('click', () => {
      if (window.deck) {
        window.deck.nextSlide();
      }
    });
  }

  flashElement(el, className) {
    if (!el) return;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), 400);
  }

  /**
   * Returns complete telemetry logs for Python analytics (Milestone 3).
   */
  getTelemetryPayload() {
    return {
      session_id: 'session_' + Date.now(),
      starting_balance: this.initialCash,
      current_cash: this.cash,
      shares_held: this.shares,
      realized_pnl: this.realizedPnL,
      peak_equity: this.peakEquity,
      max_drawdown_pct: this.maxDrawdownPct,
      closed_trades: this.closedTrades,
      telemetry_logs: this.telemetryLogs
    };
  }
}

// Global simulator instance
window.simulator = new TradingSimulator();
