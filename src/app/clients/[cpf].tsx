import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ClientForm from '@/components/ClientForm';
import { colors } from '@/constants/colors';
import clientService from '@/services/clientService';
import { Client } from '@/types';

export default function EditClient() {
  const { cpf } = useLocalSearchParams();

  const [client, setClient] = useState<Client>();

  const fetchClient = async () => {
    const client = await clientService.getClient(cpf as string);

    setClient(client);
  };

  useEffect(() => {
    fetchClient();
  }, [cpf]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <MaterialIcons name='chevron-left' size={36} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Cliente</Text>
          </View>

          {!!client && <ClientForm client={client} />}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 4,
    marginLeft: -8,
  },
  backIcon: {
    color: colors.gray[500],
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
