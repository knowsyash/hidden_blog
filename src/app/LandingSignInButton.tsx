'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function LandingSignInButton() {
    return (
        <Button variant="primary" size="lg" onClick={() => signIn('google')}>
            Join the Community <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
        </Button>
    );
}
