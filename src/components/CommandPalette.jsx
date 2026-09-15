import React, { useState, useEffect, useRef } from 'react';

const defaultCommands = [
  { title: 'Jump to Hero / Identity', section: '#hero', shortcut: '00' },
  { title: 'Jump to Work Archive (Featured Systems)', section: '#featured-work', shortcut: '01' },
  { title: 'Jump to Freelance & Client Builds (Finova, Logistics, MealPlan)', section: '#freelance', shortcut: 'FL' },
  { title: 'Jump to Systems Matrix (How I Build)', section: '#systems', shortcut: '02' },
  { title: 'Jump to Chronology & Experience', section: '#chronology', shortcut: '03' },
  { title: 'Jump to The Person (Engineering Ethos)', section: '#about', shortcut: '04' },
  { title: 'Jump to Credentials & Research', section: '#credentials', shortcut: '05' },
  { title: 'Jump to Contact Dispatch', section: '#contact', shortcut: '06' },
  { title: 'Launch AI Assistant', action: 'openChatbot', shortcut: 'AI' },
  { title: 'Toggle Theme (Warm Ivory / Royal Dark)', action: 'toggleTheme', shortcut: 'TH' },
  { title: 'Download Official Resume PDF', action: 'downloadCv', shortcut: 'CV' },
  { title: 'Copy Direct Email (samitha0786@gmail.com)', action: 'copyEmail', shortcut: 'CP' },
  { title: 'Open LinkedIn Profile', action: 'openLinkedin', shortcut: 'LI' },
  { title: 'Open GitHub Profile', action: 'openGithub', shortcut: 'GH' }
];

export default function CommandPalette({ isOpen, onClose, onToggleTheme, onShowToast }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setQuery('');
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = defaultCommands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    cmd.shortcut.toLowerCase().includes(query.toLowerCase())
  );

  function execute(cmd) {
    onClose();
    if (cmd.section) {
      const el = document.querySelector(cmd.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.action === 'toggleTheme') {
      onToggleTheme();
    } else if (cmd.action === 'openChatbot') {
      const trigger = document.querySelector('.ai-chatbot-trigger-btn');
      if (trigger) trigger.click();
    } else if (cmd.action === 'downloadCv') {
      window.open('https://drive.google.com/file/d/1wTKMmKdFuPWwoiJqUITRqckhVwdTBYDn/view', '_blank');
    } else if (cmd.action === 'copyEmail') {
      navigator.clipboard.writeText('samitha0786@gmail.com').then(() => {
        onShowToast('Copied samitha0786@gmail.com to clipboard');
      });
    } else if (cmd.action === 'openLinkedin') {
      window.open('https://www.linkedin.com/in/salmankhan2005', '_blank');
    } else if (cmd.action === 'openGithub') {
      window.open('https://github.com/salmankhan2005', '_blank');
    }
  }

  return (
    <div className="system-modal-backdrop active" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 700 }}>&gt;</span>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Type a section or jump command (e.g. work, systems, contact, dark)..." 
            style={{ width: '100%', background: 'none', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-primary)', outline: 'none' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        <div style={{ padding: '0.75rem', maxHeight: '320px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div className="mono" style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              No matching system commands
            </div>
          ) : (
            filtered.map((cmd, idx) => (
              <div 
                key={idx}
                className="cmd-result-item" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-xs)', cursor: 'pointer', transition: 'background-color var(--transition-fast)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => execute(cmd)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
                    #{cmd.shortcut}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                    {cmd.title}
                  </span>
                </div>
                <kbd className="cmd-kbd">ENTER</kbd>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
