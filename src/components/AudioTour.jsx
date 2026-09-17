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
  FastForward,
  Rewind,
  ChevronUp,
  ChevronDown,
  User,
  Radio
} from 'lucide-react';

const voicePersonas = [
  {
    id: 'christopher',
    name: 'Christopher',
    label: 'Studio Executive Male',
    accent: 'US Deep Neural'
  },
  {
    id: 'ava',
    name: 'Ava',
    label: 'Studio Broadcaster Female',
    accent: 'US Multilingual Neural'
  },
  {
    id: 'andrew',
    name: 'Andrew',
    label: 'Conversational Tech Lead',
    accent: 'US Studio Neural'
  }
];

const tourChapters = [
  {
    id: 1,
    targetId: 'hero',
    title: 'Introduction & Mission',
    subhead: 'B.Tech AI & Data Science (8.72 CGPA)',
    duration: 12,
    text: "Welcome to my portfolio. I am Salman Khan, an AI Engineer and Product Builder completing my B.Tech in Artificial Intelligence and Data Science with an 8.72 CGPA."
  },
  {
    id: 2,
    targetId: 'systems',
    title: 'Autonomous Multi-Agents & Architecture',
    subhead: '30+ n8n Agent Pipelines & GPT-4o Swarms',
    duration: 14,
    text: "I have architected over 30 autonomous multi-agent pipelines on n8n, orchestrating specialized GPT-4o sub-agents for real-time compliance and predictive intelligence."
  },
  {
    id: 3,
    targetId: 'featured-work',
    title: 'Production Apps & Enterprise Impact',
    subhead: '15+ Deployed Full-Stack Applications',
    duration: 13,
    text: "With 15 deployed full-stack applications across fintech, logistics, and AI career tools, I engineer systems designed for sub-second latency and measurable business impact."
  },
  {
    id: 4,
    targetId: 'contact',
    title: 'Ready for Industry Opportunities',
    subhead: 'Ready to Join Engineering Teams',
    duration: 12,
    text: "I am actively seeking industry opportunities to contribute applied AI and full-stack engineering to high-performing teams. Let's connect and build what's next."
  }
];

