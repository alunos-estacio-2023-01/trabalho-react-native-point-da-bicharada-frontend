import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';

interface ButtonProps {
  children: React.ReactNode;
  rightIcon?: ComponentProps<typeof MaterialIcons>['name'];
  onPress?(): void;
}

export default function Button({ children, rightIcon, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {!!rightIcon && <MaterialIcons name={rightIcon} size={18} style={styles.icon} />}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    color: colors.white,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
