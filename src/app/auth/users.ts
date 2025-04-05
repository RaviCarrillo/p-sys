export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
  cpf: string;
  crp: string;
}

export const createUser = (username: string, name: string): User => ({
  id: `user_${username.replace(".", "_")}`,
  username,
  password: "asdf1234",
  name,
  email: `${username.replace(".", "_")}@exemplo.com`,
  birthDate: "1990-01-01",
  cpf: "000.000.000-00",
  crp: "00/000000"
});

export const users: User[] = [
  createUser("beatriz.galetti", "Beatriz Galetti")
]; 