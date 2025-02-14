import React from "react";

export default function EquiposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">{children}</div>
    </div>
  );
}
