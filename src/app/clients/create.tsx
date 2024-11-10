import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ClientForm from '@/components/ClientForm';
import { colors } from '@/constants/colors';

export default function CreateClient() {
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
            <Text style={styles.title}>Novo Cliente</Text>
          </View>

          <ClientForm submitLabel='Criar' />
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
