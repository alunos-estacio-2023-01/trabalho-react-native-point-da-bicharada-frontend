import { FieldError, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import get from 'lodash/get';

import { colors } from '@/constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  name: string;
}

export function Input({ label, name, ...props }: InputProps) {
  const { formState, setValue, watch } = useFormContext();

  const value = watch(name);

  const error = get(formState.errors, name);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        id={name}
        value={value}
        onChangeText={(value) => setValue(name, value)}
        style={{
          ...styles.input,
          borderColor: error ? colors.red[500] : colors.gray[300],
        }}
        {...props}
      />

      {!!error && <Text style={styles.error}>{(error as FieldError).message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.gray[25],
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  error: {
    fontSize: 14,
    color: colors.red[500],
    marginTop: 6,
  },
});
