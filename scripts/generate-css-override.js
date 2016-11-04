/**
 * This script will read in the CSS output by the production Webpack build,
 * and output an "overrides.css" file into the build/ directory containing
 * only the subset of rules from that production CSS relevant to branding-
 * oriented look-and-feel, such as colors & fonts.
 *
 * The purpose of this file is to allow the appearance of the visualization
 * to be customized to match the site into which it is being embedded.
 *
 * While this script can be run on its own, it exports its activities as a
 * Promise so that the build process could hook into its completion if needed.
 * Simply requiring this file will kick off the transformation.
 */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const css = require('css');

const paths = require('../config/paths');
const cssBuildDir = path.join(paths.appBuild, 'static/css');
const overridesFile = path.join(paths.appBuild, 'overrides.css');

// This is a RegExp that will match any rule we wish to KEEP in the overrides
const whitelistedRules = new RegExp([
  'font',
  'line-height',
  'color'
].join('|'), 'i');

/**
 * Get the list of files in a directory, either as a list of file and subdir
 * names or a list of absolute file system paths
 *
 * @private
 * @param {string} inputDir The file system path to the directory to read
 * @returns {Promise} A promise to the string array of file names
 */
const ls = (inputDir, absolute) => {
  return new Promise((resolve, reject) => {
    fs.readdir(inputDir, (err, list) => {
      if (err) {
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
};

/**
 * Take in a list of files in the build/static/css directory, find the CSS
 * file, and load its contents as a text string
 *
 * @param {String[]} fileList An array of filenames e.g. "main.b6889fa9.css"
 * @returns {Promise} A promise that resolves to the text file
 */
const loadGeneratedStylesheet = fileList => {
  const cssFileName = fileList.find(fileName => /\.css$/.test(fileName));
  const cssPath = path.join(cssBuildDir, cssFileName);
  return new Promise((resolve, reject) => {
    fs.readFile(cssPath, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.toString());
    });
  });
}

/**
 * Walk the AST and remove all rules not related to visual styling
 *
 * @param {Object} ast A parsed CSS abstract syntax tree
 * @returns {String} The filtered CSS text
 */
const whitelist = ast => {
  const filterRules = rules => rules.forEach(rule => {
    if (rule.declarations) {
      rule.declarations = rule.declarations
        .filter(declaration => whitelistedRules.test(declaration.property))
    } else if (rule.rules) {
      filterRules(rule.rules);
    }
  });
  filterRules(ast.stylesheet.rules);
  return css.stringify(ast);
}

/**
 * Collapse newlines, remove empty blocks and delete sourcemap comments
 * from the CSS string output by stringifying the filtered AST
 *
 * @param {String} cssStr The string content of a stylesheet
 * @returns {String} The cleaned stylesheet string
 */
const beautify = cssStr => cssStr
  // Strip line comments, including sourcemap comment
  .replace(/\/\*[^\n]+\*\/(\n|$)/g, '')
  // Remove empty media blocks
  .replace(/\n@media[^{]+\{\s+\}/g, '')
  // Strip superfluous newlines
  .replace(/\{\n{2,}/g, '{\n')
  .replace(/^\n+/, '')
  .replace(/\n{2,}/g, '\n\n')
  .replace(/\n+$/, '');

/**
 * Write out the overrides CSS file to the build directory
 *
 * @param {String} cssStr The string content of a stylesheet
 * @returns {Promise} A promise that resolves when the file has been written
 */
const writeOverridesFile = cssStr => new Promise((resolve, reject) => {
  fs.writeFile(overridesFile, cssStr, err => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});


console.log('Generating CSS Overrides file...');
module.exports = ls(cssBuildDir)
  .then(loadGeneratedStylesheet)
  .then(css.parse)
  .then(whitelist)
  .then(beautify)
  .then(writeOverridesFile)
  .then(() => console.log('Wrote ' + chalk.grey('build/') + chalk.cyan('overrides.css')))
  .catch(err => console.error(err));
