import "./home.scss";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import profileImg from "../../Assets/Images/profile.jpg";
import { useRef, useState, useEffect } from "react";

const ROLES = [
  "Python Full Stack Developer",
  "AI & GenAI Specialist",
  "FastAPI & React 18 Engineer",
  "RAG Systems Architect",
  "AI Platform Builder",
];

const STATS = [
  { value: 5, label: "Projects Delivered", suffix: "+" },
  { value: 15, label: "Technologies Mastered", suffix: "+" },
  { value: 1, label: "Year Professional XP", suffix: "+" },
];

const isMobile = typeof window !== "undefined" && window.innerWidth <= 738;

const useTypewriter = (words, typingSpeed = 75, deleteSpeed = 40, pauseMs = 2000) => {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    const delay = deleting ? deleteSpeed : typingSpeed;

    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, cIdx + 1));
        if (cIdx + 1 === word.length) {
          setTimeout(() => setDeleting(true), pauseMs);
        } else {
          setCIdx((c) => c + 1);
        }
      } else {
        setDisplay(word.slice(0, cIdx - 1));
        if (cIdx - 1 === 0) {
          setDeleting(false);
          setWIdx((i) => (i + 1) % words.length);
          setCIdx(0);
        } else {
          setCIdx((c) => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(t);
  }, [cIdx, deleting, wIdx, words, typingSpeed, deleteSpeed, pauseMs]);

  return display;
};

const Counter = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = value / 45;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(cur));
    }, 35);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="stat-val">{count}{suffix}</span>
      <span className="stat-lbl">{label}</span>
    </motion.div>
  );
};

const PhotoCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 160, damping: 22 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 160, damping: 22 });
  const glareX = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className="photo-3d"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { type: "spring", stiffness: 250, damping: 20 } }}
    >
      {children}
      <motion.div
        className="holo-glare"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.14) 0%, transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
};

/* ── AI decorative SVG (circuit board art) ── */
const AIDecoration = () => (
  <div className="ai-deco-wrap" aria-hidden="true">
    <svg className="ai-deco-svg" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hexagon grid */}
      <polygon points="210,20 360,105 360,315 210,400 60,315 60,105" stroke="rgba(124,58,237,0.25)" strokeWidth="1" fill="none" />
      <polygon points="210,60 330,127 330,293 210,360 90,293 90,127" stroke="rgba(6,182,212,0.2)" strokeWidth="0.8" fill="none" />
      <polygon points="210,100 300,152 300,268 210,320 120,268 120,152" stroke="rgba(236,72,153,0.18)" strokeWidth="0.6" fill="none" />

      {/* Neural circles */}
      <circle cx="210" cy="210" r="80" stroke="rgba(124,58,237,0.3)" strokeWidth="1" fill="none" strokeDasharray="8 4" />
      <circle cx="210" cy="210" r="110" stroke="rgba(6,182,212,0.2)" strokeWidth="0.7" fill="none" strokeDasharray="4 8" />
      <circle cx="210" cy="210" r="140" stroke="rgba(124,58,237,0.12)" strokeWidth="0.5" fill="none" />

      {/* Center AI brain shape */}
      <circle cx="210" cy="210" r="40" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
      <circle cx="210" cy="210" r="22" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.45)" strokeWidth="1" />
      <circle cx="210" cy="210" r="8" fill="rgba(124,58,237,0.5)" />

      {/* Circuit traces from center */}
      <line x1="210" y1="170" x2="210" y2="60" stroke="rgba(124,58,237,0.35)" strokeWidth="1" />
      <line x1="210" y1="250" x2="210" y2="360" stroke="rgba(6,182,212,0.35)" strokeWidth="1" />
      <line x1="170" y1="210" x2="60" y2="210" stroke="rgba(236,72,153,0.3)" strokeWidth="1" />
      <line x1="250" y1="210" x2="360" y2="210" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
      <line x1="182" y1="182" x2="105" y2="105" stroke="rgba(6,182,212,0.25)" strokeWidth="0.8" />
      <line x1="238" y1="238" x2="315" y2="315" stroke="rgba(124,58,237,0.25)" strokeWidth="0.8" />
      <line x1="238" y1="182" x2="315" y2="105" stroke="rgba(236,72,153,0.22)" strokeWidth="0.8" />
      <line x1="182" y1="238" x2="105" y2="315" stroke="rgba(6,182,212,0.22)" strokeWidth="0.8" />

      {/* Node dots at trace ends */}
      <circle cx="210" cy="60" r="5" fill="rgba(124,58,237,0.6)" />
      <circle cx="210" cy="360" r="5" fill="rgba(6,182,212,0.6)" />
      <circle cx="60" cy="210" r="5" fill="rgba(236,72,153,0.6)" />
      <circle cx="360" cy="210" r="5" fill="rgba(124,58,237,0.6)" />
      <circle cx="105" cy="105" r="4" fill="rgba(6,182,212,0.5)" />
      <circle cx="315" cy="315" r="4" fill="rgba(124,58,237,0.5)" />
      <circle cx="315" cy="105" r="4" fill="rgba(236,72,153,0.5)" />
      <circle cx="105" cy="315" r="4" fill="rgba(6,182,212,0.5)" />

      {/* L-bends — circuit style */}
      <polyline points="210,60 240,60 270,90" stroke="rgba(124,58,237,0.3)" strokeWidth="0.7" fill="none" />
      <polyline points="360,210 360,180 330,150" stroke="rgba(6,182,212,0.28)" strokeWidth="0.7" fill="none" />
      <polyline points="60,210 60,240 90,270" stroke="rgba(236,72,153,0.25)" strokeWidth="0.7" fill="none" />
      <polyline points="210,360 180,360 150,330" stroke="rgba(124,58,237,0.28)" strokeWidth="0.7" fill="none" />

      {/* Orbit nodes */}
      <circle cx="210" cy="130" r="3.5" fill="rgba(167,139,250,0.7)" className="orbit-dot" />
      <circle cx="280" cy="210" r="3.5" fill="rgba(103,232,249,0.7)" className="orbit-dot" />
      <circle cx="210" cy="290" r="3.5" fill="rgba(249,168,212,0.7)" className="orbit-dot" />
      <circle cx="140" cy="210" r="3.5" fill="rgba(167,139,250,0.7)" className="orbit-dot" />
    </svg>
    {/* Glow behind it */}
    <div className="ai-deco-glow" />
  </div>
);