export default function AudioTour({ isActive, onClose, onShowToast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState('christopher');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(12);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);

  const audioRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);

  // Clean up spotlighted elements
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

  const formatTime = (secs) => {
    const s = Math.floor(secs || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const playChapter = (index, rate = playbackRate, voice = selectedVoice) => {
    stopAllAudio();

    if (index < 0 || index >= tourChapters.length) {
      clearHighlights();
      if (onShowToast) onShowToast('Audio Tour Completed!');
      return;
    }

    const chapter = tourChapters[index];
    setCurrentChapterIndex(index);
    setCurrentTime(0);
    setDuration(chapter.duration);
    highlightSection(chapter.targetId);

    // Audio file path based on voice
    const audioPath = `/assets/audio/tour_chapter_${chapter.id}_${voice}.mp3`;
    const fallbackPath = `/assets/audio/tour_chapter_${chapter.id}.mp3`;

    const audio = new Audio(audioPath);
    audio.playbackRate = rate;
    audio.muted = isMuted;
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
          setDuration(audioRef.current.duration);
        }
      }
    };

    audio.onended = () => {
      if (index + 1 < tourChapters.length) {
        playChapter(index + 1, rate, voice);
      } else {
        stopAllAudio();
        if (onShowToast) onShowToast('60-Second Audio Tour Finished!');
      }
    };

    audio.onerror = () => {
      console.warn(`Primary audio ${audioPath} error, attempting fallback ${fallbackPath}`);
      const fallbackAudio = new Audio(fallbackPath);
      fallbackAudio.playbackRate = rate;
      fallbackAudio.muted = isMuted;
      audioRef.current = fallbackAudio;

      fallbackAudio.ontimeupdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      fallbackAudio.onended = () => {
        if (index + 1 < tourChapters.length) {
          playChapter(index + 1, rate, voice);
        } else {
          stopAllAudio();
        }
      };

      fallbackAudio.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback to browser synthesis if needed
        if (synthRef.current) {
          const utterance = new SpeechSynthesisUtterance(chapter.text);
          utterance.rate = rate;
          utterance.onend = () => {
            if (index + 1 < tourChapters.length) {
              playChapter(index + 1, rate, voice);
            } else {
              stopAllAudio();
            }
          };
          synthRef.current.speak(utterance);
          setIsPlaying(true);
        }
      });
    };

    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('Audio play caught:', err);
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
        playChapter(currentChapterIndex, playbackRate, selectedVoice);
      }
    }
  };

  const skipNext = () => {
    if (currentChapterIndex + 1 < tourChapters.length) {
      playChapter(currentChapterIndex + 1, playbackRate, selectedVoice);
    }
  };

  const skipPrev = () => {
    if (currentChapterIndex > 0) {
      playChapter(currentChapterIndex - 1, playbackRate, selectedVoice);
    } else {
      playChapter(0, playbackRate, selectedVoice);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  const handleVoiceChange = (voiceId) => {
    setSelectedVoice(voiceId);
    setShowVoiceMenu(false);
    if (onShowToast) {
      const v = voicePersonas.find(x => x.id === voiceId);
      onShowToast(`TTS Voice: ${v ? v.name : voiceId}`);
    }
    if (isPlaying) {
      playChapter(currentChapterIndex, playbackRate, voiceId);
    }
  };

  const cycleSpeed = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  useEffect(() => {
    if (isActive) {
      playChapter(0, playbackRate, selectedVoice);
    } else {
      stopAllAudio();
    }
    return () => {
      stopAllAudio();
    };
  }, [isActive]);

  if (!isActive) return null;

  const currentChapter = tourChapters[currentChapterIndex] || tourChapters[0];
  const activeVoiceObj = voicePersonas.find(v => v.id === selectedVoice) || voicePersonas[0];

  return (
    <div className={`audio-tour-floating-bar gold-shimmer-card ${isExpanded ? 'is-expanded' : ''}`}>
      
      {/* Top Header Row */}
      <div className="tour-main-row">
        
        {/* Left: Indicator & Chapter Info */}
        <div className="tour-info-left">
          <div className="tour-badge-pill">
            <Radio size={12} className="gold-pulse-icon" />
            <span className="tour-live-lbl">60s ADVANCED NEURAL TTS TOUR</span>
          </div>

          <div className="tour-text-preview">
            <span className="tour-chapter-num">0{currentChapterIndex + 1}/04</span>
            <span className="tour-chapter-name">{currentChapter.title}</span>
          </div>
        </div>

        {/* Center: Live 16-Bar Audio Spectrum Visualizer */}
        <div className={`tour-spectrum-equalizer ${isPlaying ? 'is-active' : ''}`}>
          {[...Array(16)].map((_, i) => (
            <span 
              key={i} 
              className="spectrum-bar" 
              style={{ animationDelay: `${(i * 0.08) % 0.8}s` }}
            ></span>
          ))}
        </div>

        {/* Right Controls */}
        <div className="tour-controls-group">
          
          {/* Previous Chapter */}
          <button 
            className="tour-btn-icon" 
            onClick={skipPrev} 
            disabled={currentChapterIndex === 0}
            title="Previous Chapter"
          >
            <Rewind size={13} />
          </button>

          {/* Main Play/Pause Button */}
          <button 
            className="tour-btn-main gold-shimmer-button" 
            onClick={togglePlay}
            title={isPlaying ? "Pause Narration" : "Play Narration"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          {/* Next Chapter */}
          <button 
            className="tour-btn-icon" 
            onClick={skipNext} 
            disabled={currentChapterIndex === tourChapters.length - 1}
            title="Next Chapter"
          >
            <FastForward size={13} />
          </button>

          {/* Speed Multiplier */}
          <button 
            className="tour-btn-speed" 
            onClick={cycleSpeed}
            title="Narration Playback Rate"
          >
            <span>{playbackRate}x</span>
          </button>

          {/* Voice Switcher Dropdown Toggle */}
          <div className="tour-voice-dropdown-wrapper">
            <button 
              className="tour-btn-voice" 
              onClick={() => setShowVoiceMenu(prev => !prev)}
              title="Select Neural TTS Voice Model"
            >
              <User size={12} />
              <span>{activeVoiceObj.name}</span>
            </button>

            {showVoiceMenu && (
              <div className="tour-voice-menu">
                <div className="voice-menu-header">SELECT NEURAL TTS MODEL</div>
                {voicePersonas.map(vp => (
                  <button 
                    key={vp.id}
                    className={`voice-menu-item ${selectedVoice === vp.id ? 'selected' : ''}`}
                    onClick={() => handleVoiceChange(vp.id)}
                  >
                    <div className="voice-name-row">
                      <span className="v-name">{vp.name}</span>
                      <span className="v-accent">{vp.accent}</span>
                    </div>
                    <span className="v-desc">{vp.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume / Mute */}
          <button 
            className="tour-btn-icon" 
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          {/* Expand Transcript Drawer */}
          <button 
            className="tour-btn-icon" 
            onClick={() => setIsExpanded(prev => !prev)}
            title={isExpanded ? "Collapse Live Transcript" : "Expand Live Transcript & Chapters"}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          {/* Close Tour */}
          <button 
            className="tour-btn-close" 
            onClick={() => {
              stopAllAudio();
              onClose();
            }}
            title="Exit Audio Tour"
          >
            <X size={14} />
          </button>
        </div>

      </div>

      {/* Scrubber Timeline Bar */}
      <div className="tour-timeline-row">
        <span className="timeline-time">{formatTime(currentTime)}</span>
        <input 
          type="range" 
          min="0" 
          max={duration || 12} 
          step="0.1" 
          value={currentTime} 
          onChange={handleSeek}
          className="tour-seek-slider"
          aria-label="Audio Tour Scrub Bar"
        />
        <span className="timeline-time">{formatTime(duration)}</span>
      </div>

      {/* Expandable Live Transcript HUD & Chapter Nav */}
      {isExpanded && (
        <div className="tour-expanded-drawer">
          <div className="tour-transcript-box">
            <div className="transcript-tag">LIVE SYNCHRONIZED TRANSCRIPT</div>
            <p className="transcript-live-text">
              <Sparkles size={13} className="gold-pulse-icon inline-sparkle" />
              "{currentChapter.text}"
            </p>
          </div>

          <div className="tour-chapters-nav-grid">
            {tourChapters.map((ch, idx) => (
              <button 
                key={ch.id}
                className={`chapter-pill-item ${currentChapterIndex === idx ? 'is-active' : ''}`}
                onClick={() => playChapter(idx, playbackRate, selectedVoice)}
              >
                <span className="ch-num">0{idx + 1}</span>
                <span className="ch-title">{ch.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
