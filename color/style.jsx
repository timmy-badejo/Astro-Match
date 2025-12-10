export default {
  colors: {
    primary: '#5A3DFF', // Cosmic Purple
    secondary: '#2ECC71',
    background: '#020A30', // Deep Space Blue
    cardBackground: '#0B153F',
    text: '#F7F7F7', // Milky White
    highlight: '#FDB813', // Neon Star Yellow
    borderColor: '#23306B',
    error: '#e74c3c',
    warning: '#f39c12',
    success: '#2ecc71',
    overlay: 'rgba(90, 61, 255, 0.18)', // Soft lavender blur feel
  },

  gradients: {
    cosmic: ['#0b0f2f', '#151e52', '#1f2b6a'],
    glow: ['rgba(90,61,255,0.4)', 'rgba(2,10,48,0.1)'],
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

  buttonStyles: {
    backgroundColor: '#5A3DFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },

  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 4,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.26,
      shadowRadius: 12,
      elevation: 8,
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      elevation: 14,
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
};
