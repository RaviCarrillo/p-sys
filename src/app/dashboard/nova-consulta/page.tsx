"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import { useAppointments } from "@/contexts/appointments-context";
import { useState } from "react";

export default function NovaConsulta() {
  const router = useRouter();
  const { addAppointment } = useAppointments();
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    type: "",
    payment: "",
    observations: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ajusta a data para o fuso horário local
    const [year, month, day] = formData.date.split('-').map(Number);
    const appointmentDate = new Date(year, month - 1, day);
    
    const appointment = {
      patientName: formData.patientName,
      date: appointmentDate,
      time: formData.time,
      type: formData.type,
      payment: formData.payment ? parseFloat(formData.payment) : undefined,
      observations: formData.observations,
    };

    addAppointment(appointment);
    router.push("/dashboard/calendario");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Nova Consulta</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados da Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="patientName">Nome do Paciente</label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleChange("patientName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="date">Data da Consulta</label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time">Horário</label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type">Tipo de Consulta</label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primeira Consulta">Primeira Consulta</SelectItem>
                      <SelectItem value="Consulta Regular">Consulta Regular</SelectItem>
                      <SelectItem value="Retorno">Retorno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="payment">Valor da Consulta</label>
                  <Input
                    id="payment"
                    type="number"
                    value={formData.payment}
                    onChange={(e) => handleChange("payment", e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="observations">Observações</label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => handleChange("observations", e.target.value)}
                  placeholder="Adicione observações relevantes sobre a consulta"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Link href="/dashboard">
                  <Button variant="outline">Cancelar</Button>
                </Link>
                <Button type="submit">Agendar Consulta</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 