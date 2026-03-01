import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MessageSquare, Lock, Link as LinkIcon } from 'lucide-react';

import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default async function FormsPage() {
    const forms = await prisma.form.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: true }
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', letterSpacing: '-1px' }}>Anonymous Forms</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create forms or respond to others securely and entirely anonymously.</p>
                </div>
                <Link href="/forms/new" style={{ textDecoration: 'none' }}>
                    <Button variant="primary">Create Form</Button>
                </Link>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {forms.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <h3>No forms yet</h3>
                        <p>Be the first to create an anonymous form!</p>
                    </div>
                ) : (
                    forms.map((form: any) => {
                        const timeAgo = formatDistanceToNow(new Date(form.createdAt), { addSuffix: true });
                        return (
                            <Card key={form.id} hoverable>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <Lock size={16} style={{ color: 'var(--accent-secondary)' }} />
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{timeAgo} by {form.author?.username || "Anonymous"}</span>
                                        </div>
                                        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{form.title}</h2>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{form.description}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        <MessageSquare size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                                        0 Responses
                                    </span>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button variant="secondary" size="sm">
                                            <LinkIcon size={14} /> Copy Link
                                        </Button>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
