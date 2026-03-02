'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Heart } from 'lucide-react';
import { toggleLike } from '@/app/actions/like.actions';

interface LikeButtonProps {
    postId: string;
    initialLikes: number;
    initialHasLiked: boolean;
}

export default function LikeButton({ postId, initialLikes, initialHasLiked }: LikeButtonProps) {
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(initialHasLiked);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        // Optimistic UI Update
        const previousHasLiked = hasLiked;
        const previousLikesCount = likesCount;

        setHasLiked(!hasLiked);
        setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);

        try {
            await toggleLike(postId);
        } catch (error) {
            console.error("Failed to toggle like:", error);
            // Revert on failure
            setHasLiked(previousHasLiked);
            setLikesCount(previousLikesCount);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            disabled={isLoading}
            style={{
                color: hasLiked ? '#ef4444' : 'var(--text-muted)',
                transition: 'color var(--transition-fast)'
            }}
        >
            <Heart size={16} fill={hasLiked ? '#ef4444' : 'none'} style={{ marginRight: '0.25rem' }} />
            {likesCount}
        </Button>
    );
}
