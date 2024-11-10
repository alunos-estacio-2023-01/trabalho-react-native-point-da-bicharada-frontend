import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Input } from '@/components/Form';
import { colors } from '@/constants/colors';

export default function PhonesFields() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'telefones',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Telefones</Text>

      <View style={styles.phones}>
        {fields.map((field, index) => (
          <View key={index} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Input name={`telefones[${index}].telefone`} />
            </View>

            {fields.length > 1 && (
              <TouchableOpacity style={styles.removeButton} onPress={() => remove(index)}>
                <MaterialIcons name='close' size={20} style={styles.removeIcon} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={() => append({ telefone: '' })}>
        <Text style={styles.addText}>Adicionar Telefone</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addText: {
    color: colors.blue[500],
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  container: {},
  item: {
    flexDirection: 'row',
    gap: 8,
  },
  phones: {
    gap: 12,
  },
  removeButton: {
    marginTop: 12,
  },
  removeIcon: {
    color: colors.red[500],
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
});
