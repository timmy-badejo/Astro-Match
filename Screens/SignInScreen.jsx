import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

const SignInScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleSignIn = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    navigation.navigate('ZodiacSign', { profile: { name: trimmed } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign back into AstroMatch</Text>
      <InputField
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <PrimaryButton title="Continue" onPress={handleSignIn} />
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
});

export default SignInScreen;
