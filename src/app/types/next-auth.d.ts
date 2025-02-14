// next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      name: string;
      email: string;
      nombre: string;
      apellido: string;
      idPerfil: number;
    };
  }

  interface User {
    id: number;
    nombreUsuario: string;
    email: string;
    idPerfil?: number;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: number;
      name: string;
      email: string;
      nombre: string;
      apellido: string;
      idPerfil: number;
    };
  }
}
