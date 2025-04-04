"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { useAppointments } from "@/contexts/appointments-context";

// Tipo para as consultas
type Appointment = {
  id: string;
  date: Date;
  time: string;
  patientName: string;
  type: string;
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { appointments, removeAppointment } = useAppointments();

  useEffect(() => {
    setDate(new Date());
  }, []);

  // Função para verificar se um dia tem consultas
  const getDayAppointments = (day: Date) => {
    if (!day) return [];
    
    return appointments.filter(
      (appointment) => {
        const appointmentDate = new Date(appointment.date);
        return (
          appointmentDate.getDate() === day.getDate() &&
          appointmentDate.getMonth() === day.getMonth() &&
          appointmentDate.getFullYear() === day.getFullYear()
        );
      }
    );
  };

  // Função para renderizar o conteúdo do dia
  const renderDayContent = (day: Date) => {
    if (!day) return null;
    
    const dayAppointments = getDayAppointments(day);

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span className="relative z-10 text-foreground">{day.getDate()}</span>
        {dayAppointments.length > 0 && (
          <div className="absolute bottom-1 left-0 w-full z-0">
            <div className="h-0.5 bg-primary rounded-full mx-1" />
            <span className="text-[10px] text-primary absolute -bottom-3 right-1">
              {dayAppointments.length}
            </span>
          </div>
        )}
      </div>
    );
  };

  if (!date) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Calendário de Consultas</h1>
          </div>
          <Link href="/dashboard/nova-consulta">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6">
          <Card>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md 
                  [&_.rdp]:text-foreground
                  [&_.rdp-button_reset]:text-foreground
                  [&_.rdp-button]:text-foreground
                  [&_.rdp-button]:font-normal
                  [&_.rdp-button]:bg-transparent
                  [&_.rdp-day]:text-foreground
                  [&_.rdp-day]:relative
                  [&_.rdp-day]:h-10
                  [&_.rdp-day]:w-10
                  [&_.rdp-day]:p-0
                  [&_.rdp-day]:font-normal
                  [&_.rdp-day_selected]:bg-primary/10
                  [&_.rdp-day_selected]:text-primary
                  [&_.rdp-day_today]:border
                  [&_.rdp-day_today]:border-primary
                  [&_.rdp-day_today]:bg-transparent
                  [&_.rdp-nav_button]:text-foreground
                  [&_.rdp-nav_button]:hover:bg-transparent
                  [&_.rdp-nav_button]:hover:text-primary
                  [&_.rdp-caption_label]:text-foreground
                  [&_.rdp-caption_label]:font-medium
                  [&_.rdp-head_cell]:text-muted-foreground
                  [&_.rdp-head_cell]:font-medium
                  [&_.rdp-tbody]:text-foreground
                  [&_.rdp-tbody_tr]:text-foreground
                  [&_.rdp-tbody_td]:text-foreground
                  [&_.rdp-row]:text-foreground
                  dark:[&_.rdp]:text-foreground
                  dark:[&_.rdp-button]:text-foreground
                  dark:[&_.rdp-day]:text-foreground
                  dark:[&_.rdp-nav_button]:text-foreground
                  dark:[&_.rdp-caption_label]:text-foreground
                  dark:[&_.rdp-head_cell]:text-muted-foreground"
                components={{
                  DayContent: ({ date }) => renderDayContent(date),
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Consultas do dia {date.toLocaleDateString("pt-BR")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getDayAppointments(date).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{appointment.time} - {appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/calendario/${appointment.id}`}>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeAppointment(appointment.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
                {getDayAppointments(date).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    Nenhuma consulta agendada para este dia
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
} 