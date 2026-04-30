import { useState, useEffect } from "react";
import "./AIBackground.scss";

/* Verified free Unsplash images */
const AI_IMAGES = [
  /* Robot hand + human hand touching "HI" — exactly the finger-touch feel */
  "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=1920&q=85&fit=crop",
  /* AI circuit board with brain — purple/blue tech */
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=85&fit=crop",
  /* Pepper AI robot face — futuristic white */
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=85&fit=crop",
];

const AIBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      current.x = lerp(current.x, target.x, 0.04);
      current.y = lerp(current.y, target.y, 0.04);
      setMouse({ x: current.x, y: current.y });
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* Three depth layers for parallax-3D illusion */
  const far    = `translate(${mouse.x * -10}px, ${mouse.y * -10}px)`;
  const mid    = `translate(${mouse.x * -22}px, ${mouse.y * -22}px)`;
  const close_ = `translate(${mouse.x * -38}px, ${mouse.y * -38}px)`;

  return (
    <div className="ai-bg" aria-hidden="true">

      {/* ── LAYER 1 (far): Real AI photos crossfading ── */}
      <div className="photo-wrap" style={{ transform: far }}>
        {AI_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="ai-photo"
            style={{ animationDelay: `${i * 12}s` }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Readability overlays (fixed, don't move) */}
      <div className="deep-overlay" />
      <div className="tint-overlay" />

      {/* ── LAYER 2 (mid): 3D rotating rings ── */}
      <div className="rings-wrap" style={{ transform: mid }}>
        <div className="ring-3d ring-a" />
        <div className="ring-3d ring-b" />
        <div className="ring-3d ring-c" />
        <div className="ring-3d ring-d" />
      </div>

      {/* ── LAYER 3 (mid): SVG neural network ── */}
      <div className="svg-wrap" style={{ transform: mid }}>
        <svg className="brain-svg" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="#7c3aed" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#050012" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="bigGlow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <circle cx="450" cy="450" r="420" fill="url(#brainGlow)" />

          <polygon points="450,50 728,205 728,695 450,850 172,695 172,205"
            stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" fill="none" />
          <polygon points="450,110 676,238 676,662 450,790 224,662 224,238"
            stroke="rgba(6,182,212,0.38)" strokeWidth="1" fill="none" strokeDasharray="10 6" />
          <polygon points="450,170 624,272 624,628 450,730 276,628 276,272"
            stroke="rgba(236,72,153,0.3)" strokeWidth="0.8" fill="none" />

          <circle cx="450" cy="450" r="285" stroke="rgba(124,58,237,0.42)" strokeWidth="1"
            fill="none" strokeDasharray="7 12" className="orbit-ring ring-slow" />
          <circle cx="450" cy="450" r="225" stroke="rgba(6,182,212,0.36)" strokeWidth="0.9"
            fill="none" strokeDasharray="5 9" className="orbit-ring ring-med" />
          <circle cx="450" cy="450" r="162" stroke="rgba(236,72,153,0.3)" strokeWidth="0.7"
            fill="none" className="orbit-ring ring-fast" />

          <line x1="160" y1="450" x2="740" y2="450" stroke="rgba(124,58,237,0.6)" strokeWidth="1.4" />
          <line x1="450" y1="160" x2="450" y2="740" stroke="rgba(6,182,212,0.6)" strokeWidth="1.4" />
          <line x1="240" y1="240" x2="660" y2="660" stroke="rgba(124,58,237,0.32)" strokeWidth="1" />
          <line x1="660" y1="240" x2="240" y2="660" stroke="rgba(6,182,212,0.32)" strokeWidth="1" />

          <polyline points="160,450 160,295 295,295 295,160" stroke="rgba(124,58,237,0.5)" strokeWidth="1.2" fill="none" />
          <polyline points="740,450 740,295 605,295 605,160" stroke="rgba(6,182,212,0.5)" strokeWidth="1.2" fill="none" />
          <polyline points="160,450 160,605 295,605 295,740" stroke="rgba(236,72,153,0.42)" strokeWidth="1.2" fill="none" />
          <polyline points="740,450 740,605 605,605 605,740" stroke="rgba(124,58,237,0.42)" strokeWidth="1.2" fill="none" />

          <line x1="450" y1="285" x2="308" y2="368" stroke="rgba(124,58,237,0.5)" strokeWidth="1.1" />
          <line x1="450" y1="285" x2="592" y2="368" stroke="rgba(6,182,212,0.5)" strokeWidth="1.1" />
          <line x1="308" y1="368" x2="308" y2="532" stroke="rgba(124,58,237,0.42)" strokeWidth="1" />
          <line x1="592" y1="368" x2="592" y2="532" stroke="rgba(6,182,212,0.42)" strokeWidth="1" />
          <line x1="308" y1="532" x2="450" y2="615" stroke="rgba(236,72,153,0.48)" strokeWidth="1.1" />
          <line x1="592" y1="532" x2="450" y2="615" stroke="rgba(124,58,237,0.48)" strokeWidth="1.1" />
          <line x1="308" y1="368" x2="450" y2="450" stroke="rgba(236,72,153,0.3)" strokeWidth="0.8" />
          <line x1="592" y1="368" x2="450" y2="450" stroke="rgba(6,182,212,0.3)" strokeWidth="0.8" />
          <line x1="308" y1="532" x2="450" y2="450" stroke="rgba(124,58,237,0.3)" strokeWidth="0.8" />
          <line x1="592" y1="532" x2="450" y2="450" stroke="rgba(236,72,153,0.3)" strokeWidth="0.8" />

          <circle cx="295" cy="160" r="8"  fill="rgba(124,58,237,0.95)"  filter="url(#glow)" className="pulse-node"     />
          <circle cx="605" cy="160" r="8"  fill="rgba(6,182,212,0.95)"   filter="url(#glow)" className="pulse-node nd2" />
          <circle cx="295" cy="740" r="8"  fill="rgba(236,72,153,0.95)"  filter="url(#glow)" className="pulse-node nd3" />
          <circle cx="605" cy="740" r="8"  fill="rgba(124,58,237,0.95)"  filter="url(#glow)" className="pulse-node nd4" />
          <circle cx="160" cy="295" r="6"  fill="rgba(6,182,212,0.9)"    filter="url(#glow)" className="pulse-node nd5" />
          <circle cx="740" cy="295" r="6"  fill="rgba(236,72,153,0.9)"   filter="url(#glow)" className="pulse-node nd2" />
          <circle cx="160" cy="605" r="6"  fill="rgba(124,58,237,0.9)"   filter="url(#glow)" className="pulse-node nd3" />
          <circle cx="740" cy="605" r="6"  fill="rgba(6,182,212,0.9)"    filter="url(#glow)" className="pulse-node nd4" />

          <circle cx="308" cy="368" r="10" fill="rgba(124,58,237,0.75)" stroke="#a78bfa" strokeWidth="1.5" filter="url(#glow)" className="pulse-node" />
          <circle cx="592" cy="368" r="10" fill="rgba(6,182,212,0.75)"  stroke="#67e8f9" strokeWidth="1.5" filter="url(#glow)" className="pulse-node nd2" />
          <circle cx="308" cy="532" r="10" fill="rgba(236,72,153,0.75)" stroke="#f9a8d4" strokeWidth="1.5" filter="url(#glow)" className="pulse-node nd3" />
          <circle cx="592" cy="532" r="10" fill="rgba(124,58,237,0.75)" stroke="#a78bfa" strokeWidth="1.5" filter="url(#glow)" className="pulse-node nd4" />
          <circle cx="450" cy="285" r="11" fill="rgba(6,182,212,0.75)"  stroke="#67e8f9" strokeWidth="1.5" filter="url(#glow)" className="pulse-node nd5" />
          <circle cx="450" cy="615" r="11" fill="rgba(236,72,153,0.75)" stroke="#f9a8d4" strokeWidth="1.5" filter="url(#glow)" className="pulse-node nd2" />

          <circle cx="450" cy="450" r="58" fill="rgba(124,58,237,0.14)" stroke="rgba(124,58,237,0.65)" strokeWidth="2" filter="url(#softGlow)" className="core-ring" />
          <circle cx="450" cy="450" r="40" fill="rgba(6,182,212,0.16)"  stroke="rgba(6,182,212,0.7)"  strokeWidth="1.5" className="core-ring core-med" />
          <circle cx="450" cy="450" r="24" fill="rgba(124,58,237,0.28)" stroke="rgba(167,139,250,0.95)" strokeWidth="1.5" />
          <circle cx="450" cy="450" r="11" fill="rgba(167,139,250,1)"   filter="url(#bigGlow)" className="core-pulse" />

          <circle r="5"   fill="#a78bfa" opacity="0.95" filter="url(#glow)">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M160,450 L740,450" />
          </circle>
          <circle r="4.5" fill="#67e8f9" opacity="0.92" filter="url(#glow)">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="0.9s" path="M450,160 L450,740" />
          </circle>
          <circle r="4"   fill="#f9a8d4" opacity="0.88" filter="url(#glow)">
            <animateMotion dur="4s"   repeatCount="indefinite" begin="0.4s" path="M308,368 L592,368 L592,532 L308,532 L308,368" />
          </circle>
          <circle r="4"   fill="#a78bfa" opacity="0.85" filter="url(#glow)">
            <animateMotion dur="5s"   repeatCount="indefinite" begin="1.8s" path="M450,285 L308,368 L308,532 L450,615 L592,532 L592,368 L450,285" />
          </circle>
          <circle r="3.5" fill="#67e8f9" opacity="0.8"  filter="url(#glow)">
            <animateMotion dur="7s"   repeatCount="indefinite" begin="1.2s" path="M295,160 L160,295 L160,605 L295,740 L605,740 L740,605 L740,295 L605,160 L295,160" />
          </circle>
          <circle r="3"   fill="#ec4899" opacity="0.75" filter="url(#glow)">
            <animateMotion dur="3.5s" repeatCount="indefinite" begin="2.5s" path="M240,240 L660,660" />
          </circle>

          <text x="72"  y="455" fontSize="9.5" fill="rgba(167,139,250,0.6)" fontFamily="Courier New">0x7F3AED</text>
          <text x="718" y="455" fontSize="9.5" fill="rgba(103,232,249,0.6)"  fontFamily="Courier New">0x06B6D4</text>
          <text x="426" y="76"  fontSize="9.5" fill="rgba(249,168,212,0.6)"  fontFamily="Courier New">AI_CORE</text>
          <text x="414" y="836" fontSize="9.5" fill="rgba(167,139,250,0.6)"  fontFamily="Courier New">RAG_SYS</text>
        </svg>
      </div>

      {/* ── LAYER 4 (close): Hex corners — move most for depth ── */}
      <div className="hex-wrap" style={{ transform: close_ }}>
        <svg className="hex-corner top-left"  viewBox="0 0 200 200" fill="none"><HexGrid color="rgba(124,58,237,0.42)" /></svg>
        <svg className="hex-corner top-right" viewBox="0 0 200 200" fill="none"><HexGrid color="rgba(6,182,212,0.36)" /></svg>
        <svg className="hex-corner bot-left"  viewBox="0 0 200 200" fill="none"><HexGrid color="rgba(236,72,153,0.32)" /></svg>
        <svg className="hex-corner bot-right" viewBox="0 0 200 200" fill="none"><HexGrid color="rgba(124,58,237,0.38)" /></svg>
      </div>

      <div className="scan-lines" />
    </div>
  );
};

const HexGrid = ({ color }) => (
  <g stroke={color} strokeWidth="1" fill="none">
    {[0,1,2,3].map(row =>
      [0,1,2,3].map(col => {
        const x = col * 46 + (row % 2 === 1 ? 23 : 0);
        const y = row * 40;
        const pts = [
          [x+23,y+0],[x+46,y+20],[x+46,y+60],
          [x+23,y+80],[x+0,y+60],[x+0,y+20],
        ].map(p => p.join(",")).join(" ");
        return <polygon key={`${row}-${col}`} points={pts} />;
      })
    )}
  </g>
);

export default AIBackground;
