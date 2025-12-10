export const lightTheme = {
  colors: {
    primary: '#5A3DFF',
    secondary: '#2ECC71',
    background: '#F8F9FF',
    cardBackground: '#FFFFFF',
    text: '#0C102A',
    highlight: '#FDB813',
    borderColor: '#D8DCEC',
    error: '#e74c3c',
    warning: '#f39c12',
    success: '#2ecc71',
    overlay: 'rgba(90, 61, 255, 0.12)',
  },
  textStyles: {
    title: {
      fontSize: 34,
      fontWeight: '700',
      fontFamily: 'Orbitron_700Bold',
      color: '#0C102A',
    },
    header: {
      fontSize: 28,
      fontWeight: '700',
      fontFamily: 'Orbitron_700Bold',
      color: '#0C102A',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Nunito_400Regular',
      color: '#4B5575',
    },
    body: {
      fontSize: 16,
      fontFamily: 'Nunito_400Regular',
      color: '#0C102A',
    },
    button: {
      fontSize: 16,
      fontFamily: 'Nunito_400Regular',
      color: '#F7F7F7',
    },
    caption: {
      fontSize: 13,
      fontFamily: 'Nunito_400Regular',
      color: '#6B7395',
    },
  },
  borderRadius: {
    small: 8,
    medium: 14,
    large: 20,
  },
  spacing: {
    xsmall: 6,
    small: 10,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.14,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};

export const darkTheme = {
  colors: {
    primary: '#5A3DFF',
    secondary: '#2ECC71',
    background: '#020A30',
    cardBackground: '#0B153F',
    text: '#F7F7F7',
    highlight: '#FDB813',
    borderColor: '#23306B',
    error: '#e74c3c',
    warning: '#f39c12',
    success: '#2ecc71',
    overlay: 'rgba(90, 61, 255, 0.18)',
  },
  textStyles: {
    title: {
      fontSize: 34,
      fontWeight: '700',
      fontFamily: 'Orbitron_700Bold',
      color: '#F7F7F7',
    },
    header: {
      fontSize: 28,
      fontWeight: '700',
      fontFamily: 'Orbitron_700Bold',
      color: '#F7F7F7',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Nunito_400Regular',
      color: '#C3C7E6',
    },
    body: {
      fontSize: 16,
      fontFamily: 'Nunito_400Regular',
      color: '#F7F7F7',
    },
    button: {
      fontSize: 16,
      fontFamily: 'Nunito_400Regular',
      color: '#F7F7F7',
    },
    caption: {
      fontSize: 13,
      fontFamily: 'Nunito_400Regular',
      color: '#A0A7D4',
    },
  },
  borderRadius: {
    small: 8,
    medium: 14,
    large: 20,
  },
  spacing: {
    xsmall: 6,
    small: 10,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};

export const navLightTheme = {
  dark: false,
  colors: {
    primary: lightTheme.colors.primary,
    background: lightTheme.colors.background,
    card: lightTheme.colors.cardBackground,
    text: lightTheme.colors.text,
    border: lightTheme.colors.borderColor,
    notification: lightTheme.colors.highlight,
  },
};

export const navDarkTheme = {
  dark: true,
  colors: {
    primary: darkTheme.colors.primary,
    background: darkTheme.colors.background,
    card: darkTheme.colors.cardBackground,
    text: darkTheme.colors.text,
    border: darkTheme.colors.borderColor,
    notification: darkTheme.colors.highlight,
  },
};
