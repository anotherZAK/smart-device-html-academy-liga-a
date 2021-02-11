'use strict';

var gulp = require(`gulp`);
var plumber = require(`gulp-plumber`);
var sourcemap = require(`gulp-sourcemaps`);
var sass = require(`gulp-sass`);
var postcss = require(`gulp-postcss`);
var autoprefixer = require(`autoprefixer`);
var server = require(`browser-sync`).create();
var csso = require(`gulp-csso`);
var rename = require(`gulp-rename`);
var imagemin = require(`gulp-imagemin`);
var webp = require(`gulp-webp`);
var posthtml = require(`gulp-posthtml`);
var include = require(`posthtml-include`);
var svgclear = require("gulp-cheerio");
var del = require(`del`);
var svgSprite = require('gulp-svg-sprite');

gulp.task(`css`, function () {
  return gulp.src(`source/sass/style.scss`)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename(`style.css`))
    .pipe(sourcemap.write(`.`))
    .pipe(gulp.dest(`build/css`));
});

gulp.task(`css-min`, function () {
  return gulp.src(`source/sass/style.scss`)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename(`style.min.css`))
    .pipe(sourcemap.write(`.`))
    .pipe(gulp.dest(`build/css`))
    .pipe(server.stream());
});

gulp.task(`server`, function () {
  server.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(`source/sass/**/*.{scss,sass}`, gulp.series(`css-min`));
  gulp.watch(`source/img/icon-*.svg`, gulp.series(`svg-sprite`, `html`, `refresh`));
  gulp.watch(`source/*.html`, gulp.series(`html`, `refresh`));
});

gulp.task(`refresh`, function (done) {
  server.reload();
  done();
});

gulp.task(`imagemin`, function () {
  return gulp.src(`source/img/**/*.{png,jpg,svg}`)
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest(`source/img`));

});

gulp.task(`webp`, function () {
  return gulp.src(`source/img/**/*.{png,jpg}`)
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest(`source/img`));
});

var configSprite = {
  shape: {
    dimension: {
      maxWidth: 500,
      maxHeight: 500
    },
    spacing: {
      padding: 0
    }
  },
  mode: {
    symbol: {
      dest: '.'
    }
  }
};

gulp.task('svg-sprite', function (cb) {
  return gulp.src('source/img/svg-2-sprite/*.svg')
    .pipe(svgSprite(configSprite))
    .pipe(svgclear({
      run: function ($) {
        $("[fill]").removeAttr("fill");
        $("[stroke]").removeAttr("stroke");
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest('build/img'));
});

gulp.task(`html`, function () {
  return gulp.src(`source/*.html`)
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(`build`));
});

gulp.task(`copy`, function () {
  return gulp.src([
    `source/fonts/**/*.{woff,woff2}`,
    `source/img/png/*`,
    `source/img/jpg/*`,
    `source/img/svg/*`,
    `source/js/main.js`,
    `source//*.ico`
  ], {
    base: `source`
  })
    .pipe(gulp.dest(`build`));
});

gulp.task(`clean`, function () {
  return del(`build`);
});

gulp.task(`build`, gulp.series(`clean`, `copy`, `css-min`, `css`, `svg-sprite`, `html`));
gulp.task(`start`, gulp.series(`build`, `server`));
