import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styles from './Menu.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BsChevronDown, BsChevronUp, BsArrowLeftShort, BsArrowRightShort, BsX } from 'react-icons/bs';
import TripAdvisorReviews from '../components/TripAdvisorReviews';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';

// Immagini statiche degli allergeni
import latteIcon from '../assets/latte.png';
import glutineIcon from '../assets/glutine.png';
import arachidiIcon from '../assets/arachidi.png';
import uovaIcon from '../assets/uova.png';
import crostaceiIcon from '../assets/crostacei.png';
import molluschiIcon from '../assets/molluschi.png';
import fruttaIcon from '../assets/frutta.png';
import pesceIcon from '../assets/pesce.png';
import soiaIcon from '../assets/soia.png';

// Percorsi delle immagini per gli allergeni
const allergensIcons = {
  soia: soiaIcon,
  latte: latteIcon,
  glutine: glutineIcon,
  arachidi: arachidiIcon,
  uova: uovaIcon,
  crostacei: crostaceiIcon,
  molluschi: molluschiIcon,
  frutta: fruttaIcon,
  pesce: pesceIcon
};

// Dati piatti - aggiorno con allergie e immagini galleria
const menuData = {
  antipasti: {
    title: "GLI ANTIPASTI",
    dishes: [
      {
        id: 1,
        name: "Mazzancolle locale marinata",
        description:
          "Mazzancolle locale marinata su specchio di datterino giallo e sentori di macchia mediterranea all'elicriso",
        price: "€20",
        allergens: ["crostacei"]
      },
      {
        id: 2,
        name: "Rosa di palamita",
        description:
          "Rosa di palamita: battuta al coltello su tappeto di petali di maggio e gocce di rugiada al lime",
        price: "€20",
        allergens: ["pesce"]
      },
      {
        id: 3,
        name: "Capesante scottate",
        description:
          "Capesante scottate sulla carbonella, fondo di cozze del Tirreno e clorofilla di prezzemolo",
        price: "€22",
        allergens: ["pesce", "molluschi"]
      },
      {
        id: 4,
        name: "Nido di rombo o passera di mare",
        description:
          "Nido di rombo o passera di mare alla julienne con infusione acida al limone e pepe bianco",
        price: "€20",
        allergens: ["pesce"]
      },
      {
        id: 5,
        name: "Carpaccio di scorfano e anatra",
        description:
          "Carpaccio di scorfano e anatra con nespole e ciliegie di ricotta vaccina",
        price: "€24",
        allergens: ["pesce", "latte"]
      }
    ]
  },
  primi: {
    title: "I PRIMI",
    dishes: [
      {
        id: 6,
        name: "Bottoni «Scrigno di mare»",
        description:
          "Bottoni di pasta all'uovo «Scrigno di mare» al riccio puro in guazzetto di ristretto di scoglio",
        price: "€26",
        allergens: ["glutine", "crostacei", "pesce", "molluschi"]
      },
      {
        id: 7,
        name: "Fettuccine all'acqua di mare",
        description:
          "Fettuccine all'acqua di mare: pasta fresca con sentori di alghe brune e scorfano locale",
        price: "€25",
        allergens: ["glutine", "pesce"]
      },
      {
        id: 8,
        name: "Paccheri dei Maestri Gragnanesi",
        description:
          "Paccheri dei Maestri Gragnanesi in guazzetto di pescato e pomodorini del Piennolo",
        price: "€24",
        allergens: ["glutine", "pesce"]
      },
      {
        id: 9,
        name: "Lasagnetta aperta",
        description:
          "Lasagnetta aperta di pasta fresca all'uovo con vongole, mazzancolle e julienne di calamari",
        price: "€26",
        allergens: ["glutine", "crostacei", "uova", "molluschi"]
      },
      {
        id: 10,
        name: "Risotto Riserva «San Massimo»",
        description:
          "Risotto Riserva «San Massimo», fondo di volatile e cannolicchi di nassa",
        price: "€25",
        allergens: ["molluschi"]
      }
    ]
  },
  secondi: {
    title: "I SECONDI",
    dishes: [
      {
        id: 11,
        name: "Assoluto di seppia",
        description: "Assoluto di seppia e il suo inchiostro",
        price: "€22",
        allergens: ["pesce", "molluschi"]
      },
      {
        id: 12,
        name: "L'Essenza",
        description:
          "L'Essenza: sashimi di pescato locale in purezza, sale integrale e olio monocultivar",
        price: "€28",
        allergens: ["pesce"]
      },
      {
        id: 13,
        name: "Trancio di rombo o passera di mare",
        description:
          "Trancio di rombo chiodato o passera di mare alla brace di legna con giardino di agretti al vapore",
        price: "€25",
        allergens: ["pesce"]
      },
      {
        id: 14,
        name: "Ala di razza in tempura",
        description:
          "Ala di razza in tempura croccante e specchio di acqua di peperone arrostito",
        price: "€24",
        allergens: ["glutine", "pesce"]
      },
      {
        id: 15,
        name: "Coda di ombrina scottata",
        description:
          "Coda di ombrina scottata, velo di lardo di Colonnata e il suo fondo",
        price: "€26",
        allergens: ["pesce"]
      },
      {
        id: 16,
        name: "Pescato locale del giorno",
        description: "Pescato locale del giorno",
        price: "€9/hg",
        allergens: ["pesce"]
      },
      {
        id: 17,
        name: "Aragosta e lupicante",
        description: "Aragosta e lupicante",
        price: "€13/hg",
        allergens: ["crostacei"]
      }
    ]
  },
  contorni: {
    title: "I NOSTRI CONTORNI",
    dishes: [
      {
        id: 18,
        name: "Contorni stagionali",
        description:
          "I nostri contorni variano ogni giorno a seconda della reperibilità e della stagionalità. Chiedere al personale di sala.\n\nLa nostra cucina utilizza rigorosamente pesce fresco e locale ed è quindi suscettibile alle condizioni del mare. In tal caso, potremmo usare prodotti surgelati a bordo.",
        price: "",
        allergens: []
      }
    ]
  },
  dessert: {
    title: "DESSERT DI NOSTRA PRODUZIONE",
    dishes: [
      {
        id: 19,
        name: "Pastiera napoletana",
        description: "Pastiera napoletana",
        price: "€7",
        allergens: ["glutine", "uova", "latte", "arachidi"]  // 1, 3, 7, 8
      },
      {
        id: 20,
        name: "Babà",
        description: "Babà",
        price: "€7",
        allergens: ["glutine", "uova", "arachidi"]  // 1, 3, 12
      },
      {
        id: 21,
        name: "Eden",
        description: "Brunoise di frutta fresca di stagione, acqua di lattuga al miele, perle di tapioca aromatizzate al lime e quenelle di yogurt",
        price: "€9",
        allergens: ["latte"]  // 7
      }
    ]
  }
};

