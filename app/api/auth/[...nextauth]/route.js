import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

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

                return { id: user.id, name: user.name, email: user.email, role: user.role};
            },
        }),
    ],
    // metodes per poder accedir mitjançant authOptions
    pages: {
        signIn: "/login",
        singout: "/login"
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role
            }
            return token;
        },
        // Iniciem la sessió
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role
            }
            return session;
        },
    },
    
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
