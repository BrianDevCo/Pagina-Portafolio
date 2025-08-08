import React from 'react';
import { motion } from 'framer-motion';
import { Download, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const handleDownloadCV = () => {
    // Descargar CV
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // Archivo CV en public/
    link.download = 'Brian_Lopez_CV.pdf';
    link.click();
  };

  const handleContact = () => {
    window.location.href = '/contacto';
  };

  return (
    <div className="home">
      <div className="container">
        <div className="hero-section">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-text">
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hola, soy <span className="highlight">Brian López Garzón</span>
              </motion.h1>
              
              <motion.h2
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Desarrollador Full Stack
              </motion.h2>
              
              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Desarrollador Full Stack con 3 años de experiencia y 15 proyectos terminados. 
                Especializado en crear experiencias digitales excepcionales con tecnologías modernas. 
                Apasionado por el código limpio, la innovación y la excelencia técnica.
              </motion.p>
              
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="btn btn-primary" onClick={handleDownloadCV}>
                  <Download size={20} />
                  Descargar CV
                </button>
                
                <button className="btn btn-secondary" onClick={handleContact}>
                  Contactar
                  <ArrowRight size={20} />
                </button>
              </motion.div>
              
              <motion.div
                className="social-links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <a
                  href="https://www.linkedin.com/in/briandevcol/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/BrianDevCo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="mailto:brianl280499@gmail.com"
                  className="social-link"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </motion.div>
            </div>
            
            <motion.div
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="profile-image">
                <img
                  src="/perfil.jpg"
                  alt="Foto de perfil profesional"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x300/6366f1/ffffff?text=Brian+López';
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          className="skills-preview"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="skills-title">Tecnologías principales</h3>
          <div className="skills-grid">
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill, index) => (
              <motion.div
                key={skill}
                className="skill-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
