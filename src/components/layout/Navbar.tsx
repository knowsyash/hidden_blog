'use client';

import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Navbar.module.css';
import { Button } from '../ui/Button';
import { MessageSquare, LayoutGrid, Users, LogIn, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <header className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logoGroup}>
                    <div className={styles.logoIcon}>
                        <Users size={20} />
                    </div>
                    <span className={styles.logoText}>Jaypee says tea</span>
                </Link>

                <nav className={styles.navLinks}>
                    <Link href="/insights" className={styles.navLink}>
                        <LayoutGrid size={18} />
                        Insights
                    </Link>
                    <Link href="/forms" className={styles.navLink}>
                        <MessageSquare size={18} />
                        Forms
                    </Link>
                    <Link href="/about" className={styles.navLink}>
                        <Users size={18} />
                        About
                    </Link>
                </nav>

                <div className={styles.actions}>
                    {session ? (
                        <>
                            <Link href="/profile">
                                <Button variant="secondary" size="sm">
                                    {(session.user as any)?.username || "Profile"}
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => signOut()}>
                                <LogOut size={16} />
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" size="sm" onClick={() => signIn('google')}>
                            <LogIn size={16} />
                            Sign in
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};
