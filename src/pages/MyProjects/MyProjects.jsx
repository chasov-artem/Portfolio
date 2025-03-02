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
      lerp: 0.07,
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
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    projectsRef.current.forEach((project, index) => {
      const isEven = index % 2 === 0;
      const img = project.querySelector(`.${styles.imageWrapper}`);
      const text = project.querySelector(`.${styles.textWrapper}`);

      gsap.fromTo(
        img,
        { opacity: 0, y: 50, x: isEven ? 100 : -100 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            scroller: containerRef.current,
            onLeave: () => gsap.to(img, { opacity: 0, y: -50, duration: 0.5 }),
            onEnterBack: () =>
              gsap.to(img, { opacity: 1, y: 0, duration: 0.5 }),
          },
        }
      );

      gsap.fromTo(
        text,
        { opacity: 0, y: 50, x: isEven ? -100 : 100 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            scroller: containerRef.current,
            onLeave: () => gsap.to(text, { opacity: 0, y: -50, duration: 0.5 }),
            onEnterBack: () =>
              gsap.to(text, { opacity: 1, y: 0, duration: 0.5 }),
          },
        }
      );
    });

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
