import React, { useState, useEffect } from "react";
import "./NewApp.css";
import { Link } from "react-scroll";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import profileImage from './profile.jpg';
import cvFile from './Novel_new_resume-1.pdf';
import aboutText from "./aboutText";
import { certifications } from "./certifications";
import Experience from "./experience";
import MemoryMatch from "./games/MemoryMatch";
import RockPaperScissors from "./games/RockPaperScissors";
import TwoTruthsOneLie from "./games/TwoTruthsOneLie";
import Summary from "./summary.js";

function handleFormSubmit(e) {
  e.preventDefault();

  const name = e.target.elements[0].value;
  const email = e.target.elements[1].value;
  const message = e.target.elements[2].value;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Message sent successfully!");
  e.target.reset();
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const [activeGame, setActiveGame] = useState(null);

  const renderGame = () => {
    switch (activeGame) {
      case "memory-match":
        return <MemoryMatch onBack={() => setActiveGame(null)} />;
      case "rock-paper-scissors":
        return <RockPaperScissors onBack={() => setActiveGame(null)} />;
      case "two-truths-one-lie":
        return <TwoTruthsOneLie onBack={() => setActiveGame(null)} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Initialize AOS animation
    AOS.init({ duration: 1200 });

    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll to the target section on link click
    const handleLinkClick = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1); // get section id from the link href
      const targetSection = document.getElementById(targetId);

      // Scroll to section with offset to center it
      const offset = (window.innerHeight - targetSection.offsetHeight) / 2;
      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: 'smooth',
      });

      // Update active section immediately after scrolling
      setActiveSection(targetId);
    };

    // Add event listener for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="navbar">
        <nav>
          <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#certifications" className={activeSection === 'certifications' ? 'active' : ''}>Certifications</a>
          <a href="#games" className={activeSection === 'games' ? 'active' : ''}>Mini Games</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="section hero">
        <div className="hero-text">
          <h1>Hey folks! People call me <strong>Novel Sai Vinayak Malla</strong></h1>
          <Summary />
          <div className="hero-buttons">
            <Link to="about" smooth={true} duration={500} className="cta-button">
              Explore More
            </Link>
            <a href={cvFile} target="_blank" rel="noopener noreferrer" className="cta-button">
              Get My CV
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src={profileImage} alt="My Profile" className="profile-image" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" data-aos="fade-up">
        <h2>Want To Know About Me?</h2>
        <p className="description">{aboutText}</p>
      </section>

      <Experience />

      {/* Skills Section */}
      <section id="skills" className="section" data-aos="fade-up">
        <h2>Skills That I Have Learnt</h2>
        <div className="skills-list">
          <div className="skill-item">
            <i className="fab fa-react"></i> {/* React Icon */}
            <p>React</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-node-js"></i> {/* Node.js Icon */}
            <p>Node.js</p>
          </div>
          <div className="skill-item">
            <i className="fas fa-database"></i> {/* Database Management Icon */}
            <p>DB Handling</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-js"></i> {/* JavaScript Icon */}
            <p>JavaScript</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-aws"></i> {/* AWS Icon */}
            <p>AWS</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-html5"></i> {/* HTML Icon */}
            <p>HTML</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-css3-alt"></i> {/* CSS Icon */}
            <p>CSS</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-dev"></i> {/* Azure DevOps Icon */}
            <p>Azure DevOps</p>
          </div>
          <div className="skill-item">
            <i className="fas fa-cogs"></i> {/* Mocha Icon */}
            <p>Mocha</p>
          </div>
          <div className="skill-item">
            <i className="fas fa-cogs"></i> {/* Chai Icon */}
            <p>Chai</p>
          </div>
          <div className="skill-item">
            <i className="fas fa-terminal"></i> {/* Shell Scripting Icon */}
            <p>Shell Scripting</p>
          </div>
          <div className="skill-item">
            <i className="fas fa-file-excel"></i> {/* Excel Icon */}
            <p>Excel</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-microsoft"></i> {/* Power BI Icon */}
            <p>Power BI</p>
          </div>
          <div className="skill-item">
            <i className="fas fa-plug"></i> {/* REST Icon */}
            <p>REST</p>
          </div>
          <div className="skill-item">
            <i className="fas fa-cogs"></i> {/* Microservices Icon */}
            <p>Micro services</p>
          </div>
          <div className="skill-item">
            <i className="fab fa-git"></i> {/* Git Icon */}
            <p>Git</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section" data-aos="fade-up">
        <h2>Portfolio</h2>
        <div className="portfolio-grid">
          <div className="portfolio-card">
            <h3>Project 1</h3>
            <p>Brief description of Project 1</p>
          </div>
          <div className="portfolio-card">
            <h3>Project 2</h3>
            <p>Brief description of Project 2</p>
          </div>
        </div>
      </section>

      <section id="certifications" className="section certifications" data-aos="fade-up">
        <h2>My Certifications</h2>
        <div className="certification-list">
          {certifications.map((cert, index) => (
            <div className="certification-card" key={index}>
              <h3>{cert.title}</h3>
              <p>{cert.date}</p>
              <button onClick={() => window.open(cert.link, "_blank")}>
                View Certification
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="games" className="section games" data-aos="fade-up">
        <h2>Let's Take A Break And Play Some Mini Games!</h2>
        {activeGame ? (
          renderGame()
        ) : (
          <>
            <div className="games-grid">
              <div className="game-card">
                <h3>Memory Match</h3>
                <p>Test your memory by matching pairs of cards!</p>
                <button onClick={() => setActiveGame("memory-match")}>
                  Play Now
                </button>
              </div>
              <div className="game-card">
                <h3>Rock, Paper, Scissors</h3>
                <p>Challenge the computer in this classic game.</p>
                <button onClick={() => setActiveGame("rock-paper-scissors")}>
                  Play Now
                </button>
              </div>
              <div className="game-card">
                <h3>Two Truths, One Lie</h3>
                <p>Can you spot the lie? Guess and find out!</p>
                <button onClick={() => setActiveGame("two-truths-one-lie")}>
                  Play Now
                </button>
              </div>

              {activeGame === "two-truths-one-lie" && (
                <TwoTruthsOneLie backToGames={() => setActiveGame(null)} />
              )}
            </div>
          </>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" data-aos="fade-up">
        <h2>Hit Me Up With Questions!</h2>
        <form className="contact-form" onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>Connect with me</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/novel-sai-vinayak-malla-5717281a2/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} color="#0077b5" />
          </a>
          <a href="https://github.com/Novel-malla" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} color="#333" />
          </a>
          <a href="mailto:novelmalla5@gmail.com">
            <FaEnvelope size={30} color="#D44638" />
          </a>
        </div>
        <p>&copy; 2024 Novel Sai Vinayak Malla. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
