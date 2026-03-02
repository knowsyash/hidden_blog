'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function submitFormResponse(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        throw new Error("Must be logged in to respond to a form.");
    }

    const content = formData.get('content') as string;
    const formId = formData.get('formId') as string;

    if (!content || !formId) {
        throw new Error("Content and Form ID are required.");
    }

    await prisma.formResponse.create({
        data: {
            content,
            formId,
            authorId: (session.user as any).id,
        }
    });

    revalidatePath(`/forms/${formId}`);
}
