// Screens/ZodiacSign.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import ZodiacSignList from '../components/ZodiacSignList';
import PrimaryButton from '../components/PrimaryButton';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import theme from '../color/style';


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
      <PrimaryButton
        title="View Favorites"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Favorites' })}
        style={{ backgroundColor: theme.colors.secondary }}
      />

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
    padding: responsiveWidth(5),
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    marginBottom: responsiveHeight(3),
  },
  header: {
    ...theme.textStyles.header,
    marginBottom: responsiveHeight(3),
    color: theme.colors.text,
  },
  button: {
    width: responsiveWidth(80),
    height: responsiveHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    marginVertical: responsiveHeight(1),
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
