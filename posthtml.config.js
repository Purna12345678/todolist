module.exports = {
  plugins: [
    (tree) => {
      tree.match({ attrs: { class: true } }, (node) => {
        node.attrs.class = node.attrs.class
          .split(" ")
          .map((className) => `opteamix-${className}`)
          .join(" ");
        return node;
      });
    },
  ],
};
