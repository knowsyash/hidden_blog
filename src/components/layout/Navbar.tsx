'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Navbar.module.css';
import { Button } from '../ui/Button';
import { MessageSquare, LayoutGrid, Users, LogIn, LogOut, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.navbar}>
            <div className={`container ${styles.navContainer}`} style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
                <div className={styles.mobileNavHeader}>
                    <Link href="/" className={styles.logoGroup} onClick={() => setIsMenuOpen(false)}>
                        <div className={styles.logoIcon}>
                            <Users size={20} />
                        </div>
                        <span className={styles.logoText}>Jaypee says tea</span>
                    </Link>

                    <button
                        className={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
                    <div className={styles.navMenu}>
                        <Link href="/insights" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                            <LayoutGrid size={18} />
                            Insights
                        </Link>
                        <Link href="/forms" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                            <MessageSquare size={18} />
                            Forms
                        </Link>
                        <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                            <Users size={18} />
                            About
                        </Link>
                    </div>

                    <div className={styles.actions}>
                        {session ? (
                            <>
                                <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="secondary" size="sm">
                                        {(session.user as any)?.username || "Profile"}
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                                    <LogOut size={16} />
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" size="sm" onClick={() => { signIn('google'); setIsMenuOpen(false); }}>
                                <LogIn size={16} />
                                Sign in
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
