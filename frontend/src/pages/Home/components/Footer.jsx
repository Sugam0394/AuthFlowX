import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <h2>AI-Mart</h2>
          <p>All AI tools. One platform.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/explore">Explore</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/saved">Saved</a>
          <a href="/profile">Profile</a>
        </div>

        <div className="footer-links">
          <h4>Resources</h4>
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 AI-Mart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
