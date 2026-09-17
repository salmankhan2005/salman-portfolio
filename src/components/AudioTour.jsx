import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Headphones,
  FastForward,
  Rewind,
  MessageSquareText,
  User,
  Radio,
  Mic,
  CheckCircle2,
  Bot
} from 'lucide-react';

const realVoice = {
  id: 'salman_real',
  name: 'Salman (Real Voice)',
  label: "Salman's Authentic Recorded Voice",
  badge: 'AUTHENTIC • DEFAULT',
  accent: 'Original Audio (Verified)',
  isReal: true
};

const optionalTTSVoices = [
  {
    id: 'salman',
    name: 'Salman AI Clone',
    label: 'AI Re-synthesized Indian-English',
    badge: 'OPTIONAL AI TTS',
    accent: 'Neural Voice Clone'
  },
  {
    id: 'christopher',
    name: 'Christopher',
    label: 'Studio Executive Male',
    badge: 'OPTIONAL AI TTS',
    accent: 'US Deep Neural'
  },
  {
    id: 'ava',
    name: 'Ava',
    label: 'Studio Broadcaster Female',
    badge: 'OPTIONAL AI TTS',
    accent: 'US Multilingual Neural'
  },
  {
    id: 'andrew',
    name: 'Andrew',
    label: 'Conversational Tech Lead',
    badge: 'OPTIONAL AI TTS',
    accent: 'US Studio Neural'
  },
  {
    id: 'realtime_browser',
    name: 'Browser Web TTS',
    label: 'Live Device Speech Engine',
    badge: 'OPTIONAL AI TTS',
    accent: 'Real-Time Browser Synthesis'
  }
];

const allVoices = [realVoice, ...optionalTTSVoices];

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
    title: 'Autonomous Multi-Agents',
    subhead: '30+ n8n Agent Pipelines & GPT-4o Swarms',
    duration: 14,
    text: "I have architected over 30 autonomous multi-agent pipelines on n8n, orchestrating specialized GPT-4o sub-agents for real-time compliance and predictive intelligence."
  },
  {
    id: 3,
    targetId: 'featured-work',
    title: 'Production Apps & Impact',
    subhead: '15+ Deployed Full-Stack Applications',
    duration: 13,
    text: "With 15 deployed full-stack applications across fintech, logistics, and AI career tools, I engineer systems designed for sub-second latency and measurable business impact."
  },
  {
    id: 4,
    targetId: 'contact',
    title: 'Industry Opportunities',
    subhead: 'Ready to Join Engineering Teams',
    duration: 12,
    text: "I am actively seeking industry opportunities to contribute applied AI and full-stack engineering to high-performing teams. Let's connect and build what's next."
  }
];

