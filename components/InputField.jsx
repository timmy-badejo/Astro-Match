import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import theme from '../color/style';

export default function InputField({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    color: theme.colors.text,
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    backgroundColor: theme.colors.cardBackground,
    padding: 12,
    borderRadius: theme.borderRadius.medium,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
});
