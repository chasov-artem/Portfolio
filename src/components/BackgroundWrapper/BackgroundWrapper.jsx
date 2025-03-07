import bg from "../../images/wall1.jpeg";

const BackgroundWrapper = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "200% auto", // зменшуємо масштаб (можна 25%, 40% тощо)
        backgroundRepeat: "repeat", // фон повторюватиметься, якщо зображення замале
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
