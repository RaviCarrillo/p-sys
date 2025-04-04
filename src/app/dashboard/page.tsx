"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Calendar, Brain, PieChart, Clock, Users, TrendingUp, Plus, MessageSquare, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import { useState, useEffect } from "react";
import { useAppointments } from "@/contexts/appointments-context";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { appointments } = useAppointments();
  const [nextAppointment, setNextAppointment] = useState<any>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);

  useEffect(() => {
    // Encontrar a próxima consulta e as próximas consultas da semana
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);

    const sortedAppointments = appointments
      .map(app => ({
        ...app,
        dateTime: new Date(
          new Date(app.date).getFullYear(),
          new Date(app.date).getMonth(),
          new Date(app.date).getDate(),
          ...app.time.split(':').map(Number)
        )
      }))
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    const upcoming = sortedAppointments.filter(app => app.dateTime > now);
    setNextAppointment(upcoming[0] || null);
    setUpcomingAppointments(upcoming.filter(app => app.dateTime <= nextWeek));
  }, [appointments]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">P-Sys</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Link href="/dashboard/perfil">
                  <Button variant="outline" size="icon" title="Editar Perfil">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="icon" onClick={handleLogout} title="Sair">
                  <LogOut className="h-4 w-4" />
                </Button>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Bem-vinda, {user?.name}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Próxima Consulta</p>
                  </div>
                  {nextAppointment ? (
                    <>
                      <p className="text-2xl font-semibold mt-2">{nextAppointment.time}</p>
                      <p className="text-sm text-muted-foreground">{nextAppointment.patientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(nextAppointment.date).toLocaleDateString('pt-BR')}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-medium mt-2">Sem agendamento na semana</p>
                      <p className="text-sm text-muted-foreground">Próximos 7 dias</p>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Pacientes Ativos</p>
                  </div>
                  <p className="text-2xl font-semibold mt-2">32</p>
                  <p className="text-sm text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Taxa de Presença</p>
                  </div>
                  <p className="text-2xl font-semibold mt-2">95%</p>
                  <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Receita Mensal</p>
                  </div>
                  <p className="text-2xl font-semibold mt-2">R$ 8.500</p>
                  <p className="text-sm text-muted-foreground">+12% que anterior</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agenda</CardTitle>
                <CardDescription>Próximas consultas agendadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{appointment.time} - {appointment.patientName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString('pt-BR')} - {appointment.type}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-2">
                      Nenhuma consulta agendada para os próximos dias
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <Link href="/dashboard/calendario">
                      <Button variant="outline" className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Ver Calendário
                      </Button>
                    </Link>
                    <Link href="/dashboard/nova-consulta">
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Consulta
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle>Assistente IA</CardTitle>
                </div>
                <CardDescription>Análises e insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Sugestões do assistente:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• 3 pacientes sem retorno agendado</li>
                    <li>• Horários livres na próxima semana</li>
                    <li>• Relatório mensal pendente</li>
                  </ul>
                </div>
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversar com IA
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <CardTitle>Financeiro</CardTitle>
                </div>
                <CardDescription>Visão geral do mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Receita</span>
                    <span className="font-semibold">R$ 8.500,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Consultas</span>
                    <span className="font-semibold">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Média/Consulta</span>
                    <span className="font-semibold">R$ 202,38</span>
                  </div>
                </div>
                <Button className="w-full">Ver Relatório Completo</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Pacientes</CardTitle>
                </div>
                <CardDescription>Gerencie seus pacientes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">32</p>
                      <p className="text-sm text-muted-foreground">Pacientes Ativos</p>
                    </div>
                    <div>
                      <p className="font-medium">5</p>
                      <p className="text-sm text-muted-foreground">Novos este mês</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/dashboard/pacientes">
                    <Button variant="secondary" className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Gerenciar Pacientes
                    </Button>
                  </Link>
                  <Link href="/dashboard/pacientes/novo">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Paciente
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 