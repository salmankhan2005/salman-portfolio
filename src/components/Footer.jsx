import React from 'react';

export default function Footer() {
  return (
    <footer className="system-footer">
      <div className="system-container footer-row">
        
        <div className="footer-left">
          <div className="brand-glyph" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>SK</div>
          <span className="footer-copy">
            © 2026 SALMAN KHAN D. ARCHITECTED WITH REACT + VITE. ALL RIGHTS RESERVED.
          </span>
        </div>

        <ul className="footer-nav">
          <li><a href="#hero">TOP</a></li>
          <li><a href="#systems">SYSTEMS</a></li>
          <li><a href="#archive">ARCHIVE</a></li>
          <li><a href="#chronology">CHRONO</a></li>
          <li>
            <a 
              href="https://drive.google.com/file/d/1wTKMmKdFuPWwoiJqUITRqckhVwdTBYDn/view" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--gold-primary)', fontWeight: 600 }}
            >
              CV.PDF
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
}
