// Require the dev-dependencies
const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('test', () => {
  return gulp.src('tests/*.js').pipe(jasmine({ verbose: true }));
});
