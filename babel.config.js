module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ['./'],
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json'
      ],
      alias: {
        "@pkgjson": "package.json",
        "@actions": "./src/actions",
        "@assets": "./src/assets",
        "@components": "./src/components",
        "@config": "./src/config",
        "@screens": "./src/screens",
        "@support": "./src/support",
        "@store": "./src/store",
      }
    }],
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": false
    }],
    ["module:@babel/plugin-proposal-decorators", {
      legacy: true
    }]
  ]
};
