import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    id: 7,
    title: "TravelTrucks",
    description:
      "Travel Trucks is a campervan rental web application that allows users to browse available campervans, filter them by various parameters, view detailed information, and make reservations. An individual project.",
    role: "Developer",
    tech: ["React", "Redux"],
    image: "/src/images/traveltrucks.png",
    demo: "https://travel-trucks-hx3g.vercel.app/",
    code: "https://github.com/chasov-artem/TravelTrucks",
  },
  {
    id: 6,
    title: "SparkArt",
    description:
      "This is a landing page for a game. A page with a responsive design, a burger menu and a swiper for mobile devices. Developed all sections starting from the FAQ section and below. Team project(two developers and designer)",
    role: "Developer",
    tech: ["HTML", "CSS", "JS"],
    image: "/src/images/sparkart.png",
    demo: "https://dmytrok-goit.github.io/stp-7973//",
    code: "https://github.com/DmytroK-goit/stp-7973",
  },
  {
    id: 5,
    title: "AquaTrack",
    description:
      "This is an application for controlling water consumption. With a backend created for the needs of the application, with login, responsive design, and features for controlling water consumption. I was responsible for developing the user panel section. Team project.",
    role: "Scrum Master and Developer",
    tech: ["React", "Redux", "Node"],
    image: "/src/images/aquatrack.png",
    demo: "https://aqua-track-group-01.vercel.app/",
    code: "https://github.com/DmytroK-goit/AquaTrack-group-01",
  },
  {
    id: 4,
    title: "Phonebook",
    description:
      "A contact management app with secure login, real-time notifications, and a responsive, animated interface. I developed contact CRUD functionality, implemented JWT authorization, and designed the interactive home page. An individual project.",
    role: "Developer",
    tech: ["React", "Redux", "JWT"],
    image: "/src/images/phonebook.png",
    demo: "https://goit-react-hw-08-pink-one.vercel.app/",
    code: "https://github.com/chasov-artem/goit-react-hw-08",
  },
  {
    id: 3,
    title: "Portfolio",
    description:
      "A developer portfolio website with animations, modal windows, and a swiper for smooth navigation. I was in charge of creating the covers section. Team project.",
    role: "Scrum Master and Developer",
    tech: ["HTML", "CSS", "JS"],
    image: "/src/images/portfolio.png",
    demo: "https://dmytrok-goit.github.io/project-js-group02/",
    code: "https://github.com/DmytroK-goit/project-js-group02",
  },
  {
    id: 2,
    title: "Watchcharm",
    description:
      "A website for a wristwatch sales company, featuring a responsive design. I was responsible for developing the sales section. Team project.",
    role: "Scrum Master and Developer",
    tech: ["HTML", "CSS"],
    image: "/src/images/watchcharm.png",
    demo: "https://denismayboroda.github.io/project-Do-your-first-step/",
    code: "https://github.com/DenisMayboroda/project-Do-your-first-step",
  },
  {
    id: 1,
    title: "WebStudio",
    description:
      "A website for the WebStudio company featuring responsive design, animation effects, and modal windows. An individual project.",
    role: "Front-end Developer",
    tech: ["HTML", "CSS"],
    image: "/src/images/webstudio.png",
    demo: "https://chasov-artem.github.io/goit-markup-hw-06/",
    code: "https://github.com/chasov-artem/goit-markup-hw-06/",
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
            className="project-card bg-gray-800 text-white p-4 rounded-lg shadow-lg"
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
