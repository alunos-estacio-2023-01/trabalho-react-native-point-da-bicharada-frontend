import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/colors';
import { Client } from '@/types';
import clientService from '@/services/clientService';

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({ client }: ClientCardProps) {
  const [showCard, setShowCard] = useState(true);

  const handleEdit = () =>
    router.navigate({
      pathname: `/clients/[cpf]`,
      params: { cpf: client.cpf },
    });

  const deleteClient = async () => {
    await clientService.deleteClient(client.cpf);

    setShowCard(false);
  };

  const handleDelete = () =>
    Alert.alert('Deletar cliente', 'Deseja realmente deletar o cliente?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: deleteClient,
      },
    ]);

  if (!showCard) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{client.nome}</Text>
      <Text style={styles.subTitle}>{client.cpf}</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.action} onPress={handleEdit}>
          <MaterialIcons name='edit' size={16} style={styles.editIcon} />
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={handleDelete}>
          <MaterialIcons name='delete' size={16} style={styles.deleteIcon} />
          <Text style={styles.deleteText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  deleteIcon: {
    color: colors.red[500],
  },
  deleteText: {
    color: colors.red[500],
    fontSize: 14,
    fontWeight: '500',
  },
  editIcon: {
    color: colors.primary[500],
  },
  editText: {
    color: colors.primary[500],
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  subTitle: {
    color: colors.gray[400],
    fontSize: 14,
    marginTop: 4,
  },
});
