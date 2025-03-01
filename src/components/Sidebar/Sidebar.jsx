import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import heroImage from "../../images/hero.png";

gsap.registerPlugin(ScrollTrigger);

const Sidebar = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
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
      <h1 className={styles.title}>Chasov Dev</h1>
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
    </aside>
  );
};

export default Sidebar;
