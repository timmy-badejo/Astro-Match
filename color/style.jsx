import { darkTheme } from './themes';

export default {
  ...darkTheme,
  buttonStyles: {
    backgroundColor: darkTheme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
};
