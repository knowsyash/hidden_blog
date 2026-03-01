const { PrismaClient } = require('@prisma/client');
const { PrismaAdapter } = require('@next-auth/prisma-adapter');

const adjectives = ["Silver", "Azure", "Crimson", "Golden", "Silent", "Swift", "Brave", "Clever", "Vivid", "Noble"];
const nouns = ["Falcon", "Wave", "Lion", "Eagle", "Fox", "Wolf", "Bear", "Hawk", "Panther", "Tiger"];

function generateUsername() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let randomStr = "";
    for (let i = 0; i < 4; i++) {
        randomStr += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return `${adj}${noun}${randomStr}`;
}

function CustomPrismaAdapter(p) {
    const adapter = PrismaAdapter(p);
    return {
        ...adapter,
        createUser: async (data) => {
            const username = generateUsername();
            return adapter.createUser({ ...data, username });
        },
    };
}

async function main() {
    const prisma = new PrismaClient();
    const adapter = CustomPrismaAdapter(prisma);

    try {
        const user = await adapter.createUser({
            email: 'adapter-test' + Date.now() + '@juetguna.in',
            name: 'Adapter Test',
            emailVerified: new Date(),
        });
        console.log("Adapter Insert Success:", user);
    } catch (e) {
        console.error("Adapter Insert Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
