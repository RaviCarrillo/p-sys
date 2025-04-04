"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">P-Sys</div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Link href="/dashboard">
              <Button variant="outline">Entrar no P-Sys</Button>
            </Link>
          </div>
        </nav>
        
        <main className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Sistema Inteligente para Psicólogos
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Gerencie sua agenda, finanças e dados dos pacientes com ajuda da Inteligência Artificial.
            Transforme sua prática com análises inteligentes e insights valiosos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">Agenda Inteligente</h3>
              <p className="text-muted-foreground">Integração com Google Agenda e lembretes automáticos</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">Gestão Financeira</h3>
              <p className="text-muted-foreground">Controle financeiro com análises e relatórios automatizados</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">Dashboard Personalizado</h3>
              <p className="text-muted-foreground">Visualize seus dados importantes em um só lugar</p>
            </div>
          </div>

          <Link href="/dashboard" className="inline-block">
            <Button size="lg" className="text-lg px-8">
              Começar Agora
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}
