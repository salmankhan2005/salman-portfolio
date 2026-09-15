import React, { useState, useEffect, useRef } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [chronoCount, setChronoCount] = useState(0);
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
    // 2.2-Second High-Precision Chrono Counter (0% to 100% / Time Leap Calibration)
    const startTime = performance.now();
    const duration = 2000;
    let animId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setChronoCount(pct);

      if (pct < 100 && !hasFinishedRef.current) {
        animId = requestAnimationFrame(tick);
      } else if (!hasFinishedRef.current) {
        setTimeout(() => {
          finishSplash();
        }, 250);
      }
    };

    animId = requestAnimationFrame(tick);

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

  // Generate 60 chronometer dial tick marks around the 360-degree bezel
  const dialTicks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6) * (Math.PI / 180);
    const isMajor = i % 5 === 0;
    const r1 = isMajor ? 62 : 66;
    const r2 = 70;
    const x1 = 80 + r1 * Math.sin(angle);
    const y1 = 80 - r1 * Math.cos(angle);
    const x2 = 80 + r2 * Math.sin(angle);
    const y2 = 80 - r2 * Math.cos(angle);
    return { id: i, x1, y1, x2, y2, isMajor };
  });

  return (
    <div
      className={`chrono24-splash-root ${isExiting ? 'chrono24-exit' : ''}`}
      onClick={finishSplash}
      role="button"
      tabIndex={0}
      aria-label="Click anywhere to enter portfolio"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="chrono24-grain" />
      <div className="chrono24-radial-vignette" />
      <div className="chrono24-ambient-glow" />

      {/* Top Chronometer HUD Bar */}
      <div className="chrono24-top-bar">
        <div className="chrono24-telemetry">
          <span className="chrono24-pulse-gem" />
          <span className="chrono24-hud-label">CHRONO-24 // SYSTEM GENESIS</span>
        </div>
        <button
          className="chrono24-skip-btn"
          onClick={(e) => {
            e.stopPropagation();
            finishSplash();
          }}
          type="button"
          aria-label="Skip splash screen"
        >
          <span>ENTER</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Center Stage: The Legendary '24' Time Watch Mechanism */}
      <div className="chrono24-center">
        {/* Intricate 24 Horology Watch Apparatus */}
        <div className="chrono24-watch-wrapper">
          <svg
            className="chrono24-watch-svg"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Rich 24 Movie Metallic Gold Gradients */}
              <linearGradient id="goldBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2A3" />
                <stop offset="30%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#967414" />
                <stop offset="100%" stopColor="#F5DF88" />
              </linearGradient>

              <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(245, 223, 136, 0.9)" />
                <stop offset="50%" stopColor="rgba(212, 175, 55, 0.4)" />
                <stop offset="100%" stopColor="rgba(245, 223, 136, 0.9)" />
              </linearGradient>

              <radialGradient id="coreGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 240, 160, 0.9)" />
                <stop offset="40%" stopColor="rgba(212, 175, 55, 0.35)" />
                <stop offset="100%" stopColor="rgba(5, 4, 3, 0)" />
              </radialGradient>
            </defs>

            {/* Core Golden Aura */}
            <circle cx="80" cy="80" r="50" fill="url(#coreGlowGrad)" />

            {/* Outer Watch Bezel with Milled Screws */}
            <circle
              cx="80"
              cy="80"
              r="74"
              stroke="url(#goldBezelGrad)"
              strokeWidth="2.5"
              className="chrono24-bezel"
            />
            <circle
              cx="80"
              cy="80"
              r="71"
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="0.8"
            />

            {/* 60 Chrono Dial Tick Marks */}
            <g className="chrono24-ticks-group">
              {dialTicks.map((t) => (
                <line
                  key={t.id}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={t.isMajor ? '#FFF2A3' : 'rgba(212, 175, 55, 0.45)'}
                  strokeWidth={t.isMajor ? 1.6 : 0.8}
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Roman Cardinal Markers XII, III, VI, IX */}
            <text x="80" y="27" className="chrono24-roman-numeral" textAnchor="middle">XII</text>
            <text x="135" y="83" className="chrono24-roman-numeral" textAnchor="middle">III</text>
            <text x="80" y="139" className="chrono24-roman-numeral" textAnchor="middle">VI</text>
            <text x="25" y="83" className="chrono24-roman-numeral" textAnchor="middle">IX</text>

            {/* Outer Horology Cog Gear Ring (Clockwise Rotation) */}
            <g className="chrono24-outer-gear">
              <circle
                cx="80"
                cy="80"
                r="52"
                stroke="url(#gearGrad)"
                strokeWidth="1.2"
                strokeDasharray="6 6"
              />
              {/* 12 Gear Teeth */}
              {Array.from({ length: 12 }, (_, i) => {
                const ang = (i * 30) * (Math.PI / 180);
                const gx1 = 80 + 49 * Math.sin(ang);
                const gy1 = 80 - 49 * Math.cos(ang);
                const gx2 = 80 + 55 * Math.sin(ang);
                const gy2 = 80 - 55 * Math.cos(ang);
                return (
                  <line
                    key={i}
                    x1={gx1}
                    y1={gy1}
                    x2={gx2}
                    y2={gy2}
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                  />
                );
              })}
            </g>

            {/* Inner Precision Escapement Wheel (Counter-Clockwise Rotation) */}
            <g className="chrono24-inner-gear">
              <circle
                cx="80"
                cy="80"
                r="36"
                stroke="rgba(245, 223, 136, 0.6)"
                strokeWidth="1"
                strokeDasharray="14 4 4 4"
              />
              {/* Balance Wheel Spokes */}
              <line x1="80" y1="44" x2="80" y2="116" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="0.8" />
              <line x1="44" y1="80" x2="116" y2="80" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="0.8" />
            </g>

            {/* Stylized '24' Watch Hands (Time Acceleration Sweep) */}
            {/* Hour Hand */}
            <g className="chrono24-hour-hand">
              <path
                d="M 80 80 L 78 50 L 80 44 L 82 50 Z"
                fill="#FFF2A3"
                stroke="#D4AF37"
                strokeWidth="0.8"
              />
            </g>

            {/* Sweeping Minute & Second Needles */}
            <g className="chrono24-minute-hand">
              <path
                d="M 80 80 L 78.8 32 L 80 24 L 81.2 32 Z"
                fill="#FFFFFF"
                stroke="#D4AF37"
                strokeWidth="0.8"
              />
            </g>

            <g className="chrono24-second-needle">
              <line x1="80" y1="94" x2="80" y2="18" stroke="#FFE785" strokeWidth="1" strokeLinecap="round" />
              <circle cx="80" cy="80" r="4.5" fill="#D4AF37" stroke="#FFF" strokeWidth="0.8" />
              <circle cx="80" cy="80" r="2" fill="#050403" />
            </g>
          </svg>

          {/* Sweeping 24 Specular Light Glint Beam Across Watch Face */}
          <div className="chrono24-watch-glint" />

          {/* Diamond Lens Flare Sparkles (24 Movie Signature Glow) */}
          <div className="chrono24-sparkle chrono24-sparkle-top" />
          <div className="chrono24-sparkle chrono24-sparkle-right" />
        </div>

        {/* Edition Subhead */}
        <div className="chrono24-edition-badge">
          <span className="chrono24-badge-wing-l" />
          <span className="chrono24-badge-text">TIMELESS INTELLIGENCE // 2026</span>
          <span className="chrono24-badge-wing-r" />
        </div>

        {/* Main 24 Movie Metallic Gold Title */}
        <div className="chrono24-title-container">
          <h1 className="chrono24-title-primary">
            <span className="chrono24-name-first">SALMAN</span>
            <span className="chrono24-name-last">
              KHAN
              <span className="chrono24-gold-beam-sweep" />
              <div className="chrono24-title-flare" />
            </span>
          </h1>
        </div>

        {/* Triple Discipline Horology Pillars */}
        <div className="chrono24-pillars-grid">
          <div className="chrono24-pillar">
            <span className="chrono24-pnum">01</span>
            <span className="chrono24-ptxt">ARTIFICIAL INTELLIGENCE</span>
          </div>
          <span className="chrono24-psep">✦</span>
          <div className="chrono24-pillar">
            <span className="chrono24-pnum">02</span>
            <span className="chrono24-ptxt">PRODUCT ARCHITECT</span>
          </div>
          <span className="chrono24-psep">✦</span>
          <div className="chrono24-pillar">
            <span className="chrono24-pnum">03</span>
            <span className="chrono24-ptxt">FULL-STACK SYSTEMS</span>
          </div>
        </div>
      </div>

      {/* Bottom Chronometer Velocity Track */}
      <div className="chrono24-bottom-hud">
        <div className="chrono24-coords-box">
          <span className="chrono24-chrono-timer">
            CHRONO: {Math.floor(chronoCount * 0.24).toString().padStart(2, '0')}:{(chronoCount % 60).toString().padStart(2, '0')}:{(chronoCount * 37 % 100).toString().padStart(2, '0')}
          </span>
          <span className="chrono24-coords-divider">//</span>
          <span className="chrono24-coords-geo">21.8744° N, 73.0960° E</span>
        </div>

        <div className="chrono24-progress-box">
          <div className="chrono24-progress-labels">
            <span className="chrono24-progress-title">CHRONOMETER CALIBRATION</span>
            <span className="chrono24-progress-digits">{chronoCount.toString().padStart(3, '0')}%</span>
          </div>
          <div className="chrono24-progress-rail">
            <div
              className="chrono24-progress-laser"
              style={{ width: `${chronoCount}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tap hint */}
      <div className="chrono24-tap-notice">
        <span>TAP ANYWHERE TO ENTER</span>
      </div>
    </div>
  );
}
