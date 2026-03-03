import React from 'react';
import { Card } from '@/components/ui/Card';
import { Shield, EyeOff, Lock } from 'lucide-react';

export default function AboutPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem', textAlign: 'center' }}>Our Policy</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem', lineHeight: 1.6 }}>
                A safe space requires strict guidelines. Here is how we protect your identity.
            </p>

            <div className="grid-auto" style={{ gap: '2rem', width: '100%' }}>
                <Card className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                        <Shield size={32} />
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>Gatekept Access</h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        Our app uses your Jaypee email ID exclusively to verify that you are a student at the institute. This ensures our community remains private and free of outsiders.
                    </p>
                </Card>

                <Card className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
                        <EyeOff size={32} />
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>Absolute Anonymity</h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        You are totally anonymous. Once you log in, we do not link your Google account details to your posts. Not even the platform owner can view your email id or password. Your thoughts are yours, untraceable and secure.
                    </p>
                </Card>
            </div>
        </div>
    );
}
