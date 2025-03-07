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
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.02,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Налаштування ScrollTrigger
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
      // Прокрутка до верху (координата 0)
      lenis.scrollTo(0, { immediate: true });
      // Повне оновлення ScrollTrigger
      ScrollTrigger.refresh(true);
    }, 200);

    // При розмонтуванні знищуємо lenis
    return () => lenis.destroy();
  }, []);

  return (
    <section ref={containerRef} className={styles.projectsContainer}>
      <h2 className={styles.title}>My Projects</h2>
      <div className={styles.projectsList}>
        {projects.map(
          (
            { id, title, description, tech, image, demo, code, logoImage },
            index
          ) => (
            <div
              key={id}
              role="article" // Додано атрибут role
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
                {/* Відображення logoImage */}
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
                <div className={styles.techStack}>
                  {tech.map((t, i) => (
                    <span key={i} className={styles.tech}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  <a
                    className={styles.link}
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                  <a
                    className={styles.link}
                    href={code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
