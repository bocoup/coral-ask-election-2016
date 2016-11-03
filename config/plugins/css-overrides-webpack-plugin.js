/**
 * This is a Webpack plugin that injects a CSS <link> tag into the header AFTER
 * the other Webpack-output styling elements, immediately before the closing
 * <head> tag. Use in your Webpack plugins config by instantiating a new
 * CSSOverridesWebpackPlugin and passing the URI of the sheet to load:
 *
 * @example Add a `<link rel="stylesheet" href="./overrides.css">`:
 *
 *     plugins: [
 *       new HtmlWebpackPlugin({
 *         inject: true,
 *         template: paths.appHtml
 *       }),
 *       new CSSOverridesWebpackPlugin('./overrides.css')
 *     ]
 *
 * The ordering of the plugin does not matter; instantiate one for each file
 * you wish to inject into the <head> of the output document.
 *
 * @param {String} cssLinkHref The href attribute for a <link rel="stylesheet">
 */
function CSSOverridesWebpackPlugin(cssLinkHref) {
  this.cssLinkHref = cssLinkHref;
}

CSSOverridesWebpackPlugin.prototype.apply = function(compiler) {
  var cssLinkHref = this.cssLinkHref;
  function injectCSS(htmlPluginData, callback) {
    htmlPluginData.assets.css.push(cssLinkHref);
    callback(null, htmlPluginData);
  }
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', injectCSS);
  });
};

module.exports = CSSOverridesWebpackPlugin;
