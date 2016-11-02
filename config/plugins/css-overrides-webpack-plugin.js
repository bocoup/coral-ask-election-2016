/**
 * This is a Webpack plugin that injects a CSS <link> tag into the header AFTER
 * the other Webpack-output styling
 *
 * @param {String} cssLinkHref The href attribute for a <link rel="stylesheet">
 */
function CSSOverridesWebpackPlugin(cssLinkHref) {
  this.cssLinkHref = cssLinkHref;
}

CSSOverridesWebpackPlugin.prototype.apply = function(compiler) {
  var cssLinkHref = this.cssLinkHref;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      console.log(htmlPluginData.assets);
      htmlPluginData.assets.css.push(cssLinkHref);
      callback(null, htmlPluginData);
    });
  });
};

module.exports = CSSOverridesWebpackPlugin;
