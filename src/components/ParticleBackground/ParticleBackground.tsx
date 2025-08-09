import React, { useEffect, useRef, useState } from 'react';
import './ParticleBackground.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  isGolden?: boolean;
  lastGoldenSpawn?: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  mouseRadius?: number;
  particleSpeed?: number;
  particleSize?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 15000,
  mouseRadius = 200,
  particleSpeed = 0.3,
  particleSize = 1.5
}) => {
  // Detectar dispositivos con poca memoria o rendimiento
  const isLowPerformance = typeof navigator.hardwareConcurrency !== 'undefined' && navigator.hardwareConcurrency < 4;
  
  // Detectar si es dispositivo móvil
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;
  
  // Ajustar parámetros para móviles
  const adjustedParticleCount = isLowPerformance ? 500 : isSmallMobile ? 1000 : isMobile ? 2000 : particleCount;
  const adjustedMouseRadius = isMobile ? 100 : mouseRadius;
  const adjustedParticleSpeed = isMobile ? 0.2 : particleSpeed;
  const adjustedParticleSize = isMobile ? 1.0 : particleSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastMouseActivityRef = useRef<number>(Date.now());
  const respawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const goldenParticleRef = useRef<Particle | null>(null);
  const lastGoldenSpawnRef = useRef<number>(Date.now());
  const goldenAbsorptionCountRef = useRef<number>(0);
  const goldenParticleSpawnTimeRef = useRef<number>(Date.now());
  


  // Colores para el tema claro
  const lightColors = [
    '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
    '#ef4444', '#ec4899', '#84cc16', '#3b82f6', '#f97316',
    '#a855f7', '#14b8a6'
  ];

  // Función para obtener el tema actual
  const getCurrentTheme = (): 'light' | 'dark' => {
    return document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
  };

  // Función para obtener color de partícula
  const getParticleColor = (): string => {
    const currentTheme = getCurrentTheme();
    if (currentTheme === 'dark') {
      return '#ffffff';
    } else {
      return lightColors[Math.floor(Math.random() * lightColors.length)];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
      // Reajustar partículas si cambia el tamaño de pantalla
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        // Recrear partículas con nuevos parámetros
        particlesRef.current = [];
      }
    });

    // Inicializar partículas
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: adjustedParticleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * adjustedParticleSpeed,
        vy: (Math.random() - 0.5) * adjustedParticleSpeed,
        size: Math.random() * adjustedParticleSize + 1,
        opacity: Math.random() * 0.5 + 0.5,
        color: getParticleColor(),
        isGolden: false
      }));
    }

    // Función para crear partícula dorada
    const createGoldenParticle = (): Particle => {
      const currentTime = Date.now();
      goldenParticleSpawnTimeRef.current = currentTime;
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleSpeed * 0.5, // Más lenta
        vy: (Math.random() - 0.5) * particleSpeed * 0.5,
        size: particleSize * 3, // 3 veces más grande
        opacity: 1.0, // Opacidad completa
        color: '#FFD700', // Dorado brillante
        isGolden: true,
        lastGoldenSpawn: currentTime
      };
    };

    // Crear primera partícula dorada
    if (!goldenParticleRef.current) {
      goldenParticleRef.current = createGoldenParticle();
      lastGoldenSpawnRef.current = Date.now();
    }

    // Cargar contador desde localStorage
    const savedCount = localStorage.getItem('goldenAbsorptionCount');
    if (savedCount) {
      goldenAbsorptionCountRef.current = parseInt(savedCount);
    }

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTheme = getCurrentTheme();
      
      // Procesar partículas normales
      particlesRef.current.forEach((particle, index) => {
        // Calcular distancia al mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Debug: mostrar distancia para las primeras partículas
        if (index < 3) {
          console.log(`Partícula ${index}: distancia=${distance.toFixed(1)}, mouseRadius=${mouseRadius}, mouse=(${mouseRef.current.x}, ${mouseRef.current.y}), partícula=(${particle.x.toFixed(1)}, ${particle.y.toFixed(1)})`);
        }

        // Calcular fuerza para el agujero negro (disponible para todo el scope)
        let force = 0;
        let angle = 0;
        
        // EFECTO AGUJERO NEGRO - Atraer partículas hacia el mouse
        if (distance < adjustedMouseRadius && distance > 0) {
          console.log('¡AGUJERO NEGRO ACTIVADO! Partícula:', index, 'Distancia:', distance);
          
          // Actualizar última actividad del mouse
          lastMouseActivityRef.current = Date.now();
          
          // Calcular fuerza de atracción (inversa a la repulsión)
          force = (adjustedMouseRadius - distance) / adjustedMouseRadius;
          angle = Math.atan2(dy, dx);

          // Fuerza de atracción muy fuerte para efecto dramático
          const blackHoleStrength = 15.0;
          
          // Atraer hacia el centro del agujero negro
          particle.vx += Math.cos(angle) * force * blackHoleStrength;
          particle.vy += Math.sin(angle) * force * blackHoleStrength;
          
          // Efecto de aceleración hacia el centro
          const centerForce = 1.0 - (distance / mouseRadius);
          particle.vx += (mouseRef.current.x - particle.x) * centerForce * 0.1;
          particle.vy += (mouseRef.current.y - particle.y) * centerForce * 0.1;
          
          // Efecto de espiral - rotación alrededor del centro
          const spiralForce = 0.5;
          const perpendicularAngle = angle + Math.PI / 2;
          particle.vx += Math.cos(perpendicularAngle) * force * spiralForce;
          particle.vy += Math.sin(perpendicularAngle) * force * spiralForce;
        }

        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mantener partículas dentro del canvas
        if (particle.x < 0) {
          particle.x = 0;
          particle.vx = Math.abs(particle.vx) * 0.8;
        }
        if (particle.x > canvas.width) {
          particle.x = canvas.width;
          particle.vx = -Math.abs(particle.vx) * 0.8;
        }
        if (particle.y < 0) {
          particle.y = 0;
          particle.vy = Math.abs(particle.vy) * 0.8;
        }
        if (particle.y > canvas.height) {
          particle.y = canvas.height;
          particle.vy = -Math.abs(particle.vy) * 0.8;
        }

        // Limitar velocidad
        const maxSpeed = 2.0;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        // Aplicar fricción
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Actualizar color si cambió el tema
        if (currentTheme !== theme) {
          particle.color = getParticleColor();
        }

        // Verificar si la partícula está muy cerca del mouse (absorbida)
        if (distance < 5) {
          // Marcar partícula para respawn
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * particleSpeed;
          particle.vy = (Math.random() - 0.5) * particleSpeed;
          particle.size = Math.random() * particleSize + 1;
          particle.opacity = Math.random() * 0.5 + 0.5;
          particle.color = getParticleColor();
          particle.isGolden = false;
        }

        // Dibujar partícula con efecto de agujero negro
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Efecto especial para partículas cerca del agujero negro
        if (distance < mouseRadius && distance > 0) {
          // Color negro para el agujero negro
          ctx.fillStyle = `rgba(0, 0, 0, ${0.8 + (force * 0.2)})`;
          
          // Añadir un halo oscuro alrededor
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${force * 0.3})`;
          ctx.fill();
          
          // Volver a dibujar la partícula principal
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${0.8 + (force * 0.2)})`;
        } else {
          // Color normal para partículas lejos del agujero negro
          if (currentTheme === 'dark') {
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          } else {
            ctx.fillStyle = particle.color;
          }
        }
        
        ctx.fill();
      });

      // Procesar partícula dorada
      if (goldenParticleRef.current) {
        const goldenParticle = goldenParticleRef.current;
        
        // Calcular distancia al mouse para la partícula dorada
        const dx = mouseRef.current.x - goldenParticle.x;
        const dy = mouseRef.current.y - goldenParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // EFECTO AGUJERO NEGRO para partícula dorada
        if (distance < adjustedMouseRadius && distance > 0) {
          console.log('🌟 ¡PARTÍCULA DORADA EN EL AGUJERO NEGRO!');
          
          // Actualizar última actividad del mouse
          lastMouseActivityRef.current = Date.now();
          
          const force = (adjustedMouseRadius - distance) / adjustedMouseRadius;
          const angle = Math.atan2(dy, dx);

          // Fuerza de atracción muy fuerte para la partícula dorada
          const blackHoleStrength = 20.0; // Más fuerte que las normales
          
          goldenParticle.vx += Math.cos(angle) * force * blackHoleStrength;
          goldenParticle.vy += Math.sin(angle) * force * blackHoleStrength;
          
          // Efecto de aceleración hacia el centro
          const centerForce = 1.0 - (distance / adjustedMouseRadius);
          goldenParticle.vx += (mouseRef.current.x - goldenParticle.x) * centerForce * 0.15;
          goldenParticle.vy += (mouseRef.current.y - goldenParticle.y) * centerForce * 0.15;
          
          // Efecto de espiral
          const spiralForce = 0.8;
          const perpendicularAngle = angle + Math.PI / 2;
          goldenParticle.vx += Math.cos(perpendicularAngle) * force * spiralForce;
          goldenParticle.vy += Math.sin(perpendicularAngle) * force * spiralForce;
        }

        // Actualizar posición de la partícula dorada
        goldenParticle.x += goldenParticle.vx;
        goldenParticle.y += goldenParticle.vy;

        // Mantener partícula dorada dentro del canvas
        if (goldenParticle.x < 0) {
          goldenParticle.x = 0;
          goldenParticle.vx = Math.abs(goldenParticle.vx) * 0.8;
        }
        if (goldenParticle.x > canvas.width) {
          goldenParticle.x = canvas.width;
          goldenParticle.vx = -Math.abs(goldenParticle.vx) * 0.8;
        }
        if (goldenParticle.y < 0) {
          goldenParticle.y = 0;
          goldenParticle.vy = Math.abs(goldenParticle.vy) * 0.8;
        }
        if (goldenParticle.y > canvas.height) {
          goldenParticle.y = canvas.height;
          goldenParticle.vy = -Math.abs(goldenParticle.vy) * 0.8;
        }

        // Limitar velocidad de la partícula dorada
        const maxSpeed = 3.0; // Más rápida que las normales
        const speed = Math.sqrt(goldenParticle.vx * goldenParticle.vx + goldenParticle.vy * goldenParticle.vy);
        if (speed > maxSpeed) {
          goldenParticle.vx = (goldenParticle.vx / speed) * maxSpeed;
          goldenParticle.vy = (goldenParticle.vy / speed) * maxSpeed;
        }

        // Aplicar fricción
        goldenParticle.vx *= 0.98;
        goldenParticle.vy *= 0.98;

        // Verificar si la partícula dorada fue absorbida
        if (distance < 10) { // Radio más grande para la dorada
          console.log('🌟 ¡PARTÍCULA DORADA ABSORBIDA! Respawn automático...');
          goldenAbsorptionCountRef.current++; // Incrementar contador
          goldenParticleRef.current = createGoldenParticle(); // Respawn inmediato
          lastGoldenSpawnRef.current = Date.now();
          
          // Guardar contador en localStorage para persistencia
          localStorage.setItem('goldenAbsorptionCount', goldenAbsorptionCountRef.current.toString());
        }

        // Calcular tiempo transcurrido desde el spawn de la partícula dorada
        const timeSinceSpawn = (Date.now() - goldenParticleSpawnTimeRef.current) / 1000; // En segundos
        
        // Función para obtener color basado en el tiempo
        const getGoldenParticleColor = (timeElapsed: number) => {
          if (timeElapsed < 10) {
            // Dorado (0-10 segundos)
            return {
              main: '#FFD700',
              outer: 'rgba(255, 215, 0, 0.3)',
              middle: 'rgba(255, 215, 0, 0.6)',
              skyBlue: 'rgba(135, 206, 235, 0.4)',
              skyBlueMiddle: 'rgba(135, 206, 235, 0.6)'
            };
          } else if (timeElapsed < 20) {
            // Naranja (10-20 segundos)
            const orangeIntensity = Math.min((timeElapsed - 10) / 10, 1);
            return {
              main: '#FFA500',
              outer: `rgba(255, 165, 0, ${0.3 * orangeIntensity})`,
              middle: `rgba(255, 165, 0, ${0.6 * orangeIntensity})`,
              skyBlue: `rgba(255, 165, 0, ${0.4 * orangeIntensity})`,
              skyBlueMiddle: `rgba(255, 165, 0, ${0.6 * orangeIntensity})`
            };
          } else if (timeElapsed < 30) {
            // Rojo (20-30 segundos)
            const redIntensity = Math.min((timeElapsed - 20) / 10, 1);
            return {
              main: '#FF4500',
              outer: `rgba(255, 69, 0, ${0.3 * redIntensity})`,
              middle: `rgba(255, 69, 0, ${0.6 * redIntensity})`,
              skyBlue: `rgba(255, 69, 0, ${0.4 * redIntensity})`,
              skyBlueMiddle: `rgba(255, 69, 0, ${0.6 * redIntensity})`
            };
          } else {
            // Rojo oscuro (30+ segundos)
            return {
              main: '#8B0000',
              outer: 'rgba(139, 0, 0, 0.3)',
              middle: 'rgba(139, 0, 0, 0.6)',
              skyBlue: 'rgba(139, 0, 0, 0.4)',
              skyBlueMiddle: 'rgba(139, 0, 0, 0.6)'
            };
          }
        };
        
        const particleColors = getGoldenParticleColor(timeSinceSpawn);
        
        // Dibujar partícula dorada con efectos especiales
        ctx.beginPath();
        ctx.arc(goldenParticle.x, goldenParticle.y, goldenParticle.size, 0, Math.PI * 2);
        
        // Efecto de brillo pulsante
        const time = Date.now() * 0.005;
        const glowIntensity = 0.8 + Math.sin(time) * 0.2; // Efecto pulsante
        
        // Margen exterior (cambia de color con el tiempo)
        ctx.beginPath();
        ctx.arc(goldenParticle.x, goldenParticle.y, goldenParticle.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = particleColors.skyBlue.replace(/[\d.]+\)$/, `${0.4 * glowIntensity})`);
        ctx.fill();
        
        // Margen medio (cambia de color con el tiempo)
        ctx.beginPath();
        ctx.arc(goldenParticle.x, goldenParticle.y, goldenParticle.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = particleColors.skyBlueMiddle.replace(/[\d.]+\)$/, `${0.6 * glowIntensity})`);
        ctx.fill();
        
        // Halo exterior (cambia de color con el tiempo)
        ctx.beginPath();
        ctx.arc(goldenParticle.x, goldenParticle.y, goldenParticle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = particleColors.outer.replace(/[\d.]+\)$/, `${0.3 * glowIntensity})`);
        ctx.fill();
        
        // Halo medio (cambia de color con el tiempo)
        ctx.beginPath();
        ctx.arc(goldenParticle.x, goldenParticle.y, goldenParticle.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = particleColors.middle.replace(/[\d.]+\)$/, `${0.6 * glowIntensity})`);
        ctx.fill();
        
        // Partícula principal (cambia de color con el tiempo)
        ctx.beginPath();
        ctx.arc(goldenParticle.x, goldenParticle.y, goldenParticle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColors.main;
        ctx.fill();
        
        // Efecto de chispas doradas
        for (let i = 0; i < 3; i++) {
          const sparkAngle = time + (i * Math.PI * 2 / 3);
          const sparkX = goldenParticle.x + Math.cos(sparkAngle) * goldenParticle.size * 1.2;
          const sparkY = goldenParticle.y + Math.sin(sparkAngle) * goldenParticle.size * 1.2;
          
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * glowIntensity})`;
          ctx.fill();
        }
      }



      setTheme(currentTheme);
      
      // Verificar si han pasado 3 segundos sin actividad del mouse
      const timeSinceLastActivity = Date.now() - lastMouseActivityRef.current;
      if (timeSinceLastActivity > 3000) {
        // Respawn todas las partículas a posiciones aleatorias
        particlesRef.current.forEach(particle => {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * particleSpeed;
          particle.vy = (Math.random() - 0.5) * particleSpeed;
          particle.size = Math.random() * particleSize + 1;
          particle.opacity = Math.random() * 0.5 + 0.5;
          particle.color = getParticleColor();
        });
        console.log('🔄 RESPAWN: Todas las partículas han vuelto a su lugar');
        lastMouseActivityRef.current = Date.now(); // Reset timer
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Event listeners para el mouse
    const handleMouseMove = (e: MouseEvent) => {
      console.log('EVENTO MOUSE DETECTADO:', e.clientX, e.clientY);
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      // Actualizar última actividad del mouse
      lastMouseActivityRef.current = Date.now();
    };

    // Event listeners para el mouse - usar document para capturar eventos en toda la página
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', (e) => {
      console.log('MOUSE ENTER:', e.clientX, e.clientY);
      lastMouseActivityRef.current = Date.now();
    });
    document.addEventListener('click', (e) => {
      console.log('CLICK DETECTADO:', e.clientX, e.clientY);
      lastMouseActivityRef.current = Date.now();
    });
    
    // Event listeners adicionales para elementos interactivos
    document.addEventListener('mouseover', (e) => {
      // Asegurar que el agujero negro funcione incluso sobre botones y enlaces
      if (e.target instanceof HTMLElement) {
        const rect = e.target.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX,
          y: e.clientY
        };
        lastMouseActivityRef.current = Date.now();
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', () => {});
      document.removeEventListener('click', () => {});
      document.removeEventListener('mouseover', () => {});
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

export default ParticleBackground;
