import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { apiFetch } from "@/app/utils/apiFetch";

export async function GET(
  req: NextRequest,
  context: { params: { idUbicacion: string } }
) {
  // Extraer el token de la sesión usando el helper de NextAuth
  const token = await getToken({ req });
  if (!token || !token.accessToken) {
    return NextResponse.json(
      { error: "No estás autenticado o no se encontró el token" },
      { status: 401 }
    );
  }

  // Obtener el id parametro de context
  const { idUbicacion } = await context.params;
  console.log("La idUbicacionActual ", idUbicacion);
  // Hacer la llamada al backend incluyendo el token en el encabezado Authorization
  const res = await apiFetch(
    `${process.env.API_REST}/ubicaciones/${idUbicacion}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  // Intentar parsear la respuesta como JSON
  try {
    const result = await res.json();
    console.log("Obtengo nombre de Ubicacion de equipo", result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "La respuesta del backend no es un JSON válido" },
      { status: 500 }
    );
  }
}
