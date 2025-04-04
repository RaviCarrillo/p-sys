import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NovoPaciente() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Novo Paciente</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" placeholder="Nome do paciente" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input id="dataNascimento" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input id="rg" placeholder="00.000.000-0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="email@exemplo.com" />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input id="endereco" placeholder="Rua, número" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input id="complemento" placeholder="Apartamento, bloco, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" placeholder="Nome do bairro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Nome da cidade" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" placeholder="UF" />
                  </div>
                </div>
              </div>

              {/* Dados Profissionais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados Profissionais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profissao">Profissão</Label>
                    <Input id="profissao" placeholder="Profissão atual" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input id="empresa" placeholder="Local de trabalho" />
                  </div>
                </div>
              </div>

              {/* Dados Clínicos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados Clínicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="motivoConsulta">Motivo da Consulta</Label>
                    <Textarea id="motivoConsulta" placeholder="Descreva o motivo principal da consulta" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="historico">Histórico Clínico</Label>
                    <Textarea id="historico" placeholder="Histórico médico e psicológico relevante" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                    <Textarea id="medicamentos" placeholder="Liste os medicamentos em uso" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alergias">Alergias</Label>
                    <Textarea id="alergias" placeholder="Liste as alergias conhecidas" />
                  </div>
                </div>
              </div>

              {/* Contato de Emergência */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contato de Emergência</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contatoEmergencia">Nome do Contato</Label>
                    <Input id="contatoEmergencia" placeholder="Nome do contato de emergência" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefoneEmergencia">Telefone</Label>
                    <Input id="telefoneEmergencia" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentesco">Parentesco</Label>
                    <Input id="parentesco" placeholder="Parentesco com o paciente" />
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">Cadastrar Paciente</Button>
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">Cancelar</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 