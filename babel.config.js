module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        // Explicitly opt into Hermes transform profile so Flow `match` syntax parses.
        { unstable_transformProfile: 'hermes-stable' },
      ],
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
