import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function AboutPerson() {
  const [isPopped, setIsPopped] = useState(false);

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPopped) {
        setIsPopped(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopped]);

  return (
    <section className="person-section" id="about">
      <div className="page-container">
        
        <div className="person-editorial-grid">
          
          {/* Left Column: Big Condensed Typography */}
          <div>
            <h2 className="person-big-title">
              THE PERSON<br />
              BEHIND THE<br />
              SYSTEMS.
            </h2>
          </div>

          {/* Center Column: Biography Paragraphs */}
          <div className="person-bio-col">
            <p className="person-p">
              I'm <strong>Salman Khan D</strong> — an AI Engineer, Product Builder, and Full-Stack Developer driven by a single core conviction: that sophisticated technology should feel effortlessly human to the people who use it.
            </p>

            <p className="person-p">
              Completing my B.Tech in <strong>Artificial Intelligence &amp; Data Science at Mahendra Engineering College (8.72 CGPA)</strong>, I have engineered and deployed over 15 full-stack and AI applications, alongside architecting 30+ autonomous multi-agent systems on n8n.
            </p>

            <p className="person-p">
              From building predictive computer vision models during my <strong>Machine Learning Internship at Yellowmatics</strong> to leading web architecture at <strong>Strikkerz Team</strong> and training 300+ students on Prompt Engineering as Core Member of <strong>AInnovat Innovators Club</strong> — I build systems designed for measurable impact.
            </p>

            <div className="person-motto-line">
              <span className="bar"></span>
              <span>STILL A LOT MORE TO BUILD.</span>
            </div>
          </div>

          {/* Right Column: Stacked Keywords & Interactive Portrait Card */}
          <div className="person-right-stack">
            <div className="person-vertical-keywords">
              AI<br />
              AGENTIC<br />
              FULLSTACK<br />
              AUTOMATION<br />
              SYSTEMS<br />
              IMPACT
            </div>

            <div 
              className="person-portrait-card"
              onClick={() => setIsPopped(true)}
              role="button"
              tabIndex={0}
              title="Click to reveal full portrait"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsPopped(true)}
            >
              <img 
                src="/assets/images/salman_profile.png" 
                alt="Salman Khan D"
                className="person-profile-img"
              />
              
              {/* Interactive Tap Hint Badge */}
              <div className="person-tap-hint">
                <Sparkles size={11} className="person-tap-sparkle" />
                <span>TAP TO REVEAL</span>
              </div>

              <div className="secondary-cursive-tag font-handwriting">
                Same Person<br />Bigger Plans.
              </div>
              <div className="person-badge-note">
                GOOD TECH.<br />
                KINDER PEOPLE.
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* === CINEMATIC BACKGROUND-FREE PORTRAIT POPUP MODAL === */}
      {isPopped && (
        <div 
          className="portrait-popup-overlay"
          onClick={() => setIsPopped(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Salman Khan Portrait View"
        >
          <div className="portrait-popup-backdrop" />
          
          <div className="portrait-popup-stage" onClick={(e) => e.stopPropagation()}>
            {/* Ambient Radial Gold Halo Glow */}
            <div className="portrait-popup-halo" />

            {/* Close Button */}
            <button 
              className="portrait-popup-close-btn"
              onClick={() => setIsPopped(false)}
              aria-label="Close portrait view"
              type="button"
            >
              <X size={18} />
            </button>

            {/* Background-Free Cutout Image Stage (Up to Chest/Face Level) */}
            <div 
              className="portrait-popup-cutout-container"
              onClick={() => setIsPopped(false)}
            >
              <img 
                src="/assets/images/salman_hero_ai_cutout.png" 
                alt="Salman Khan D"
                className="portrait-popup-cutout-img"
              />
              <div className="portrait-popup-rim-light" />
            </div>

            {/* Floating Editorial Card Info */}
            <div className="portrait-popup-card">
              <div className="portrait-popup-kicker">
                <span className="portrait-kicker-dot" />
                <span>AI ENGINEER // PRODUCT ARCHITECT</span>
              </div>
              <h3 className="portrait-popup-name">SALMAN KHAN D</h3>
              <p className="portrait-popup-quote font-handwriting">
                "Same Person. Bigger Plans."
              </p>
              <div className="portrait-popup-motto">
                <span>21.8744° N, 73.0960° E</span>
                <span className="portrait-motto-sep">|</span>
                <span>GOOD TECH. KINDER PEOPLE.</span>
              </div>
              <div className="portrait-popup-close-hint">
                <span>TAP ANYWHERE TO DISMISS</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