const Home = () => {
  const role = useTypewriter(ROLES);

  return (
    <div className="home-ai">
      {/* AI circuit decoration — show on all screen sizes */}
      <AIDecoration />

      {/* Floating AI keyword tags — show on all screen sizes */}
      <div className="ai-keywords" aria-hidden="true">
        {["Machine Learning", "Neural Networks", "LLM", "RAG", "Transformers", "Vector DB", "Embeddings", "FastAPI"].map((kw, i) => (
          <span key={kw} className="ai-kw" style={{ animationDelay: `${i * 0.7}s` }}>{kw}</span>
        ))}
      </div>

      {/* Ambient orbs */}
      <div className="ambient orb-purple" />
      <div className="ambient orb-cyan" />
      <div className="ambient orb-pink" />

      <div className="hero">
        {/* ── LEFT: TEXT ── */}
        <motion.div
          className="text-col"
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <motion.div
            className="avail-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="avail-dot" />
            Open to Work — Chennai, India
          </motion.div>

          <motion.h2
            className="hero-name"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            MONISHA R
          </motion.h2>

          <div className="role-wrap">
            <span className="role-text">{role}</span>
            <span className="blink-cursor">|</span>
          </div>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            1+ year building <b>production-grade AI platforms</b>, RAG systems &amp;
            multi-tenant SaaS apps with FastAPI, React 18, TypeScript &amp; Azure OpenAI.
          </motion.p>

          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
          >
            <a href="#Portfolio">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.06, boxShadow: "0 0 32px rgba(124,58,237,0.6)" }}
                whileTap={{ scale: 0.96 }}
              >
                View Projects →
              </motion.button>
            </a>
            <a href="#Contact">
              <motion.button
                className="btn-outline"
                whileHover={{ scale: 1.06, boxShadow: "0 0 24px rgba(6,182,212,0.4)" }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
              </motion.button>
            </a>
          </motion.div>

        </motion.div>

        {/* ── RIGHT: 3D PHOTO ── */}
        <motion.div
          className="photo-col"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
        >
          {isMobile ? (
            <div className="photo-frame">
              <div className="spin-ring r1" />
              <div className="spin-ring r2" />
              <div className="photo-glow" />
              <img src={profileImg} alt="Monisha R" className="profile-img" />
            </div>
          ) : (
            <PhotoCard>
              <div className="photo-frame" style={{ transformStyle: "preserve-3d" }}>
                <div className="spin-ring r1" />
                <div className="spin-ring r2" />
                <div className="spin-ring r3" />
                <div className="photo-glow" />
                <img src={profileImg} alt="Monisha R" className="profile-img" />

                {/* Floating info chips */}
                <motion.div
                  className="info-chip chip-tr"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <span className="chip-icon">⚡</span> 1+ yr XP
                </motion.div>

                <motion.div
                  className="info-chip chip-bl"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <span className="chip-icon">🤖</span> AI Engineer
                </motion.div>

                <motion.div
                  className="info-chip chip-br"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <span className="chip-icon">✅</span> Available
                </motion.div>
              </div>
            </PhotoCard>
          )}
        </motion.div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-strip">
        {STATS.map((s) => (
          <Counter key={s.label} {...s} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot" />
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default Home;
