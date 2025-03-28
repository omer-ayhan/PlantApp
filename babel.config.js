module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app/navigation': './src/navigation',
          '@app/components': './src/components',
          '@app/screens': './src/screens',
          '@app/assets': './src/assets',
          '@app/hooks': './src/hooks',
          '@app/constants': './src/constants',
          '@app/types': './src/types',
          '@app/styles': './src/styles',
          '@app/lib': './src/lib',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
