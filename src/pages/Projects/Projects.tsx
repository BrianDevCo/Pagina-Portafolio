import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, Star } from 'lucide-react';
import './Projects.css';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  category: string;
  year: number;
  featured: boolean;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['all', 'web', 'mobile', 'backend', 'fullstack'];
  const years = ['all', '2024', '2023', '2022', '2021'];

  // Datos de ejemplo - en producción vendrían de una API
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'Pagina-Web-Bowling',
      description: 'Proyecto de página web bolos',
      technologies: ['HTML'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center',
      githubUrl: 'https://github.com/BrianDevCo/Pagina-Web-Bowling',
      category: 'web',
      year: 2024,
      featured: false
    },
    {
      id: '2',
      title: 'Capacitacion-Video-Quiz',
      description: 'Sistema de capacitación con video y quiz',
      technologies: ['JavaScript'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&crop=center',
      githubUrl: 'https://github.com/BrianDevCo/Capacitacion-Video-Quiz',
      category: 'web',
      year: 2024,
      featured: false
    },
    {
      id: '3',
      title: 'Sistema-Gestion-Proyectos-Scrum',
      description: 'Sistema de Gestión de Proyectos Scrum con Django + React',
      technologies: ['JavaScript'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&crop=center',
      githubUrl: 'https://github.com/BrianDevCo/Sistema-Gestion-Proyectos-Scrum',
      category: 'fullstack',
      year: 2024,
      featured: true
    },
    {
      id: '4',
      title: 'API-Inventarios-Django',
      description: 'API RESTful para Control de Inventarios desarrollada con Django y Django REST Framework. Incluye autenticación JWT, Docker, PostgreSQL y documentación completa.',
      technologies: ['Python', 'Django', 'Django REST Framework', 'JWT', 'Docker', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
      githubUrl: 'https://github.com/BrianDevCo/API-Inventarios-Django',
      category: 'backend',
      year: 2024,
      featured: true
    },
    {
      id: '5',
      title: 'Automatizacion-De-Reportes-Python-Flask',
      description: 'Procesa datos CSV/Excel, genera reportes automáticos y los envía por email. Incluye interfaz web para subir archivos y descargar reportes generados.',
      technologies: ['Python', 'Flask', 'HTML'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
      githubUrl: 'https://github.com/BrianDevCo/Automatizacion-De-Reportes-Python-Flask',
      category: 'backend',
      year: 2024,
      featured: false
    },
    {
      id: '6',
      title: 'Sistema-Reservas-Cursos',
      description: 'Sistema web completo de reservas para cursos con backend Node.js/Express y frontend React. Incluye autenticación, panel de administración, gestión de cursos y reservas, con interfaz moderna y responsiva.',
      technologies: ['JavaScript', 'Node.js', 'Express', 'React'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center',
      githubUrl: 'https://github.com/BrianDevCo/Sistema-Reservas-Cursos',
      category: 'fullstack',
      year: 2024,
      featured: true
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedCategory, selectedYear, sampleProjects]);

  const filterProjects = () => {
    let filtered = projects;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filtro por año
    if (selectedYear !== 'all') {
      filtered = filtered.filter(project => project.year === parseInt(selectedYear));
    }

    setFilteredProjects(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedYear('all');
  };

  if (isLoading) {
    return (
      <div className="projects-loading">
        <div className="loading-spinner"></div>
        <p>Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div className="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Mis Proyectos</h1>
          <p className="section-subtitle">
            Una colección de proyectos que demuestran mis habilidades y pasión por el desarrollo
          </p>
        </motion.div>

        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label>Categoría:</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Año:</label>
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="filter-select"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'Todos' : year}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={clearFilters} className="clear-filters">
              Limpiar filtros
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${searchTerm}-${selectedCategory}-${selectedYear}`}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length === 0 ? (
              <motion.div
                className="no-projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>No se encontraron proyectos con los filtros seleccionados.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Limpiar filtros
                </button>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`project-card ${project.featured ? 'featured' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    {project.featured && (
                      <div className="featured-badge">
                        <Star size={16} />
                        Destacado
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-year">{project.year}</div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-technologies">
                      {project.technologies.map(tech => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <Github size={16} />
                          Ver código
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
