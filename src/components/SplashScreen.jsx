import React, { useState, useEffect, useRef } from 'react';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [odometerTime, setOdometerTime] = useState({ h: '00', m: '00', s: '00', ms: '00' });
  const [rpmValue, setRpmValue] = useState(0);
  const [lineX, setLineX] = useState(-2);
  const [transitionState, setTransitionState] = useState('');
  
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const progressRef = useRef(null);
  const clockRef = useRef(null);
  const startTimeRef = useRef(null);
  const phaseRef = useRef(0);

  // High-Speed Racing Odometer Clock (Ticks every 16ms for 60fps millisecond precision)
  const startOdometer = () => {
    const start = Date.now();
    startTimeRef.current = start;

    clockRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const h = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
      const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      const ms = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0');

      setOdometerTime({ h, m, s, ms });

      // Calculate RPM acceleration curve (0 to 9999 RPM over 5 seconds)
      const targetRpm = Math.min(9999, Math.floor((elapsed / 5000) * 9999));
      setRpmValue(targetRpm);
    }, 16);
  };

  const advanceTo = (p) => {
    phaseRef.current = p;
    setPhase(p);
  };

  useEffect(() => {
    // 5-Second Cinematic Sequence Arc
    const seq = [
      () => { /* VOID - initial black */ },
      () => { /* LINE_APPEAR */ startOdometer(); },
      () => { /* LINE_TRAVEL */ },
      () => { /* CORE & SPEEDOMETER REVEAL */ },
      () => { /* NAME REVEAL */ },
      () => { /* TITLE REVEAL */ },
      () => {
        /* PROGRESS ANIMATION (smooth 0 to 100% over ~1.8s) */
        let p = 0;
        progressRef.current = setInterval(() => {
          p += 2.4;
          if (p >= 100) {
            p = 100;
            clearInterval(progressRef.current);
            // Hold at 100% for a moment before auto transition
            setTimeout(() => {
              if (phaseRef.current === 6) {
                triggerTransition();
              }
            }, 1200);
          }
          setProgress(Math.min(p, 100));
        }, 35);
      },
      () => { /* TRANSITION HANDLED BY triggerTransition */ },
      () => { /* DONE */ },
    ];

    // Carefully timed delays matching 5-second cinematic arc
    // Phase 0: 0ms
    // Phase 1: 400ms (Line appear & Odometer start)
    // Phase 2: 900ms (Line travel)
    // Phase 3: 1600ms (3D Tachometer Core reveal)
    // Phase 4: 2500ms (Name reveal)
    // Phase 5: 3400ms (Titles reveal)
    // Phase 6: 4200ms (Progress starts to 100%)
    const delays = [0, 400, 900, 1600, 2500, 3400, 4200];

    delays.forEach((delay, idx) => {
      setTimeout(() => {
        advanceTo(idx);
        seq[idx]?.();
      }, delay);
    });

    return () => {
      clearInterval(clockRef.current);
      clearInterval(progressRef.current);
    };
  }, []);

  const triggerTransition = () => {
    advanceTo(7);
    setTransitionState('gold');
    setTimeout(() => setTransitionState('white'), 800);
    setTimeout(() => {
      clearInterval(clockRef.current);
      advanceTo(8);
      onComplete && onComplete();
    }, 1500);
  };

  // Animate gold reveal line position
  useEffect(() => {
    if (phase === 1) {
      setLineX(-2);
      let x = -2;
      const anim = setInterval(() => {
        x += 1.2;
        setLineX(x);
        if (x >= 102) clearInterval(anim);
      }, 12);
      return () => clearInterval(anim);
    }
  }, [phase]);

  // Mouse interaction handler for 3D parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas 3D Neural Speedometer & Sacred Core Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Create particle network
    const particleCount = 50;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 650,
      y: (Math.random() - 0.5) * 650,
      z: (Math.random() - 0.5) * 650,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.02 + 0.008,
      angle: Math.random() * Math.PI * 2,
    }));

    // 3D Octahedron Vertices for Central AI Core
    const octahedronVertices = [
      [0, 110, 0],   // top
      [0, -110, 0],  // bottom
      [110, 0, 0],   // right
      [-110, 0, 0],  // left
      [0, 0, 110],   // front
      [0, 0, -110],  // back
    ];

    const octahedronEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    const project3D = (x, y, z, rx, ry, cx, cy) => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const fov = 450;
      const scale = fov / (fov + z2 + 300);

      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        scale,
        z: z2
      };
    };

    const render = () => {
      time += 0.015;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      const cx = width > 900 ? width * 0.65 : width * 0.5;
      const cy = height * 0.48;

      const rotX = time * 0.35 + mouseY * 0.4;
      const rotY = time * 0.5 + mouseX * 0.4;

      // --- 1. Ambient Royal Gold Radial Glow ---
      const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 420);
      radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.16)');
      radialGlow.addColorStop(0.35, 'rgba(212, 175, 55, 0.05)');
      radialGlow.addColorStop(1, 'rgba(5, 4, 3, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 420, 0, Math.PI * 2);
      ctx.fill();

      // --- 2. High-Performance Tachometer / Speedometer Dial Gauge ---
      const speedPct = startTimeRef.current ? Math.min(1, (Date.now() - startTimeRef.current) / 5000) : 0;

      // Draw Tachometer Arc (135° to 405°)
      const startAngle = Math.PI * 0.75;
      const endAngle = Math.PI * 2.25;
      const currentNeedleAngle = startAngle + (endAngle - startAngle) * speedPct;

      ctx.save();
      ctx.translate(cx, cy);

      // Tachometer Outer Track
      ctx.beginPath();
      ctx.arc(0, 0, 260, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Active Tachometer Fill Arc (Glowing Gold)
      ctx.beginPath();
      ctx.arc(0, 0, 260, startAngle, currentNeedleAngle);
      ctx.strokeStyle = 'rgba(240, 210, 100, 0.85)';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Speedometer Graduation Marks & Numbers (0 to 10)
      const gradCount = 10;
      for (let i = 0; i <= gradCount; i++) {
        const angle = startAngle + (endAngle - startAngle) * (i / gradCount);
        const innerR = i % 2 === 0 ? 244 : 250;
        const outerR = 260;

        const gx1 = Math.cos(angle) * innerR;
        const gy1 = Math.sin(angle) * innerR;
        const gx2 = Math.cos(angle) * outerR;
        const gy2 = Math.sin(angle) * outerR;

        ctx.beginPath();
        ctx.moveTo(gx1, gy1);
        ctx.lineTo(gx2, gy2);
        ctx.strokeStyle = i / gradCount <= speedPct ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)';
        ctx.lineWidth = i % 2 === 0 ? 2 : 1;
        ctx.stroke();

        // Numbers on dial
        if (i % 2 === 0) {
          const numR = 230;
          const nx = Math.cos(angle) * numR;
          const ny = Math.sin(angle) * numR;
          ctx.font = '700 9px "JetBrains Mono", monospace';
          ctx.fillStyle = i / gradCount <= speedPct ? '#FFFDF5' : 'rgba(212, 175, 55, 0.4)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText((i * 1000).toString(), nx, ny);
        }
      }

      // Sweeping Tachometer Needle
      const needleLength = 235;
      const nX = Math.cos(currentNeedleAngle) * needleLength;
      const nY = Math.sin(currentNeedleAngle) * needleLength;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(nX, nY);
      ctx.strokeStyle = 'rgba(255, 245, 200, 0.95)';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Needle Hub Dot
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#D4AF37';
      ctx.fill();

      ctx.restore();

      // --- 3. Concentric 3D Aperture Rings with 48 Radial Ticks & Golden Ratio Dials ---
      const ringRadii = [210, 150, 95];
      ringRadii.forEach((r, idx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, 0.35 + idx * 0.05);

        ctx.strokeStyle = idx === 0 ? 'rgba(212, 175, 55, 0.45)' : `rgba(212, 175, 55, ${0.18 + idx * 0.05})`;
        ctx.lineWidth = idx === 0 ? 1.6 : 0.8;
        if (idx === 1) ctx.setLineDash([4, 12]);
        if (idx === 2) ctx.setLineDash([16, 6, 4, 6]);

        const rotationAngle = (idx % 2 === 0 ? 1 : -1) * time * (0.2 + idx * 0.08);
        ctx.rotate(rotationAngle);

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // 48 Radial Tick Marks on Outer Aperture Ring
        if (idx === 0) {
          const ticks = 48;
          for (let i = 0; i < ticks; i++) {
            const angle = (i / ticks) * Math.PI * 2;
            const innerR = i % 4 === 0 ? r - 10 : r - 5;
            const x1 = Math.cos(angle) * innerR;
            const y1 = Math.sin(angle) * innerR;
            const x2 = Math.cos(angle) * r;
            const y2 = Math.sin(angle) * r;

            ctx.strokeStyle = i % 4 === 0 ? 'rgba(240, 210, 100, 0.85)' : 'rgba(212, 175, 55, 0.25)';
            ctx.lineWidth = i % 4 === 0 ? 1.4 : 0.6;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      // --- 4. Floating Neural Constellation ---
      const projectedParticles = particles.map((p) => {
        p.angle += p.speed;
        const currentR = 170 + Math.sin(time + p.angle) * 45;
        const px = Math.cos(p.angle) * currentR + p.x * 0.2;
        const py = Math.sin(p.angle * 0.7) * currentR + p.y * 0.2;
        const pz = Math.sin(p.angle) * 120 + p.z * 0.2;

        return {
          ...project3D(px, py, pz, rotX * 0.5, rotY * 0.5, cx, cy),
          original: p
        };
      });

      // Connect close nodes with glowing golden filaments
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35;
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projectedParticles.forEach((p) => {
        ctx.fillStyle = `rgba(240, 215, 120, ${Math.min(1, p.scale * 0.85)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.original.size * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- 5. Central 3D Sacred Geometry Octahedron Core ---
      const projectedOcta = octahedronVertices.map(([vx, vy, vz]) =>
        project3D(vx, vy, vz, rotX, rotY, cx, cy)
      );

      // Edges
      octahedronEdges.forEach(([i, j]) => {
        const p1 = projectedOcta[i];
        const p2 = projectedOcta[j];

        const edgeGradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        edgeGradient.addColorStop(0, 'rgba(240, 210, 100, 0.9)');
        edgeGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.45)');
        edgeGradient.addColorStop(1, 'rgba(240, 210, 100, 0.9)');

        ctx.strokeStyle = edgeGradient;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Vertices
      projectedOcta.forEach((p) => {
        ctx.fillStyle = '#FFFDF5';
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- 6. Telemetry & Speed Readout on Canvas ---
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.75)';
      ctx.textAlign = 'center';
      ctx.fillText(`NEURAL VELOCITY: ${Math.floor(speedPct * 100).toString().padStart(3, '0')}% // ${Math.floor(speedPct * 9999)} RPM`, cx, cy + 180);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (phase === 8) return null;

  const isGoldTransition = transitionState === 'gold';
  const isWhiteTransition = transitionState === 'white';

  return (
    <div
      className={`splash-root ${isGoldTransition ? 'splash-gold-wash' : ''} ${isWhiteTransition ? 'splash-white-flash' : ''}`}
      style={{ '--line-x': `${lineX}%` }}
    >
      {/* === CINEMATIC GRAIN OVERLAY === */}
      <div className="splash-grain" />

      {/* === VIGNETTE === */}
      <div className="splash-vignette" />

      {/* === STUNNING INTERACTIVE 3D TACHOMETER & NEURAL CANVAS === */}
      <div className={`splash-canvas-container ${phase >= 3 ? 'canvas-visible' : ''}`}>
        <canvas ref={canvasRef} className="splash-canvas" />
      </div>

      {/* === GOLD REVEAL LINE === */}
      {phase >= 1 && phase < 7 && (
        <div className="splash-gold-line" style={{ left: `${lineX}%` }}>
          <div className="splash-gold-line-glow" />
        </div>
      )}

      {/* === LEFT METADATA COLUMN === */}
      <div className={`splash-meta-left ${phase >= 2 ? 'meta-visible' : ''}`}>
        <span className="splash-meta-label">PORTFOLIO</span>
        <span className="splash-meta-dot">—</span>
        <span className="splash-meta-label">2026</span>
      </div>

      {/* === MAIN TYPOGRAPHY BLOCK — lower left === */}
      <div className="splash-typography-block">

        {/* Edition tag */}
        <div className={`splash-edition-tag ${phase >= 4 ? 'type-visible' : ''}`}>
          <span className="splash-tag-line" />
          <span>AI ENGINEER &amp; PRODUCT ARCHITECT</span>
        </div>

        {/* MAIN NAME WITH SHINING GOLD SHIMMER */}
        <div className={`splash-name-container ${phase >= 4 ? 'name-visible' : ''}`}>
          <h1 className="splash-name-primary">
            <span className="splash-name-first">SALMAN</span>
            <span className="splash-name-last">
              KHAN
              <span className="splash-gold-shimmer" />
            </span>
          </h1>
        </div>

        {/* Titles row */}
        <div className={`splash-title-row ${phase >= 5 ? 'titles-visible' : ''}`}>
          <div className="splash-title-item">
            <span className="splash-title-num">01</span>
            <span className="splash-title-text">ARTIFICIAL INTELLIGENCE</span>
          </div>
          <div className="splash-title-divider" />
          <div className="splash-title-item">
            <span className="splash-title-num">02</span>
            <span className="splash-title-text">PRODUCT BUILDER</span>
          </div>
          <div className="splash-title-divider" />
          <div className="splash-title-item">
            <span className="splash-title-num">03</span>
            <span className="splash-title-text">FULL-STACK DEVELOPER</span>
          </div>
        </div>

      </div>

      {/* === HIGH-SPEED RACING ODOMETER & CLOCK DISPLAY (Top-Left) === */}
      {phase >= 1 && (
        <div className={`splash-clock-block ${phase >= 1 ? 'clock-visible' : ''}`}>
          <div className="splash-odometer-header">
            <span className="splash-clock-label">NEURAL ODOMETER</span>
            <span className="splash-odometer-live-dot" />
            <span className="splash-odometer-rpm">{rpmValue.toString().padStart(4, '0')} RPM</span>
          </div>
          <div className="splash-odometer-time-display">
            <span className="splash-odometer-digit">{odometerTime.h}</span>
            <span className="splash-odometer-colon">:</span>
            <span className="splash-odometer-digit">{odometerTime.m}</span>
            <span className="splash-odometer-colon">:</span>
            <span className="splash-odometer-digit">{odometerTime.s}</span>
            <span className="splash-odometer-colon">:</span>
            <span className="splash-odometer-ms">{odometerTime.ms}</span>
          </div>
        </div>
      )}

      {/* === PROGRESS INDICATOR — lower right === */}
      {phase >= 6 && (
        <div className="splash-progress-block">
          <div className="splash-progress-label-row">
            <span className="splash-progress-label">INITIALIZING SYSTEM VELOCITY</span>
            <span className="splash-progress-pct">{Math.round(progress).toString().padStart(3, '0')}%</span>
          </div>
          <div className="splash-progress-track">
            <div
              className="splash-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="splash-progress-sub">
            <span>ODOMETER TELEMETRY // {progress >= 100 ? 'OPTIMAL' : 'CALIBRATING'}</span>
          </div>
        </div>
      )}

      {/* === CORNER COORDINATES (cinematic film metadata) === */}
      <div className={`splash-corner-br ${phase >= 3 ? 'corner-visible' : ''}`}>
        <span>21.8744° N, 73.0960° E</span>
        <span className="splash-corner-sep">|</span>
        <span>SK // 2026</span>
      </div>

      {/* === TOP-RIGHT MONOGRAM === */}
      <div className={`splash-monogram ${phase >= 2 ? 'monogram-visible' : ''}`}>
        <span className="splash-monogram-text">SK</span>
        <div className="splash-monogram-frame" />
      </div>

      {/* === ENTER CTA (appears at end of progress) === */}
      {phase >= 6 && (
        <div
          className="splash-enter-cta"
          onClick={triggerTransition}
        >
          <span className="splash-enter-line-l" />
          <span>ENTER PORTFOLIO</span>
          <span className="splash-enter-line-r" />
        </div>
      )}

      {/* === TRANSITION OVERLAY === */}
      <div className={`splash-transition-overlay ${isGoldTransition ? 'active-gold' : ''} ${isWhiteTransition ? 'active-white' : ''}`} />

    </div>
  );
}
