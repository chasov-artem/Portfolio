import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      {/* Лого або ім'я */}
      <h1 className="text-2xl font-bold mb-4">Chasov Dev</h1>

      {/* Навігація */}
      <nav className="flex flex-col gap-3 mb-6">
        <Link to="/" className="hover:text-gray-300">
          Projects
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About
        </Link>
        <Link to="/contact" className="hover:text-gray-300">
          Contact
        </Link>
      </nav>

      {/* Соцмережі */}
      <div className="flex gap-4 mt-auto">
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
