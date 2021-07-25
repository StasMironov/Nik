const gulp = require('gulp')
const svgstore = require('gulp-svgstore');
const svgSprites = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');



module.exports = function svgSprite() {
  return gulp.src('src/sprite/*.svg')
    // .pipe(svgmin({
    //   js2svg: {
    //     pretty: true
    //   }
    // }))
    // // remove all fill, style and stroke declarations in out shapes
    // .pipe(cheerio({
    //   run: function ($) {
    //     $('[fill]').removeAttr('fill');
    //     $('[stroke]').removeAttr('stroke');
    //     $('[style]').removeAttr('style');
    //   },
    //   parserOptions: { xmlMode: true }
    // }))
    // // cheerio plugin create unnecessary string '&gt;', so replace it.
    // .pipe(replace('&gt;', '>'))
    // // // build svg sprite
    // .pipe(svgstore({
    //   inlineSvg: false
    // }))
    // .pipe(rename('sprite.svg'))
    // .pipe(gulp.dest('./build/img/sprite'));

    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprites({
      mode: {
        symbol: {
          sprite: "sprite.svg",
        }
      }
    }))
    .pipe(gulp.dest('./build/img/sprite'));
};