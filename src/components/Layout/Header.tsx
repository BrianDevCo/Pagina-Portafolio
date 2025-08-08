import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Star } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [goldenAbsorptionCount, setGoldenAbsorptionCount] = useState(0);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/habilidades', label: 'Habilidades' },
    { path: '/contacto', label: 'Contacto' }
  ];

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location]);

  // Escuchar cambios en el contador de partículas doradas
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCount = localStorage.getItem('goldenAbsorptionCount');
      if (savedCount) {
        setGoldenAbsorptionCount(parseInt(savedCount));
      }
    };

    // Cargar contador inicial
    handleStorageChange();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Polling para detectar cambios (ya que storage event no funciona en la misma ventana)
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={`header ${theme}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Brian López</h1>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          {/* Contador de partículas doradas */}
          <div className="golden-counter">
            <Star size={16} className="star-icon" />
            <span className="counter-text">{goldenAbsorptionCount}</span>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú de navegación"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
