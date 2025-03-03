import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "./MyProjects.module.css";
import { projects } from "../../projectsData";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    // 1. Ініціалізація Lenis для плавного скролу
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.03,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Налаштування ScrollTrigger під Lenis
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

    // 3. Для кожного проекту створюємо анімацію
    projectsRef.current.forEach((project, index) => {
      if (!project) return; // Якщо посилання немає, пропускаємо

      const isEven = index % 2 === 0;
      const img = project.querySelector(`.${styles.imageWrapper}`);
      const text = project.querySelector(`.${styles.textWrapper}`);

      // Початкові стилі (контент невидимий, зрушений у нижній кут)
      gsap.set([img, text], {
        opacity: 0,
        y: "20%",
        x: isEven ? "20%" : "-20%",
      });

      // 3.1. Анімація для зображення
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 80%", // починаємо, коли 20% елемента в в’юпорті
          end: "top -20%", // закінчуємо, коли елемент виходить за верх в’юпорта
          scrub: 1, // повний контроль анімації скролом
          scroller: containerRef.current,
        },
      });

      // Від нижнього кута до центру
      imgTl.fromTo(
        img,
        { opacity: 0, y: "20%", x: isEven ? "20%" : "-20%" },
        { opacity: 1, y: "0%", x: "0%", duration: 0.5, ease: "power2.out" }
      );
      // Від центру в протилежний верхній кут
      imgTl.to(img, {
        opacity: 0,
        y: "-20%",
        x: isEven ? "20%" : "-20%",
        duration: 0.5,
        ease: "power2.in",
      });

      // 3.2. Анімація для тексту
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 80%",
          end: "top -20%",
          scrub: 1,
          scroller: containerRef.current,
        },
      });

      // Від нижнього кута до центру
      textTl.fromTo(
        text,
        { opacity: 0, y: "20%", x: isEven ? "-20%" : "20%" },
        { opacity: 1, y: "0%", x: "0%", duration: 0.5, ease: "power2.out" }
      );
      // Від центру в протилежний верхній кут
      textTl.to(text, {
        opacity: 0,
        y: "-20%",
        x: isEven ? "-20%" : "20%",
        duration: 0.5,
        ease: "power2.in",
      });
    });

    // 4. Оновлення ScrollTrigger після завантаження зображень
    const images = document.querySelectorAll(`.${styles.image}`);
    images.forEach((img) => {
      img.onload = () => ScrollTrigger.refresh();
    });

    // 5. Додаткове оновлення через 1 сек
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // При розмонтуванні
    return () => lenis.destroy();
  }, []);

  return (
    <section ref={containerRef} className={styles.projectsContainer}>
      <div className={styles.projectsList}>
        {projects.map(
          ({ id, title, description, tech, image, demo, code }, index) => (
            <div
              key={id}
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
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={styles.techStack}>
                  {tech.map((t, i) => (
                    <span key={i} className={styles.tech}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  <a href={demo} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                  <a href={code} target="_blank" rel="noopener noreferrer">
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
