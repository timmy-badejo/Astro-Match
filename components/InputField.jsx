import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../color/style';

const InputField = ({ label, error, multiline = false, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          error && styles.errorBorder,
        ]}
        multiline={multiline}
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.medium,
  },
  label: {
    ...theme.textStyles.subtitle,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: theme.borderRadius.small,
    padding: 10,
    ...theme.textStyles.body,
    backgroundColor: theme.colors.cardBackground,
    color: theme.colors.text,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  errorBorder: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;
