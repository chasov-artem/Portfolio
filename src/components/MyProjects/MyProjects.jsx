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
import {
  SiRedux,
  SiNextdotjs,
  SiTypescript,
  SiReactquery,
  SiFlutter,
  SiTailwindcss,
  SiMui,
  SiFirebase,
} from "react-icons/si";
import styles from "./MyProjects.module.css";
import { featuredProjects, otherProjects, projectsOrdered } from "../../projectsData";
import { useScroll } from "../../context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

// SVG-іконки для технологій без офіційних іконок
const WebsocketIcon = (props) => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M24.055 22.018h3.973v-9.538l-4.476-4.476-2.809 2.809 3.312 3.312v7.893zM28.038 24.010h-13.857l-3.312-3.312 1.405-1.405 2.736 2.736h5.629l-5.545-5.555 1.415-1.415 5.545 5.545v-5.629l-2.725-2.725 1.394-1.394-6.886-6.918h-13.836l3.962 3.962v0.010h8.217l2.903 2.903-4.245 4.245-2.903-2.903v-2.254h-3.973v3.899l6.876 6.876-2.799 2.799 4.476 4.476h19.485l-3.962-3.941z" />
  </svg>
);

const WebWorkersIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm3.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const ZustandIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M18 4H6C4.9 4 4 4.9 4 6v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-6 14H6v-4h6v4zm0-6H6V8h6v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z" />
  </svg>
);

const JwtIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
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
  Flutter: <SiFlutter />,
  "Tailwind CSS": <SiTailwindcss />,
  "Material-UI": <SiMui />,
  Firebase: <SiFirebase />,
  JWT: <JwtIcon />,
  Zustand: <ZustandIcon />,
  "Web Workers": <WebWorkersIcon />,
};

const ProjectCard = ({ project, index, projectsRef, techIcons, isFeatured }) => {
  const {
    id,
    title,
    description,
    tech,
    image,
    demo,
    code,
    logoImage,
    role,
    caseStudy,
  } = project;

  return (
    <div
      id={`project-${id}`}
      role="article"
      ref={(el) => (projectsRef.current[index] = el)}
      className={`${styles.project} ${
        index % 2 === 0 ? styles.even : styles.odd
      } ${isFeatured ? styles.featured : ""}`}
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
        {isFeatured && (
          <span className={styles.featuredBadge}>Featured</span>
        )}
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
        {isFeatured && caseStudy && (
          <div className={styles.caseStudy}>
            <p><strong>Problem:</strong> {caseStudy.problem}</p>
            <p><strong>Solution:</strong> {caseStudy.solution}</p>
            <p><strong>Highlight:</strong> {caseStudy.highlight}</p>
          </div>
        )}
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
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const projectsRef = useRef([]);
  const myProjectsTitleRef = useRef(null);
  const arrowsRef = useRef(null);
  const lenisRef = useRef(null);
  const { scrollToProjectRef, scrollToSectionRef, scrollToTopRef } = useScroll();

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

    // Плавна поява заголовка "My Projects" без зникнення
    gsap.fromTo(
      myProjectsTitleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
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
    projectsRef.current.forEach((projectEl, index) => {
      if (!projectEl) return;

      const isEven = index % 2 === 0;
      const img = projectEl?.querySelector(`.${styles.imageWrapper}`);
      const text = projectEl?.querySelector(`.${styles.textWrapper}`);
      if (!img || !text) return;

      // Початкові стилі
      gsap.set([img, text], {
        opacity: 0,
        y: "20%",
        x: isEven ? "20%" : "-20%",
      });

      // Анімація для зображення
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: projectEl,
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
          trigger: projectEl,
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

    // Реєстрація плавної прокрутки для Projects Map
    scrollToProjectRef.current = (id) => {
      const el = document.getElementById(`project-${id}`);
      if (el && lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: 0, duration: 1.2 });
      }
    };

    // Плавна прокрутка до секцій (Sidebar nav)
    scrollToSectionRef.current = (sectionId) => {
      const el = document.getElementById(sectionId);
      if (el && lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: 0, duration: 1.2 });
      }
    };

    // Прокрутка нагору
    scrollToTopRef.current = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };

    return () => {
      scrollToProjectRef.current = null;
      scrollToSectionRef.current = null;
      scrollToTopRef.current = null;
      lenis.destroy();
    };
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
        <h3 className={styles.sectionTitle}>Featured Projects</h3>
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            projectsRef={projectsRef}
            techIcons={techIcons}
            isFeatured
          />
        ))}

        <h3 className={styles.sectionTitle}>Other Projects</h3>
        {otherProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={featuredProjects.length + index}
            projectsRef={projectsRef}
            techIcons={techIcons}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
