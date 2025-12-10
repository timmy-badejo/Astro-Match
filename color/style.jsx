import { lightTheme } from './themes';

// Static fallback theme; most components should consume ThemeContext for live updates.
export default {
  ...lightTheme,
  buttonStyles: {
    backgroundColor: lightTheme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
};
