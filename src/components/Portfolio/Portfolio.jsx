import { useRef } from "react";
import "./portfolio.scss";
import * as svgs from "../../Assets/Logos/index";
import seekImg    from "../../Assets/Images/seek-platform.svg";
import ragImg     from "../../Assets/Images/product-rag.svg";
import assessqImg from "../../Assets/Images/assessq.svg";
import prideImg   from "../../Assets/Images/pride-studio.svg";
import { isMobile } from "react-device-detect";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";

const ACCENTS = [
  { border: "rgba(124,58,237,0.55)", glow: "rgba(124,58,237,0.18)", label: "#a78bfa", bg: "rgba(124,58,237,0.04)" },
  { border: "rgba(6,182,212,0.55)",  glow: "rgba(6,182,212,0.18)",  label: "#67e8f9", bg: "rgba(6,182,212,0.04)"  },
  { border: "rgba(236,72,153,0.55)", glow: "rgba(236,72,153,0.18)", label: "#f9a8d4", bg: "rgba(236,72,153,0.04)" },
  { border: "rgba(124,58,237,0.55)", glow: "rgba(124,58,237,0.18)", label: "#a78bfa", bg: "rgba(124,58,237,0.04)" },
];

const items = [
  {
    id: 1,
    tag: "SaaS · AI · RAG",
    title: "SEEK — AI-Powered Web Intelligence Platform",
    img: seekImg,
    desc: "Architected a multi-tenant SaaS platform with web scraping, social media data collection (LinkedIn, Instagram, Twitter), and AI-powered knowledge management with real-time multi-user collaboration. Engineered async Azure Container Apps message processor using Playwright for concurrent scrape/crawl jobs via Azure Service Bus, with results indexed into Azure Cognitive Search via vector embeddings for RAG retrieval.",
    techStack: [
      { name: "FastAPI",      logo: svgs.python      },
      { name: "React 18",     logo: svgs.react       },
      { name: "Azure OpenAI", logo: svgs.azure       },
      { name: "MongoDB",      logo: svgs.mongodb     },
      { name: "Docker",       logo: svgs.docker      },
    ],
  },
  {
    id: 2,
    tag: "AI · Document · Streaming",
    title: "Product-RAG — AI Document Intelligence",
    img: ragImg,
    desc: "Built a modular React 18 frontend with dynamic route loading, permission-gated UI, and real-time chat with WebSocket streaming and markdown/graph rendering. Implemented two-stage RAG pipeline: PDF chunking via Azure Service Bus → Redis caching → vector embedding → Azure Cognitive Search indexing with live job tracking.",
    techStack: [
      { name: "React 18",       logo: svgs.react         },
      { name: "FastAPI",        logo: svgs.python        },
      { name: "Azure OpenAI",   logo: svgs.azure         },
      { name: "WebSockets",     logo: svgs.javascript    },
      { name: "GitHub Actions", logo: svgs.githubactions },
    ],
  },
  {
    id: 3,
    tag: "AI · Hiring · Proctoring",
    title: "AssessQ — AI Technical Assessment Platform",
    img: assessqImg,
    desc: "Developed an AI-powered hiring platform with automated interview generation, resume parsing, and adaptive multi-session interview engine with dynamic question generation. Implemented real-time proctoring system with violation detection, session monitoring, and JWT-based authentication with role-based access control.",
    techStack: [
      { name: "React 18",   logo: svgs.react       },
      { name: "TypeScript", logo: svgs.typescript  },
      { name: "FastAPI",    logo: svgs.python      },
      { name: "WebSockets", logo: svgs.javascript  },
      { name: "PostgreSQL", logo: svgs.mysql       },
    ],
  },
  {
    id: 4,
    tag: "AI · Content · Studio",
    title: "PRIDE — AI-Powered Content Studio",
    img: prideImg,
    desc: "Designed a dynamic template management system and real-time PDF preview with accessible components (ARIA standards). Developed responsive UI using Tailwind CSS and Framer Motion with dark/light mode theming. Managed application state with React Hooks and Context API, optimized rendering with React.memo and useCallback.",
    techStack: [
      { name: "React",        logo: svgs.react       },
      { name: "TypeScript",   logo: svgs.typescript  },
      { name: "Tailwind CSS", logo: svgs.tailwindcss },
      { name: "Framer Motion",logo: svgs.react       },
      { name: "Context API",  logo: svgs.javascript  },
    ],
  },
];

