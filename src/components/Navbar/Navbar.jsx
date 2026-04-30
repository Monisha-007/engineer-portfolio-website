import "./Navbar.scss";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#Homepage" },
  { label: "About", href: "#About" },
  { label: "Projects", href: "#Portfolio" },
  { label: "Experience", href: "#Experience" },
  { label: "Contact", href: "#Contact" },
];

const Navbar = () => {
  return (
    <motion.div
      className="navbar-ai"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="nav-inner">
        {/* Logo */}
        <a href="#Homepage" className="nav-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Monisha</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        {/* Nav links */}
        <nav className="nav-links">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="nav-link"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="nav-actions">
          <motion.a
            href="https://linkedin.com/in/monisha-r27"
            target="_blank"
            rel="noreferrer"
            className="linkedin-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.07, boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
          >
            LinkedIn ↗
          </motion.a>
          <motion.a
            href="https://github.com/Monisha-007"
            target="_blank"
            rel="noreferrer"
            className="github-nav-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.07, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
          >
            GitHub ↗
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
