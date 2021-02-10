const path = require("path");

module.exports = {
  entry: [
    "./source/js/accordeon.js",
    "./source/js/modal.js",
    "./source/js/form-check.js",
    "./source/js/anchors-scroll.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "source/js"),
    iife: false
  },
  devtool: false
};