/* ── 3-D Tilt image card ── */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]),  { stiffness: 110, damping: 18 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 110, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref} className={className}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { type: "spring", stiffness: 220, damping: 22 } }}
    >
      {children}
    </motion.div>
  );
};

/* ── Glowing separator ── */
const GlowLine = ({ color }) => (
  <motion.div
    className="glow-line"
    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  />
);

/* ── Hex neural-network background ── */
const hexPts = (cx, cy, r) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

const p2s = pts => pts.map(p => p.join(",")).join(" ");

const HexBackground = () => {
  const cx = 350, cy = 350;
  const o = hexPts(cx, cy, 280);
  const m = hexPts(cx, cy, 175);
  const inn = hexPts(cx, cy, 88);

  const colorDots = [
    ...o.map((p, i) => ({ p, c: ["#67e8f9","#f9a8d4","#a78bfa","#67e8f9","#f9a8d4","#a78bfa"][i], r: 5.5 })),
    ...m.map((p, i) => ({ p, c: ["#a78bfa","#67e8f9","#f9a8d4","#a78bfa","#67e8f9","#f9a8d4"][i], r: 4 })),
    { p: [(o[0][0]+o[1][0])/2,(o[0][1]+o[1][1])/2], c: "#f9a8d4", r: 4 },
    { p: [(o[1][0]+o[2][0])/2,(o[1][1]+o[2][1])/2], c: "#67e8f9", r: 3.5 },
    { p: [(o[3][0]+o[4][0])/2,(o[3][1]+o[4][1])/2], c: "#a78bfa", r: 4 },
    { p: [(o[4][0]+o[5][0])/2,(o[4][1]+o[5][1])/2], c: "#f9a8d4", r: 3.5 },
  ];

  const labels = [
    { x: o[5][0]-10, y: o[5][1]-18, t: "Embeddings" },
    { x: o[0][0]+18, y: o[0][1]+8,  t: "Neural Cortex" },
    { x: o[1][0]+8,  y: o[1][1]+12, t: "LLM" },
    { x: m[3][0]+10, y: m[3][1]+14, t: "RAG" },
    { x: m[4][0]-62, y: m[4][1]+5,  t: "Vector DB" },
  ];

  return (
    <div className="hex-bg-wrap" aria-hidden="true">
      <svg viewBox="0 0 700 700" className="hex-bg-svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="hOrbG" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(167,139,250,0.55)" />
            <stop offset="55%"  stopColor="rgba(124,58,237,0.14)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Hex polygon grid */}
        <g fill="none" stroke="rgba(124,58,237,0.22)" strokeWidth="0.9">
          <polygon points={p2s(o)} />
          <polygon points={p2s(m)} />
          <polygon points={p2s(inn)} />
        </g>

        {/* Cross lines through center */}
        <g stroke="rgba(124,58,237,0.18)" strokeWidth="0.7" fill="none">
          {[[0,3],[1,4],[2,5]].map(([a,b],i) => (
            <line key={i} x1={o[a][0]} y1={o[a][1]} x2={o[b][0]} y2={o[b][1]} />
          ))}
        </g>

        {/* Spoke lines outer→mid→inner */}
        <g stroke="rgba(6,182,212,0.14)" strokeWidth="0.6" fill="none">
          {o.map((p, i) => (
            <g key={i}>
              <line x1={p[0]} y1={p[1]} x2={m[i][0]} y2={m[i][1]} />
              <line x1={m[i][0]} y1={m[i][1]} x2={inn[i][0]} y2={inn[i][1]} />
            </g>
          ))}
        </g>

        {/* Diagonal connectors outer↔mid */}
        <g stroke="rgba(6,182,212,0.12)" strokeWidth="0.6" fill="none">
          {o.map((p, i) => (
            <g key={i}>
              <line x1={p[0]} y1={p[1]} x2={m[(i+5)%6][0]} y2={m[(i+5)%6][1]} />
              <line x1={p[0]} y1={p[1]} x2={m[(i+1)%6][0]} y2={m[(i+1)%6][1]} />
            </g>
          ))}
        </g>

        {/* Central orb */}
        <circle cx={cx} cy={cy} r="95" fill="url(#hOrbG)" />
        <circle cx={cx} cy={cy} r="58" fill="none" stroke="rgba(6,182,212,0.28)" strokeWidth="1" strokeDasharray="7 4" className="hOrb-ring1" />
        <circle cx={cx} cy={cy} r="36" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.38)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="15" fill="rgba(167,139,250,0.7)" className="hOrb-core" />

        {/* Colored dots */}
        {colorDots.map((d, i) => (
          <g key={i}>
            <circle cx={d.p[0]} cy={d.p[1]} r={d.r + 4} fill={d.c} opacity="0.12" />
            <circle cx={d.p[0]} cy={d.p[1]} r={d.r} fill={d.c} opacity="0.85" className={`hDot hDot-${i % 5}`} />
          </g>
        ))}

        {/* Labels */}
        {labels.map((l, i) => (
          <text key={i} x={l.x} y={l.y} fontSize="9" fill="rgba(167,139,250,0.45)" fontFamily="Courier New" letterSpacing="1.5">
            {l.t}
          </text>
        ))}
      </svg>
      <div className="hex-bg-glow" />
    </div>
  );
};

