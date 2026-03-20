import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import styles from '../src/pages/Menu.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BsChevronDown, BsChevronUp, BsArrowLeftShort, BsArrowRightShort, BsX } from 'react-icons/bs';
import TripAdvisorReviews from '../components/TripAdvisorReviews';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';

// Percorsi delle immagini per gli allergeni
const allergensIcons = {
  soia: '/assets/soia.png',
  latte: '/assets/latte.png',
  glutine: '/assets/glutine.png',
  arachidi: '/assets/arachidi.png',
  uova: '/assets/uova.png',
  crostacei: '/assets/crostacei.png',
  molluschi: '/assets/molluschi.png',
  frutta: '/assets/frutta.png',
  pesce: '/assets/pesce.png'
};

// Dati piatti completi
const menuData = {
  antipasti: {
    title: "GLI ANTIPASTI",
    dishes: [
      {
        id: 1,
        name: "Ricciola dry, ristretto e lattuga di mare",
        description: "Ricciola in maturazione dry, ristretto di pesce e lattuga di mare",
        price: "€20",
        allergens: ["pesce"]  // 2, 4
      },
      {
        id: 2,
        name: "Spigola e pannocchia citrus-soy dressing",
        description: "Spigola e pannocchia citrus-soy dressing",
        price: "€18",
        allergens: ["pesce", "soia"]  // 2, 4, 6, 11
      },
      {
        id: 3,
        name: "Capesante e rana pescatrice alla brace",
        description: "Capesante e rana pescatrice alla brace",
        price: "€24",
        allergens: ["pesce", "molluschi"]  // 4, 14
      },
      {
        id: 4,
        name: "Patata pavèe, scorfano e tartufo nero",
        description: "Patata pavèe, scorfano e tartufo nero pregiato",
        price: "€24",
        allergens: ["pesce"]  // 4
      },
      {
        id: 5,
        name: "Tagliatelline passera o rombo al vapore",
        description: "Tagliatelline di passera di mare o rombo al vapore con vinaigrette al lime e finocchio di mare",
        price: "€22",
        allergens: ["pesce", "glutine"]  // 4
      }
    ]
  },
  primi: {
    title: "I PRIMI",
    dishes: [
      {
        id: 6,
        name: "Spaghettone riccio e ostriche",
        description: "Spaghettone riccio e ostriche",
        price: "€28",
        allergens: ["glutine", "molluschi"]
      },
      {
        id: 7,
        name: "Mezzi paccheri frutti di mare e zafferano",
        description: "Mezzi paccheri ai frutti di mare e pistilli di zafferano",
        price: "€26",
        allergens: ["glutine", "crostacei", "pesce", "molluschi"]
      },
      {
        id: 8,
        name: "Eliche triglie e sgombro",
        description: "Eliche triglie e sgombro",
        price: "€24",
        allergens: ["glutine", "pesce"]
      },
      {
        id: 9,
        name: "Reginette in zuppetta di pesce di scoglio",
        description: "Reginette in zuppetta di pesce di scoglio",
        price: "€24",
        allergens: ["glutine", "pesce", "molluschi"]
      },
      {
        id: 10,
        name: "Linguine con astice blù",
        description: "Linguine con astice blù",
        price: "€35",
        allergens: ["glutine", "crostacei"]
      }
    ]
  },
  secondi: {
    title: "I SECONDI",
    dishes: [
      {
        id: 11,
        name: "Calamaro alla brace",
        description: "Calamaro alla brace in salsa di datterino e provola",
        price: "€24",
        allergens: ["pesce", "latte"]
      },
      {
        id: 12,
        name: "Seppie al burro nocciola e limone",
        description: "Seppie dorate al burro nocciola e limone",
        price: "€24",
        allergens: ["glutine", "latte", "molluschi"]
      },
      {
        id: 13,
        name: "Rombo alla brace e funghi Shiitake",
        description: "Filetto di rombo alla brace e funghi Shiitake",
        price: "€28",
        allergens: ["pesce"]
      },
      {
        id: 14,
        name: "Sashimi barbabietola e palamita",
        description: "Sashimi di barbabietola e palamita in salsa di mare",
        price: "€24",
        allergens: ["crostacei", "pesce", "soia", "molluschi"]
      },
      {
        id: 15,
        name: "Dentice fritto, tonno Evoluzione e peperoni",
        description: "Trancio di dentice fritto, carpaccio di tonno \"Evoluzione\" e acqua di peperoni grigliati",
        price: "€30",
        allergens: ["glutine", "pesce"]
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
        name: "Contorni del giorno",
        description: "I nostri contorni variano ogni giorno a seconda della reperibilità e della stagionalità. Chiedere al personale di sala.",
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
        allergens: ["glutine", "uova", "latte", "arachidi"]
      },
      {
        id: 20,
        name: "Babà",
        description: "Babà",
        price: "€7",
        allergens: ["glutine", "uova", "arachidi"]
      },
      {
        id: 21,
        name: "Eden",
        description: "Brunoise di frutta fresca di stagione, acqua di lattuga al miele, perle di tapioca aromatizzate al lime e quenelle di yogurt",
        price: "€9",
        allergens: ["latte"]
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

export default function Menu() {
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
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
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
      <Head>
        <title>Menu Ristorante Vistamare | Pesce Fresco Rosignano Solvay</title>
        <meta name="description" content="Scopri il menu del Ristorante Vistamare - Specialità di pesce fresco, crudi, primi e secondi piatti gourmet. Materie prime locali e stagionali." />
        <meta name="keywords" content="menu vistamare, menu pesce rosignano, piatti pesce toscana, crudi pesce, primi pesce, secondi pesce, menu ristorante" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vistamarerosignano.it/menu/" />
        
        <meta property="og:title" content="Menu Ristorante Vistamare | Pesce Fresco" />
        <meta property="og:description" content="Menu con specialità di pesce fresco e cucina gourmet del Ristorante Vistamare" />
        <meta property="og:url" content="https://vistamarerosignano.it/menu" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Menu",
              "name": "Menu Ristorante Vistamare",
              "description": "Menu con specialità di pesce fresco",
              "hasMenuSection": [
                {
                  "@type": "MenuSection",
                  "name": "Crudi e Antipasti",
                  "description": "Selezione di crudi e antipasti di mare"
                },
                {
                  "@type": "MenuSection", 
                  "name": "Primi Piatti",
                  "description": "Primi piatti di pesce e pasta fresca"
                },
                {
                  "@type": "MenuSection",
                  "name": "Secondi Piatti", 
                  "description": "Secondi di pesce fresco del giorno"
                }
              ]
            })
          }}
        />
      </Head>
      <Header />
      
      {/* Sezione menu degustazione */}
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
              Menù degustazione di 6 passi a sorpresa dello chef.<br/>
              Si prega di comunicare in anticipo eventuali allergie o intolleranze,<br/>
              per poter offrire un percorso ottimale.<br/>
              Il menù degustazione viene servito per tutti i componenti del tavolo.
              </p>
            </ScrollReveal>
            <p className={styles.priceHighlight} style={{fontStyle: "italic"}}>80€ vini esclusi</p>
          </div>
        </div>
      </section>

      {/* Sezione abbinamento vini */}
      <section className={styles.paragraphSection} style={{marginTop: '-1px'}}>
        <ScrollReveal delay={200}>
          <p>
            <span style={{fontSize: '1.1em', fontWeight: 'bold'}}>Proposta di abbinamento vini</span>
            <br/>
            È possibile arricchire il percorso degustazione con la nostra proposta di abbinamento vini, studiata per valorizzare ogni portata.<br/>
            La selezione può variare quotidianamente in base al menù proposto e alla disponibilità delle etichette.<br/>
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
                            <div className={styles.dishInfo}>
                              <p className={styles.proposteDescription}>{dish.description}</p>
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
} 