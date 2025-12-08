import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectsNavigator.module.css";
import { projects } from "../../projectsData";

gsap.registerPlugin(ScrollTrigger);

const ProjectsNavigator = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.header}`, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-map" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Projects Map</h2>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className={styles.item}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <span className={styles.badge}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.text}>
              <span className={styles.name}>{project.title}</span>
              <span className={styles.tags}>
                {project.tech.slice(0, 3).join(" • ")}
              </span>
            </div>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProjectsNavigator;

