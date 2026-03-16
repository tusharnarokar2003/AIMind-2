import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      
      <nav className="navbar-left">
        
        <Link to="/home" className="nav-btn">
          Home
        </Link>

        
        <Link to="/journaling" className="nav-btn">
          Journaing
        </Link>

      
        <Link to="/chat" className="nav-btn">
          Chat
        </Link>
        <Link to="/community" className="nav-btn">
          Community
        </Link>
        <Link to="/goal" className="nav-btn">
          Goal
        </Link>
        
        
      </nav>

   \
      <div className="navbar-right">
        <div className="nav-logo">AIMind</div>

        <div className="profile-circle">
          <img
            src="/src/assets/profile.png"
            alt="profile"
          />
        </div>
      </div>
    </header>
  );
}
