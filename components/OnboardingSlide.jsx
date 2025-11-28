import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../color/style';

export default function OnboardingSlide({ title, subtitle, image }) {
  return (
    <View style={styles.container}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    ...theme.textStyles.header,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    ...theme.textStyles.body,
    textAlign: 'center',
    marginTop: 10,
    color: '#fff',
  },
});
