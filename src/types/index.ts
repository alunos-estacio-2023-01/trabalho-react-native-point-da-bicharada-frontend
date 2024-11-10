export interface Client {
  cpf: string;
  email: string;
  nome: string;
  endereco: string;
  telefones: string[];
  pets: Pet[];
}

export interface Pet {
  nome: string;
  raca: string;
  especie: string;
}
