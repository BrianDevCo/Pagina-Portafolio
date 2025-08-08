import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';

import Contact from './pages/Contact/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
                  <Route path="/habilidades" element={<Skills />} />
        <Route path="/contacto" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
