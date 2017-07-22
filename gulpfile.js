var gulp = require("gulp");
var watch = require("gulp-watch");
var jshint = require("gulp-jshint");
var jasmine = require("gulp-jasmine");
var jasmineReporters = require("jasmine-reporters");
var beautify = require("gulp-beautify");
var map = require('map-stream');
var stylish = require('jshint-stylish');
var eslint = require('gulp-eslint');

var watchErrorReporter = map(function(file, cb){

process.stdout.write("done with file " + file.path + "\n");
});
gulp.task("watch", function(){
  return watch("src/*.js", {ignoreInitial: false})
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(watchErrorReporter);

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
    .pipe(eslint.failAfterError())
    .pipe(beautify({indent_size:4, indent_with_tabs:true}))
    .pipe(gulp.dest('./spec/'));
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
