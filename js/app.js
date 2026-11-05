/**
 * THE TRADING MIND - Application & Slide Navigation Controller
 * Version: 1.0.0
 * Description: Manages slide transitions, keyboard shortcuts, progress indicators,
 *              and slide lifecycle events for The Trading Mind presentation.
 */

class SlideDeck {
  /**
   * Initializes the slide presentation deck.
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;

    // UI Elements
    this.progressBar = document.getElementById('top-progress-bar');
    this.slideCounter = document.getElementById('slide-counter');
    this.btnPrev = document.getElementById('btn-prev-slide');
    this.btnNext = document.getElementById('btn-next-slide');
    this.dotsContainer = document.getElementById('slide-dots-container');
    this.btnStart = document.getElementById('btn-start-presentation');

    // Slide event subscribers
    this.slideEnterHooks = [];
    this.slideLeaveHooks = [];

    this.init();
  }

  /**
   * Sets up event listeners, initial UI states, and handles URL routing.
   */
  init() {
    if (this.totalSlides === 0) {
      console.warn('SlideDeck: No slides found matching .slide selector.');
      return;
    }

    this.buildDots();
    this.bindEvents();
    this.setupSimulationHooks();
    
    // Check for initial URL hash (e.g. #slide-3)
    const initialIndex = this.getIndexFromHash();
    this.goToSlide(initialIndex, false);
  }

  /**
   * Connects slide changes to the trading simulator scenarios.
   */
  setupSimulationHooks() {
    this.onSlideEnter((slideIndex) => {
      if (this.isSimulationSlide(slideIndex) && window.simulator) {
        const scenarioId = this.activeScenarioId(slideIndex);
        const container = document.getElementById(`sim-scenario-${scenarioId}-container`);
        if (container) {
          // Mount scenario if entering for the first time or switching scenarios
          if (!window.simulator.activeScenario || window.simulator.activeScenario.id !== scenarioId) {
            window.simulator.mountScenario(scenarioId, container);
          }
        }
      }
    });

    this.onSlideLeave((slideIndex) => {
      if (this.isSimulationSlide(slideIndex) && window.simulator) {
        window.simulator.stopAutoPlay();
      }
    });
  }

  /**
   * Checks if a slide index corresponds to one of the 5 simulation scenarios.
   * @param {number} index
   * @returns {boolean}
   */
  isSimulationSlide(index) {
    return index >= 2 && index <= 6;
  }

  /**
   * Maps slide index to Scenario ID (1 through 5).
   * @param {number} index
   * @returns {number|null}
   */
  activeScenarioId(index) {
    if (this.isSimulationSlide(index)) {
      return index - 1; // Slide 3 (idx 2) -> 1, Slide 4 (idx 3) -> 2, etc.
    }
    return null;
  }

  /**
   * Dynamically renders indicator dots for all slides.
   */
  buildDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';

