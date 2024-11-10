import { Client } from '@/types';

import api from './api';

const resource = '/api/clients/';

const clientService = {
  async getClients() {
    const { data } = await api.get<Client[]>(resource);

    return data;
  },

  async getClient(cpf: string) {
    const { data } = await api.get<Client>(`${resource}/${cpf}`);

    return data;
  },

  async createClient(client: Client) {
    return api.post(resource, client);
  },

  async updateClient(cpf: string, client: Client) {
    return api.put(`${resource}${cpf}`, client);
  },

  async deleteClient(cpf: string) {
    return api.delete(`${resource}${cpf}`);
  },
};

export default clientService;
