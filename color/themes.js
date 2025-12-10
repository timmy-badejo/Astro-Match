export const designTokens = {
  typography: {
    heading1: { fontSize: 32, fontWeight: '700', fontFamily: 'Orbitron_700Bold' },
    heading2: { fontSize: 24, fontWeight: '600', fontFamily: 'Orbitron_700Bold' },
    heading3: { fontSize: 20, fontWeight: '600', fontFamily: 'Nunito_400Regular' },
    body: { fontSize: 16, fontWeight: '400', fontFamily: 'Nunito_400Regular' },
    caption: { fontSize: 14, fontWeight: '400', fontFamily: 'Nunito_400Regular' },
    small: { fontSize: 12, fontWeight: '400', fontFamily: 'Nunito_400Regular' },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
  },
  elementColors: {
    fire: '#FF6B6B',
    earth: '#8B4513',
    air: '#87CEEB',
    water: '#4682B4',
  },
};

const buildTypography = (palette) => ({
  title: { ...designTokens.typography.heading1, color: palette.textPrimary },
  header: { ...designTokens.typography.heading2, color: palette.textPrimary },
  subtitle: { ...designTokens.typography.heading3, color: palette.textSecondary },
  body: { ...designTokens.typography.body, color: palette.textPrimary },
  button: { ...designTokens.typography.body, color: palette.textOnPrimary || palette.textPrimary },
  caption: { ...designTokens.typography.caption, color: palette.textSecondary },
  small: { ...designTokens.typography.small, color: palette.textSecondary },
});

const buildSpacing = () => ({
  xsmall: designTokens.spacing.xs,
  small: designTokens.spacing.sm,
  medium: designTokens.spacing.md,
  large: designTokens.spacing.lg,
  xlarge: designTokens.spacing.xl,
  ...designTokens.spacing,
});

const buildBorderRadius = () => ({
  small: designTokens.radius.sm,
  medium: designTokens.radius.md,
  large: designTokens.radius.lg,
});

const lightPalette = {
  primary: '#6B46C1',
  secondary: '#ED8936',
  background: '#FFFFFF',
  cardBackground: '#F7FAFC',
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  border: '#E2E8F0',
  success: '#48BB78',
  warning: '#ECC94B',
  error: '#F56565',
  overlay: 'rgba(107, 70, 193, 0.12)',
};

const darkPalette = {
  primary: '#9F7AEA',
  secondary: '#F6AD55',
  background: '#1A202C',
  cardBackground: '#2D3748',
  textPrimary: '#F7FAFC',
  textSecondary: '#CBD5E0',
  border: '#4A5568',
  success: '#48BB78',
  warning: '#ECC94B',
  error: '#F56565',
  overlay: 'rgba(159, 122, 234, 0.16)',
};

export const lightTheme = {
  colors: {
    primary: lightPalette.primary,
    secondary: lightPalette.secondary,
    background: lightPalette.background,
    cardBackground: lightPalette.cardBackground,
    text: lightPalette.textPrimary,
    textSecondary: lightPalette.textSecondary,
    highlight: lightPalette.secondary,
    borderColor: lightPalette.border,
    error: lightPalette.error,
    warning: lightPalette.warning,
    success: lightPalette.success,
    overlay: lightPalette.overlay,
    elementColors: designTokens.elementColors,
  },
  textStyles: buildTypography(lightPalette),
  borderRadius: buildBorderRadius(),
  spacing: buildSpacing(),
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 3,
    },
  },
};

export const darkTheme = {
  colors: {
    primary: darkPalette.primary,
    secondary: darkPalette.secondary,
    background: darkPalette.background,
    cardBackground: darkPalette.cardBackground,
    text: darkPalette.textPrimary,
    textSecondary: darkPalette.textSecondary,
    highlight: darkPalette.secondary,
    borderColor: darkPalette.border,
    error: darkPalette.error,
    warning: darkPalette.warning,
    success: darkPalette.success,
    overlay: darkPalette.overlay,
    elementColors: designTokens.elementColors,
  },
  textStyles: buildTypography(darkPalette),
  borderRadius: buildBorderRadius(),
  spacing: buildSpacing(),
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.22,
      shadowRadius: 8,
      elevation: 5,
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
