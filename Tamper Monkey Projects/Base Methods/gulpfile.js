/**
 * Include gulp plugins
 */
const gulp = require("gulp");
const argv = require("yargs").argv;
const gulpif = require("gulp-if");
const rename = require("gulp-rename");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify");
const del = require("del");

/**
 * Include projectConfig file
 */
const projectConfig = require("./projectСonfig.json");

/**
 * Path settings
 */
const path = projectConfig.path;

path.watch = {};

/**
 * Js path
 */
path.src.script[0] = path.src.srcPath + path.src.script[0];

path.dist.script = path.dist.distPath + path.dist.script;

path.watch.script = [];
path.watch.script[0] = path.src.script[0].replace(
   path.src.script[0].split("/").pop(),
   "**/*.js"
);

/**
 * Dev check
 */
const isDev = function () {
   return !argv.prod;
};

/**
 * Prod check
 */
const isProd = function () {
   return !!argv.prod;
};

/**
 * Script
 */
const webpackConf = {
   mode: isDev() ? "development" : "production",
   devtool: isDev() ? "eval-source-map" : false,
   optimization: {
      minimize: false,
   },
   output: {
      filename: "app.js",
   },
   module: {
      rules: [],
   },
};

if (isProd()) {
   webpackConf.module.rules.push({
      test: /\.(js)$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
   });
}

function script() {
   return gulp
      .src(path.src.script)
      .pipe(plumber())
      .pipe(webpackStream(webpackConf, webpack))
      .pipe(gulpif(isProd(), gulp.dest(path.dist.script)))
      .pipe(gulpif(isProd(), uglify()))
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest(path.dist.script));
}

/**
 * Clean
 */
function clean() {
   return del([path.dist.distPath]);
}

/**
 * Default task
 */
exports.default = gulp.series(gulp.parallel(clean), gulp.parallel(script));
