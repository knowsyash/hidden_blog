'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FileText, Send, Loader2 } from 'lucide-react';
import { createForm } from '@/app/actions/form.actions';

export default function NewFormPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex-center" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Create Anonymous Form
                </h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                    Get honest feedback from the community
                </p>

                <Card>
                    <form
                        action={async (formData) => {
                            setLoading(true);
                            try {
                                await createForm(formData);
                            } catch (e) {
                                console.error(e);
                                setLoading(false);
                            }
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <Input
                            name="title"
                            label="Form Title"
                            placeholder="e.g. Feedback on the new cafeteria menu"
                            icon={<FileText size={18} />}
                            required
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="What kind of feedback or responses are you looking for?"
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
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                            <Button variant="ghost" type="button" onClick={() => window.history.back()}>Cancel</Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                {loading ? "Creating..." : "Create Form"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
