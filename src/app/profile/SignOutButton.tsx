'use client';

import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    return (
        <Button variant="ghost" fullWidth style={{ color: '#ef4444' }} onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut size={16} /> Sign out
        </Button>
    );
}
