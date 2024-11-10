import { Input } from '@/components/Form';
import { colors } from '@/constants/colors';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PetsFields() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pets',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pets</Text>

      {fields.map((field, index) => (
        <View key={field.id} style={styles.card}>
          <Input label='Nome' name={`pets[${index}].nome`} />
          <Input label='Espécie' name={`pets[${index}].especie`} />
          <Input label='Raça' name={`pets[${index}].raca`} />

          {fields.length > 1 && (
            <TouchableOpacity onPress={() => remove(index)}>
              <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={() => append({ nome: '', especie: '', raca: '' })}>
        <Text style={styles.addText}>Adicionar Pet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addText: {
    color: colors.blue[500],
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  container: {
    marginTop: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    backgroundColor: 'white',
    borderRadius: 12,
    gap: 16,
    marginBottom: 16,
    padding: 16,
  },
  removeText: {
    color: colors.red[500],
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
