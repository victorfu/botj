import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <p>Home</p>
      <div>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
};

export default HomePage;
