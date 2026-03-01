'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        throw new Error("Must be logged in to post.");
    }

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tagsString = formData.get('tags') as string;

    if (!title || !content) {
        throw new Error("Title and content are required.");
    }

    // Split tags by comma, trim whitespace, and filter out empties
    const tags = tagsString
        ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

    await prisma.post.create({
        data: {
            title,
            content,
            tags,
            authorId: (session.user as any).id,
        }
    });

    revalidatePath('/');
    redirect('/');
}
