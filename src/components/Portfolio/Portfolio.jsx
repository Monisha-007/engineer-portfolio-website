import { useRef } from "react";
import "./portfolio.scss";
import * as svgs from "../../Assets/Logos/index";
import seekImg    from "../../Assets/Images/seek-platform.svg";
import ragImg     from "../../Assets/Images/product-rag.svg";
import assessqImg from "../../Assets/Images/assessq.svg";
import prideImg   from "../../Assets/Images/pride-studio.svg";
import { isMobile } from "react-device-detect";
import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

/* Per-project accent colours */
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
    link: null,
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
    link: null,
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
    link: null,
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
    link: null,
    techStack: [
      { name: "React",       logo: svgs.react       },
      { name: "TypeScript",  logo: svgs.typescript  },
      { name: "Tailwind CSS",logo: svgs.tailwindcss },
      { name: "Framer Motion",logo: svgs.react      },
      { name: "Context API", logo: svgs.javascript  },
    ],
  },
];

/* ── 3-D Tilt card ── */
const TiltCard = ({ children, className, style }) => {
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
      ref={ref} className={className} style={{ ...style, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { type: "spring", stiffness: 220, damping: 22 } }}
    >
      {children}
    </motion.div>
  );
};

/* ── Animated glowing border line ── */
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

/* ── Single project row ── */
const ProjectRow = ({ item, index }) => {
  const ac = ACCENTS[index % ACCENTS.length];
  const isOdd = isMobile ? true : item.id % 2 !== 0;

  /* staggered container */
  const wrap = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  };
  const slideLeft  = { hidden: { opacity: 0, x: -70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } };
  const slideRight = { hidden: { opacity: 0, x:  70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } };
  const slideUp    = { hidden: { opacity: 0, y:  40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

  return (
    <motion.section
      className="proj-row"
      variants={wrap}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.06 : 0.22 }}
    >
      <GlowLine color={ac.label} />

      <div className="proj-inner">
        {isOdd ? (
          <>
            {/* Image */}
            <motion.div className="proj-img-col" variants={slideLeft}>
              <TiltCard className="img-tilt">
                <div className="img-card-shell" style={{ borderColor: ac.border, boxShadow: `0 0 50px ${ac.glow}, 0 24px 64px rgba(0,0,0,0.55)` }}>
                  {/* Animated corner brackets */}
                  <span className="bracket tl" style={{ borderColor: ac.label }} />
                  <span className="bracket tr" style={{ borderColor: ac.label }} />
                  <span className="bracket bl" style={{ borderColor: ac.label }} />
                  <span className="bracket br" style={{ borderColor: ac.label }} />
                  <img src={item.img} alt={item.title} />
                  <div className="img-scan" />
                  {/* Floating tag */}
                  <span className="img-tag" style={{ background: ac.bg, borderColor: ac.border, color: ac.label }}>
                    {item.tag}
                  </span>
                </div>
              </TiltCard>
            </motion.div>

            {/* Text */}
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
                  <span className="img-tag" style={{ background: ac.bg, borderColor: ac.border, color: ac.label }}>
                    {item.tag}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
};

const ProjText = ({ item, ac, slideUp }) => (
  <>
    <motion.span className="proj-num" style={{ color: ac.label }} variants={slideUp}>
      0{item.id} ──
    </motion.span>

    <motion.h2 variants={slideUp}>{item.title}</motion.h2>

    <motion.p variants={slideUp}>{item.desc}</motion.p>

    {/* Tech pills */}
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

/* ── Portfolio container ── */
const Portfolio = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <div className="portfolio-ai" ref={ref}>
      {/* Sticky header */}
      <div className="portfolio-header">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          // Featured Projects
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Work
        </motion.h1>
        <motion.div style={{ scaleX }} className="progress-bar" />
      </div>

      {/* Projects */}
      {items.map((item, i) => (
        <ProjectRow key={item.id} item={item} index={i} />
      ))}
    </div>
  );
};

export default Portfolio;
