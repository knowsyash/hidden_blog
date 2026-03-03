'use client';

import React from 'react';

export default function FormResponseInput() {
    return (
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
    );
}
