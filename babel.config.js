module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // [
    //   "module:react-native-dotenv",
    //   {
    //     moduleName: "@env",
    //     path: ".env",
    //     blacklist: null,
    //     whitelist: null,
    //     safe: false,
    //     allowUndefined: true,
    //   },
    // ],
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".ios.js", ".android.js", ".js", ".json"],
        alias: {
          "@components": "./src/components",
          "@config": "./src/config",
          "@utils": "./src/utils",
          // "@assets": "./src/assets",
          // "@redux": "./src/redux",
        },
      },
    ],
  ],
}
