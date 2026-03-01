'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tag, Edit3, Send, Loader2 } from 'lucide-react';
import { createPost } from '@/app/actions/post.actions';

export default function NewInsightPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex-center" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Share an Insight
                </h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                    Posted securely as your anonymous identity
                </p>

                <Card>
                    <form
                        action={async (formData) => {
                            setLoading(true);
                            try {
                                await createPost(formData);
                            } catch (e) {
                                console.error(e);
                                setLoading(false);
                            }
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <Input
                            name="title"
                            label="Title"
                            placeholder="e.g. Tips for passing Operating Systems"
                            icon={<Edit3 size={18} />}
                            required
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                Content
                            </label>
                            <textarea
                                name="content"
                                placeholder="Share your experience or advice..."
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(10, 10, 15, 0.4)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    minHeight: '150px',
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
                        </div>

                        <Input
                            name="tags"
                            label="Tags (comma separated)"
                            placeholder="e.g. CS101, Advice, Academics"
                            icon={<Tag size={18} />}
                        />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                            <Button variant="ghost" type="button" onClick={() => window.history.back()}>Cancel</Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                {loading ? "Publishing..." : "Publish Insight"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
