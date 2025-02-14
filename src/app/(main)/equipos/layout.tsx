import React from "react";
import Navbar from "@/app/components/Navbar";

export default function EquiposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* No centramos el contenido para permitir el background completo */}
      <div className="flex-grow">{children}</div>
    </div>
  );
}
