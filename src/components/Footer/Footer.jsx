import styles from "./Footer.module.css";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div id="myContacts" className={styles.contactMe}>
      <h2 className={styles.title}>Contact me:</h2>
      <p className={styles.email}>Email: chasov90@gmail.com</p>

      <div className={styles.socialsWrap}>
        <p className={styles.socialTitle}>Socials:</p>
        <div className={styles.socials}>
          <a
            href="https://github.com/chasov-artem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <FaGithub className={styles.icon} />
          </a>
          <a
            href="https://linkedin.com/in/artem-chasov-504a351aa"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <FaLinkedin className={styles.icon} />
          </a>
          <a
            href="https://t.me/chasovartem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <FaTelegramPlane className={styles.icon} />
          </a>
          <a
            href="https://www.instagram.com/be_real_awesome_instead"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <FaInstagram className={styles.icon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
