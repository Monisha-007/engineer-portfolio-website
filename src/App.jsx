import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./app.scss";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Parallax from "./components/Parallax/Parallax";
import Portfolio from "./components/Portfolio/Portfolio";
import Experience from "./components/Experience/Experience";
import Sidebar from "./components/Sidebar/Sidebar";
import Freelancer from "./components/Freelancer/Freelancer";
import AIBackground from "./components/AIBackground/AIBackground";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 738 : false,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 738);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="app-root">
      {/* Global AI brain background — fixed, behind everything */}
      <AIBackground />

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <motion.div
        className="page-content"
        animate={{ x: sidebarOpen && !isMobile ? 280 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
      >
        <section id="Homepage">
          <Navbar />
          <Home />
        </section>
        <section id="About">
          <About />
        </section>
        <section id="Portfolio">
          <Parallax />
        </section>
        <Portfolio />
        <section id="Freelancer">
          <Freelancer />
        </section>
        <section id="Experience">
          <Experience />
        </section>
        <section id="Contact">
          <Contact />
        </section>
      </motion.div>
    </div>
  );
};

export default App;
