import bg from "../../images/background.jpg";

const BackgroundWrapper = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
