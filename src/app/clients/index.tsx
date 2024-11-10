import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import ClientCard from '@/components/ClientCard';
import { colors } from '@/constants/colors';
import { Client } from '@/types';
import { useSystemContext } from '@/contexts/SystemProvider';

export default function Clients() {
  const { clients, fetchClients } = useSystemContext();

  const renderItem = useCallback(({ item }: { item: Client }) => <ClientCard client={item} />, []);

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clientes</Text>

        <Button rightIcon='add' onPress={() => router.navigate('/clients/create')}>
          Novo
        </Button>
      </View>

      <FlashList
        data={clients}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cliente encontrado</Text>}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 16,
  },
  emptyText: {
    color: colors.gray[500],
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