/* ── Floating 3D wireframe blocks ── */
const BLOCK_CONFIGS = [
  { top: "8%",  left:  "0.8%", size: 34, spinDur: 9,  floatDur: 7,  delay: 0    },
  { top: "55%", left:  "1.2%", size: 22, spinDur: 13, floatDur: 9,  delay: 0.3  },
  { top: "18%", right: "0.8%", size: 28, spinDur: 11, floatDur: 8,  delay: 0.15 },
  { top: "68%", right: "1.2%", size: 18, spinDur: 8,  floatDur: 11, delay: 0.45 },
  { top: "38%", left:  "1.8%", size: 16, spinDur: 16, floatDur: 6,  delay: 0.6  },
  { top: "82%", right: "1.8%", size: 20, spinDur: 12, floatDur: 8,  delay: 0.25 },
];

const FloatingBlocks = () => (
  <div className="floating-blocks" aria-hidden="true">
    {BLOCK_CONFIGS.map((b, i) => (
      <motion.div
        key={i}
        className="fb-wrap"
        style={{ top: b.top, left: b.left, right: b.right, width: b.size, height: b.size,
                 animationDuration: `${b.floatDur}s`, animationDelay: `-${i * 1.1}s` }}
        initial={{ opacity: 0, scale: 0, rotateY: -120 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ delay: b.delay, duration: 0.7, type: "spring", stiffness: 180, damping: 18 }}
      >
        <div className="fb-cube" style={{ "--fb-size": `${b.size}px`, animationDuration: `${b.spinDur}s`, animationDelay: `-${i * 1.8}s` }}>
          <div className="fb-face fb-front" /><div className="fb-face fb-back" />
          <div className="fb-face fb-left"  /><div className="fb-face fb-right" />
          <div className="fb-face fb-top"   /><div className="fb-face fb-bot"   />
        </div>
      </motion.div>
    ))}
  </div>
);

