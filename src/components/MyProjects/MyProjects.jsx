import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaJsSquare } from "react-icons/fa";
import { SiRedux, SiNextdotjs, SiTypescript, SiReactquery } from "react-icons/si";
import styles from "./MyProjects.module.css";
import { projects } from "../../projectsData";

gsap.registerPlugin(ScrollTrigger);

// SVG-іконка WebSocket за наданим шляхом
const WebsocketIcon = (props) => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M24.055 22.018h3.973v-9.538l-4.476-4.476-2.809 2.809 3.312 3.312v7.893zM28.038 24.010h-13.857l-3.312-3.312 1.405-1.405 2.736 2.736h5.629l-5.545-5.555 1.415-1.415 5.545 5.545v-5.629l-2.725-2.725 1.394-1.394-6.886-6.918h-13.836l3.962 3.962v0.010h8.217l2.903 2.903-4.245 4.245-2.903-2.903v-2.254h-3.973v3.899l6.876 6.876-2.799 2.799 4.476 4.476h19.485l-3.962-3.941z" />
  </svg>
);

const techIcons = {
  HTML: <FaHtml5 />,
  CSS: <FaCss3 />,
  JS: <FaJsSquare />,
  React: <FaReact />,
  Redux: <SiRedux />,
  Node: <FaNodeJs />,
  Next: <SiNextdotjs />,
  TypeScript: <SiTypescript />,
  TS: <SiTypescript />,
  "React Query": <SiReactquery />,
  WebSocket: <WebsocketIcon />,
};

const Projects = () => {
  const containerRef = useRef(null);
  const projectsRef = useRef([]);
  const myProjectsTitleRef = useRef(null);
  const arrowsRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.03,
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
      start: "top bottom",
      end: "bottom top",
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
          start: "top 90%",
          end: "top -110%",
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
          start: "top 90%",
          end: "top -110%",
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
    <section
      id="myProjects"
      ref={containerRef}
      className={styles.projectsContainer}
    >
      {/* Стрілки вгору/вниз */}
      <div ref={arrowsRef} className={styles.arrows}>
        <FaChevronUp className={styles.arrowUp} onClick={scrollToTop} />
        <FaChevronDown className={styles.arrowDown} onClick={scrollToBottom} />
      </div>

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
