import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
  detailedDescription: string;
  useCases: string[];
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
        { 
          name: 'React', 
          level: 95, 
          category: 'frontend', 
          description: 'Desarrollo de aplicaciones web modernas',
          detailedDescription: 'Framework de JavaScript para construir interfaces de usuario interactivas y reutilizables. Permite crear aplicaciones SPA con componentes modulares y gestión eficiente del estado.',
          useCases: ['Aplicaciones web dinámicas', 'Interfaces de usuario complejas', 'Sistemas de gestión de estado']
        },
        { 
          name: 'TypeScript', 
          level: 90, 
          category: 'frontend', 
          description: 'Tipado estático para JavaScript',
          detailedDescription: 'Superset de JavaScript que añade tipado estático opcional, mejorando la detección de errores en tiempo de desarrollo y facilitando el mantenimiento de código a gran escala.',
          useCases: ['Proyectos empresariales', 'Equipos de desarrollo grandes', 'Aplicaciones complejas']
        },
        { 
          name: 'HTML/CSS', 
          level: 95, 
          category: 'frontend', 
          description: 'Estructura y estilos web',
          detailedDescription: 'Lenguajes fundamentales para la creación de páginas web. HTML proporciona la estructura semántica mientras que CSS maneja la presentación visual y responsividad.',
          useCases: ['Páginas web estáticas', 'Landing pages', 'Sitios web responsivos']
        },
        { 
          name: 'Vue.js', 
          level: 85, 
          category: 'frontend', 
          description: 'Framework progresivo',
          detailedDescription: 'Framework progresivo de JavaScript que se puede adoptar incrementalmente. Ofrece una curva de aprendizaje suave y excelente documentación para proyectos de cualquier tamaño.',
          useCases: ['Aplicaciones web progresivas', 'Prototipos rápidos', 'Proyectos medianos']
        },
        { 
          name: 'Sass/Less', 
          level: 80, 
          category: 'frontend', 
          description: 'Preprocesadores CSS',
          detailedDescription: 'Preprocesadores que extienden las capacidades de CSS con variables, anidamiento, mixins y funciones, facilitando la creación de estilos mantenibles y escalables.',
          useCases: ['Sistemas de diseño', 'Proyectos con estilos complejos', 'Mantenimiento de CSS']
        }
      ]
    },
    {
      name: 'Backend',
      description: 'Desarrollo de servidores y APIs robustas',
      icon: '⚙️',
      skills: [
        { 
          name: 'Node.js', 
          level: 90, 
          category: 'backend', 
          description: 'Runtime de JavaScript',
          detailedDescription: 'Runtime de JavaScript que permite ejecutar código JavaScript en el servidor. Facilita el desarrollo de aplicaciones web escalables con un solo lenguaje en frontend y backend.',
          useCases: ['APIs RESTful', 'Servidores web', 'Aplicaciones en tiempo real']
        },
        { 
          name: 'Python', 
          level: 85, 
          category: 'backend', 
          description: 'Lenguaje versátil',
          detailedDescription: 'Lenguaje de programación de alto nivel conocido por su simplicidad y legibilidad. Ideal para desarrollo web, análisis de datos, automatización y machine learning.',
          useCases: ['Desarrollo web', 'Análisis de datos', 'Automatización de procesos']
        },
        { 
          name: 'Express.js', 
          level: 88, 
          category: 'backend', 
          description: 'Framework web para Node.js',
          detailedDescription: 'Framework minimalista y flexible para Node.js que simplifica la creación de APIs y aplicaciones web. Ofrece un conjunto robusto de características para desarrollo web.',
          useCases: ['APIs RESTful', 'Microservicios', 'Aplicaciones web ligeras']
        },
        { 
          name: 'Django', 
          level: 75, 
          category: 'backend', 
          description: 'Framework web para Python',
          detailedDescription: 'Framework web de alto nivel para Python que fomenta el desarrollo rápido y el diseño limpio. Incluye ORM, sistema de autenticación y panel de administración.',
          useCases: ['Aplicaciones web complejas', 'Sistemas de gestión', 'Proyectos empresariales']
        },
        { 
          name: 'GraphQL', 
          level: 70, 
          category: 'backend', 
          description: 'Query language para APIs',
          detailedDescription: 'Lenguaje de consulta y runtime para APIs que proporciona una descripción completa de los datos disponibles, permitiendo a los clientes solicitar exactamente lo que necesitan.',
          useCases: ['APIs complejas', 'Aplicaciones móviles', 'Sistemas con múltiples fuentes de datos']
        }
      ]
    },
    {
      name: 'Bases de Datos',
      description: 'Gestión y optimización de datos',
      icon: '🗄️',
      skills: [
        { 
          name: 'MongoDB', 
          level: 85, 
          category: 'database', 
          description: 'Base de datos NoSQL',
          detailedDescription: 'Base de datos NoSQL orientada a documentos que almacena datos en formato JSON flexible. Ideal para aplicaciones que requieren escalabilidad horizontal y esquemas dinámicos.',
          useCases: ['Aplicaciones web escalables', 'Sistemas de contenido', 'Análisis de datos en tiempo real']
        },
        { 
          name: 'PostgreSQL', 
          level: 80, 
          category: 'database', 
          description: 'Base de datos relacional',
          detailedDescription: 'Sistema de gestión de bases de datos relacional de código abierto con características avanzadas como transacciones ACID, triggers, y soporte para JSON.',
          useCases: ['Aplicaciones empresariales', 'Sistemas transaccionales', 'Análisis de datos complejos']
        },
        { 
          name: 'Redis', 
          level: 75, 
          category: 'database', 
          description: 'Cache en memoria',
          detailedDescription: 'Base de datos en memoria que funciona como almacén de estructuras de datos, cache, y broker de mensajes. Extremadamente rápida para operaciones de lectura/escritura.',
          useCases: ['Caché de aplicaciones', 'Sesiones de usuario', 'Colas de mensajes']
        },
        { 
          name: 'MySQL', 
          level: 70, 
          category: 'database', 
          description: 'Sistema de gestión de bases de datos',
          detailedDescription: 'Sistema de gestión de bases de datos relacional de código abierto, ampliamente utilizado en aplicaciones web. Conocido por su confiabilidad y facilidad de uso.',
          useCases: ['Aplicaciones web tradicionales', 'Sistemas de gestión', 'Sitios web dinámicos']
        }
      ]
    },
    {
      name: 'DevOps & Cloud',
      description: 'Despliegue y gestión de infraestructura',
      icon: '☁️',
      skills: [
        { 
          name: 'Docker', 
          level: 85, 
          category: 'devops', 
          description: 'Contenedores de aplicaciones',
          detailedDescription: 'Plataforma de contenedores que permite empaquetar aplicaciones con todas sus dependencias en contenedores aislados, facilitando el despliegue y escalabilidad.',
          useCases: ['Despliegue consistente', 'Entornos de desarrollo', 'Microservicios']
        },
        { 
          name: 'AWS', 
          level: 80, 
          category: 'devops', 
          description: 'Servicios en la nube',
          detailedDescription: 'Plataforma de servicios en la nube que proporciona infraestructura escalable, almacenamiento, bases de datos, y herramientas de desarrollo para aplicaciones modernas.',
          useCases: ['Infraestructura escalable', 'Aplicaciones serverless', 'Almacenamiento en la nube']
        },
        { 
          name: 'Git', 
          level: 90, 
          category: 'devops', 
          description: 'Control de versiones',
          detailedDescription: 'Sistema de control de versiones distribuido que permite rastrear cambios en el código, colaborar en equipos y mantener un historial completo de modificaciones.',
          useCases: ['Colaboración en equipos', 'Control de versiones', 'Gestión de código']
        },
        { 
          name: 'CI/CD', 
          level: 75, 
          category: 'devops', 
          description: 'Integración continua',
          detailedDescription: 'Prácticas de desarrollo que automatizan la integración de código, pruebas y despliegue, mejorando la calidad del software y acelerando el tiempo de entrega.',
          useCases: ['Automatización de despliegues', 'Pruebas automáticas', 'Entrega continua']
        },
        { 
          name: 'Kubernetes', 
          level: 65, 
          category: 'devops', 
          description: 'Orquestación de contenedores',
          detailedDescription: 'Plataforma de orquestación de contenedores que automatiza el despliegue, escalado y gestión de aplicaciones en contenedores en entornos de producción.',
          useCases: ['Aplicaciones escalables', 'Microservicios complejos', 'Entornos de producción']
        }
      ]
    },
    {
      name: 'Herramientas',
      description: 'Frameworks y librerías adicionales',
      icon: '🛠️',
      skills: [
        { 
          name: 'Framer Motion', 
          level: 85, 
          category: 'tools', 
          description: 'Animaciones en React',
          detailedDescription: 'Biblioteca de animaciones para React que permite crear transiciones fluidas y gestos naturales. Simplifica la creación de interfaces animadas y experiencias de usuario atractivas.',
          useCases: ['Interfaces animadas', 'Transiciones suaves', 'Experiencias de usuario']
        },
        { 
          name: 'Redux', 
          level: 80, 
          category: 'tools', 
          description: 'Gestión de estado',
          detailedDescription: 'Biblioteca de gestión de estado predecible para aplicaciones JavaScript. Proporciona un contenedor de estado centralizado para aplicaciones complejas.',
          useCases: ['Aplicaciones complejas', 'Gestión de estado global', 'Aplicaciones de una sola página']
        },
        { 
          name: 'Jest', 
          level: 75, 
          category: 'tools', 
          description: 'Testing framework',
          detailedDescription: 'Framework de testing de JavaScript que facilita la escritura de pruebas unitarias, de integración y de componentes. Incluye herramientas de mocking y cobertura de código.',
          useCases: ['Pruebas unitarias', 'Testing de componentes', 'Cobertura de código']
        },
        { 
          name: 'Webpack', 
          level: 70, 
          category: 'tools', 
          description: 'Bundler de módulos',
          detailedDescription: 'Empaquetador de módulos que transforma y optimiza código JavaScript, CSS y otros assets para producción. Esencial para el desarrollo moderno de aplicaciones web.',
          useCases: ['Optimización de producción', 'Transpilación de código', 'Gestión de assets']
        }
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
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
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
                
                {/* Información detallada que aparece en hover */}
                <div className="skill-details">
                  <div className="skill-detailed-description">
                    {skill.detailedDescription}
                  </div>
                  
                  <div className="skill-use-cases">
                    <h4>Casos de uso:</h4>
                    <ul>
                      {skill.useCases.map((useCase, idx) => (
                        <li key={idx}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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
