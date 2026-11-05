/**
 * THE TRADING MIND - Canvas Candlestick & Volume Chart Renderer
 * Version: 1.0.0
 * Renders high-DPI candlestick charts, volume histograms, and trade execution markers.
 */

class MarketChart {
  /**
   * Initializes the chart on the target canvas element.
   * @param {HTMLCanvasElement} canvas
   * @param {Object} options Configuration options
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = Object.assign({
      bullishColor: '#00e676',
      bearishColor: '#ff1744',
      gridColor: 'rgba(255, 255, 255, 0.05)',
      textColor: '#94a3b8',
      accentColor: '#00e5ff',
      fontFamily: 'monospace',
      paddingTop: 24,
      paddingBottom: 40,
      paddingLeft: 12,
      paddingRight: 64,
      volumeHeightRatio: 0.22
    }, options);

    this.visibleTicks = [];
    this.markers = [];
    this.totalTicks = 10;

    this.setupResizeObserver();
  }

  /**
   * Sets up responsive resize handling with device pixel ratio scaling.
   */
  setupResizeObserver() {
    this.resize = () => {
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.displayWidth = rect.width;
      this.displayHeight = rect.height;

      this.redraw();
    };

    window.addEventListener('resize', this.resize);
    // Initial call
    requestAnimationFrame(this.resize);
  }

  /**
   * Updates chart data and repaints the canvas.
   * @param {Array} visibleTicks Array of OHLC tick objects currently revealed
   * @param {Array} markers Array of trade execution markers [{tick, type, price, text}]
   * @param {number} totalTicks Total number of ticks in the current scenario
   */
  render(visibleTicks, markers = [], totalTicks = 10) {
    this.visibleTicks = visibleTicks || [];
    this.markers = markers || [];
    this.totalTicks = Math.max(totalTicks, this.visibleTicks.length);

    if (!this.displayWidth || !this.displayHeight) {
      const rect = this.canvas.getBoundingClientRect();
      this.displayWidth = rect.width;
      this.displayHeight = rect.height;
    }

    this.redraw();
  }

  /**
   * Main repaint cycle.
   */
  redraw() {
    const { ctx, displayWidth, displayHeight, options } = this;
    if (!displayWidth || !displayHeight || !this.visibleTicks.length) return;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // 1. Calculate price range with breathing room
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVolume = 0;

    this.visibleTicks.forEach(t => {
      if (t.low < minPrice) minPrice = t.low;
      if (t.high > maxPrice) maxPrice = t.high;
      if (t.volume > maxVolume) maxVolume = t.volume;
    });

    const priceBuffer = (maxPrice - minPrice) * 0.12 || 2;
    minPrice -= priceBuffer;
    maxPrice += priceBuffer;
    const priceRange = maxPrice - minPrice;

    // Usable drawing area bounds
    const chartLeft = options.paddingLeft;
    const chartRight = displayWidth - options.paddingRight;
    const chartTop = options.paddingTop;
    const chartBottom = displayHeight - options.paddingBottom;
    const chartHeight = chartBottom - chartTop;
    const chartWidth = chartRight - chartLeft;

    // 2. Draw Background Grid & Y-Axis Price Labels
    const numPriceLines = 5;
    ctx.font = `11px ${options.fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= numPriceLines; i++) {
      const ratio = i / numPriceLines;
      const y = chartTop + chartHeight * (1 - ratio);
      const priceVal = minPrice + priceRange * ratio;

      // Grid line
      ctx.strokeStyle = options.gridColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(chartLeft, y);
      ctx.lineTo(chartRight, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label on right margin
      ctx.fillStyle = options.textColor;
      ctx.fillText(`$${priceVal.toFixed(2)}`, chartRight + 8, y);
    }

    // 3. Draw Volume Histogram (at the bottom)
    const slotWidth = chartWidth / this.totalTicks;
    const candleWidth = Math.max(6, slotWidth * 0.58);
    const volumeHeightMax = chartHeight * options.volumeHeightRatio;

    this.visibleTicks.forEach((t, i) => {
      const centerX = chartLeft + (i + 0.5) * slotWidth;
      const volRatio = maxVolume > 0 ? t.volume / maxVolume : 0;
      const volBarHeight = volRatio * volumeHeightMax;
      const volY = chartBottom - volBarHeight;
      const isBull = t.close >= t.open;

      ctx.fillStyle = isBull ? 'rgba(0, 230, 118, 0.18)' : 'rgba(255, 23, 68, 0.18)';
      ctx.fillRect(centerX - candleWidth / 2, volY, candleWidth, volBarHeight);
    });

    // 4. Draw Candlesticks (Wicks + Bodies)
    this.visibleTicks.forEach((t, i) => {
      const centerX = chartLeft + (i + 0.5) * slotWidth;
      const isBull = t.close >= t.open;
      const candleColor = isBull ? options.bullishColor : options.bearishColor;

      const yHigh = chartTop + chartHeight * (1 - (t.high - minPrice) / priceRange);
      const yLow = chartTop + chartHeight * (1 - (t.low - minPrice) / priceRange);
      const yOpen = chartTop + chartHeight * (1 - (t.open - minPrice) / priceRange);
      const yClose = chartTop + chartHeight * (1 - (t.close - minPrice) / priceRange);

      // Wick (High-Low line)
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX, yHigh);
      ctx.lineTo(centerX, yLow);
      ctx.stroke();

      // Body (Open-Close rectangle)
      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(2.5, Math.abs(yClose - yOpen));

      ctx.fillStyle = candleColor;
      ctx.fillRect(centerX - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      // Draw subtle glow on latest candle
      if (i === this.visibleTicks.length - 1) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(centerX - candleWidth / 2 - 1, bodyTop - 1, candleWidth + 2, bodyHeight + 2);
      }
    });

    // 5. Draw Glowing Current Price Line
    const latestTick = this.visibleTicks[this.visibleTicks.length - 1];
    if (latestTick) {
      const latestY = chartTop + chartHeight * (1 - (latestTick.close - minPrice) / priceRange);
      const isBull = latestTick.close >= latestTick.open;
      const priceColor = isBull ? options.bullishColor : options.bearishColor;

      ctx.strokeStyle = priceColor;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(chartLeft, latestY);
      ctx.lineTo(chartRight, latestY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Price Tag Pill on right
      const tagWidth = 56;
      const tagHeight = 18;
      ctx.fillStyle = priceColor;
      ctx.fillRect(chartRight + 4, latestY - tagHeight / 2, tagWidth, tagHeight);

      ctx.fillStyle = '#0a0d14';
      ctx.font = `bold 10px ${options.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`$${latestTick.close.toFixed(2)}`, chartRight + 4 + tagWidth / 2, latestY);
    }

