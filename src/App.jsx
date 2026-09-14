import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SystemsMatrix from './components/SystemsMatrix';
import WorkArchive from './components/WorkArchive';
import FreelanceShowcase from './components/FreelanceShowcase';
import Chronology from './components/Chronology';
import AboutPerson from './components/AboutPerson';
import Credentials from './components/Credentials';
import DossierCallout from './components/DossierCallout';
import ContactDispatch from './components/ContactDispatch';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import DossierModal from './components/DossierModal';
import CommandPalette from './components/CommandPalette';
import ChatBot from './components/ChatBot';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('sk_royal_theme') || 'dark');
  const [activeProject, setActiveProject] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sk_royal_theme', theme);
  }, [theme]);

  function triggerToast(msg) {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3200);
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    triggerToast(`Switched to ${next === 'dark' ? 'Royal Obsidian Dark' : 'Warm Ivory'} Theme`);
  }

  // Keyboard shortcut listener for CMD+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setActiveProject(null);
        setIsDossierOpen(false);
        setIsCmdOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-root">
      {/* Cinematic Splash Screen (No image — Interactive 3D Canvas visual) */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Global Navigation */}
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Main Content */}
      <main>
        <Hero onOpenDossier={() => setIsDossierOpen(true)} />
        <SystemsMatrix />
        <WorkArchive onOpenProject={(id) => setActiveProject(id)} />
        <FreelanceShowcase onOpenProject={(id) => setActiveProject(id)} />
        <Chronology />
        <AboutPerson />
        <Credentials />
        <DossierCallout onOpenDossier={() => setIsDossierOpen(true)} />
        <ContactDispatch onShowToast={triggerToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <ProjectModal 
        projectId={activeProject} 
        onClose={() => setActiveProject(null)} 
      />

      <DossierModal 
        isOpen={isDossierOpen} 
        onClose={() => setIsDossierOpen(false)} 
      />

      <CommandPalette 
        isOpen={isCmdOpen} 
        onClose={() => setIsCmdOpen(false)}
        onToggleTheme={toggleTheme}
        onShowToast={triggerToast}
      />

      {/* AI Assistant Chatbot (Fixed Bottom-Left) */}
      <ChatBot onShowToast={triggerToast} />

      {/* System Toast Notification */}
      <div className={`system-toast ${showToast ? 'show' : ''}`} id="system-toast">
        <span className="status-dot"></span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
