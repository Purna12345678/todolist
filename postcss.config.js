module.exports = {
    plugins: [
      require('postcss-prefix-selector')({
        prefix: '.myprefix', 
        transform: (prefix, selector, prefixedSelector) => {
          if (selector.startsWith('body')) return selector; 
          return prefixedSelector;
        }
      })
    ]
  };
  