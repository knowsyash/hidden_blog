const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.create({
            data: {
                email: 'test' + Date.now() + '@juetguna.in',
                name: 'Test Setup',
                username: 'TestUser' + Date.now(),
            }
        });
        console.log("DB Insert Success:", user);
    } catch (e) {
        console.error("DB Insert Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
