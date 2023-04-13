module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@theme': './src/theme',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@utils': './src/utils',
            '@services': './src/services',
            '@store': './src/store'
          }
        }
      ],
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env"
      }],
    ]
  };
};
