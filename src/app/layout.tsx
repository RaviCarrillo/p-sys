import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { AppointmentsProvider } from "@/contexts/appointments-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "P-Sys",
  description: "Sistema de Gestão para Psicólogos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppointmentsProvider>
              {children}
            </AppointmentsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
