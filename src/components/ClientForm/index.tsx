import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';

import { colors } from '@/constants/colors';
import clientService from '@/services/clientService';
import { Client } from '@/types';

import Button from '../Button';
import { Input } from '../Form';
import PetsFields from './PetsFields';
import PhonesFields from './PhonesFields';
import { useSystemContext } from '@/contexts/SystemProvider';

interface ClientFormProps {
  client?: Client;
  submitLabel?: string;
}

interface FormValues extends Omit<Client, 'telefones'> {
  telefones: { telefone: string }[];
}

export default function ClientForm({ client, submitLabel = 'Salvar' }: ClientFormProps) {
  const { fetchClients } = useSystemContext();

  const [error, setError] = useState<string | null>(null);

  const methods = useForm<FormValues>({
    defaultValues: {
      telefones: [{ telefone: '' }],
      pets: [
        {
          nome: '',
          especie: '',
          raca: '',
        },
      ],
    },
    resolver: zodResolver(createValidationSchema(client)),
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    try {
      setError(null);

      const formattedValues = {
        ...values,
        telefones: values.telefones.map((telefone) => telefone.telefone),
      };

      if (client) {
        await clientService.updateClient(client.cpf, formattedValues);
      } else {
        await clientService.createClient(formattedValues);
      }

      fetchClients();
      router.back();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.detail);
      }
    }
  });

  useEffect(() => {
    if (client) {
      methods.reset({
        ...client,
        cpf: undefined,
        telefones: client.telefones?.map((telefone) => ({ telefone })),
      });
    }
  }, [client]);

  return (
    <FormProvider {...methods}>
      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.fields}>
        <Input name='nome' label='Nome' />
        <Input name='email' label='E-mail' />
        {!client && <Input name='cpf' label='CPF' />}
        <Input name='endereco' label='Endereço' />

        <PhonesFields />
      </View>

      <PetsFields />

      <View style={styles.footer}>
        <Button onPress={handleSubmit}>{submitLabel}</Button>
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.red[500],
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  fields: {
    gap: 12,
  },
  footer: {
    marginTop: 32,
    marginBottom: 40,
  },
});

const required = { message: 'Campo obrigatório' };

const phoneSchema = z.object({
  telefone: z.string().regex(/^\d{11}$/, 'Telefone deve conter 11 dígitos numéricos'),
});

const cpfSchema = z
  .string(required)
  .min(1)
  .regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos');

const petSchema = z.object({
  especie: z.string(required).min(1),
  nome: z.string(required).min(1),
  raca: z.string(required).min(1),
});

const createValidationSchema = (client?: Client) =>
  z.object({
    nome: z.string(required).min(1),
    ...(client ? {} : { cpf: cpfSchema }),
    email: z.string(required).email('Formato de e-mail inválido'),
    endereco: z.string(required).min(1).max(255, 'Endereço deve ter no máximo 255 caracteres'),
    telefones: z.array(phoneSchema).min(1, required.message),
    pets: z.array(petSchema).min(1),
  });
