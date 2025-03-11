import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <h2>Contact me:</h2>
      <div className={styles.socials}>
        <a
          href="https://github.com/chasov-artem"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/artem-chasov-504a351aa"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://t.me/chasovartem"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaTelegramPlane />
        </a>
        <a
          href="https://www.instagram.com/be_real_awesome_instead"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};
export default Footer;
