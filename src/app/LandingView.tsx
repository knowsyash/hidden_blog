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
                <Shield size={14} /> Only for Jaypee University Guna Students
            </div>

            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
                The <span className="gradient-text">Anonymous Voice</span> of JUET
            </h1>

            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                A secure, exclusive space for JUET Guna students to share insights, honest reviews, and connect without ever revealing their identity.
            </p>

            <div style={{ marginBottom: '5rem' }}>
                <LandingSignInButton />
            </div>

            <div className="grid-auto" style={{ gap: '2rem', maxWidth: '1000px', width: '100%', textAlign: 'left' }}>
                <Card hoverable className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(109, 40, 217, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                        <EyeOff size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Absolute Anonymity</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Your real name and email are never shown. We generate a professional, random username for you to keep your identity 100% hidden.</p>
                </Card>

                <Card hoverable className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>
                        <Users size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Exclusive Community</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Strictly gated for Jaypee University Guna students. Sign in is restricted entirely to the @juetguna.in domain to ensure a safe space.</p>
                </Card>

                <Card hoverable className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#ec4899' }}>
                        <Zap size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Share Anything</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Drop harsh course reviews, share placement advice, create anonymous feedback polls, or just vent about campus life securely.</p>
                </Card>
            </div>
        </div>
    );
}
