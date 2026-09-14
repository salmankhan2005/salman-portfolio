import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, onOpenCmd }) {
  return (
    <nav className="editorial-nav" id="system-navigation">
      <div className="page-container nav-layout">
        
        {/* Cursive Signature & Motto */}
        <a href="#hero" className="nav-brand-group">
          <span className="brand-cursive-sig">Salman Khan</span>
          <span className="brand-vertical-sep"></span>
          <span className="brand-motto-tag">
            TECHNOLOGY<br />
            PEOPLE<br />
            A BETTER TOMORROW
          </span>
        </a>

        {/* Editorial Menu */}
        <ul className="nav-menu-links">
          <li><a href="#featured-work">WORK</a></li>
          <li><a href="#freelance" style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>FREELANCE</a></li>
          <li><a href="#systems">THINK</a></li>
          <li><a href="#chronology">BUILD</a></li>
          <li><a href="#about">ABOUT</a></li>
          <li><a href="/assets/Salman_Khan_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>RESUME (PDF)</a></li>
        </ul>

        {/* End Actions */}
        <div className="nav-end-actions">
          <a 
            href="/assets/Salman_Khan_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-resume-btn"
          >
            <span>RESUME (PDF)</span>
          </a>

          <a href="#contact" className="nav-cta-pill">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--ink-primary)', display: 'inline-block' }}></span>
            <span>HIRE SALMAN</span>
          </a>

          <button 
            className="theme-toggle-minimal" 
            onClick={onToggleTheme} 
            title={`Toggle Theme (${theme === 'dark' ? 'Warm Sandstone' : 'Obsidian Dark'})`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

      </div>
    </nav>
  );
}
