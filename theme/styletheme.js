export default {
  // Colors for different UI states (primary, secondary, background, etc.)
  colors: {
    primary: '#3498db', // Main theme color
    secondary: '#2ecc71', // Secondary color (often used for success)
    background: '#f5f5f5', // Background color for screens
    text: '#2c3e50', // Main text color
    cardBackground: '#ffffff', // Card background color
    borderColor: '#ddd', // Border color for inputs, cards, etc.
    error: '#e74c3c', // Error color for warnings or invalid inputs
    warning: '#f39c12', // Warning color for cautionary messages
    success: '#2ecc71', // Success color for positive messages
    lightText: '#ecf0f1', // Light text color, for subtitles or less important text
    darkText: '#34495e', // Darker variant for text (e.g., headers)
  },

  // Text Styles
  textStyles: {
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'Nunito_400Regular',
      color: '#2c3e50', // Dark color for headers
    },
    body: {
      fontSize: 18,
      fontFamily: 'Nunito_400Regular',
      color: '#2c3e50', // Dark color for body text
    },
    button: {
      fontSize: 16,
      fontFamily: 'Nunito_400Regular',
      color: '#ffffff', // White text for buttons
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Nunito_400Regular',
      color: '#95a5a6', // Lighter text color for subtitles
    },
  },

  // Button Styles
  buttonStyles: {
    backgroundColor: '#F6B879', // Button color from the theme
    borderRadius: 5, // Border radius for the button
    paddingVertical: 12, // Vertical padding for buttons
    paddingHorizontal: 25, // Horizontal padding for buttons
  },

  // Shadows and Elevation (for cards, buttons, modals, etc.)
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4, // Android shadow elevation
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 6, // Slightly stronger shadow for medium elements
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10, // Stronger shadow for high-impact elements
    },
  },

  // Border radius (to keep the app consistent)
  borderRadius: {
    small: 5, // For buttons, inputs, etc.
    medium: 10, // For cards, modals
    large: 15, // For larger rounded corners
  },

  // Spacing (for margins, padding, etc.)
  spacing: {
    small: 8, // Small spacing for tight layout
    medium: 16, // Standard spacing
    large: 24, // Larger spacing for generous layout
  },

  // Additional styling properties
  layout: {
    maxWidth: 500, // Max width for containers on larger screens
    containerPadding: 16, // Padding for container-based components
  },

  // Dark Mode: Providing a variant for light/dark mode support
  darkMode: {
    colors: {
      primary: '#9b59b6', // Light purple for dark mode
      background: '#2c3e50', // Dark background
      text: '#ecf0f1', // Light text for dark mode
    },
    textStyles: {
      header: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Nunito_400Regular',
        color: '#ecf0f1',
      },
      body: {
        fontSize: 18,
        fontFamily: 'Nunito_400Regular',
        color: '#ecf0f1',
      },
      button: {
        fontSize: 16,
        fontFamily: 'Nunito_400Regular',
        color: '#ffffff',
      },
    },
  },
};
