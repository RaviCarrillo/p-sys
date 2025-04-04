import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Agenda() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Agenda</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendário de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {/* Cabeçalho dos dias da semana */}
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                <div key={dia} className="text-center p-2 font-semibold text-sm">
                  {dia}
                </div>
              ))}
              
              {/* Grid do calendário - exemplo com alguns dias */}
              {Array.from({ length: 35 }).map((_, index) => {
                const day = index + 1;
                const hasAppointment = [3, 7, 12, 15, 20].includes(day); // Exemplo de dias com consultas

                return (
                  <div
                    key={index}
                    className={`
                      p-2 min-h-[80px] border rounded-md
                      ${hasAppointment ? 'bg-primary/10' : ''}
                    `}
                  >
                    <div className="font-medium text-sm">{day}</div>
                    {hasAppointment && (
                      <div className="mt-1">
                        <div className="text-xs bg-primary/20 p-1 rounded">
                          {day % 2 === 0 ? '14:00 - João' : '15:30 - Maria'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 