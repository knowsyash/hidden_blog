import React from 'react';
import { Shield, Users, Zap, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import LandingSignInButton from './LandingSignInButton';

export default function LandingView() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '85vh', textAlign: 'center', padding: '2rem 1rem' }}>

            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.05)',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '2rem',
                color: 'var(--accent-secondary)',
                fontSize: '0.875rem',
                fontWeight: 600
            }}>
                <Shield size={14} /> Only for Jaypee Students
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
                <span className="gradient-text">Jaypee says tea</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                A private anonymous community only for Jaypee students.
            </p>

            <div style={{ marginBottom: '5rem' }}>
                <LandingSignInButton />
            </div>

            <div className="grid-auto" style={{ gap: '1.5rem', maxWidth: '1000px', width: '100%', textAlign: 'left' }}>
                <Card hoverable className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(109, 40, 217, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                        <EyeOff size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Absolute Anonymity</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>Your real name and email are never shown. We generate a professional, random username for you to keep your identity 100% hidden.</p>
                </Card>

                <Card hoverable className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
                        <Users size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Exclusive Community</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>Strictly gated for Jaypee University Guna students. Sign in is restricted entirely to the @juetguna.in domain to ensure a safe space.</p>
                </Card>

                <Card hoverable className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#ec4899' }}>
                        <Zap size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Share Anything</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>Drop harsh course reviews, share placement advice, create anonymous feedback polls, or just vent about campus life securely.</p>
                </Card>
            </div>
        </div>
    );
}
