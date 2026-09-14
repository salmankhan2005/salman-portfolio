import React from 'react';

export default function AboutPerson() {
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

          {/* Right Column: Stacked Keywords & Real Portrait Integration */}
          <div className="person-right-stack">
            <div className="person-vertical-keywords">
              AI<br />
              AGENTIC<br />
              FULLSTACK<br />
              AUTOMATION<br />
              SYSTEMS<br />
              IMPACT
            </div>

            <div className="person-portrait-card">
              <img 
                src="/assets/images/salman_profile.png" 
                alt="Salman Khan D"
                className="person-profile-img"
              />
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
    </section>
  );
}
