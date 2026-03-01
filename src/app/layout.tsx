import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Anonymous Institute Platform',
  description: 'A robust, modern, and anonymous platform for institute students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 72px)' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
