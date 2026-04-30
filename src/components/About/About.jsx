import "./About.scss";
import { languages, frameworks, databases, machineLearning, testingFrameworks, tools } from "../../Assets/Technologies";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { isMobile } from "react-device-detect";

const Technology = ({ categoryName, techArray, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -30px 0px",
  });

  const containerVariants = {
    hidden: { x: isMobile ? 30 : 60, opacity: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: isMobile ? index * 0.08 : index * 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: isMobile ? 20 : 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.5 : 1.5,
      },
    },
  };

  return (
    <motion.div ref={ref} className="category" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
      <motion.div className="tech-list">
        <span className="category-name">{categoryName}</span>
        {techArray.map((tech) => (
          <motion.div key={tech.name} className="tech-item" variants={itemVariants}>
            <img src={tech.logo} alt={tech.name} className="tech-logo" />
            <span className="tech-name">{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const textVariants = {
    hidden: { x: isMobile ? 60 : 200, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const textVariants2 = {
    hidden: { x: isMobile ? -60 : -500, y: 0, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.7 : 1,
      },
    },
  };

  const sliderVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-220%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 20,
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  });
  return (
    <motion.div className="about" ref={ref}>
      <motion.div className="content" initial="hidden" animate={inView ? "visible" : "hidden"}>
        <motion.h1 variants={textVariants2}>About Me</motion.h1>
        {isMobile ? (
          <motion.p variants={textVariants2}>
            Python Full Stack Developer with <b>1+ year of experience</b> building production-grade AI platforms, RAG systems, and multi-tenant SaaS applications using FastAPI, React 18, TypeScript, and Azure OpenAI.
          </motion.p>
        ) : (
          <motion.p variants={textVariants2}>
            Python Full Stack Developer with <b>1+ year of professional experience</b> building production-grade AI-powered platforms, RAG (Retrieval-Augmented Generation) systems, and multi-tenant SaaS applications. Proficient in FastAPI, React 18, TypeScript, and WebSockets. Experienced in designing scalable microservice backends, real-time collaboration features, and cloud-deployed applications. Available for freelance projects in web development, AI integrations, and full-stack engineering.
          </motion.p>
        )}

        <motion.div className="technologies" animate={inView ? "visible" : "hidden"}>
          <motion.h1 variants={textVariants}>Skills</motion.h1>
          <motion.div className="groups">
            <Technology categoryName={"Languages & Backend"} techArray={languages} index={1} /> <Technology categoryName={"Frontend"} techArray={frameworks} index={2} />
            <Technology categoryName={"AI / GenAI"} techArray={databases} index={3} /> <Technology categoryName={"Cloud & DevOps"} techArray={machineLearning} index={4} />
            <Technology categoryName={"Databases"} techArray={testingFrameworks} index={5} />
            <Technology categoryName={"Tools"} techArray={tools} index={6} />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="slidingTextContainer" variants={sliderVariants} initial="initial" animate="animate">
        <div className="top">
          {" "}
          Full Stack Developer <br />
        </div>
        <div className="bottom">AI Specialist</div>
      </motion.div>
    </motion.div>
  );
};

export default About;
