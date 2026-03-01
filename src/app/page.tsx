import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag, Sparkles, TrendingUp, Filter } from 'lucide-react';

import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';

const popularTags = ['Academics', 'Course Review', 'Campus Life', 'Internships', 'Advice'];

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div className={styles.homeContainer}>
      {/* Sidebar for Tags and Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.stickySidebar}>
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
              <TrendingUp size={18} className="gradient-text" />
              Popular Tags
            </h3>
            <div className={styles.tagList}>
              {popularTags.map(tag => (
                <button key={tag} className={styles.tagBadge}>
                  <Tag size={14} />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--accent-glow)' }}>
            <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} />
              Anonymous & Secure
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
              Your identity is protected. We generate a random professional username for you.
            </p>
            <Link href="/insights/new" style={{ textDecoration: 'none' }}>
              <Button variant="primary" fullWidth size="sm">Create an Insight</Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className={styles.feed}>
        <header className={styles.feedHeader}>
          <h1 className="gradient-text">Latest Insights</h1>
          <Button variant="secondary" size="sm">
            <Filter size={16} /> Filter
          </Button>
        </header>

        <div className={styles.postsList}>
          {posts.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <h3>No insights yet</h3>
              <p>Be the first to share an insight anonymously!</p>
            </div>
          ) : (
            posts.map((post: any) => {
              const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
              return (
                <Card key={post.id} hoverable className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <span className={styles.authorBadge}>{post.author?.username || "Anonymous"}</span>
                    <span className={styles.timeText}>{timeAgo}</span>
                  </div>

                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postContent}>{post.content}</p>

                  <div className={styles.postFooter}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {post.tags.map((tag: string) => (
                        <span key={tag} className={styles.smallTag}>{tag}</span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm">❤️ 0</Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