    this.slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = 'slide-dot' + (idx === this.currentIndex ? ' active' : '');
      dot.title = `Jump to Slide ${idx + 1}`;
      dot.setAttribute('data-target-slide', idx);
      dot.addEventListener('click', () => this.goToSlide(idx));
      this.dotsContainer.appendChild(dot);
    });
  }

  /**
   * Registers DOM and keyboard listeners.
   */
  bindEvents() {
    // Next / Prev button clicks
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => this.prevSlide());
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => this.nextSlide());
    }

    // "Enter The Simulator" CTA button on Slide 1
    if (this.btnStart) {
      this.btnStart.addEventListener('click', () => this.nextSlide());
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Browser back / forward button navigation
    window.addEventListener('popstate', () => {
      const index = this.getIndexFromHash();
      this.goToSlide(index, false);
    });
  }

  /**
   * Keyboard event handler for slide navigation.
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    // Ignore keystrokes if an input or textarea is currently focused
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
        e.preventDefault();
        this.nextSlide();
        break;

      case ' ': // Space bar
        e.preventDefault();
        // If on an active simulation slide, Space advances the candle instead of skipping the slide
        if (this.isSimulationSlide(this.currentIndex) && window.simulator && window.simulator.activeScenario) {
          const container = document.getElementById(`sim-scenario-${this.activeScenarioId(this.currentIndex)}-container`);
          if (container && window.simulator.currentTickIndex < window.simulator.activeScenario.ticks.length - 1) {
            window.simulator.executeHold(container);
            return;
          }
        }
        this.nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        this.prevSlide();
        break;

      case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;

      case 'End':
        e.preventDefault();
        this.goToSlide(this.totalSlides - 1);
        break;
    }
  }

  /**
   * Advances to the next slide.
   */
  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  }

  /**
   * Moves back to the previous slide.
   */
  prevSlide() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  /**
   * Navigates directly to a specified slide index.
   * @param {number} targetIndex 0-based target slide index
   * @param {boolean} updateHistory Whether to push state to browser history
   */
  goToSlide(targetIndex, updateHistory = true) {
    if (targetIndex < 0 || targetIndex >= this.totalSlides) return;
    if (targetIndex === this.currentIndex && this.slides[targetIndex].classList.contains('active')) {
      return;
    }

    const previousIndex = this.currentIndex;

    // Trigger leave hooks for current slide
    this.triggerSlideLeave(previousIndex);

    // Update active slide classes
    this.slides.forEach((slide, idx) => {
      if (idx === targetIndex) {
        slide.classList.add('active');
        // Scroll slide content to top upon entering
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    this.currentIndex = targetIndex;

    // Synchronize UI elements
    this.updateUI();

    // Trigger enter hooks for new slide
    this.triggerSlideEnter(targetIndex);

    // Update URL hash
    if (updateHistory) {
      const hash = `#slide-${targetIndex + 1}`;
      if (window.location.hash !== hash) {
        history.pushState(null, '', hash);
      }
    }
  }

  /**
   * Synchronizes counter, progress bar, dots, and button states.
   */
  updateUI() {
    // Update counter (e.g. "01 / 10")
    if (this.slideCounter) {
      const currentFormatted = String(this.currentIndex + 1).padStart(2, '0');
      const totalFormatted = String(this.totalSlides).padStart(2, '0');
      this.slideCounter.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    // Update progress bar percentage
    if (this.progressBar) {
      const progressPct = ((this.currentIndex + 1) / this.totalSlides) * 100;
      this.progressBar.style.width = `${progressPct}%`;
    }

    // Update nav button disabled states
    if (this.btnPrev) {
      this.btnPrev.disabled = this.currentIndex === 0;
    }
    if (this.btnNext) {
      this.btnNext.disabled = this.currentIndex === this.totalSlides - 1;
    }

    // Update indicator dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.slide-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }
  }

  /**
   * Parses the current URL hash to obtain a 0-based slide index.
   * @returns {number}
   */
  getIndexFromHash() {
    const hash = window.location.hash;
    const match = hash.match(/^#slide-(\d+)$/);
    if (match) {
      const slideNum = parseInt(match[1], 10);
      if (slideNum >= 1 && slideNum <= this.totalSlides) {
        return slideNum - 1;
      }
    }
    return 0;
  }

  /**
   * Registers a callback invoked whenever any slide is entered.
   * @param {Function} callback (slideIndex, slideElement) => void
   */
  onSlideEnter(callback) {
    if (typeof callback === 'function') {
      this.slideEnterHooks.push(callback);
    }
  }

  /**
   * Registers a callback invoked whenever leaving a slide.
   * @param {Function} callback (slideIndex, slideElement) => void
   */
  onSlideLeave(callback) {
    if (typeof callback === 'function') {
      this.slideLeaveHooks.push(callback);
    }
  }

  triggerSlideEnter(index) {
    const slide = this.slides[index];
    this.slideEnterHooks.forEach(cb => {
      try { cb(index, slide); } catch (err) { console.error('SlideEnter hook error:', err); }
    });
  }

  triggerSlideLeave(index) {
    const slide = this.slides[index];
    this.slideLeaveHooks.forEach(cb => {
      try { cb(index, slide); } catch (err) { console.error('SlideLeave hook error:', err); }
    });
  }
}

// Global initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.deck = new SlideDeck();
  console.log('The Trading Mind deck controller initialized. 10 slides ready.');
});
