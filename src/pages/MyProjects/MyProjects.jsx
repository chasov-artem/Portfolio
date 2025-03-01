import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MyProjects.module.css";
import { projects } from "../../projectsData";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const locoScroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lerp: 0.07,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(containerRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
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

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    const projects = document.querySelectorAll(`.${styles.project}`);

    projects.forEach((project, index) => {
      const isEven = index % 2 === 0;
      const img = project.querySelector(`.${styles.imageWrapper}`);
      const text = project.querySelector(`.${styles.textWrapper}`);

      gsap.fromTo(
        img,
        { opacity: 0, x: isEven ? 100 : -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: project,
            start: "top 60%", // Раніше запуск анімації
            end: "bottom 40%",
            scrub: 1,
            scroller: containerRef.current,
          },
        }
      );

      gsap.fromTo(
        text,
        { opacity: 0, x: isEven ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: project,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
            scroller: containerRef.current,
          },
        }
      );
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      locoScroll.destroy();
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.projectsContainer}>
      <h2 className={styles.title}>My Projects</h2>
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
