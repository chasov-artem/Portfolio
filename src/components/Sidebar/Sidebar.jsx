import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import heroImage from "../../images/hero.png";

gsap.registerPlugin(ScrollTrigger, TextPlugin); // Реєструємо плагіни

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const titleRef = useRef(null); // Реф для заголовка
  const cursorRef = useRef(null); // Реф для курсору
  const parallaxRef = useRef(null); // Реф для паралакс-ефекту

  useEffect(() => {
    // Анімація для Sidebar (як у вашому оригінальному коді)
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

    // Анімація "друкування" тексту
    gsap.to(titleRef.current, {
      duration: 3, // Тривалість анімації
      text: "Hi! I'm Artem, Front-End Developer", // Текст, який з'являється
      ease: "none", // Лінійна анімація
      delay: 1, // Затримка перед початком анімації
      onComplete: () => {
        // Приховуємо курсор після завершення анімації
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      },
    });

    // Анімація блимання курсору
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1, // Безкінечне повторення
      yoyo: true, // Зворотна анімація
      duration: 0.5,
      ease: "power1.inOut",
    });

    // Паралакс-ефект для заголовка
    gsap.fromTo(
      parallaxRef.current,
      { y: 0 }, // Початкова позиція
      {
        y: -100, // Кінцева позиція (рух вгору)
        scrollTrigger: {
          trigger: sidebarRef.current, // Тригер для паралаксу
          start: "top bottom", // Початок анімації, коли верх Sidebar досягає низу в’юпорта
          end: "bottom top", // Кінець анімації, коли низ Sidebar досягає верху в’юпорта
          scrub: 1, // Плавна анімація при прокрутці
        },
      }
    );
  }, []);

  return (
    <aside ref={sidebarRef} className={styles.sidebar}>
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

      <img className={styles.heroImage} src={heroImage} alt="hero" />
      <div className={styles.socials}>
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      {/* <h2 className={styles.smallTitle}>Welcome to Chasov Dev Portfolio</h2> */}
      <div ref={parallaxRef} className={styles.titleContainer}>
        <h1 ref={titleRef} className={styles.title}></h1>
        <span ref={cursorRef} className={styles.cursor}>
          |
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
