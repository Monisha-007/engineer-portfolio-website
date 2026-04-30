import { useEffect, useRef, useState } from "react";
import "./Contact.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CONTACT_EMAIL = "chithunisha14@gmail.com";
const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/chithunisha14@gmail.com";

const variants = {
  initial: {
    y: 80,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 738 : false,
  );
  const [introDone, setIntroDone] = useState(false);

  const [contentRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px",
  });

  const formRef = useRef();

  useEffect(() => {
    const onResize = () => setIsMobileViewport(window.innerWidth <= 738);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!inView) {
      setIntroDone(false);
      return;
    }

    const introDelayMs = isMobileViewport ? 1250 : 1900;
    const timer = window.setTimeout(() => setIntroDone(true), introDelayMs);
    return () => window.clearTimeout(timer);
  }, [inView, isMobileViewport]);

  const showPhoneIllustration = inView && !introDone;
  const showForm = inView && introDone;

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(false);
    setSuccess(false);

    const formData = new FormData(formRef.current);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setError(true);
      setResponseMessage("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      setResponseMessage("Please enter a valid email address.");
      return;
    }

    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);
    formData.set("_subject", `Portfolio contact from ${name}`);
    formData.set("_captcha", "false");
    formData.set("_template", "table");

    try {
      setIsSubmitting(true);
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Message send failed");
      }

      setSuccess(true);
      setResponseMessage("Message sent to Monisha!");
      formRef.current.reset();
    } catch (err) {
      setError(true);
      setResponseMessage(`Could not send now. Mail Monisha directly: ${CONTACT_EMAIL}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toastVariants = {
    initial: { opacity: 1, y: 0 },
    animate: {
      opacity: 0,
      y: 50,
      transition: { delay: 4, duration: 1 },
    },
  };

  return (
    <motion.div className="contact">
      <motion.div
        className="content"
        variants={variants}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        ref={contentRef}
      >
        <motion.div className="textContainer" variants={variants}>
          <motion.h1 variants={variants}>Contact Me</motion.h1>
          <motion.div className="item" variants={variants}>
            <h2>Mail</h2>
            <span>{CONTACT_EMAIL}</span>
          </motion.div>
          <motion.div className="item" variants={variants}>
            <h2>Phone</h2>
            <span>+91 8248550764</span>
          </motion.div>
          <motion.div className="item" variants={variants}>
            <h2>Location</h2>
            <span>Chennai, India</span>
          </motion.div>
          <motion.div className="item" variants={variants}>
            <h2>Social</h2>
            <div className="social">
              <motion.a
                href="https://linkedin.com/in/monisha-r27"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        <div className="formContainer">
          {showPhoneIllustration && (
            <motion.div
              className="phoneSvg"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: isMobileViewport ? 0.95 : 1.35, duration: 0.45 }}
            >
              <svg width="500px" height="700px" viewBox="0 0 80 120">
                <motion.path
                  strokeWidth={0.5}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: isMobileViewport ? 1.2 : 1.7 }}
                  d="M54.5058,18.9509c-0.0022-0.0026-0.0026-0.0059-0.0048-0.0085c-0.0224-0.0256-0.0533-0.0368-0.0776-0.0596    c-0.7969-0.7159-1.8391-1.1645-2.9922-1.1645H46.627V4.5234C46.627,2.5806,45.0464,1,43.1035,1H11.5938    C9.6509,1,8.0703,2.5806,8.0703,4.5234v54.9531C8.0703,61.4194,9.6509,63,11.5938,63h31.5098    c1.9429,0,3.5234-1.5806,3.5234-3.5234V43.6719h4.8042c1.2134,0,2.3118-0.4882,3.1218-1.2725    c0.0059-0.0059,0.014-0.0076,0.0198-0.0137c0.0016-0.0016,0.0019-0.0039,0.0035-0.0056c0.8331-0.8176,1.3535-1.9531,1.3535-3.2103    V22.2168C55.9297,20.9278,55.3774,19.7718,54.5058,18.9509z M51.4312,19.7183c0.1989,0,0.39,0.0293,0.5755,0.0734L38.1084,31.9175    L24.2022,19.793c0.1868-0.0447,0.3792-0.0747,0.5795-0.0747H51.4312z M33.4756,30.5323l-10.66,10.1625    c-0.3283-0.4235-0.5319-0.9485-0.5319-1.5248V22.2168c0-0.4269,0.1176-0.8231,0.307-1.175L33.4756,30.5323z M19.3521,3h15.9897    v1.3164c0,0.7256-0.5903,1.3159-1.3159,1.3159H20.668c-0.7256,0-1.3159-0.5903-1.3159-1.3159V3z M11.5938,3h5.7583v1.3164    c0,1.8286,1.4873,3.3159,3.3159,3.3159h13.3579c1.8286,0,3.3159-1.4873,3.3159-3.3159V3h5.7617    c0.8398,0,1.5234,0.6836,1.5234,1.5234v13.1948H24.7817c-1.1594,0-2.2072,0.4528-3.0056,1.1758    c-0.021,0.0201-0.0482,0.0295-0.0676,0.0518c-0.002,0.0023-0.0024,0.0054-0.0044,0.0077    c-0.8698,0.8208-1.4204,1.9758-1.4204,3.2633v0.1577h-3.8262c-0.5522,0-1,0.4478-1,1s0.4478,1,1,1h3.8262v4.2471h-3.8262    c-0.5522,0-1,0.4478-1,1s0.4478,1,1,1h3.8262v5.1733h-3.8262c-0.5522,0-1,0.4478-1,1s0.4478,1,1,1h3.8262v1.375    c0,2.4824,2.0176,4.502,4.498,4.502H44.627V55.749H10.0703V4.5234C10.0703,3.6836,10.7539,3,11.5938,3z M43.1035,61H11.5938    c-0.8398,0-1.5234-0.6836-1.5234-1.5234V57.749H44.627v1.7275C44.627,60.3164,43.9434,61,43.1035,61z M51.4312,41.6719H24.7817    c-0.0289,0-0.0556-0.0076-0.0842-0.0085l10.2917-9.8113l2.4619,2.1465c0.1885,0.1641,0.4229,0.2461,0.6572,0.2461    s0.4692-0.082,0.6572-0.2466l2.8806-2.5132l10.5753,10.0466C51.9716,41.6156,51.709,41.6719,51.4312,41.6719z M53.9297,39.1699    c0,0.3624-0.0811,0.7049-0.2201,1.0161L43.1602,30.1639l10.4601-9.1264c0.191,0.3529,0.3094,0.7506,0.3094,1.1793V39.1699z"
                />
              </svg>
            </motion.div>
          )}

          {showForm && (
            <motion.form
              onSubmit={sendEmail}
              initial={{ opacity: 0, y: isMobileViewport ? 24 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.7 }}
              ref={formRef}
            >
              <input type="text" required placeholder="Name" name="name" />
              <input type="text" required placeholder="Email" name="email" />
              <textarea
                rows={6}
                required
                placeholder="Message"
                name="message"
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
              {error && (
                <motion.div
                  className="error"
                  variants={toastVariants}
                  initial="initial"
                  animate="animate"
                  onAnimationComplete={() => setError(false)}
                >
                  {responseMessage}
                </motion.div>
              )}

              {success && (
                <motion.div
                  className="success"
                  variants={toastVariants}
                  initial="initial"
                  animate="animate"
                  onAnimationComplete={() => setSuccess(false)}
                >
                  {responseMessage}
                </motion.div>
              )}
            </motion.form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
