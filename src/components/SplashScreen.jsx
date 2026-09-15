import React, { useState, useEffect, useRef } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasFinishedRef = useRef(false);

  const finishSplash = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete && onComplete();
    }, 450);
  };

  useEffect(() => {
    // Fast, lightweight single rAF counter from 0 to 100 in 1800ms
    const startTime = performance.now();
    const duration = 1800;
    let animId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100 && !hasFinishedRef.current) {
        animId = requestAnimationFrame(tick);
      } else if (!hasFinishedRef.current) {
        // Hold at 100% for 180ms then trigger smooth exit
        setTimeout(() => {
          finishSplash();
        }, 180);
      }
    };

    animId = requestAnimationFrame(tick);

    // Keyboard shortcut (Escape or Space to instantly skip)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        finishSplash();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`royal-splash-root ${isExiting ? 'royal-splash-exit' : ''}`}
      onClick={finishSplash}
      role="button"
      tabIndex={0}
      aria-label="Click anywhere to skip splash screen"
    >
      {/* Ambient Grain & Radial Glow */}
      <div className="royal-splash-grain" />
      <div className="royal-splash-ambient-glow" />

      {/* Top Utility Bar */}
      <div className="royal-splash-top-bar">
        <div className="royal-splash-meta">
          <span className="royal-pulse-dot" />
          <span className="royal-meta-text">SALMAN KHAN // SYSTEM INITIALIZE</span>
        </div>
        <button
          className="royal-skip-btn"
          onClick={(e) => {
            e.stopPropagation();
            finishSplash();
          }}
          type="button"
          aria-label="Skip splash screen"
        >
          <span>SKIP</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Center Stage: Royal Monogram Aperture & Typography */}
      <div className="royal-splash-center">
        {/* Animated SVG Royal Monogram Emblem */}
        <div className="royal-emblem-wrap">
          <svg
            className="royal-emblem-svg"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="royalGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5DF88" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA820A" />
              </linearGradient>
            </defs>

            {/* Outer Octagon Frame with animated gold stroke */}
            <polygon
              points="80,8 132,28 152,80 132,132 80,152 28,132 8,80 28,28"
              className="royal-svg-outer-frame"
            />

            {/* Inner Rotating Precision Ring */}
            <circle
              cx="80"
              cy="80"
              r="58"
              className="royal-svg-ring"
            />

            {/* Diamond Guide Lines */}
            <line x1="80" y1="14" x2="80" y2="146" className="royal-svg-axis" />
            <line x1="14" y1="80" x2="146" y2="80" className="royal-svg-axis" />

            {/* Corner Precision Accents */}
            <circle cx="80" cy="20" r="2.5" className="royal-svg-dot" />
            <circle cx="80" cy="140" r="2.5" className="royal-svg-dot" />
            <circle cx="20" cy="80" r="2.5" className="royal-svg-dot" />
            <circle cx="140" cy="80" r="2.5" className="royal-svg-dot" />

            {/* Stylized Monogram S & K */}
            <g className="royal-svg-monogram-group">
              {/* S letter */}
              <path
                d="M 68 56 C 68 48, 52 48, 48 54 C 44 60, 44 68, 58 72 C 72 76, 74 86, 68 92 C 62 98, 46 96, 44 88"
                className="royal-svg-letter"
              />
              {/* K letter */}
              <path
                d="M 88 50 L 88 98 M 114 50 L 88 74 L 116 98"
                className="royal-svg-letter"
              />
            </g>
          </svg>

          {/* Golden Core Luminescence Aura */}
          <div className="royal-emblem-glow" />
        </div>

        {/* Edition Label */}
        <div className="royal-edition-tag">
          <span className="royal-tag-dash" />
          <span className="royal-tag-text">AI ENGINEER &amp; PRODUCT ARCHITECT</span>
          <span className="royal-tag-dash" />
        </div>

        {/* Main Name Header */}
        <div className="royal-name-box">
          <h1 className="royal-name-title">
            <span className="royal-name-first">SALMAN</span>
            <span className="royal-name-last">
              KHAN
              <span className="royal-gold-shimmer" />
            </span>
          </h1>
        </div>

        {/* Triple Pillar Sub-Labels */}
        <div className="royal-pillars-row">
          <div className="royal-pillar-item">
            <span className="royal-pillar-num">01</span>
            <span className="royal-pillar-text">ARTIFICIAL INTELLIGENCE</span>
          </div>
          <span className="royal-pillar-dot">◆</span>
          <div className="royal-pillar-item">
            <span className="royal-pillar-num">02</span>
            <span className="royal-pillar-text">PRODUCT BUILDER</span>
          </div>
          <span className="royal-pillar-dot">◆</span>
          <div className="royal-pillar-item">
            <span className="royal-pillar-num">03</span>
            <span className="royal-pillar-text">FULL-STACK</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Fast Velocity Tracker */}
      <div className="royal-splash-bottom-bar">
        <div className="royal-coords">
          <span>21.8744° N, 73.0960° E</span>
          <span className="royal-coords-sep">//</span>
          <span>EST. 2026</span>
        </div>

        <div className="royal-progress-wrap">
          <div className="royal-progress-header">
            <span className="royal-progress-label">SYSTEM CALIBRATION</span>
            <span className="royal-progress-pct">{progress.toString().padStart(3, '0')}%</span>
          </div>
          <div className="royal-progress-track">
            <div
              className="royal-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tap anywhere hint */}
      <div className="royal-tap-hint">
        <span>TAP ANYWHERE TO ENTER</span>
      </div>
    </div>
  );
}
