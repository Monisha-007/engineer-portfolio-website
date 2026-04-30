import "./Freelancer.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";

const freelanceProjects = [
  {
    id: 1,
    icon: "🎨",
    title: "Resin Art E-Commerce",
    role: "Frontend Developer",
    year: "2025",
    desc: "Fully functional e-commerce website for a resin art business — product listings, customized image sharing, and direct WhatsApp query integration for seamless client communication and order tracking.",
    tags: ["React", "Tailwind CSS", "WhatsApp API"],
    accentColor: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.25)",
    borderColor: "rgba(139, 92, 246, 0.5)",
  },
  {
    id: 2,
    icon: "💼",
    title: "Software Engineer Portfolio",
    role: "Frontend Developer",
    year: "2025",
    desc: "Professional portfolio website for a software engineer client featuring project showcases, skills section, smooth animations, dark/light mode toggle, and fully responsive cross-browser layout.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.25)",
    borderColor: "rgba(6, 182, 212, 0.5)",
  },
];

const FreelanceCard = ({ project, index, sectionInView }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 20);
    setRotateX(-y * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div className="card-wrapper">
      <motion.div
        ref={cardRef}
        className="freelance-card"
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.18, duration: 0.7, ease: "easeOut" }}
        style={{
          rotateX,
          rotateY,
          boxShadow: isHovered
            ? `0 30px 70px ${project.glowColor}, 0 0 0 1px ${project.borderColor}, inset 0 1px 0 rgba(255,255,255,0.06)`
            : "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Ambient glow */}
        {isHovered && (
          <div
            className="card-ambient"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${project.glowColor} 0%, transparent 65%)`,
            }}
          />
        )}

        {/* Floating icon */}
        <motion.span
          className="card-icon"
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.8 + index * 0.6,
            ease: "easeInOut",
          }}
          style={{ filter: `drop-shadow(0 0 14px ${project.accentColor})` }}
        >
          {project.icon}
        </motion.span>

        {/* Meta row */}
        <div className="card-meta">
          <span className="card-role" style={{ color: project.accentColor }}>
            {project.role}
          </span>
          <span className="card-year">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="card-title">{project.title}</h3>

        {/* Divider */}
        <motion.div
          className="card-divider"
          style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={sectionInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.18, duration: 0.6 }}
        />

        {/* Description */}
        <p className="card-desc">{project.desc}</p>

        {/* Tags */}
        <div className="card-tags">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
              style={{
                borderColor: `${project.accentColor}50`,
                color: project.accentColor,
                background: `${project.accentColor}0d`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Corner badge */}
        <span
          className="card-badge"
          style={{
            background: `${project.accentColor}18`,
            color: project.accentColor,
            border: `1px solid ${project.accentColor}40`,
          }}
        >
          Freelance
        </span>
      </motion.div>
    </div>
  );
};

const Freelancer = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <div className="freelancer" ref={ref} id="Freelancer">
      {/* Dot-grid background */}
      <div className="dot-grid" />

      {/* Neon edge glow */}
      <div className="edge-glow top" />
      <div className="edge-glow bottom" />

      <div className="freelancer-content">
        {/* Header */}
        <div className="freelancer-header">
          <motion.div
            className="available-badge"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
          >
            <span className="badge-dot" />
            Available for Freelance
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            Freelance <span className="h1-accent">Work</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.38, duration: 0.7 }}
          >
            Independent client projects — from e-commerce platforms to developer portfolios.
          </motion.p>
        </div>

        {/* 3D Cards */}
        <div className="cards-grid">
          {freelanceProjects.map((project, index) => (
            <FreelanceCard
              key={project.id}
              project={project}
              index={index}
              sectionInView={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
