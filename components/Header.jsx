import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Header.module.css';
import { trackConversion, PHONE_NUMBER } from '../lib/track';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
      <img src="/assets/logo.png" alt="Vistamare" className={styles.logo} />
      <nav className={styles.nav}>
        <Link 
          href="/" 
          className={`${styles.link} ${(router?.pathname || '') === '/' ? styles.active : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/menu" 
          className={`${styles.link} ${(router?.pathname || '') === '/menu' ? styles.active : ''}`}
        >
          i Menù
        </Link>
        <Link
          href="/wine-list"
          className={`${styles.link} ${(router?.pathname || '') === '/wine-list' ? styles.active : ''}`}
        >
          wine list
        </Link>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className={styles.callButton}
          onClick={() => trackConversion('Contact', { content_name: 'chiamata_navbar' })}
        >
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
          <span>Prenota ora</span>
        </a>
      </nav>
      </div>
    </header>
  );
}
