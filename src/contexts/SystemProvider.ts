import { createContext, useCallback, useContext, useState } from 'react';

import clientService from '@/services/clientService';
import { Client } from '@/types';

export function useSystemState() {
  const [clients, setClients] = useState<Client[]>();

  const fetchClients = useCallback(() => {
    return clientService.getClients().then(setClients);
  }, []);

  return { clients, fetchClients };
}

export const SystemContext = createContext<ReturnType<typeof useSystemState>>({} as any);

export const useSystemContext = () => useContext(SystemContext);
