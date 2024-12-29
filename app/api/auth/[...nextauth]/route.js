import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    throw new Error("Invalid credentials.");
                }

                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid credentials.");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    // metodes per poder accedir mitjançant authOptions
    pages: {
        signIn: "/login",
        singout: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 10*60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.image = user.image;
            }
            return token;
        },
        // Iniciem la sessió
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.image = token.image;
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            try {
                console.log("signIn", user, account, profile);
                const { email } = user;
                const userExists = await prisma.user.findFirst({
                    where: { email },
                });
                console.log("userExists", userExists);

                if (!userExists) {
                    const newUser = await prisma.user.create({
                        data: {
                            email,
                            name: profile.name,
                            image: profile.picture,
                            authProvider: account.provider,
                            provider_id: account.providerAccountId,
                            password: "google-oauth",
                        },
                    });
                    user.id = newUser.id;
                    return true;

                }
                user.id = userExists.id;
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }

        }
    }

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
