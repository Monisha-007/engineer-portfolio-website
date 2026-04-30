import { motion } from "framer-motion";

const variants = {
  open: { transition: { staggerChildren: 0.08 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: -30, opacity: 0 },
};

const navItems = [
  { label: "Homepage", num: "01" },
  { label: "About", num: "02" },
  { label: "Portfolio", num: "03" },
  { label: "Freelancer", num: "04" },
  { label: "Experience", num: "05" },
  { label: "Contact", num: "06" },
];

const Links = ({ closeSidebar }) => {
  return (
    <motion.div className="links" variants={variants}>
      {navItems.map(({ label, num }) => (
        <motion.a
          href={`#${label}`}
          key={label}
          variants={itemVariants}
          whileHover={{ x: 8 }}
          whileTap={{ scale: 0.97 }}
          onClick={closeSidebar}
          className="nav-link"
        >
          <span className="nav-num">{num}</span>
          <span className="nav-label">{label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Links;
