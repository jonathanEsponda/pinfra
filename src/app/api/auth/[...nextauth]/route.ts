import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        username: { label: "Nombre de Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.API_REST}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const data = await res.json();
          if (res.ok && data.token) {
            const user = {
              id: data.usuarioDTORest.id,
              nombreUsuario: data.usuarioDTORest.nombreUsuario,
              email: data.usuarioDTORest.email,
              idPerfil: data.usuarioDTORest.idPerfil,
              token: data.token,
            };

            return user;
          } else {
            throw new Error(data.message || "Credenciales incorrectas");
          }
        } catch (error) {
          console.error("Error en authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    // Duración máxima de la sesión en segundos (1 hora)
    maxAge: 3600,
    // frecuencia de actualizacion de sesión en el backend
    updateAge: 300,
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.accessToken = user.token;
        token.idPerfil = user.idPerfil;
        token.user = {
          id: Number(user.id),
          name: user.nombreUsuario,
          email: user.email,
        };
      }
      if (account?.provider === "google") {
        token.user = {
          // información que NextAuth obtiene de Google.
          id: Number(profile?.sub), //id único de Google
          name: profile?.name,
          email: profile?.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;
      session.user.idPerfil = token.idPerfil as number;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
