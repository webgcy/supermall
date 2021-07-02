module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 320,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],   //'ignore', 'tar-bar', 'tab-bar-item'
      minPixelValue: 1,
      mediaQuery: false,
    }  
  }
}