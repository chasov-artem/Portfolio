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
      lerp: 0.03,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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

      // Таймлайн для зображення
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 70%",
          end: "top -50%",
          scrub: 1,
          scroller: containerRef.current,
        },
      });

      // З’явлення знизу
      imgTl.fromTo(
        img,
        { opacity: 0, y: "20%", x: isEven ? "20%" : "-20%" },
        { opacity: 1, y: "0%", x: "0%", duration: 0.5, ease: "power2.out" }
      );
      // Зникнення догори
      imgTl.to(img, {
        opacity: 0,
        y: "-20%",
        x: isEven ? "20%" : "-20%",
        duration: 0.5,
        ease: "power2.in",
      });

      // Таймлайн для тексту
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 70%",
          end: "top -50%",
          scrub: 1,
          scroller: containerRef.current,
        },
      });

      // З’явлення знизу
      textTl.fromTo(
        text,
        { opacity: 0, y: "20%", x: isEven ? "-20%" : "20%" },
        { opacity: 1, y: "0%", x: "0%", duration: 0.5, ease: "power2.out" }
      );
      // Зникнення догори
      textTl.to(text, {
        opacity: 0,
        y: "-20%",
        x: isEven ? "-20%" : "20%",
        duration: 0.5,
        ease: "power2.in",
      });
    });

    // Оновлення після завантаження зображень
    const images = document.querySelectorAll(`.${styles.image}`);
    images.forEach((img) => {
      img.onload = () => ScrollTrigger.refresh();
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

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
