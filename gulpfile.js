var gulp = require("gulp");
var watch = require("gulp-watch");
var jasmine = require("gulp-jasmine");
var beautify = require("gulp-beautify");
var eslint = require('gulp-eslint');
const JasmineConsoleReporter = require('jasmine-console-reporter');
const consoleReporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});

gulp.task("watch", function(){
  return gulp.watch("src/*.js", {ignoreInitial: false}, ["lint-easy"]);
});

gulp.task("lint-easy", function(){
  return gulp.src("src/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("watch-test", function(){
  return gulp.watch("spec/*.js", {ignoreInitial: false}, ["lint-easy"]);
});

gulp.task("test-client", function(){
  return gulp.src("spec/clientTest.js")
    .pipe(jasmine({
        reporter: consoleReporter
    }));
});

gulp.task("test-model", function(){
  return gulp.src("spec/modelTest.js")
    .pipe(jasmine({
        reporter: consoleReporter
    }));
});

gulp.task("lint", function(){
  return gulp.src("src/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(beautify({indent_size:4, indent_with_tabs:true}))
    .pipe(gulp.dest('./src/'));
});

gulp.task("spec-lint", function(){
  return gulp.src("spec/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

gulp.task("pretty-code", function(){
	return gulp.src("src/*.js")
		.pipe(beautify({indent_size:4, indent_with_tabs:true}))
		.pipe(gulp.dest("./src/"));

});

gulp.task("pretty-test", function(){
	return gulp.src("spec/*.js")
	        .pipe(beautify({indent_size:4, indent_with_tabs:true}))
		.pipe(gulp.dest("./spec/"));
});
