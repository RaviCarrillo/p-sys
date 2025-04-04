"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Appointment = {
  id: string;
  date: Date;
  time: string;
  patientName: string;
  type: string;
  payment?: number;
  observations?: string;
};

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  removeAppointment: (id: string) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export function AppointmentsProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Carregar dados iniciais (mock)
  useEffect(() => {
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    setAppointments([
      {
        id: "1",
        date: today,
        time: "14:00",
        patientName: "João Silva",
        type: "Consulta Regular",
      },
      {
        id: "2",
        date: dayAfterTomorrow,
        time: "15:30",
        patientName: "Maria Santos",
        type: "Primeira Consulta",
      },
    ]);
  }, []);

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const removeAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  const updateAppointment = (id: string, appointment: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, ...appointment } : app
      )
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, removeAppointment, updateAppointment }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentsProvider");
  }
  return context;
} 