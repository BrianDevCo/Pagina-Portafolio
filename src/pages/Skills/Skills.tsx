import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
}

interface SkillCategory {
  name: string;
  description: string;
  icon: string;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('frontend');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      description: 'Tecnologías para crear interfaces de usuario modernas y responsivas',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95, category: 'frontend', description: 'Desarrollo de aplicaciones web modernas' },
        { name: 'TypeScript', level: 90, category: 'frontend', description: 'Tipado estático para JavaScript' },
        { name: 'HTML/CSS', level: 95, category: 'frontend', description: 'Estructura y estilos web' },
        { name: 'Vue.js', level: 85, category: 'frontend', description: 'Framework progresivo' },
        { name: 'Sass/Less', level: 80, category: 'frontend', description: 'Preprocesadores CSS' }
      ]
    },
    {
      name: 'Backend',
      description: 'Desarrollo de servidores y APIs robustas',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 90, category: 'backend', description: 'Runtime de JavaScript' },
        { name: 'Python', level: 85, category: 'backend', description: 'Lenguaje versátil' },
        { name: 'Express.js', level: 88, category: 'backend', description: 'Framework web para Node.js' },
        { name: 'Django', level: 75, category: 'backend', description: 'Framework web para Python' },
        { name: 'GraphQL', level: 70, category: 'backend', description: 'Query language para APIs' }
      ]
    },
    {
      name: 'Bases de Datos',
      description: 'Gestión y optimización de datos',
      icon: '🗄️',
      skills: [
        { name: 'MongoDB', level: 85, category: 'database', description: 'Base de datos NoSQL' },
        { name: 'PostgreSQL', level: 80, category: 'database', description: 'Base de datos relacional' },
        { name: 'Redis', level: 75, category: 'database', description: 'Cache en memoria' },
        { name: 'MySQL', level: 70, category: 'database', description: 'Sistema de gestión de bases de datos' }
      ]
    },
    {
      name: 'DevOps & Cloud',
      description: 'Despliegue y gestión de infraestructura',
      icon: '☁️',
      skills: [
        { name: 'Docker', level: 85, category: 'devops', description: 'Contenedores de aplicaciones' },
        { name: 'AWS', level: 80, category: 'devops', description: 'Servicios en la nube' },
        { name: 'Git', level: 90, category: 'devops', description: 'Control de versiones' },
        { name: 'CI/CD', level: 75, category: 'devops', description: 'Integración continua' },
        { name: 'Kubernetes', level: 65, category: 'devops', description: 'Orquestación de contenedores' }
      ]
    },
    {
      name: 'Herramientas',
      description: 'Frameworks y librerías adicionales',
      icon: '🛠️',
      skills: [
        { name: 'Framer Motion', level: 85, category: 'tools', description: 'Animaciones en React' },
        { name: 'Redux', level: 80, category: 'tools', description: 'Gestión de estado' },
        { name: 'Jest', level: 75, category: 'tools', description: 'Testing framework' },
        { name: 'Webpack', level: 70, category: 'tools', description: 'Bundler de módulos' }
      ]
    }
  ];

  const currentCategory = skillCategories.find(cat => cat.name.toLowerCase().includes(selectedCategory)) || skillCategories[0];

  return (
    <div className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Mis Habilidades</h1>
          <p className="section-subtitle">
            Un resumen de las tecnologías y herramientas que domino
          </p>
        </motion.div>

        <motion.div
          className="category-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              className={`category-tab ${selectedCategory === category.name.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.name.toLowerCase())}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="category-content"
          key={selectedCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="category-header">
            <h2 className="category-title">{currentCategory.name}</h2>
            <p className="category-description">{currentCategory.description}</p>
          </div>

          <div className="skills-grid">
            {currentCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="skill-header">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-level">{skill.level}%</span>
                </div>

                <div className="skill-bar-container">
                  <motion.div
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  />
                </div>

                <p className="skill-description">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="skills-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>Resumen de Experiencia</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Años de experiencia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">Proyectos completados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Tecnologías dominadas</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
