import React from 'react';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MessageSquare, Lock, User, Send, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { submitFormResponse } from '@/app/actions/formResponse.actions';

export default async function FormDetailPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    const form: any = await prisma.form.findUnique({
        where: { id: params.id },
        include: {
            author: true,
            // @ts-ignore - Bypass cached Prisma client types
            responses: {
                include: { author: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    }) as any;

    if (!form) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
                <h2>Form not found</h2>
                <Link href="/forms">
                    <Button variant="ghost"><ArrowLeft size={16} /> Back to Forms</Button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            <Link href="/forms" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', transition: 'color var(--transition-fast)' }}>
                <ArrowLeft size={16} /> Back to Forms
            </Link>

            <Card className="glass-panel" style={{ marginBottom: '2rem', border: '1px solid var(--accent-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Lock size={16} style={{ color: 'var(--accent-secondary)' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Created {formatDistanceToNow(new Date(form.createdAt), { addSuffix: true })} by {form.author?.username || "Anonymous"}
                    </span>
                </div>
                <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{form.title}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{form.description}</p>
            </Card>

            <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Submit an Anonymous Response</h3>
                <Card>
                    <form action={submitFormResponse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="hidden" name="formId" value={form.id} />
                        <textarea
                            name="content"
                            placeholder="Type your completely anonymous response here..."
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(10, 10, 15, 0.4)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--text-primary)',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                minHeight: '120px',
                                resize: 'vertical',
                                outline: 'none',
                                transition: 'all var(--transition-fast)'
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-focus)';
                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(109, 40, 217, 0.15)';
                                e.currentTarget.style.background = 'rgba(10, 10, 15, 0.7)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.background = 'rgba(10, 10, 15, 0.4)';
                            }}
                            required
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" type="submit">
                                <Send size={16} style={{ marginRight: '0.5rem' }} /> Submit Response
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>

            <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MessageSquare size={20} />
                    {form.responses.length} Responses
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {form.responses.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No responses yet. Be the first!
                        </div>
                    ) : (
                        form.responses.map((response: any) => (
                            <Card key={response.id} hoverable style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={16} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{response.author?.username || "Anonymous"}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatDistanceToNow(new Date(response.createdAt), { addSuffix: true })}</div>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                    {response.content}
                                </p>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
