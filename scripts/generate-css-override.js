const path = require('path');
const fs = require('fs');
const util = require('util');

const css = require('css');

const paths = require('../config/paths');
const cssBuildDir = path.join(paths.appBuild, 'static/css');
const overridesFile = path.join(paths.appPublic, 'overrides.css');

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
 * @param {String[]} fileList An array of string file names
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

const inspect = (...args) => {
  args.forEach((arg) => {
    if (typeof arg === 'string') {
      console.log(arg);
    } else {
      console.log(util.inspect(arg, { depth: null }));
    }
  });
  return args[0];
}

const beautify = str => str
  // Remove empty media blocks
  .replace(/\n@media[^{]+\{\s+\}/g, '')
  // Strip superfluous newlines
  .replace(/^\n+/, '')
  .replace(/\n{2,}/g, '\n\n')
  .replace(/\n+$/, '')
  // Strip no-longer-accurate sourcemap comment
  .replace(/\n+\/\*[^\n]+$/, '')

const writeOverridesFile = str => new Promise((resolve, reject) => {
  fs.writeFile(overridesFile, str, err => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});

module.exports = ls(cssBuildDir)
  .then(loadGeneratedStylesheet)
  .then(css.parse)
  .then(whitelist)
  .then(beautify)
  .then(writeOverridesFile)
  .catch(e => console.error(e));