    // 6. Draw Trade Execution Markers (BUY / SELL)
    this.markers.forEach(m => {
      const centerX = chartLeft + (m.tick + 0.5) * slotWidth;
      const isBuy = m.type === 'BUY';
      const markerColor = isBuy ? options.bullishColor : options.bearishColor;
      const priceY = chartTop + chartHeight * (1 - (m.price - minPrice) / priceRange);

      const targetY = isBuy ? priceY + 16 : priceY - 16;

      // Draw pointer triangle
      ctx.fillStyle = markerColor;
      ctx.beginPath();
      if (isBuy) {
        ctx.moveTo(centerX, priceY + 4);
        ctx.lineTo(centerX - 5, priceY + 12);
        ctx.lineTo(centerX + 5, priceY + 12);
      } else {
        ctx.moveTo(centerX, priceY - 4);
        ctx.lineTo(centerX - 5, priceY - 12);
        ctx.lineTo(centerX + 5, priceY - 12);
      }
      ctx.closePath();
      ctx.fill();

      // Text badge
      const badgeText = m.text || (isBuy ? 'BUY' : 'SELL');
      ctx.font = `bold 10px ${options.fontFamily}`;
      const textWidth = ctx.measureText(badgeText).width;
      const bWidth = textWidth + 10;
      const bHeight = 16;
      const bY = isBuy ? targetY + 2 : targetY - bHeight - 2;

      ctx.fillStyle = 'rgba(10, 14, 22, 0.85)';
      ctx.fillRect(centerX - bWidth / 2, bY, bWidth, bHeight);
      ctx.strokeStyle = markerColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(centerX - bWidth / 2, bY, bWidth, bHeight);

      ctx.fillStyle = markerColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, centerX, bY + bHeight / 2);
    });

    // 7. Draw X-Axis Ticks (Time progression)
    ctx.fillStyle = options.textColor;
    ctx.font = `10px ${options.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let i = 0; i < this.totalTicks; i++) {
      const centerX = chartLeft + (i + 0.5) * slotWidth;
      ctx.fillText(`T+${i}`, centerX, chartBottom + 8);
    }
  }

  /**
   * Cleans up listeners.
   */
  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
