// next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Aquí extendemos la interfaz Session para incluir accessToken y una estructura custom para user.
   */
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      name: string;
      email: string;
      nombre: string;
      apellido: string;
      idPerfil: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    nombreUsuario: string;
    email: string;
    idPerfil: number;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extendemos la interfaz del JWT para incluir nuestras propiedades personalizadas.
   */
  interface JWT {
    accessToken?: string;
    user?: {
      id?: number;
      name?: string;
      email?: string;
    };
  }
}
