# 🌟 Portafolio Personal - Brian López Garzón

Un portafolio web moderno y interactivo desarrollado con React, TypeScript y efectos visuales avanzados.

## 🚀 Características

### ✨ **Diseño y UX**
- **Diseño responsive** que se adapta a todos los dispositivos
- **Tema claro/oscuro** con transición suave
- **Animaciones fluidas** con Framer Motion
- **Navegación intuitiva** con React Router

### 🎮 **Efectos Visuales Únicos**
- **Sistema de partículas interactivo** con efecto de agujero negro
- **Partícula dorada especial** que cambia de color con el tiempo
- **Contador de absorciones** en tiempo real
- **Efectos de hover** y transiciones suaves

### 📱 **Páginas Incluidas**
- **🏠 Inicio:** Presentación personal y descarga de CV
- **💼 Proyectos:** Galería de proyectos con filtros
- **🛠️ Habilidades:** Tecnologías y competencias
- **📧 Contacto:** Información de contacto y formulario

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **React Router DOM** - Navegación entre páginas
- **Framer Motion** - Animaciones y transiciones
- **Lucide React** - Iconografía moderna

### **Estilos**
- **CSS Modules** - Estilos modulares y encapsulados
- **CSS Variables** - Sistema de temas dinámico
- **Responsive Design** - Diseño adaptable

### **Efectos Visuales**
- **Canvas API** - Sistema de partículas personalizado
- **JavaScript Vanilla** - Animaciones de partículas
- **LocalStorage** - Persistencia de datos

## 🎯 Características Destacadas

### **Sistema de Partículas**
- **7,500 partículas** en movimiento constante
- **Efecto agujero negro** que atrae partículas al mouse
- **Partícula dorada especial** con efectos únicos
- **Contador persistente** de absorciones

### **Partícula Dorada**
- **Cambio de color progresivo:** Dorado → Naranja → Rojo → Rojo Oscuro
- **Margen azul cielo** para mayor visibilidad
- **Respawn automático** cuando es absorbida
- **Efectos de chispas** y halos

### **Diseño Responsive**
- **Mobile-first** approach
- **Breakpoints optimizados** para todos los dispositivos
- **Navegación hamburguesa** en móviles
- **Touch-friendly** en dispositivos táctiles

## 📦 Instalación y Uso

### **Prerrequisitos**
- Node.js (versión 16 o superior)
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/BrianDevCo/Pagina-Portafolio.git

# Entrar al directorio
cd Pagina-Portafolio

# Instalar dependencias
npm install
```

### **Desarrollo**
```bash
# Iniciar servidor de desarrollo
npm start

# El proyecto se abrirá en http://localhost:3000
```

### **Build para Producción**
```bash
# Crear build optimizado
npm run build

# Los archivos se generarán en la carpeta /build
```

## 🎮 Cómo Usar el Sistema de Partículas

### **Efecto Agujero Negro**
- **Mueve el mouse** por la pantalla
- **Las partículas** serán atraídas hacia el cursor
- **Efecto visual** dramático y atractivo

### **Partícula Dorada**
- **Busca la partícula dorada** más grande y brillante
- **Absórbela** para incrementar el contador
- **Observa** cómo cambia de color con el tiempo
- **Respawn automático** en nueva posición

### **Contador**
- **Ubicado** en el header junto al botón de tema
- **Persistente** entre sesiones
- **Actualización** en tiempo real

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # Navegación principal
│   │   └── Layout.tsx          # Layout general
│   └── ParticleBackground/
│       ├── ParticleBackground.tsx  # Sistema de partículas
│       └── ParticleBackground.css  # Estilos de partículas
├── pages/
│   ├── Home/
│   │   ├── Home.tsx            # Página de inicio
│   │   └── Home.css            # Estilos de inicio
│   ├── Projects/
│   │   ├── Projects.tsx        # Galería de proyectos
│   │   └── Projects.css        # Estilos de proyectos
│   ├── Skills/
│   │   ├── Skills.tsx          # Página de habilidades
│   │   └── Skills.css          # Estilos de habilidades
│   └── Contact/
│       ├── Contact.tsx         # Página de contacto
│       └── Contact.css         # Estilos de contacto
├── App.tsx                     # Componente principal
└── index.tsx                   # Punto de entrada
```

## 🎨 Personalización

### **Cambiar Información Personal**
- **`src/pages/Home/Home.tsx`** - Información personal y CV
- **`src/pages/Projects/Projects.tsx`** - Proyectos y enlaces
- **`src/pages/Contact/Contact.tsx`** - Información de contacto

### **Modificar Partículas**
- **`src/components/ParticleBackground/ParticleBackground.tsx`** - Configuración de partículas
- **`src/components/Layout/Layout.tsx`** - Propiedades del sistema

### **Cambiar Temas**
- **`src/components/Layout/Layout.css`** - Variables CSS de temas
- **Colores y estilos** personalizables

## 🚀 Deploy

### **Vercel (Recomendado)**
1. Conecta tu repositorio de GitHub
2. Vercel detectará automáticamente que es React
3. Deploy automático en cada push

### **Netlify**
1. Sube la carpeta `build` a Netlify
2. Configuración automática de React

### **GitHub Pages**
1. Configura GitHub Actions
2. Deploy automático en cada push

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Brian López Garzón**
- 📧 Email: brianl280499@gmail.com
- 🔗 LinkedIn: [BrianDevCo](https://www.linkedin.com/in/briandevcol/)
- 🐙 GitHub: [BrianDevCo](https://github.com/BrianDevCo)

## 🙏 Agradecimientos

- **React** por el framework increíble
- **Framer Motion** por las animaciones fluidas
- **Lucide** por los iconos hermosos
- **Canvas API** por permitir los efectos de partículas

---

⭐ **¡Dale una estrella si te gustó el proyecto!**
