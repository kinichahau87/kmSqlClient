var gulp = require("gulp");
var watch = require("gulp-watch");
var jasmine = require("gulp-jasmine");
var jasmineReporters = require("jasmine-reporters");
var beautify = require("gulp-beautify");
var eslint = require('gulp-eslint');

gulp.task("watch", function(){
  return gulp.watch("src/*.js", {ignoreInitial: false}, ["lint-easy"]);
});

gulp.task("lint-easy", function(){
  return gulp.src("src/*.js")
    .pipe(eslint())
    .pipe(eslint.format());    
});

gulp.task("watch-test", function(){
  return gulp.watch("spec/*.js", {ignoreInitial: false}, ["lint-easy"]);     
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
