var gulp = require("gulp"),
	gp_uglify = require("gulp-uglify"),
	gp_concat = require("gulp-concat"),
	gp_rename = require("gulp-rename"),
	gp_sourcemaps = require("gulp-sourcemaps"),
	del = require('del');

gulp.task("default", function function_name(argument) {
	del(["build"]);
	
	gulp.src("src/engine/Sugar.js")
		.pipe(gulp.dest("build"));

	gulp.src("src/build.html")
		.pipe(gp_rename("index.html"))
		.pipe(gulp.dest("build"));

	gulp.src("src/engine/**/*.js")
		.pipe(gp_uglify())
		.pipe(gp_concat("engine.js"))
		.pipe(gp_sourcemaps.write("./"))
		.pipe(gulp.dest("build/js"));

	gulp.src(["src/modules/!**/!*.js", "src/main.js"])
		.pipe(gp_concat("game.js"))
		.pipe(gp_uglify())
		.pipe(gp_sourcemaps.write("./"))
		.pipe(gulp.dest("build/js"));
});