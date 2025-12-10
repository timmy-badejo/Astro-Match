// Screens/ZodiacSign.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import ZodiacSignList from '../components/ZodiacSignList';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';
import { scale, verticalScale } from '../utils/scale';


const ZodiacSignScreen = ({ navigation, route }) => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleSignSelection = (sign) => {
    setSelectedSign(sign);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    if (!selectedSign) return;
    navigation.navigate('CompatibilitySearch', {
      selectedSign: selectedSign.name,
      profile: route.params?.profile || null,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../vectors/logo.png')}
        style={styles.logo}
        accessibilityLabel="AstroMatch logo"
      />

      <Text style={styles.header}>Choose Your Zodiac Sign</Text>

      <ZodiacSignList onSelectSign={handleSignSelection} />

      <PrimaryButton title="Next" onPress={handleNext} disabled={!selectedSign} />

      <Animated.View style={[styles.displayContainer, { opacity: fadeAnim }]}>
        <Text style={styles.displayText}>
          {selectedSign ? `You selected: ${selectedSign.name}` : 'Please select a zodiac sign'}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: scale(172),
    height: scale(172),
    marginBottom: verticalScale(20),
  },
  header: {
    ...theme.textStyles.header,
    marginBottom: verticalScale(18),
    color: theme.colors.text,
  },
  button: {
    width: '100%',
    height: verticalScale(52),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    marginVertical: verticalScale(8),
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.textStyles.button.fontSize,
    fontFamily: theme.textStyles.button.fontFamily,
    fontWeight: 'bold',
  },
  displayContainer: {
    marginTop: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 18,
    color: theme.colors.text,
  },
});

export default ZodiacSignScreen;
