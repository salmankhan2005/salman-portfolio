import React from 'react';
import { Sun, Moon, Zap, Headphones, FileText, ArrowUpRight } from 'lucide-react';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onOpenCmd, 
  onOpenRecruiter, 
  onToggleAudioTour,
  isAudioTourActive 
}) {
  return (
    <nav className="editorial-nav" id="system-navigation">
      <div className="page-container nav-layout">
        
        {/* Left: Cursive Signature & Motto */}
        <a href="#hero" className="nav-brand-group">
          <span className="brand-cursive-sig">Salman Khan</span>
          <span className="brand-vertical-sep"></span>
          <span className="brand-motto-tag">
            TECHNOLOGY<br />
            PEOPLE<br />
            A BETTER TOMORROW
          </span>
        </a>

        {/* Center: Editorial Menu Links (No Duplicate Resume) */}
        <ul className="nav-menu-links">
          <li><a href="#featured-work">WORK</a></li>
          <li><a href="#freelance" style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>FREELANCE</a></li>
          <li><a href="#systems">THINK</a></li>
          <li><a href="#chronology">BUILD</a></li>
          <li><a href="#about">ABOUT</a></li>
        </ul>

        {/* Right: Aligned Action Controls */}
        <div className="nav-end-actions">
          {/* 1. ⚡ Recruiter Fast-Track Trigger */}
          <button 
            className="nav-recruiter-btn gold-shimmer-button"
            onClick={onOpenRecruiter}
            title="Recruiter Fast-Track (Press 'R' for 30s Executive Summary)"
          >
            <Zap size={11} className="gold-pulse-icon" />
            <span>RECRUITER MODE</span>
          </button>

          {/* 2. 🎧 60s Audio Tour Trigger */}
          <button 
            className={`nav-audio-tour-btn ${isAudioTourActive ? 'is-active' : ''}`}
            onClick={onToggleAudioTour}
            title="60-Second AI Voice Executive Summary (Audio Tour)"
          >
            <Headphones size={12} />
            <span>60s TOUR</span>
          </button>

          {/* 3. Official Resume PDF Button */}
          <a 
            href="/assets/Salman_Khan_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-resume-btn"
            title="Download Official Resume PDF"
          >
            <span>RESUME (PDF)</span>
          </a>

          {/* 4. Hire Salman CTA */}
          <a href="#contact" className="nav-cta-pill" title="Contact / Hire Salman">
            <span className="nav-live-dot"></span>
            <span>HIRE SALMAN</span>
          </a>

          {/* 5. Theme Toggle */}
          <button 
            className="theme-toggle-minimal" 
            onClick={onToggleTheme} 
            title={`Toggle Theme (${theme === 'dark' ? 'Warm Sandstone' : 'Obsidian Dark'})`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

      </div>
    </nav>
  );
}
