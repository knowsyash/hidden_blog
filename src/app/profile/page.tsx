import React from 'react';
import { Card } from '@/components/ui/Card';
import { User, Activity, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import SignOutButton from '@/app/profile/SignOutButton';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    const username = (session.user as any).username || "Anonymous";
    const userId = (session.user as any).id;

    const insightsCount = await prisma.post.count({
        where: { authorId: userId }
    });

    const formsCount = await prisma.form.count({
        where: { authorId: userId }
    });

    return (
        <div className="flex-center" style={{ minHeight: '70vh', padding: '2rem 0' }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <Card hoverable className="glass-panel" style={{ background: 'linear-gradient(180deg, rgba(30, 30, 45, 0.6) 0%, rgba(10, 10, 15, 0.6) 100%)' }}>
                    <div className="flex-center" style={{ flexDirection: 'column', gap: '1rem', padding: '2rem 0' }}>
                        <div
                            style={{
                                width: '96px',
                                height: '96px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 30px var(--accent-glow)'
                            }}
                        >
                            <User size={48} color="white" />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{username}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                <LockIcon size={14} />
                                <span>Identity protected. Associated Google Account is hidden.</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Activity Dashboard</h3>

                        <div className="grid-auto" style={{ gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Insights Shared</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{insightsCount}</div>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Forms Created</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formsCount}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <Button variant="secondary" fullWidth>
                                <Settings size={16} /> Preferences
                            </Button>
                            <SignOutButton />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

const LockIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

