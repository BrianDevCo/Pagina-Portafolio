import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<ContactForm>({
    mode: 'onChange'
  });

  const watchedFields = watch();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simular envío de formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Formulario enviado:', data);
      setSubmitStatus('success');
      reset();
      
      // Resetear estado después de 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'brianl280499@gmail.com',
      link: 'mailto:brianl280499@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Teléfono',
      value: '+57 3027490013',
      link: 'tel:+573027490013'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Ubicación',
      value: 'Cali, Colombia',
      link: null
    }
  ];



  return (
    <div className="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Contacto</h1>
          <p className="section-subtitle">
            ¿Tienes un proyecto en mente? ¡Hablemos! Estoy siempre abierto a nuevas oportunidades
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Información de Contacto</h2>
            <p className="contact-description">
              No dudes en contactarme para cualquier consulta sobre proyectos, colaboraciones o simplemente para charlar sobre tecnología.
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="contact-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-text">
                    <h3>{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="contact-link">
                        {info.value}
                      </a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-links">
              <h3>Sígueme en redes sociales</h3>
              <div className="social-grid">
                <motion.a
                  href="https://www.linkedin.com/in/briandevcol/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="https://github.com/BrianDevCo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <h2>Envíame un mensaje</h2>

              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'El nombre es requerido',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })}
                  className={`form-input ${errors.name ? 'error' : ''} ${watchedFields.name && !errors.name ? 'valid' : ''}`}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Ingresa un email válido'
                    }
                  })}
                  className={`form-input ${errors.email ? 'error' : ''} ${watchedFields.email && !errors.email ? 'valid' : ''}`}
                  placeholder="tu-email@ejemplo.com"
                />
                {errors.email && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Asunto *</label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject', {
                    required: 'El asunto es requerido',
                    minLength: {
                      value: 5,
                      message: 'El asunto debe tener al menos 5 caracteres'
                    }
                  })}
                  className={`form-input ${errors.subject ? 'error' : ''} ${watchedFields.subject && !errors.subject ? 'valid' : ''}`}
                  placeholder="¿En qué puedo ayudarte?"
                />
                {errors.subject && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.subject.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', {
                    required: 'El mensaje es requerido',
                    minLength: {
                      value: 10,
                      message: 'El mensaje debe tener al menos 10 caracteres'
                    }
                  })}
                  className={`form-textarea ${errors.message ? 'error' : ''} ${watchedFields.message && !errors.message ? 'valid' : ''}`}
                  placeholder="Cuéntame sobre tu proyecto..."
                />
                {errors.message && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.message.message}
                  </span>
                )}
              </div>

              <motion.button
                type="submit"
                className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                disabled={!isValid || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar mensaje
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="submit-status success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <CheckCircle size={20} />
                    ¡Mensaje enviado con éxito! Te responderé pronto.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="submit-status error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <AlertCircle size={20} />
                    Hubo un error al enviar el mensaje. Inténtalo de nuevo.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