const serviceItems = [
  {
    name: "Acqua naturale Maniva",
    price: "€3,00"
  },
  {
    name: "Acqua gassata Maniva",
    price: "€3,00"
  },
  {
    name: "Coperto",
    price: "€4,00"
  }
];

const Menu = () => {
  const [expandedDish, setExpandedDish] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Immagini per lo slider
  const sliderImages = [
    '/assets/img_scelte/17.png',
    '/assets/img_scelte/20.png',
    '/assets/img_scelte/21.png',
    '/assets/img_scelte/22.png',
    '/assets/img_scelte/23.png',
    '/assets/img_scelte/25.png',
    '/assets/img_scelte/30.png'
  ];

  // Immagini statiche
  const staticImages = [
    '/assets/img_scelte/19.png',
    '/assets/img_scelte/32.png'
  ];

  // Gestione responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-avanzamento slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, sliderImages.length]);

  // Toggle espansione piatto
  const toggleDish = (id) => {
    setExpandedDish(expandedDish === id ? null : id);
  };

  return (
    <div className={styles.menuPage}>
      <Helmet>
        <title>Menu | Vistamare Ristorante</title>
        <meta name="description" content="Scopri il nostro menu di pesce fresco - Carpacci, primi piatti, secondi e il menu degustazione 'A mano libera' dello chef." />
        <meta property="og:image" content="https://vistamarerosignano.it/assets/menu/heromenu.png" />
      </Helmet>
      <Header />
      
      {/* Nuova sezione per il menù degustazione in stile winePhilosophy */}
      <section className={styles.degustazioneSection} style={{height: "600px"}}>
        <div className={styles.imagePart}>
          <img src="/assets/1.png" alt="Menu degustazione" className={styles.degustazioneImage} />
        </div>
        <div className={styles.textPart} style={{backgroundColor: "transparent"}}>
          <div className={styles.boxDegustazione} style={{marginTop: "-1px"}}>
            <h2 
              className={styles.proposteTitle} 
              style={{
                color: "#04062d", 
                fontStyle: "italic",
                marginBottom: "2rem", 
                paddingTop: "3rem",
                fontSize: "clamp(1.2rem, 5vw, 3rem)"
              }}
            >
              "A mano libera"
            </h2>
            
            <ScrollReveal delay={100}>
              <p className={styles.degustazioneDescription} style={{color: "#04062d", marginTop: "0", paddingBottom: "1rem"}}>
              Menù degustazione di 6 passi a sorpresa dello chef.<br></br>
              Si prega di comunicare in anticipo eventuali allergie o intolleranze,<br></br>
              per poter offrire un percorso ottimale.<br></br>
              Il menù degustazione viene servito per tutti i componenti del tavolo.
              </p>
            </ScrollReveal>
            <p className={styles.priceHighlight} style={{fontStyle: "italic"}}>80€ vini esclusi</p>
          </div>
        </div>
      </section>

      {/* Nuova sezione per l'abbinamento vini */}
      <section className={styles.paragraphSection} style={{marginTop: '-1px'}}>
        <ScrollReveal delay={200}>
          <p>
            <span style={{fontSize: '1.1em', fontWeight: 'bold'}}>Proposta di abbinamento vini</span>
            <br></br>
            È possibile arricchire il percorso degustazione con la nostra proposta di abbinamento vini, studiata per valorizzare ogni portata.<br></br>
            La selezione può variare quotidianamente in base al menù proposto e alla disponibilità delle etichette.<br></br>
            "<span className={styles.highlight}>Da Nord a Sud</span>"
          </p>
        </ScrollReveal>
        <div className={styles.priceHighlight}>40€</div>
      </section>

      {/* Sezione galleria */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryContainer}>
          {/* Immagini statiche a sinistra */}
          <div className={styles.staticImagesContainer}>
            {staticImages.map((image, index) => (
              <div key={index} className={styles.staticImageWrapper}>
                <img 
                  src={image} 
                  alt={`Immagine statica ${index + 1}`} 
                  className={styles.staticImage} 
                />
              </div>
            ))}
          </div>
          
          {/* Slider a destra */}
          <div className={styles.sliderContainer}>
            <div className={styles.slider}>
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`Slide ${index + 1}`} 
                    className={styles.slideImage} 
                  />
                </div>
              ))}
              <button 
                className={styles.prevButton} 
                onClick={() => setCurrentSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length)}
                aria-label="Slide precedente"
              >
                <span className={styles.arrow}>←</span>
              </button>
              <button 
                className={styles.nextButton} 
                onClick={() => setCurrentSlide((currentSlide + 1) % sliderImages.length)}
                aria-label="Slide successivo"
              >
                <span className={styles.arrow}>→</span>
              </button>
              <div className={styles.dots}>
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Vai allo slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elenco delle proposte */}
      <section className={styles.proposteSection}>
        <h2 className={styles.proposteTitle}>Menu "À la carte"</h2>
        <div className={styles.proposteList}>
          {Object.entries(menuData).map(([category, { title, dishes }], categoryIndex) => (
            <motion.div 
              key={category} 
              className={styles.categorySection}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: categoryIndex * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <h3 className={styles.categoryTitle}>{title}</h3>
              <div className={styles.categoryDishes}>
                {dishes.map((dish, index) => (
                  <motion.div 
                    key={dish.id} 
                    className={styles.proposteItem}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6,
                      delay: (categoryIndex * 0.1) + (index * 0.1),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <div 
                      className={styles.proposteHeader} 
                      onClick={() => toggleDish(dish.id)}
                    >
                      <h3 className={styles.proposteName}>{dish.name}</h3>
                      <span className={styles.propostePrice}>{dish.price}</span>
                      <button className={styles.expandButton}>
                        {expandedDish === dish.id ? <BsChevronUp /> : <BsChevronDown />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedDish === dish.id && (
                        <motion.div
                          className={styles.proposteDetails}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={styles.detailsContainer}>
                            {/*<div className={styles.dishImageContainer}>
                              <img 
                                src="/assets/6.png" 
                                alt={`Immagine di ${dish.name}`} 
                                className={styles.dishImage}
                              />
                            </div>*/}
                            
                            <div className={styles.dishInfo}>
                              <p className={styles.proposteDescription}>{dish.description}</p>
                              
                              {/*{dish.allergens && dish.allergens.length > 0 && (
                                <div className={styles.allergensContainer}>
                                  {dish.allergens.map((allergen, index) => (
                                    <div key={index} className={styles.allergenIcon}>
                                      <img 
                                        src={allergensIcons[allergen]} 
                                        alt={`Allergene: ${allergen}`} 
                                      />
                                      <span className={styles.allergenTooltip}>{allergen}</span>
                                    </div>
                                  ))}
                                </div>
                              )}*/}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Items Section */}
        <div className={styles.serviceSection}>
          {serviceItems.map((item, index) => (
            <div key={index} className={styles.serviceItem}>
              <span className={styles.serviceName}>{item.name}</span>
              <span className={styles.servicePrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Rimuovo la vecchia sezione ripetuta */}
      {/* Sezione Gift Card */}
       <section className={styles.giftCardSection}>
        <h2 className={styles.giftCardTitle}>Regala un'Esperienza</h2>
        <ScrollReveal delay={300}>
          <p className={styles.menuDescription}>
            Dona un'esperienza <span className={styles.highlight}>indimenticabile</span> con una gift card del Ristorante Vistamare.
            <br />
            Le nostre gift card possono essere utilizzate per una <span className={styles.highlight}>cena completa</span>.
            <br />
            Per maggiori informazioni, contattaci al <span className={styles.highlight}>0586 762289</span> o via email a <span className={styles.highlight}>vistamarerosignano@gmail.com</span>
          </p>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Menu; 