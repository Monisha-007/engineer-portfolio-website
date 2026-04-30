import "./Experience.scss";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";

const educationData = [
  {
    id: "1",
    location: "Tiruchirappalli, India",
    date: "2021 – 2025",
    title: "B.E. Electronics & Communication — Anna University BIT Campus | CGPA: 8.76",
    description: [
      "Bachelor of Engineering in Electronics & Communication Engineering.",
      "Certifications: Python for Data Science (IBM), GenAI Program (GVUI), Networking Essentials (Cisco).",
      "Training: Embedded Systems (Pantech), VLSI SoC Design (Maven Silicon).",
    ],
    css: "point1",
  },
  {
    id: "2",
    location: "Chennai, India",
    date: "2025 – Present",
    title: "Software Engineer / Python Full Stack Developer at Hibiz Solutions",
    description: [
      "Developed and maintained backend microservices using Python and FastAPI for enterprise-scale applications.",
      "Built RESTful APIs covering user management, analytics, reporting, and AI workflow automation.",
      "Integrated Azure OpenAI, Azure Cognitive Search, and RAG pipelines for intelligent document retrieval.",
      "Developed responsive frontend dashboards using React 18, TypeScript, and Tailwind CSS.",
      "Implemented real-time features using WebSockets, including live notifications, chat, and admin monitoring.",
      "Engineered JWT authentication, httpOnly cookie fallback, and permission-gated UI components.",
    ],
    css: "point2",
  },
];

const TimelineSVG = () => (
  <svg width="1087" height="142" viewBox="0 0 1087 142" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="f0" x="9" y="29" width="311" height="112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape"/>
      </filter>
      <filter id="f1" x="520" y="62" width="258" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape"/>
      </filter>
      <filter id="f2" x="767" y="29" width="314" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape"/>
      </filter>
      <filter id="f3" x="304" y="1" width="229" height="73" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape"/>
      </filter>
    </defs>
    <g>
      <path d="M13.0884 31C124.783 31 142.088 238.169 314.088 59.0948" stroke="#FFA500" strokeWidth="3" strokeDasharray="6 6"/>
    </g>
    <g>
      <path d="M525.088 64.841C627.088 52.0893 631.737 190.397 773.088 71.2169" stroke="#FFA500" strokeWidth="3" strokeDasharray="6 6"/>
    </g>
    <g>
      <path d="M1077.09 65C978.689 65 863.85 -16.25 772.588 71.5" stroke="#FFA500" strokeWidth="3" strokeDasharray="6 6"/>
    </g>
    <g>
      <path d="M529.088 63.6015C432.588 67 433.078 -74.3112 310.088 63.6015" stroke="#FFA500" strokeWidth="3" strokeDasharray="6 6"/>
    </g>
    {/* Right dot */}
    <circle cx="1074.09" cy="64.5" r="12.5" fill="#FFA500"/>
    {/* Left dot */}
    <path d="M25.0889 29.5C25.0889 36.4036 19.4924 42 12.5889 42C5.68531 42 0.0888672 36.4036 0.0888672 29.5C0.0888672 22.5964 5.68531 17 12.5889 17C19.4924 17 25.0889 22.5964 25.0889 29.5Z" fill="#FFA500"/>
  </svg>
);

// Card 1 appears at 0.4s (while line is drawing on left side)
// Card 2 appears at 2.6s (after the 2.4s line draw finishes)
const CARD_DELAYS = [0.4, 2.6];

const EducationPoint = ({ css, location, date, title, description, index, sectionInView }) => {
  const delay = CARD_DELAYS[index] ?? 0.4;

  const variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.div className={`education-point ${css}`} initial="hidden" variants={variants} animate={sectionInView ? "visible" : "hidden"}>
      <div className="experience-card">
        <div className="date-location">
          <span className="location">
            <FaLocationDot size="17px" /> {location}
          </span>
          <span className="date">{date}</span>
        </div>
        <h3 className="title">{title}</h3>
        {description && description.map((desc, i) => (
          <p key={i} className="description">{desc}</p>
        ))}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <motion.div ref={ref} className="education">
      <h1>Experience</h1>
      <div className="education-timeline">
        {inView && (
          <div className="svg-container">
            <TimelineSVG />
          </div>
        )}
        {educationData.map((point, index) => (
          <EducationPoint key={point.id} {...point} index={index} sectionInView={inView} />
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
