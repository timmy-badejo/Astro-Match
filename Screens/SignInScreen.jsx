import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

const SignInScreen = ({ navigation }) => {
  const [name, setName] = useState('');
   const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    const trimmed = name.trim();
    const expectedPin = '1234';
    if (!trimmed) {
      setError('Name is required to sign in.');
      return;
    }
    if (!/^[0-9]{4}$/.test(pin)) {
      setError('Enter the 4-digit access PIN.');
      return;
    }
    if (pin !== expectedPin) {
      setError('Incorrect PIN. Try 1234 for demo access.');
      return;
    }
    setError('');
    navigation.replace('MainTabs', { screen: 'Home', params: { name: trimmed } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign back into AstroMatch</Text>
      <InputField
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <InputField
        label="4-digit PIN"
        value={pin}
        onChangeText={setPin}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
        error={error}
      />
      {error ? <Text style={styles.inlineError}>{error}</Text> : null}
      <PrimaryButton
        title="Continue"
        onPress={handleSignIn}
        disabled={!name.trim() || pin.length < 4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.large,
    backgroundColor: '#060B3A',
  },
  title: {
    ...theme.textStyles.header,
    color: '#fff',
    marginBottom: theme.spacing.medium,
  },
  inlineError: {
    color: theme.colors.error,
    marginBottom: theme.spacing.small,
  },
});

export default SignInScreen;
