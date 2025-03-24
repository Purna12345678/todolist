module.exports = {
  plugins: [
    require("postcss-prefix-selector")({
      prefix: ".opteamix",
      transform: (prefix, selector, prefixedSelector) => {
        if (selector.startsWith("#") || selector.startsWith("body")) {
          return selector;
        }
        return prefixedSelector.replace(/\s+/g, "");
      },
    }),
  ],
};
