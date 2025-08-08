import React, { useState, useEffect } from 'react';
import Header from './Header';
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detectar preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Establecer tema inicial
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    // Escuchar cambios en la preferencia del sistema
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`layout ${theme}`}>
      <ParticleBackground 
        particleCount={7500}
        mouseRadius={150}
        particleSpeed={0.5}
        particleSize={2}
      />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
