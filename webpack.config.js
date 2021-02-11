const path = require("path");

module.exports = {
  entry: [
    "./source/js/accordion.js",
    "./source/js/modal.js",
    "./source/js/form-check.js",
    "./source/js/anchors-scroll.js",
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "source/js"),
    iife: false
  },
  devtool: false
};
