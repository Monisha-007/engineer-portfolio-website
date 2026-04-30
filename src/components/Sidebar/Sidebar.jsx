import { motion } from "framer-motion";
import Links from "./links/Links";
import "./sidebar.scss";
import ToggleButton from "./toggleButton/ToggleButton";

const bgVariants = {
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
};

const AnimatedMLogo = () => (
  <div className="sidebar-logo">
    <svg viewBox="0 0 44 44" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="mGlow">
          <feGaussianBlur stdDeviation="1.8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Background rect with animated border */}
      <motion.rect
        width="44"
        height="44"
        rx="11"
        fill="#050505"
        strokeWidth="1.5"
        animate={{ stroke: ["#ec4899", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Animated M stroke */}
      <motion.path
        d="M11 32 L11 12 L22 27 L33 12 L33 32"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#mGlow)"
        animate={{ stroke: ["#ec4899", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

const Sidebar = ({ open, setOpen }) => {
  const closeSidebar = () => setOpen(false);

  return (
    <>
      {open && <div className="overlay" onClick={closeSidebar} />}
      <div className="sidebar">
        <motion.div
          className="bg"
          variants={bgVariants}
          animate={open ? "open" : "closed"}
          initial="closed"
        >
          <div className="sidebar-header">
            <AnimatedMLogo />
            <span className="sidebar-title">Monisha R</span>
          </div>
          <Links closeSidebar={closeSidebar} />
          <div className="sidebar-footer">
            <span>Python Full Stack Developer</span>
          </div>
          <div className="accent-line" />
        </motion.div>
        <ToggleButton setOpen={setOpen} open={open} />
      </div>
    </>
  );
};

export default Sidebar;
