import { Dimensions } from 'react-native';

// Baseline: iPhone 16 Pro Max (logical 430 x 932 assumed, same as recent Pro Max sizes)
const BASE_WIDTH = 430;
const BASE_HEIGHT = 932;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
