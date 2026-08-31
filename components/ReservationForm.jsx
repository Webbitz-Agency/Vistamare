// src/components/ReservationForm.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ReservationForm.module.css';
// Logo referenziato direttamente nel JSX
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import it from 'date-fns/locale/it';
import { format, isToday, isBefore, addDays, getDay } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/router';

registerLocale('it', it);

const ReservationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mealType: '',
    date: null,
    time: '',
    guests: '2',
    children: '0',
    message: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const lunchTimes = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
  const dinnerTimes = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  // Ottieni la data di oggi
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Rimuovi l'errore quando l'utente inizia a compilare il campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Aggiorna gli orari disponibili in base alla scelta pranzo/cena
    if (name === 'mealType') {
      setAvailableTimes(value === 'lunch' ? lunchTimes : dinnerTimes);
      setFormData(prev => ({
        ...prev,
        time: '' // Resetta l'orario quando cambia il tipo di pasto
      }));
    }

    // Validazione per il numero di bambini
    if (name === 'guests' || name === 'children') {
      const guests = name === 'guests' ? parseInt(value) : parseInt(formData.guests);
      const children = name === 'children' ? parseInt(value) : parseInt(formData.children);

      if (children >= guests) {
        setErrors(prev => ({
          ...prev,
          children: 'Il numero di bambini deve essere inferiore al numero totale di ospiti'
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.children;
          return newErrors;
        });
      }
    }
  };

  const isClosedDay = (date) => getDay(date) === 2; // Martedì

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));

    // Validazione per la data
    if (date && isBefore(date, today) && !isToday(date)) {
      setErrors(prev => ({
        ...prev,
        date: 'La data deve essere oggi o nel futuro'
      }));
    } else if (date && isClosedDay(date)) {
      setErrors(prev => ({
        ...prev,
        date: 'Siamo chiusi il martedì'
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.date;
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    let hasErrors = false;
    const newErrors = {};

    if (currentStep === 1) {
      // Validazione per il primo step
      if (!formData.name.trim()) {
        newErrors.name = 'Il nome è obbligatorio';
        hasErrors = true;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Il numero di telefono è obbligatorio';
        hasErrors = true;
      }
    }

    if (currentStep === 2) {
      // Controlla che la data sia selezionata
      if (!formData.date) {
        newErrors.date = 'Seleziona una data';
        hasErrors = true;
      }
      // Controlla che la data sia valida
      else if (isBefore(formData.date, today) && !isToday(formData.date)) {
        newErrors.date = 'La data deve essere oggi o nel futuro';
        hasErrors = true;
      } else if (isClosedDay(formData.date)) {
        newErrors.date = 'Siamo chiusi il martedì';
        hasErrors = true;
      }

      // Controlla che il tipo di pasto sia selezionato
      if (!formData.mealType) {
        newErrors.mealType = 'Seleziona il tipo di pasto';
        hasErrors = true;
      }

      // Controlla che l'orario sia selezionato
      if (!formData.time) {
        newErrors.time = 'Seleziona un orario';
        hasErrors = true;
      }

      // Controlla che il numero di bambini sia valido
      const guests = parseInt(formData.guests);
      const children = parseInt(formData.children);
      if (children >= guests) {
        newErrors.children = 'Il numero di bambini deve essere inferiore al numero totale di ospiti';
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validazione finale prima dell'invio
    const validationErrors = {};
    
    if (formData.date && isBefore(formData.date, today) && !isToday(formData.date)) {
      validationErrors.date = 'La data deve essere oggi o nel futuro';
    } else if (formData.date && isClosedDay(formData.date)) {
      validationErrors.date = 'Siamo chiusi il martedì';
    }
    
    const guests = parseInt(formData.guests);
    const children = parseInt(formData.children);
    if (children >= guests) {
      validationErrors.children = 'Il numero di bambini deve essere inferiore al numero totale di ospiti';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Formattazione dei dati per l'email
      const formattedDate = formData.date ? format(formData.date, 'dd/MM/yyyy') : '';
      
      // Preparazione del corpo dell'email
      const emailBody = {
        subject: `Prenotazione ${formData.mealType === 'lunch' ? 'Pranzo' : 'Cena'} - ${formData.name} - ${formattedDate}`,
        text: `
          Nuova prenotazione:
          
          Nome: ${formData.name}
          Email: ${formData.email || 'Non fornita'}
          Telefono: ${formData.phone}
          
          Tipo pasto: ${formData.mealType === 'lunch' ? 'Pranzo' : 'Cena'}
          Data: ${formattedDate}
          Orario: ${formData.time}
          
          Ospiti totali: ${formData.guests}
          Di cui bambini: ${formData.children}
          
          Note aggiuntive: ${formData.message || 'Nessuna nota'}
        `
      };
      
      // Invio dell'email tramite API server-side
      const response = await axios.post('/api/send-email', emailBody);
      
      if (response.status === 200) {
        setIsSubmitting(false);
        router.replace('/grazie');
      } else {
        throw new Error('Errore nell\'invio dell\'email');
      }
    } catch (error) {
      console.error('Errore nell\'invio dell\'email:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Si è verificato un errore nell\'invio della prenotazione. Riprova più tardi.'
      }));
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  // Varianti per l'animazione del modale
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  // Funzione per aprire il modale
  const openPolicyModal = (e) => {
    e.preventDefault();
    setShowPolicyModal(true);
  };

  // Funzione per chiudere il modale
  const closePolicyModal = () => {
    setShowPolicyModal(false);
  };

  return (
    <>
      <motion.div
        className={styles.formContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className={styles.formHeader}>
          <motion.img
                            src="/assets/logo.png"
            alt="Logo"
            className={styles.logo}
            variants={itemVariants}
          />
          <motion.p className={styles.formTagline} variants={itemVariants}>
            Non puoi chiamare? Prenota qui sotto!
          </motion.p>
          <motion.div className={styles.steps} variants={itemVariants}>
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`${styles.step} ${currentStep >= step ? styles.active : ''}`}
              />
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
            <motion.form
              key="form"
              className={styles.form}
              onSubmit={(e) => e.preventDefault()}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <motion.div className={styles.formStep}>
                  <motion.div className={styles.inputGroup} variants={itemVariants}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                    <label className={styles.label}>Nome e Cognome *</label>
                    <span className={styles.focusBorder} />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                  </motion.div>

                  <motion.div className={styles.inputGroup} variants={itemVariants}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <label className={styles.label}>Email (facoltativa)</label>
                    <span className={styles.focusBorder} />
                  </motion.div>

                  <motion.div className={styles.inputGroup} variants={itemVariants}>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                    <label className={styles.label}>Telefono *</label>
                    <span className={styles.focusBorder} />
                    {errors.phone && <p className={styles.errorMessage}>{errors.phone}</p>}
                  </motion.div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div className={styles.formStep}>
                  <motion.div className={styles.mealTypeSelection} variants={itemVariants}>
                    <p className={styles.sectionLabel}>Seleziona il tipo di pasto: *</p>
                    <div className={styles.mealOptions}>
                      <div 
                        className={`${styles.mealOption} ${formData.mealType === 'lunch' ? styles.active : ''}`}
                        onClick={() => handleChange({ target: { name: 'mealType', value: 'lunch' } })}
                      >
                        <span>Pranzo</span>
                      </div>
                      <div 
                        className={`${styles.mealOption} ${formData.mealType === 'dinner' ? styles.active : ''}`}
                        onClick={() => handleChange({ target: { name: 'mealType', value: 'dinner' } })}
                      >
                        <span>Cena</span>
                      </div>
                    </div>
                    {errors.mealType && <p className={styles.errorMessage}>{errors.mealType}</p>}
                  </motion.div>

                  {formData.mealType && (
                    <>
                      <motion.div className={styles.inputGroup} variants={itemVariants}>
                        <div className={styles.datepickerWrapper}>
                          <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            minDate={today}
                            filterDate={(date) => !isClosedDay(date)}
                            locale="it"
                            className={styles.datepicker}
                            calendarClassName={styles.calendar}
                            required
                            placeholderText="Seleziona una data *"
                          />
                          <label className={`${styles.label} ${formData.date ? styles.active : ''}`}>Data *</label>
                        </div>
                        {errors.date && <p className={styles.errorMessage}>{errors.date}</p>}
                      </motion.div>

                      <motion.div className={styles.timeSelection} variants={itemVariants}>
                        <p className={styles.sectionLabel}>Seleziona orario: *</p>
                        <div className={styles.timeOptions}>
                          {availableTimes.map(time => (
                            <div 
                              key={time}
                              className={`${styles.timeOption} ${formData.time === time ? styles.active : ''}`}
                              onClick={() => handleChange({ target: { name: 'time', value: time } })}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                        {errors.time && <p className={styles.errorMessage}>{errors.time}</p>}
                      </motion.div>

                      <motion.div className={styles.inputGroup} variants={itemVariants}>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          required
                          className={styles.input}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num} style={{ color: 'black' }}>
                              {num} {num === 1 ? 'persona' : 'persone'}
                            </option>
                          ))}
                        </select>
                        <label className={styles.label}>Numero di ospiti</label>
                        <span className={styles.focusBorder} />
                      </motion.div>

                      <motion.div className={styles.inputGroup} variants={itemVariants}>
                        <select
                          name="children"
                          value={formData.children}
                          onChange={handleChange}
                          className={styles.input}
                        >
                          {[0, 1, 2, 3, 4].map(num => (
                            <option key={num} value={num} style={{ color: 'black' }}>
                              {num} {num === 1 ? 'bambino' : 'bambini'}
                            </option>
                          ))}
                        </select>
                        <label className={styles.label}>Di cui bambini</label>
                        <span className={styles.focusBorder} />
                        {errors.children && <p className={styles.errorMessage}>{errors.children}</p>}
                      </motion.div>

                      {/*<motion.div className={styles.noteBox} variants={itemVariants}>
                        <p>Il nostro ambiente è di alto livello ed i bambini sono graditi ma devono comportarsi in modo consono.</p>
                      </motion.div>*/}
                    </>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div className={styles.formStep}>
                  <motion.div className={styles.noteBox} variants={itemVariants}>
                    <p>Vi invitiamo a segnalare eventuali allergie o intolleranze alimentari nelle note.</p>
                  </motion.div>
                  <motion.div className={styles.inputGroup} variants={itemVariants}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.textarea}
                      rows="4"
                    />
                    <label className={styles.label}>Note aggiuntive</label>
                  </motion.div>
                  <motion.div className={styles.noteBox} variants={itemVariants}>
                    <p>La prenotazione è valida fino a 30 minuti dopo l'orario prenotato con preavviso. Altrimenti ci riserveremo il diritto di cancellarla.</p>
                  </motion.div>
                </motion.div>
              )}

              <motion.div className={styles.formActions} variants={itemVariants}>
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className={styles.buttonSecondary}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Indietro
                  </motion.button>
                )}
                {currentStep < 3 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className={styles.buttonPrimary}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Avanti
                  </motion.button>
                ) : (
                  <motion.button
                    type="button" 
                    onClick={handleSubmit}
                    className={styles.buttonPrimary}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⌛
                      </motion.span>
                    ) : (
                      'Conferma Prenotazione'
                    )}
                  </motion.button>
                )}
              </motion.div>
              {errors.submit && (
                <motion.div 
                  className={styles.errorBox}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.submit}
                </motion.div>
              )}
              
              {/* Link per aprire la Restaurant Policy */}
              <motion.div 
                className={styles.policyLink}
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="#" onClick={openPolicyModal}>Restaurant Policy</a>
              </motion.div>
            </motion.form>
        </AnimatePresence>
      </motion.div>
      
      {/* Modale della Restaurant Policy spostato fuori dal container principale */}
      <AnimatePresence>
        {showPolicyModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePolicyModal}
          >
            <motion.div 
              className={styles.policyModal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>Restaurant Policy</h2>
                <button 
                  className={styles.closeButton} 
                  onClick={closePolicyModal}
                >
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.policySection}>
                  <h3>Accoglienza Bambini</h3>
                  <div className={styles.policyContent}>
                    {/* Contenuto da inserire */}
                    Nella totale comprensione delle esigenze di tutti i nostri ospiti e nel rispetto dell'importanza e del valore dell'esperienza presso il nostro ristorante, accogliamo volentieri i bambini, purché accompagnati da una supervisione attenta e in grado di garantire un comportamento rispettoso nei confronti dell'ambiente e degli altri commensali.
                  </div>
                </div>
                
                <div className={styles.policySection}>
                  <h3>Abbigliamento</h3>
                  <div className={styles.policyContent}>
                    {/* Contenuto da inserire */}
                    Non richiediamo un dress code definito. Consigliamo un abbigliamento elegante o smart casual.
                  </div>
                </div>
                
                <div className={styles.policySection}>
                  <h3>Animali Domestici</h3>
                  <div className={styles.policyContent}>
                    {/* Contenuto da inserire */}
                    Gli amici a 4 zampe sono i benvenuti nelle sale del ristorante. La preghiamo di segnalare la loro presenza nel campo note all'atto della prenotazione.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReservationForm;
