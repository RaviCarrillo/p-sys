import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Search, Plus } from "lucide-react";

export default function Pacientes() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Pacientes</h1>
        </div>

        <div className="flex flex-col gap-6">
          {/* Barra de Pesquisa e Ações */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar pacientes..." className="pl-8" />
            </div>
            <Link href="/dashboard/pacientes/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Paciente
              </Button>
            </Link>
          </div>

          {/* Lista de Pacientes */}
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Exemplo de paciente */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">João Silva</h3>
                    <p className="text-sm text-muted-foreground">joao.silva@email.com</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>

                {/* Exemplo de paciente */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Maria Santos</h3>
                    <p className="text-sm text-muted-foreground">maria.santos@email.com</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 