import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    hoverable?: boolean;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
    children,
    title,
    subtitle,
    className = '',
    hoverable = false,
    style
}) => {
    return (
        <div className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`} style={style}>
            {(title || subtitle) && (
                <div className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            )}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};
