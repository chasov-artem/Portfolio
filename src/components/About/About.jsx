import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs } from "react-icons/si";

import styles from "./About.module.css";
import me from "../../../public/images/me.png";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const About = () => {
  const aboutRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutTextRef = useRef(null);
  const techStackRef = useRef(null);
  const aboutPhotoRef = useRef(null);

  useEffect(() => {
    if (
      !aboutRef.current ||
      !aboutTitleRef.current ||
      !aboutTextRef.current ||
      !techStackRef.current ||
      !aboutPhotoRef.current
    ) {
      console.error("Missing refs in About section!");
      return;
    }

    // 1. Fade out секції (аналог sidebar)
    gsap.to(aboutRef.current, {
      opacity: 0,
      y: -50,
      duration: 1.5,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top top",
        end: "900px top",
        scrub: true,
      },
    });

    // 2. Анімація заголовка (TextPlugin)
    gsap.to(aboutTitleRef.current, {
      duration: 2,
      text: "About Me",
      ease: "none",
      delay: 0.5,
    });

    // 3. Fade in тексту — без scrub
    gsap.fromTo(
      aboutTextRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        // Налаштовуємо один момент
        scrollTrigger: {
          trigger: aboutTextRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // 4. Паралакс для фото
    gsap.fromTo(
      aboutPhotoRef.current,
      { y: 0 },
      {
        y: -100,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // 5. Fade in стеку — без scrub
    gsap.fromTo(
      techStackRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: techStackRef.current,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={aboutRef} className={styles.aboutSection}>
      <h2 ref={aboutTitleRef} className={styles.title}></h2>

      <p ref={aboutTextRef} className={styles.description}>
        Passionate Front-End Developer skilled in HTML, CSS, JavaScript, React,
        and Redux, focused on creating user-friendly web solutions. Always eager
        to learn and grow in dynamic, fast-paced environments.
      </p>

      <h3 className={styles.smallTitle}>Tech Stacks:</h3>
      <div ref={techStackRef} className={styles.techStack}>
        <div className={styles.techItem}>
          <FaHtml5 className={styles.icon} />
          <span>HTML</span>
        </div>
        <div className={styles.techItem}>
          <FaCss3Alt className={styles.icon} />
          <span>CSS</span>
        </div>
        <div className={styles.techItem}>
          <FaJsSquare className={styles.icon} />
          <span>JavaScript</span>
        </div>
        <div className={styles.techItem}>
          <FaReact className={styles.icon} />
          <span>React</span>
        </div>
        <div className={styles.techItem}>
          <FaNodeJs className={styles.icon} />
          <span>Node</span>
        </div>
        <div className={styles.techItem}>
          <SiTypescript className={styles.icon} />
          <span>TypeScript</span>
        </div>
        <div className={styles.techItem}>
          <SiNextdotjs className={styles.icon} />
          <span>Next.js</span>
        </div>
      </div>

      <img ref={aboutPhotoRef} className={styles.photo} src={me} alt="Me" />
    </section>
  );
};

export default About;
