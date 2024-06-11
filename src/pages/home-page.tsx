import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        Home Page <Link to="/about">About</Link>
      </div>
    </>
  );
};

export default HomePage;
