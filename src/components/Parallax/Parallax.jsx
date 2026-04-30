import { useRef } from "react";
import "./Parallax.scss";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

/* Verified free AI images for section background */
const IMG_TOUCH  = "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=1920&q=85&fit=crop";
const IMG_ROBOT  = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=85&fit=crop";
const IMG_CIRCUIT= "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=85&fit=crop";

const Parallax = () => {
  const ref = useRef();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotY = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), { stiffness: 80, damping: 20 });
  const rotX = useSpring(useTransform(mouseY, [-1, 1], [10, -10]),  { stiffness: 80, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText   = useTransform(scrollYProgress, [0, 1], ["0%", "280%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width  * 2 - 1);
    mouseY.set((e.clientY - r.top)  / r.height * 2 - 1);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div
      className="parallax-ai"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── SECTION BACKGROUND: big AI images, visible & animated ── */}
      <div className="par-bg-images">
        <img className="par-bg-img pbi-1" src={IMG_TOUCH}   alt="" />
        <img className="par-bg-img pbi-2" src={IMG_CIRCUIT} alt="" />
        <img className="par-bg-img pbi-3" src={IMG_ROBOT}   alt="" />
        <div className="par-bg-dark" />
        <div className="par-bg-scan" />
      </div>

      {/* Ambient glow */}
      <div className="par-orb orb-purple" />
      <div className="par-orb orb-cyan" />
      <div className="par-orb orb-pink" />

      {/* ── 3D SCENE ── */}
      <motion.div
        className="scene-3d"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      >
        {/* Gyroscope rings */}
        <div className="gyro-wrap">
          <div className="gyro-ring gr-1" />
          <div className="gyro-ring gr-2" />
          <div className="gyro-ring gr-3" />
        </div>

        {/* Wireframe spinning cube */}
        <div className="cube-wrap">
          <div className="cube">
            <div className="face front"  />
            <div className="face back"   />
            <div className="face left"   />
            <div className="face right"  />
            <div className="face top"    />
            <div className="face bottom" />
          </div>
        </div>

        {/* Tech cards — NEAR the centre now */}
        <div className="cards-3d">
          <div className="tech-card tc-1"><span>RAG</span><span className="tc-sub">Pipeline</span></div>
          <div className="tech-card tc-2"><span>LLM</span><span className="tc-sub">Inference</span></div>
          <div className="tech-card tc-3"><span>API</span><span className="tc-sub">FastAPI</span></div>
          <div className="tech-card tc-4"><span>VDB</span><span className="tc-sub">Vector DB</span></div>
          <div className="tech-card tc-5"><span>AI</span><span className="tc-sub">Azure OpenAI</span></div>
          <div className="tech-card tc-6"><span>SaaS</span><span className="tc-sub">Multi-tenant</span></div>
        </div>

        {/* Orbit particles */}
        <div className="orbit-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`orb-particle op-${i + 1}`} />
          ))}
        </div>
      </motion.div>

      {/* Parallax title — stays readable above 3D */}
      <motion.div className="par-text-wrap" style={{ y: yText, opacity }}>
        <p className="par-label">// selected projects</p>
        <h1 className="par-title">My Work</h1>
        <p className="par-sub">Production-grade AI systems &amp; full-stack platforms</p>
      </motion.div>

      <div className="scroll-hint">
        <div className="sh-dot" />
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default Parallax;
