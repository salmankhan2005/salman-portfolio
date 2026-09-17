import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Headphones,
  FastForward
} from 'lucide-react';

const tourChapters = [
  {
    id: 'intro',
    targetId: 'hero',
    title: 'Introduction & Mission',
    text: "Welcome. I am Salman Khan, an AI Engineer and Product Builder completing my B.Tech in Artificial Intelligence and Data Science with an 8.72 CGPA.",
    duration: 9
  },
  {
    id: 'systems',
    targetId: 'systems',
    title: 'Autonomous Multi-Agents & Architecture',
    text: "I have architected over 30 autonomous multi-agent pipelines on n8n, orchestrating specialized GPT-4o sub-agents for real-time compliance and intelligence.",
    duration: 11
  },
  {
    id: 'work',
    targetId: 'featured-work',
    title: 'Production Apps & Enterprise Impact',
    text: "With 15 deployed full-stack applications across fintech, logistics, and AI career tools, I turn complex technical challenges into effortless human experiences.",
    duration: 12
  },
  {
    id: 'contact',
    targetId: 'contact',
    title: 'Ready for Industry Opportunities',
    text: "I am actively seeking industry roles to build applied AI systems with high-performing engineering teams. Let's connect and build what's next.",
    duration: 9
  }
];

export default function AudioTour({ isActive, onClose, onShowToast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const synthRef = useRef(window.speechSynthesis || null);
  const utteranceRef = useRef(null);
  const timerRef = useRef(null);

  // Clean up any highlighted elements
  const clearHighlights = () => {
    document.querySelectorAll('.section-spotlight-active').forEach(el => {
      el.classList.remove('section-spotlight-active');
    });
  };

  // Highlight active section & smooth scroll
  const highlightSection = (targetId) => {
    clearHighlights();
    const el = document.getElementById(targetId);
    if (el) {
      el.classList.add('section-spotlight-active');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const speakChapter = (index, rate = playbackRate) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    clearHighlights();

    if (index >= tourChapters.length) {
      setIsPlaying(false);
      setProgress(100);
      if (onShowToast) onShowToast('Audio Tour Completed!');
      return;
    }

    const chapter = tourChapters[index];
    setCurrentChapterIndex(index);
    highlightSection(chapter.targetId);

    const utterance = new SpeechSynthesisUtterance(chapter.text);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => (v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')))) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      if (index + 1 < tourChapters.length) {
        speakChapter(index + 1, rate);
      } else {
        setIsPlaying(false);
        setProgress(100);
        clearHighlights();
        if (onShowToast) onShowToast('Audio Tour Completed!');
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!synthRef.current) {
      if (onShowToast) onShowToast('Speech synthesis not supported in this browser.');
      return;
    }

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      clearHighlights();
    } else {
      const idx = progress >= 100 ? 0 : currentChapterIndex;
      speakChapter(idx, playbackRate);
    }
  };

  const restartTour = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setCurrentChapterIndex(0);
    setProgress(0);
    speakChapter(0, playbackRate);
  };

  const cycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (isPlaying) {
      speakChapter(currentChapterIndex, nextRate);
    }
  };

  useEffect(() => {
    if (isActive) {
      speakChapter(0, 1);
    } else {
      if (synthRef.current) synthRef.current.cancel();
      setIsPlaying(false);
      clearHighlights();
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
      clearHighlights();
    };
  }, [isActive]);

  if (!isActive) return null;

  const currentChapter = tourChapters[currentChapterIndex] || tourChapters[0];

  return (
    <div className="audio-tour-floating-bar gold-shimmer-card">
      <div className="tour-info-left">
        <div className="tour-badge-pill">
          <Headphones size={13} className="gold-pulse-icon" />
          <span className="tour-live-lbl">60s EXECUTIVE AUDIO TOUR</span>
        </div>
        
        <div className="tour-text-preview">
          <span className="tour-chapter-num">0{currentChapterIndex + 1}/04</span>
          <span className="tour-chapter-name">{currentChapter.title}</span>
        </div>
      </div>

      {/* Audio Waveform Animation */}
      <div className={`tour-waveform-bars ${isPlaying ? 'is-playing' : ''}`}>
        <span className="bar b1"></span>
        <span className="bar b2"></span>
        <span className="bar b3"></span>
        <span className="bar b4"></span>
        <span className="bar b5"></span>
      </div>

      {/* Controls */}
      <div className="tour-controls-group">
        <button 
          className="tour-btn-main" 
          onClick={togglePlay}
          title={isPlaying ? "Pause Tour" : "Play Tour"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        <button 
          className="tour-btn-icon" 
          onClick={restartTour}
          title="Restart Tour from Beginning"
        >
          <RotateCcw size={13} />
        </button>

        <button 
          className="tour-btn-speed" 
          onClick={cycleSpeed}
          title="Change Narration Speed"
        >
          <span>{playbackRate}x</span>
        </button>

        <button 
          className="tour-btn-close" 
          onClick={() => {
            if (synthRef.current) synthRef.current.cancel();
            clearHighlights();
            onClose();
          }}
          title="Close Audio Tour"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