export default function AudioTour({ isActive, onClose, onShowToast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState('salman_real');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
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

  const playChapter = (index, rate = playbackRate, voice = selectedVoice) => {
    stopAllAudio();

    if (index < 0 || index >= tourChapters.length) {
      clearHighlights();
      if (onShowToast) onShowToast('Audio Tour Completed!');
      return;
    }

    const chapter = tourChapters[index];
    setCurrentChapterIndex(index);
    highlightSection(chapter.targetId);

    // Option A: Real-Time Web Speech API in Browser
    if (voice === 'realtime_browser' && synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(chapter.text);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      
      const availVoices = synthRef.current.getVoices();
      const preferredVoice = availVoices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('en-US')) || availVoices[0];
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onend = () => {
        if (index + 1 < tourChapters.length) {
          playChapter(index + 1, rate, voice);
        } else {
          stopAllAudio();
          if (onShowToast) onShowToast('Audio Tour Completed!');
        }
      };

      utterance.onerror = (e) => {
        console.warn('Browser speech error:', e);
        stopAllAudio();
      };

      synthRef.current.speak(utterance);
      setIsPlaying(true);
      return;
    }

    // Option B: Real Recorded Audio or Neural TTS Models
    let audioPath = '';
    let fallbackPath = '';

    if (voice === 'salman_real') {
      audioPath = `/assets/audio/salman-sudio/Chapter-${chapter.id}.mp4`;
      fallbackPath = `/assets/audio/salman-sudio/Chapter-${chapter.id}.m4a`;
    } else if (voice === 'salman') {
      audioPath = `/assets/audio/tour_chapter_${chapter.id}_salman.mp3`;
      fallbackPath = `/assets/audio/tour_chapter_${chapter.id}.mp3`;
    } else {
      audioPath = `/assets/audio/tour_chapter_${chapter.id}_${voice}.mp3`;
      fallbackPath = `/assets/audio/tour_chapter_${chapter.id}.mp3`;
    }

    const audio = new Audio(audioPath);
    audio.playbackRate = rate;
    audio.muted = isMuted;
    audioRef.current = audio;

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

      fallbackAudio.onended = () => {
        if (index + 1 < tourChapters.length) {
          playChapter(index + 1, rate, voice);
        } else {
          stopAllAudio();
        }
      };

      fallbackAudio.play().then(() => setIsPlaying(true)).catch(() => {
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
      if (selectedVoice !== 'realtime_browser' && audioRef.current && audioRef.current.paused && audioRef.current.currentTime > 0) {
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
      const v = allVoices.find(x => x.id === voiceId);
      onShowToast(`Voice: ${v ? v.name : voiceId}`);
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
  const activeVoiceObj = allVoices.find(v => v.id === selectedVoice) || realVoice;

  return (
    <div className={`audio-tour-floating-bar gold-shimmer-card ${isExpanded ? 'is-expanded' : ''}`}>
      
      {/* Ultra-Clean Single Row Professional Pill HUD */}
      <div className="tour-main-row">
        
        {/* Left: Badge & Live Chapter */}
        <div className="tour-info-left">
          <div className="tour-badge-pill">
            <Radio size={12} className="gold-pulse-icon" />
            <span className="tour-live-lbl">60s AI TOUR</span>
          </div>

          <div className="tour-text-preview">
            <span className="tour-chapter-num">0{currentChapterIndex + 1}/04</span>
            <span className="tour-chapter-dot">&bull;</span>
            <span className="tour-chapter-name">{currentChapter.title}</span>
          </div>
        </div>

        {/* Center: Sleek 10-Bar Audio Spectrum Waveform */}
        <div className={`tour-spectrum-equalizer ${isPlaying ? 'is-active' : ''}`}>
          {[...Array(10)].map((_, i) => (
            <span 
              key={i} 
              className="spectrum-bar" 
              style={{ animationDelay: `${(i * 0.1) % 0.8}s` }}
            ></span>
          ))}
        </div>

        {/* Right: Streamlined Action Controls */}
        <div className="tour-controls-group">
          
          {/* Previous */}
          <button 
            className="tour-btn-icon" 
            onClick={skipPrev} 
            disabled={currentChapterIndex === 0}
            title="Previous Chapter"
          >
            <Rewind size={12} />
          </button>

          {/* Main Play / Pause */}
          <button 
            className="tour-btn-main gold-shimmer-button" 
            onClick={togglePlay}
            title={isPlaying ? "Pause Tour" : "Play Tour"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          {/* Next */}
          <button 
            className="tour-btn-icon" 
            onClick={skipNext} 
            disabled={currentChapterIndex === tourChapters.length - 1}
            title="Next Chapter"
          >
            <FastForward size={12} />
          </button>

          {/* Playback Speed */}
          <button 
            className="tour-btn-speed" 
            onClick={cycleSpeed}
            title="Change Playback Speed"
          >
            <span>{playbackRate}x</span>
          </button>

          {/* Voice Model Selector Dropdown */}
          <div className="tour-voice-dropdown-wrapper">
            <button 
              className={`tour-btn-voice ${activeVoiceObj.isReal ? 'is-real-voice' : ''}`}
              onClick={() => setShowVoiceMenu(prev => !prev)}
              title="Select Voice (Salman Real Voice / Optional AI TTS Voices)"
            >
              {activeVoiceObj.isReal ? (
                <Mic size={11} className="voice-mic-icon" />
              ) : (
                <Bot size={11} className="voice-bot-icon" />
              )}
              <span>{activeVoiceObj.name}</span>
            </button>

            {showVoiceMenu && (
              <div className="tour-voice-menu">
                
                {/* 1. Authentic Real Voice Section */}
                <div className="voice-menu-header">🎙️ AUTHENTIC VOICE (DEFAULT)</div>
                <button 
                  className={`voice-menu-item real-voice-item ${selectedVoice === realVoice.id ? 'selected' : ''}`}
                  onClick={() => handleVoiceChange(realVoice.id)}
                >
                  <div className="voice-name-row">
                    <span className="v-name">★ {realVoice.name}</span>
                    <span className="v-accent real-tag">ORIGINAL</span>
                  </div>
                  <span className="v-desc">{realVoice.label}</span>
                </button>

                {/* 2. Optional AI Neural TTS Models Section */}
                <div className="voice-menu-header voice-menu-subhead">🤖 OPTIONAL AI NEURAL TTS VOICES</div>
                {optionalTTSVoices.map(vp => (
                  <button 
                    key={vp.id}
                    className={`voice-menu-item tts-voice-item ${selectedVoice === vp.id ? 'selected' : ''}`}
                    onClick={() => handleVoiceChange(vp.id)}
                  >
                    <div className="voice-name-row">
                      <span className="v-name">{vp.name}</span>
                      <span className="v-accent tts-tag">AI TTS</span>
                    </div>
                    <span className="v-desc">{vp.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mute Toggle */}
          <button 
            className="tour-btn-icon" 
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>

          {/* Live Transcript Toggle */}
          <button 
            className={`tour-btn-icon ${isExpanded ? 'is-active-btn' : ''}`}
            onClick={() => setIsExpanded(prev => !prev)}
            title={isExpanded ? "Hide Transcript" : "View Live Subtitles Transcript"}
          >
            <MessageSquareText size={12} />
          </button>

          {/* Close */}
          <button 
            className="tour-btn-close" 
            onClick={() => {
              stopAllAudio();
              onClose();
            }}
            title="Close Audio Tour"
          >
            <X size={13} />
          </button>
        </div>

      </div>

      {/* Expandable Synchronized Captions Drawer */}
      {isExpanded && (
        <div className="tour-expanded-drawer">
          <div className="tour-transcript-box">
            <div className="transcript-tag">SYNCHRONIZED LIVE CAPTIONS</div>
            <p className="transcript-live-text">
              <Sparkles size={12} className="gold-pulse-icon inline-sparkle" />
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
