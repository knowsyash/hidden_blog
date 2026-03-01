'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createForm(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        throw new Error("Must be logged in to create a form.");
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title || !description) {
        throw new Error("Title and description are required.");
    }

    const form = await prisma.form.create({
        data: {
            title,
            description,
            authorId: (session.user as any).id,
        }
    });

    revalidatePath('/forms');
    redirect('/forms');
}
