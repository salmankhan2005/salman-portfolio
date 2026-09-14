import React from 'react';
import { Download, Eye } from 'lucide-react';

export default function DossierCallout({ onOpenDossier }) {
  return (
    <section className="system-section" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
      <div className="system-container">
        
        <div className="dossier-callout-panel">
          <div className="dossier-text-group">
            <div className="system-index-tag" style={{ marginBottom: '0.5rem' }}>OFFICIAL TECHNICAL RESUME &bull; IMMEDIATE ONBOARDING</div>
            <h3 className="dossier-headline">Actively seeking full-time AI Engineering opportunities in the industry.</h3>
            <p className="dossier-sub">
              Eager to bring applied ML lifecycle engineering, autonomous agent orchestration (n8n, GPT-4o), and production-grade full-stack delivery to forward-thinking engineering teams.
            </p>
          </div>

          <div className="dossier-btn-group">
            <a 
              href="/assets/Salman_Khan_Resume.pdf" 
              download="Salman_Khan_Resume.pdf" 
              className="btn-system-primary"
            >
              <span>DOWNLOAD OFFICIAL CV (PDF)</span>
              <Download size={14} />
            </a>
            <button className="btn-system-secondary" onClick={onOpenDossier}>
              <span>VIEW IN-BROWSER</span>
              <Eye size={14} color="#D4AF37" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
