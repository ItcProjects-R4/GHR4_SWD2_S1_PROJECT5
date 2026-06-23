import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, ArrowLeft, AlertTriangle } from 'lucide-react';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.background} />

      <div className={styles.content}>
        <div className={styles.iconWrap}>
          <AlertTriangle size={52} className={styles.icon} />
        </div>

        <div className={styles.code}>404</div>
        <div className={styles.divider} />

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.sub}>
          The page you're looking for doesn't exist, may have been moved, or the URL is incorrect.
        </p>
        <p className={styles.hint}>Check the URL or navigate back to continue.</p>

        <div className={styles.actions}>
          <button onClick={() => navigate(-1)} className={styles.btnSecondary}>
            <ArrowLeft size={16} />
            Go Back
          </button>
          <Link to="/" className={styles.btnPrimary}>
            <Plane size={16} style={{ transform: 'rotate(-45deg)' }} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
