import Navbar from "../components/Navbar";
import MentalHealthChat from "../components/Chat/MentalHealthChat";
import "./ChatPage.css";

export default function ChatPage() {
  return (
    <div className="chat-page-wrapper">
      <Navbar />
      <div className="chat-page-content">
        <MentalHealthChat />
      </div>
    </div>
  );
}