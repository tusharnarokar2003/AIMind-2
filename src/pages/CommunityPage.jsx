import Navbar from "../components/Navbar";
import "./CommunityPage.css";
import communityBg from "../assets/community.svg"; // Update the filename to match your image

export default function CommunityPage() {
  return (
    <div className="community-wrapper">
      <Navbar />

      
      <img src={communityBg} alt="" className="community-bg-image" />

      <div className="community-content">
        <div className="coming-badge">
          <span className="badge-icon">🚀</span>
          <span>Coming Soon</span>
        </div>
        
        <h1 className="community-title">Community Hub</h1>
        
        <p className="community-text">
          We're building an amazing space where you can<br />
          connect, share, and grow together with others<br />
          on their mental wellness journey.
        </p>

        <div className="features-preview">
          <div className="preview-item">
            <span className="preview-icon">💬</span>
            <span>Support Groups</span>
          </div>
          <div className="preview-item">
            <span className="preview-icon">📚</span>
            <span>Shared Resources</span>
          </div>
          <div className="preview-item">
            <span className="preview-icon">🎯</span>
            <span>Group Challenges</span>
          </div>
        </div>

     
        
        <p className="notify-text">
          Want to be notified when we launch?
        </p>
        <button className="notify-btn">Join Waitlist</button>
      </div>
    </div>
  );
}