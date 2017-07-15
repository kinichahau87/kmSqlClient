var gulp = require("gulp");
var watch = require("gulp-watch");
var jshint = require("gulp-jshint");
var jasmine = require("gulp-jasmine");
var jasmineReporters = require("jasmine-reporters");
var beautify = require("gulp-beautify");

gulp.task("watch", function(){
  return watch("src/*.js", {ignoreInitial: false})
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

});

gulp.task("watch-test", function(){
  return watch("spec/*.js", {ignoreInitial: false})
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task("test-client", function(){
  return gulp.src("spec/clientTest.js")
    .pipe(jasmine({
        reporter: new jasmineReporters.TerminalReporter()
    }));
});

gulp.task("test-model", function(){
  return gulp.src("spec/modelTest.js")
    .pipe(jasmine({
        reporter: new jasmineReporters.TerminalReporter()
    }));
});

gulp.task("lint", function(){
  return gulp.src("src/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./src/'));
});

gulp.task("spec-lint", function(){
  return gulp.src("spec/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./spec/'));
});
