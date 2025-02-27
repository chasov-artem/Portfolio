import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Image Gallery",
    description: "React + Pixabay API. Пошук та пагінація зображень.",
    tech: ["React", "Tailwind", "API"],
    image: "/images/gallery.jpg",
    demo: "https://your-demo-link",
    code: "https://github.com/your-github",
  },
  {
    id: 2,
    title: "Phonebook App",
    description: "Збереження контактів, авторизація через JWT.",
    tech: ["React", "Redux", "Node.js"],
    image: "/images/phonebook.jpg",
    demo: "https://your-demo-link",
    code: "https://github.com/your-github",
  },
];

const Projects = () => {
  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(({ id, title, description, tech, image, demo, code }) => (
          <div
            key={id}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-400">{description}</p>
            <div className="flex flex-wrap gap-2 my-3">
              {tech.map((t, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-700 px-2 py-1 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-400 hover:underline"
              >
                Demo <FaExternalLinkAlt size={14} />
              </a>
              <a
                href={code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:underline"
              >
                Code <FaGithub size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
