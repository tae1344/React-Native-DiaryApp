module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.ios.ts', '.android.js', '.android.ts', '.jsx', '.js', '.json', '.tsx', '.ts'],
        alias: {
          '@': './',
          '@api': './api',
          '@components': './components',
          '@assets': './assets',
          '@screens': './screens',
          '@navigator': './navigator',
          '@styles': './styles',
        },
      },
    ],
  ],
};
