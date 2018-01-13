var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();


var paths = {
  src:'src',
  sass:'src/sass',
  dist:'dist'
};


gulp.task('browserSync',function(){
  browserSync.init({
    server:{
      baseDir: paths.dist
    },
  });
});


gulp.task('lib',function(){
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest(paths.dist+'/bower_components'));
});

gulp.task('html',function(){
  return gulp.src(paths.src+'/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('sass',function(){
  return gulp.src(paths.sass+'/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist+ '/css'));
});

gulp.task('watch',function(){
  gulp.watch(paths.sass + '/**/*.scss',['sass']);
  gulp.watch(paths.src + '/**/*.html',['html']);
  gulp.watch(paths.dist + '/**/*').on('change', browserSync.reload);
});


gulp.task('auto',['browserSync','watch']);
gulp.task('default',['auto']);
