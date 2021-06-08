module.exports = {
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  importOrder: [
    "^react(.*)$",
    "^[a-zA-Z0-9](.*)$",
    "^@components/(.*)$",
    "^[./(.*)]",
    "^@api/(.*)$",
    "^@utils/(.*)$",
    "^@redux/(.*)$",
    "^@images/(.*)$",
    "^@(.*)$",
  ],
  importOrderSeparation: true,
  experimentalBabelParserPluginsList: ["jsx", "classProperties"],
}
