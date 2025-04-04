export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
  cpf: string;
  crp: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const testUsers: User[] = Array.from({ length: 10 }, (_, i) => {
  const number = (i + 1).toString().padStart(2, '0');
  return {
    id: `user_${number}`,
    username: `psi_teste${number}`,
    password: 'asdf1234',
    name: `Psicólogo Teste ${number}`,
    email: `psi.teste${number}@exemplo.com`,
    birthDate: '1990-01-01',
    cpf: `000.000.000-${number}`,
    crp: `00/0000${number}`,
    phone: '(00) 00000-0000',
    address: {
      street: 'Rua Exemplo',
      number: '123',
      complement: 'Sala 1',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '00000-000',
    },
  };
}); 