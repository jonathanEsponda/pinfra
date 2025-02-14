"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormData } from "@/app/types";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    // Se usa signIn con el provider "credentials" sin redirección automática
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (res?.error) {
      setErrorMessage("Credenciales incorrectas o error en el login");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] grid justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-800 p-8 rounded-lg"
      >
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <label htmlFor="username" className="text-slate-500 nb-2 block text-sm">
          Nombre de usuario
        </label>
        <input
          type="text"
          {...register("username", {
            required: "El nombre de usuario es obligatorio",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}

        <label htmlFor="password" className="text-slate-500 nb-2 block text-sm">
          Contraseña
        </label>
        <input
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
        >
          Iniciar sesión
        </button>
      </form>
      <button
        type="button"
        onClick={() => signIn("google")}
        className="w-full max-w-md bg-blue-400 text-white p-3 rounded-lg"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}