/* ── Project text ── */
const ProjText = ({ item, ac, slideUp }) => (
  <>
    <motion.span className="proj-num" style={{ color: ac.label }} variants={slideUp}>
      0{item.id} ──
    </motion.span>
    <motion.h2 variants={slideUp}>{item.title}</motion.h2>
    <motion.p variants={slideUp}>{item.desc}</motion.p>
    <motion.div className="tech-pills" variants={slideUp}>
      {item.techStack.map((t, i) => (
        <motion.div
          key={t.name}
          className="tech-pill"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 + i * 0.07, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08, y: -2 }}
          style={{ borderColor: ac.border }}
        >
          <img src={t.logo} alt={t.name} />
          <span>{t.name}</span>
        </motion.div>
      ))}
    </motion.div>
  </>
);

/* ── Single project row ── */
const ProjectRow = ({ item, index }) => {
  const ac = ACCENTS[index % ACCENTS.length];
  const isOdd = isMobile ? true : item.id % 2 !== 0;

  const wrap = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.08 } },
  };
  const slideLeft  = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } };
  const slideRight = { hidden: { opacity: 0, x:  60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } };
  const slideUp    = { hidden: { opacity: 0, y:  30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <motion.section
      className="proj-row"
      variants={wrap}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.04 }}
    >
      <GlowLine color={ac.label} />
      <div className="proj-inner">
        {isOdd ? (
          <>
            <motion.div className="proj-img-col" variants={slideLeft}>
              <TiltCard className="img-tilt">
                <div className="img-card-shell" style={{ borderColor: ac.border, boxShadow: `0 0 50px ${ac.glow}, 0 24px 64px rgba(0,0,0,0.55)` }}>
                  <span className="bracket tl" style={{ borderColor: ac.label }} />
                  <span className="bracket tr" style={{ borderColor: ac.label }} />
                  <span className="bracket bl" style={{ borderColor: ac.label }} />
                  <span className="bracket br" style={{ borderColor: ac.label }} />
                  <img src={item.img} alt={item.title} />
                  <div className="img-scan" />
                  <span className="img-tag" style={{ background: ac.bg, borderColor: ac.border, color: ac.label }}>{item.tag}</span>
                </div>
              </TiltCard>
            </motion.div>
            <motion.div className="proj-text-col" variants={slideRight}>
              <ProjText item={item} ac={ac} slideUp={slideUp} />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div className="proj-text-col" variants={slideLeft}>
              <ProjText item={item} ac={ac} slideUp={slideUp} />
            </motion.div>
            <motion.div className="proj-img-col" variants={slideRight}>
              <TiltCard className="img-tilt">
                <div className="img-card-shell" style={{ borderColor: ac.border, boxShadow: `0 0 50px ${ac.glow}, 0 24px 64px rgba(0,0,0,0.55)` }}>
                  <span className="bracket tl" style={{ borderColor: ac.label }} />
                  <span className="bracket tr" style={{ borderColor: ac.label }} />
                  <span className="bracket bl" style={{ borderColor: ac.label }} />
                  <span className="bracket br" style={{ borderColor: ac.label }} />
                  <img src={item.img} alt={item.title} />
                  <div className="img-scan" />
                  <span className="img-tag" style={{ background: ac.bg, borderColor: ac.border, color: ac.label }}>{item.tag}</span>
                </div>
              </TiltCard>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
};

/* ── Portfolio container ── */
const Portfolio = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <div className="portfolio-ai" ref={ref}>
      {/* Hex neural network background */}
      <HexBackground />
      {/* Ambient glow orbs */}
      <div className="pf-orb orb-purple" />
      <div className="pf-orb orb-cyan"   />
      <div className="portfolio-header">
        <motion.p className="section-label" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          // Featured Projects
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          My Work
        </motion.h1>
        <motion.div style={{ scaleX }} className="progress-bar" />
      </div>
      {items.map((item, i) => (
        <ProjectRow key={item.id} item={item} index={i} />
      ))}
    </div>
  );
};

export default Portfolio;
