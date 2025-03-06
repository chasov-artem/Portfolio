import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";
import heroImage from "../../images/hero.png";

// Реєструємо плагіни
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const parallaxRef = useRef(null);
  const heroImageRef = useRef(null);
  const logoSvgRef = useRef(null); // Реф для SVG-логотипу
  const circleAnimation = useRef(null); // Реф для анімації кола
  const scrollTextRef = useRef(null); // Реф для нового заголовка
  const heartRef = useRef(null); // Реф для SVG-серця

  useEffect(() => {
    // Функція для додавання анімації до кола в SVG
    const addAnimationToCircle = () => {
      const svgElement = logoSvgRef.current;
      if (svgElement) {
        // Отримуємо доступ до внутрішнього вмісту SVG
        const svgDoc = svgElement.contentDocument;
        if (svgDoc) {
          const circle = svgDoc.querySelector("circle");
          if (circle) {
            // Створюємо анімацію обертання через GSAP
            circleAnimation.current = gsap.to(circle, {
              rotation: 360, // Обертання на 360 градусів
              duration: 2, // Тривалість анімації
              repeat: -1, // Безкінечне повторення
              ease: "linear", // Лінійна анімація
              transformOrigin: "center", // Центр обертання
              paused: true, // Анімація на паузі за замовчуванням
            });
          }
        }
      }
    };

    // Додаємо обробник події для завантаження SVG
    const svgElement = logoSvgRef.current;
    if (svgElement) {
      svgElement.addEventListener("load", addAnimationToCircle);
    }

    // Прибираємо обробник після завершення
    return () => {
      if (svgElement) {
        svgElement.removeEventListener("load", addAnimationToCircle);
      }
    };
  }, []);

  // Обробники для ховера
  const handleMouseEnter = () => {
    if (circleAnimation.current) {
      circleAnimation.current.play(); // Запускаємо анімацію
    }
  };

  const handleMouseLeave = () => {
    if (circleAnimation.current) {
      circleAnimation.current.pause(); // Зупиняємо анімацію
      circleAnimation.current.progress(0); // Скидаємо анімацію на початок
    }
  };

  useEffect(() => {
    if (
      !sidebarRef.current ||
      !titleRef.current ||
      !cursorRef.current ||
      !parallaxRef.current ||
      !heroImageRef.current ||
      !scrollTextRef.current ||
      !heartRef.current
    ) {
      console.error("One or more refs are missing!");
      return;
    }

    // Анімація для основного заголовка
    gsap.to(titleRef.current, {
      duration: 3,
      text: "Hi! I'm Artem, Front-End Developer :)",
      ease: "none",
      delay: 1,
      onComplete: () => {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      },
    });

    // Анімація для нового заголовка "Just Scroll It"
    gsap.to(scrollTextRef.current, {
      duration: 3,
      text: "Just Scroll It",
      ease: "none",
      delay: 4, // Затримка перед початком анімації
    });

    // Анімація для SVG-серця
    gsap.fromTo(
      heartRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 5, // Затримка перед початком анімації
        ease: "bounce.out",
      }
    );

    // Інші анімації (Sidebar, курсор, паралакс, зображення)
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

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut",
    });

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
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <aside ref={sidebarRef} className={styles.sidebar}>
      {/* Логотип через <object> для доступу до внутрішнього вмісту SVG */}
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
        <Link to="/" className={styles.navLink}>
          Projects
        </Link>
        <Link to="/about" className={styles.navLink}>
          About
        </Link>
        <Link to="/contact" className={styles.navLink}>
          Contact
        </Link>
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
          <FaGithub size={32} />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaLinkedin size={32} />
        </a>
        <a
          href="https://t.me/YourTelegramUsername"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaTelegramPlane size={32} />
        </a>
        <a
          href="https://www.instagram.com/YourInstagram/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaInstagram size={32} />
        </a>
      </div>

      <div ref={parallaxRef} className={styles.titleContainer}>
        <h1 ref={titleRef} className={styles.title}></h1>
        <span ref={cursorRef} className={styles.cursor}>
          |
        </span>
      </div>

      {/* Новий заголовок "Just Scroll It" з SVG-серцем */}
      <div className={styles.scrollTextContainer}>
        <h2 ref={scrollTextRef} className={styles.scrollText}></h2>
        <svg
          ref={heartRef}
          className={styles.heartIcon}
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </aside>
  );
};

export default Sidebar;
