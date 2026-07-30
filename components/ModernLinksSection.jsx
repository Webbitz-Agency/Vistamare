import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './ModernLinksSection.module.css';
import { FaUtensils, FaWineGlassAlt } from 'react-icons/fa';
export default function ModernLinksSection() {
  const router = useRouter();
  return (
    <section className={styles.modernSection}>
      <Link
        href="/menu"
        className={`${styles.card} ${(router?.pathname || '') === '/menu' ? styles.active : ''}`}
        style={{ backgroundImage: `url(/assets/1.webp)` }}
      >
        <div className={styles.cardOverlay}></div>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <FaUtensils className={styles.icon} />
          </div>
          <h2 className={styles.title}>Menù</h2>
          <p className={styles.desc}>Scopri i nostri piatti e lasciati ispirare dal gusto.</p>
        </div>
      </Link>
      <Link
        href="/wine-list"
        className={`${styles.card} ${(router?.pathname || '') === '/wine-list' ? styles.active : ''}`}
        style={{ backgroundImage: `url(/assets/cantina1.png)` }}
      >
        <div className={styles.cardOverlay}></div>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <FaWineGlassAlt className={styles.icon} />
          </div>
          <h2 className={styles.title}>Wine List</h2>
          <p className={styles.desc}>Esplora la nostra selezione di vini pregiati.</p>
        </div>
      </Link>
    </section>
  );
} 