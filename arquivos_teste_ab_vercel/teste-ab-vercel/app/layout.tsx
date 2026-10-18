import type { ReactNode } from "react";

export const metadata = {
  title: "Distribuidor de teste A/B",
  description: "Distribuição de tráfego entre duas versões de página"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>{children}</body>
    </html>
  );
}
