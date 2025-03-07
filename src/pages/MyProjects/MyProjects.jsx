import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Іконки
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaJsSquare } from "react-icons/fa";
import { SiRedux } from "react-icons/si";

import styles from "./MyProjects.module.css";
import { projects } from "../../projectsData";

gsap.registerPlugin(ScrollTrigger);

// Відповідність стеку і його іконки
const techIcons = {
  HTML: <FaHtml5 />,
  CSS: <FaCss3 />,
  JS: <FaJsSquare />,
  React: <FaReact />,
  Redux: <SiRedux />,
  Node: <FaNodeJs />,
  // Додавайте інші стек-технології
};

const Projects = () => {
  const containerRef = useRef(null);
  const projectsRef = useRef([]);
  const myProjectsTitleRef = useRef(null); // Заголовок "My Projects"
  const arrowsRef = useRef(null); // Контейнер для стрілок
  const lenisRef = useRef(null); // Збережемо Lenis тут

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.02,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Налаштування ScrollTrigger + Lenis
    ScrollTrigger.scrollerProxy(containerRef.current, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    // Паралакс + зникнення для заголовка "My Projects"
    gsap.fromTo(
      myProjectsTitleRef.current,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "100px top",
          scrub: true,
        },
      }
    );

    // Показ/приховування стрілок, коли секція в полі зору
    gsap.set(arrowsRef.current, { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom", // Коли верх секції з'являється знизу
      end: "bottom top", // Коли низ секції уходить нагору
      scroller: containerRef.current,
      onEnter: () => gsap.to(arrowsRef.current, { autoAlpha: 1 }),
      onLeave: () => gsap.to(arrowsRef.current, { autoAlpha: 0 }),
      onEnterBack: () => gsap.to(arrowsRef.current, { autoAlpha: 1 }),
      onLeaveBack: () => gsap.to(arrowsRef.current, { autoAlpha: 0 }),
    });

    // GSAP-анімації для кожного проекту
    projectsRef.current.forEach((project, index) => {
      if (!project) return;

      const isEven = index % 2 === 0;
      const img = project.querySelector(`.${styles.imageWrapper}`);
      const text = project.querySelector(`.${styles.textWrapper}`);

      // Початкові стилі
      gsap.set([img, text], {
        opacity: 0,
        y: "20%",
        x: isEven ? "20%" : "-20%",
      });

      // Анімація для зображення
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 70%",
          end: "top -50%",
          scrub: 1,
          scroller: containerRef.current,
        },
      });

      imgTl
        .fromTo(
          img,
          { opacity: 0, y: "20%", x: isEven ? "20%" : "-20%" },
          { opacity: 1, y: "0%", x: "0%", duration: 0.5, ease: "power2.out" }
        )
        .to(img, {
          opacity: 0,
          y: "-20%",
          x: isEven ? "20%" : "-20%",
          duration: 0.5,
          ease: "power2.in",
        });

      // Анімація для тексту
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 70%",
          end: "top -50%",
          scrub: 1,
          scroller: containerRef.current,
        },
      });

      textTl
        .fromTo(
          text,
          { opacity: 0, y: "20%", x: isEven ? "-20%" : "20%" },
          { opacity: 1, y: "0%", x: "0%", duration: 0.5, ease: "power2.out" }
        )
        .to(text, {
          opacity: 0,
          y: "-20%",
          x: isEven ? "-20%" : "20%",
          duration: 0.5,
          ease: "power2.in",
        });
    });

    // Оновлення ScrollTrigger після завантаження зображень
    const images = document.querySelectorAll(`.${styles.image}`);
    images.forEach((img) => {
      img.onload = () => ScrollTrigger.refresh();
    });

    // Додаткове перезавантаження для безпеки
    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh(true);
    }, 200);

    return () => lenis.destroy();
  }, []);

  // Функція для стрілок
  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: false });
    }
  };
  const scrollToBottom = () => {
    if (lenisRef.current) {
      // Прокрутка до нижньої частини контейнера
      lenisRef.current.scrollTo(document.body.scrollHeight, {
        immediate: false,
      });
    }
  };

  return (
    <section ref={containerRef} className={styles.projectsContainer}>
      {/* Стрілки вгору/вниз */}
      <div ref={arrowsRef} className={styles.arrows}>
        <FaChevronUp className={styles.arrowUp} onClick={scrollToTop} />
        <FaChevronDown className={styles.arrowDown} onClick={scrollToBottom} />
      </div>

      {/* Заголовок з посиланням на нього для анімації */}
      <h2 ref={myProjectsTitleRef} className={styles.title}>
        My Projects
      </h2>

      <div className={styles.projectsList}>
        {projects.map(
          (
            {
              id,
              title,
              description,
              tech,
              image,
              demo,
              code,
              logoImage,
              role,
            },
            index
          ) => (
            <div
              key={id}
              role="article"
              ref={(el) => (projectsRef.current[index] = el)}
              className={`${styles.project} ${
                index % 2 === 0 ? styles.even : styles.odd
              }`}
            >
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageWrapper}
              >
                <img src={image} alt={title} className={styles.image} />
              </a>

              <div className={styles.textWrapper}>
                {logoImage && (
                  <div className={styles.logoWrapper}>
                    <img
                      src={logoImage}
                      alt={`${title} Logo`}
                      className={styles.logoImage}
                    />
                  </div>
                )}

                <h3 className={styles.projectTitle}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <p className={styles.role}>Role: {role}</p>

                <div className={styles.techStack}>
                  {tech.map((t, i) => {
                    const Icon = techIcons[t];
                    return (
                      <span key={i} className={styles.tech}>
                        {Icon && <>{Icon} </>}
                        {t}
                      </span>
                    );
                  })}
                </div>

                <div className={styles.links}>
                  <a
                    className={styles.link}
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt />
                    Demo
                  </a>
                  <a
                    className={styles.link}
                    href={code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                    Code
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Projects;
