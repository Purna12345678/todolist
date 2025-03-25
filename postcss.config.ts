module.exports = {
  plugins: [
    require("postcss-prefix-selector")({
      prefix: ".opteamix",
      transform: (prefix: string, selector: string, prefixedSelector: string) => {
        if (!selector.startsWith(".") || selector.startsWith(prefix)) {
          return selector;
        }
        return `${prefix}${selector.replace(/\./g, "-")}`.trim();
      },
    }),
  ],
};
