import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";
import heroImage from "../../../public/images/hero.webp";
import { PiHeartFill } from "react-icons/pi";

// Реєструємо плагіни
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const parallaxRef = useRef(null);
  const heroImageRef = useRef(null);
  const logoSvgRef = useRef(null);
  const circleAnimation = useRef(null);
  const scrollTextRef = useRef(null);
  const heartRef = useRef(null);

  useEffect(() => {
    // Функція для анімації кола в SVG
    const addAnimationToCircle = () => {
      const svgElement = logoSvgRef.current;
      if (svgElement) {
        const svgDoc = svgElement.contentDocument;
        if (svgDoc) {
          const circle = svgDoc.querySelector("circle");
          if (circle) {
            circleAnimation.current = gsap.to(circle, {
              rotation: 360,
              duration: 1,
              repeat: -1,
              ease: "linear",
              transformOrigin: "center",
              paused: true, // крутитиметься лише при hover
            });
          }
        }
      }
    };

    const svgElement = logoSvgRef.current;
    if (svgElement) {
      svgElement.addEventListener("load", addAnimationToCircle);
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener("load", addAnimationToCircle);
      }
    };
  }, []);

  // Hover-анімація для логотипа
  const handleMouseEnter = () => {
    if (circleAnimation.current) {
      circleAnimation.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (circleAnimation.current) {
      circleAnimation.current.pause();
      circleAnimation.current.progress(0);
    }
  };

  useEffect(() => {
    // Перевірка, чи всі рефи доступні
    if (
      sidebarRef.current &&
      titleRef.current &&
      cursorRef.current &&
      parallaxRef.current &&
      heroImageRef.current &&
      scrollTextRef.current &&
      heartRef.current
    ) {
      // Анімація для основного заголовка (друкованого)
      gsap.to(titleRef.current, {
        duration: 3,
        text: "Hi! I'm Artem, Front-End Developer :)",
        ease: "none",
        delay: 1,
        onComplete: () => {
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.5 });
        },
      });

      // Анімація для тексту "Just Scroll It"
      gsap.fromTo(
        scrollTextRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          delay: 2,
          ease: "power2.out",
        }
      );

      // Анімація для серця
      gsap.fromTo(
        heartRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 3,
          ease: "bounce.out",
          onComplete: () => {
            gsap.to(heartRef.current, {
              scale: 1.2,
              repeat: -1,
              yoyo: true,
              duration: 0.5,
              ease: "power1.inOut",
            });
          },
        }
      );

      // Анімація зникнення Sidebar при скролі
      gsap.to(sidebarRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.5,
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top top",
          end: "100px top",
          scrub: true,
        },
      });

      // Анімація курсора
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut",
      });

      // Паралакс для блоку titleContainer
      gsap.fromTo(
        parallaxRef.current,
        { y: 0 },
        {
          y: -100,
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Плавна поява heroImage
      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.5,
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top 100%",
            end: "top 10%",
            scrub: true,
          },
        }
      );
    } else {
      console.error("One or more refs are missing!");
    }
  }, []);

  return (
    <aside ref={sidebarRef} className={styles.sidebar}>
      <div className={styles.backgroundText}>~Portfolio~</div>

      <div
        className={styles.logoContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <object
          ref={logoSvgRef}
          type="image/svg+xml"
          data="/logo.svg"
          className={styles.logo}
        >
          Your browser does not support SVG
        </object>
      </div>

      <nav className={styles.nav}>
        <a href="#about" className={styles.navLink}>
          About
        </a>
        <a href="#myProjects" className={styles.navLink}>
          Projects
        </a>
        <a href="#myContacts" className={styles.navLink}>
          Contacts
        </a>
      </nav>

      <img
        ref={heroImageRef}
        className={styles.heroImage}
        src={heroImage}
        alt="hero"
      />

      <div className={styles.socials}>
        <a
          href="https://github.com/chasov-artem"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/artem-chasov-504a351aa"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://t.me/chasovartem"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaTelegramPlane />
        </a>
        <a
          href="https://www.instagram.com/be_real_awesome_instead"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaInstagram />
        </a>
      </div>

      <div ref={parallaxRef} className={styles.titleContainer}>
        {/* Резервуємо місце для друкованого тексту, щоб не було «стриба́нь» */}
        <div className={styles.titleWrap}>
          <h1 ref={titleRef} className={styles.title}></h1>
          <span ref={cursorRef} className={styles.cursor}>
            |
          </span>
        </div>
      </div>

      <div className={styles.scrollTextContainer}>
        <h2 ref={scrollTextRef} className={styles.scrollText}>
          Just Scroll It
        </h2>
        <PiHeartFill ref={heartRef} className={styles.heartIcon} />
      </div>
    </aside>
  );
};

export default Sidebar;
