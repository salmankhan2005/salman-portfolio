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
    audioSrc: '/assets/audio/tour_chapter_1.mp3',
    fallbackText: "Welcome to my portfolio. I am Salman Khan, an AI Engineer and Product Builder completing my B.Tech in Artificial Intelligence and Data Science with an 8.72 CGPA."
  },
  {
    id: 'systems',
    targetId: 'systems',
    title: 'Autonomous Multi-Agents & Architecture',
    audioSrc: '/assets/audio/tour_chapter_2.mp3',
    fallbackText: "I have architected over 30 autonomous multi-agent pipelines on n8n, orchestrating specialized GPT-4o sub-agents for real-time compliance and predictive intelligence."
  },
  {
    id: 'work',
    targetId: 'featured-work',
    title: 'Production Apps & Enterprise Impact',
    audioSrc: '/assets/audio/tour_chapter_3.mp3',
    fallbackText: "With 15 deployed full-stack applications across fintech, logistics, and AI career tools, I engineer systems designed for sub-second latency and measurable business impact."
  },
  {
    id: 'contact',
    targetId: 'contact',
    title: 'Ready for Industry Opportunities',
    audioSrc: '/assets/audio/tour_chapter_4.mp3',
    fallbackText: "I am actively seeking industry opportunities to contribute applied AI and full-stack engineering to high-performing teams. Let's connect and build what's next."
  }
];

export default function AudioTour({ isActive, onClose, onShowToast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);

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

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    clearHighlights();
  };

  const playChapter = (index, rate = playbackRate) => {
    stopAllAudio();

    if (index >= tourChapters.length) {
      clearHighlights();
      if (onShowToast) onShowToast('Audio Tour Completed!');
      return;
    }

    const chapter = tourChapters[index];
    setCurrentChapterIndex(index);
    highlightSection(chapter.targetId);

    // 1. Try High-Definition Studio Neural MP3 first
    const audio = new Audio(chapter.audioSrc);
    audio.playbackRate = rate;
    audioRef.current = audio;

    audio.onended = () => {
      if (index + 1 < tourChapters.length) {
        playChapter(index + 1, rate);
      } else {
        stopAllAudio();
        if (onShowToast) onShowToast('Audio Tour Completed!');
      }
    };

    audio.onerror = () => {
      // 2. Fallback to Web Speech Synthesis if audio file fails to load
      if (synthRef.current) {
        const utterance = new SpeechSynthesisUtterance(chapter.fallbackText);
        utterance.rate = rate;
        utterance.onend = () => {
          if (index + 1 < tourChapters.length) {
            playChapter(index + 1, rate);
          } else {
            stopAllAudio();
          }
        };
        synthRef.current.speak(utterance);
        setIsPlaying(true);
      }
    };

    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('HD Audio play caught:', err);
        // Fallback to speech synthesis
        if (synthRef.current) {
          const utterance = new SpeechSynthesisUtterance(chapter.fallbackText);
          utterance.rate = rate;
          utterance.onend = () => {
            if (index + 1 < tourChapters.length) {
              playChapter(index + 1, rate);
            } else {
              stopAllAudio();
            }
          };
          synthRef.current.speak(utterance);
          setIsPlaying(true);
        }
      });
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      setIsPlaying(false);
      clearHighlights();
    } else {
      if (audioRef.current && audioRef.current.paused && audioRef.current.currentTime > 0) {
        audioRef.current.play().then(() => setIsPlaying(true));
        highlightSection(tourChapters[currentChapterIndex].targetId);
      } else {
        playChapter(currentChapterIndex, playbackRate);
      }
    }
  };

  const restartTour = () => {
    setCurrentChapterIndex(0);
    playChapter(0, playbackRate);
  };

  const cycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  useEffect(() => {
    if (isActive) {
      playChapter(0, 1);
    } else {
      stopAllAudio();
    }
    return () => {
      stopAllAudio();
    };
  }, [isActive]);

  if (!isActive) return null;

  const currentChapter = tourChapters[currentChapterIndex] || tourChapters[0];

  return (
    <div className="audio-tour-floating-bar gold-shimmer-card">
      <div className="tour-info-left">
        <div className="tour-badge-pill">
          <Headphones size={13} className="gold-pulse-icon" />
          <span className="tour-live-lbl">60s HD STUDIO AUDIO TOUR</span>
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
            stopAllAudio();
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
