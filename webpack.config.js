const path = require("path");

module.exports = {
    entry: [
        "./source/js/form-check.js",
        "./source/js/anchors-scroll"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "source/js"),
        iife: false
    },
    devtool: false
};
