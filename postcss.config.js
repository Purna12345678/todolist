module.exports = {
  plugins: [
    require("postcss-class-prefix")("opteamix-"),
    require("postcss-prefix-selector")({
      prefix: ".myscope",
      transform: (prefix, selector, prefixedSelector) => {
        return selector.startsWith(":root") ? selector : prefixedSelector;
      },
    }),
    require("cssnano")({ preset: "default" }),
  ],
};
