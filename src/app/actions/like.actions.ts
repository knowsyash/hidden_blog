'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function toggleLike(postId: string) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        throw new Error("Must be logged in to like a post.");
    }

    const userId = (session.user as any).id;

    // Check if the user already liked this post
    const existingLike = await prisma.like.findUnique({
        where: {
            postId_userId: {
                postId,
                userId
            }
        }
    });

    if (existingLike) {
        // Unlike: Remove the record
        await prisma.like.delete({
            where: { id: existingLike.id }
        });
    } else {
        // Like: Create the record
        await prisma.like.create({
            data: {
                postId,
                userId
            }
        });
    }

    revalidatePath('/');
}
