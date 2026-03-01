import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

const adjectives = ["Silver", "Azure", "Crimson", "Golden", "Silent", "Swift", "Brave", "Clever", "Vivid", "Noble"];
const nouns = ["Falcon", "Wave", "Lion", "Eagle", "Fox", "Wolf", "Bear", "Hawk", "Panther", "Tiger"];

function generateUsername(): string {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    // To avoid collisions we could add a random string of letters, but no numbers
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let randomStr = "";
    for (let i = 0; i < 4; i++) {
        randomStr += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return `${adj}${noun}${randomStr}`;
}

function CustomPrismaAdapter(p: any) {
    const adapter = PrismaAdapter(p) as any;
    return {
        ...adapter,
        createUser: async (data: any) => {
            // Force generating a username for a new user
            const username = generateUsername();
            return p.user.create({
                data: {
                    ...data,
                    username
                }
            });
        },
    };
}

export const authOptions: NextAuthOptions = {
    adapter: CustomPrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                const email = user.email || profile?.email;
                if (email) {
                    // Strictly enforce @juetguna.in or @JUETGUNA.IN
                    const juetRegex = /^[a-zA-Z0-9._%+-]+@juetguna\.in$/i;
                    if (juetRegex.test(email)) {
                        return true;
                    }
                }
                return false; // Reject sign in for all other domains
            }
            return true;
        },
        async session({ session, user }) {
            if (session.user) {
                // Expose username to the session
                (session.user as any).id = user.id;
                (session.user as any).username = (user as any).username;
            }
            return session;
        },
    },
    debug: true,
};
