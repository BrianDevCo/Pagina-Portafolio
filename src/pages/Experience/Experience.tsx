import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import './Experience.css';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'fulltime' | 'freelance' | 'internship';
  logo?: string;
  website?: string;
}

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const experiences: ExperienceItem[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'Madrid, España',
      period: 'Enero 2023 - Presente',
      description: 'Lidero el desarrollo de aplicaciones web escalables y mantenibles. Trabajo en estrecha colaboración con equipos de diseño y producto para crear experiencias de usuario excepcionales.',
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      achievements: [
        'Reduje el tiempo de carga de la aplicación principal en un 40%',
        'Implementé un sistema de CI/CD que redujo los errores de producción en un 60%',
        'Mentoreé a 3 desarrolladores junior en mejores prácticas'
      ],
      type: 'fulltime',
      logo: 'https://via.placeholder.com/60x60/6366f1/ffffff?text=TC',
      website: 'https://techcorp.com'
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Digital Innovations',
      location: 'Barcelona, España',
      period: 'Marzo 2021 - Diciembre 2022',
      description: 'Desarrollé interfaces de usuario modernas y responsivas utilizando React y Vue.js. Colaboré en proyectos para clientes internacionales.',
      technologies: ['React', 'Vue.js', 'JavaScript', 'CSS3', 'Git'],
      achievements: [
        'Desarrollé 5 aplicaciones web completas para clientes internacionales',
        'Mejoré la accesibilidad de todas las aplicaciones según estándares WCAG',
        'Implementé un sistema de componentes reutilizables'
      ],
      type: 'fulltime',
      logo: 'https://via.placeholder.com/60x60/10b981/ffffff?text=DI',
      website: 'https://digitalinnovations.com'
    },
    {
      id: '3',
      title: 'Freelance Developer',
      company: 'Proyectos Independientes',
      location: 'Remoto',
      period: '2020 - Presente',
      description: 'Desarrollo soluciones personalizadas para startups y pequeñas empresas. Especializado en aplicaciones web y móviles.',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      achievements: [
        'Completé 15+ proyectos exitosos para diferentes clientes',
        'Desarrollé 3 aplicaciones móviles con React Native',
        'Mantuve una tasa de satisfacción del cliente del 95%'
      ],
      type: 'freelance',
      logo: 'https://via.placeholder.com/60x60/f59e0b/ffffff?text=FI'
    },
    {
      id: '4',
      title: 'Junior Developer',
      company: 'StartupHub',
      location: 'Valencia, España',
      period: 'Junio 2019 - Febrero 2021',
      description: 'Mi primer rol profesional donde aprendí las bases del desarrollo web y las mejores prácticas de la industria.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      achievements: [
        'Desarrollé mi primera aplicación web completa desde cero',
        'Aprendí metodologías ágiles y trabajo en equipo',
        'Contribuí al desarrollo de 2 productos principales'
      ],
      type: 'fulltime',
      logo: 'https://via.placeholder.com/60x60/ef4444/ffffff?text=SH',
      website: 'https://startuphub.com'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fulltime':
        return 'var(--accent-color)';
      case 'freelance':
        return 'var(--success-color)';
      case 'internship':
        return 'var(--warning-color)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fulltime':
        return 'Tiempo Completo';
      case 'freelance':
        return 'Freelance';
      case 'internship':
        return 'Prácticas';
      default:
        return type;
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Mi Experiencia</h1>
          <p className="section-subtitle">
            Un recorrido por mi trayectoria profesional y los proyectos que han moldeado mi carrera
          </p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-marker" style={{ backgroundColor: getTypeColor(exp.type) }}>
                <div className="marker-dot"></div>
              </div>

              <motion.div
                className="experience-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-header">
                  <div className="company-info">
                    {exp.logo && (
                      <img src={exp.logo} alt={`${exp.company} logo`} className="company-logo" />
                    )}
                    <div className="company-details">
                      <h3 className="job-title">{exp.title}</h3>
                      <div className="company-name">
                        {exp.website ? (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="company-link"
                          >
                            {exp.company}
                            <ExternalLink size={14} />
                          </a>
                        ) : (
                          exp.company
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="experience-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="meta-item">
                      <Building size={16} />
                      <span>{getTypeLabel(exp.type)}</span>
                    </div>
                  </div>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="experience-technologies">
                  <h4>Tecnologías utilizadas:</h4>
                  <div className="tech-tags">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="expand-button"
                  onClick={() => toggleExpanded(exp.id)}
                  aria-expanded={expandedId === exp.id}
                >
                  {expandedId === exp.id ? 'Ver menos' : 'Ver logros'}
                  {expandedId === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <AnimatePresence>
                  {expandedId === exp.id && (
                    <motion.div
                      className="achievements-section"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>Logros principales:</h4>
                      <ul className="achievements-list">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                          >
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="experience-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>Resumen de Carrera</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-number">4+</div>
              <div className="summary-label">Años de experiencia</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">15+</div>
              <div className="summary-label">Proyectos completados</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">10+</div>
              <div className="summary-label">Tecnologías dominadas</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">95%</div>
              <div className="summary-label">Satisfacción del cliente</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
