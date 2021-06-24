const gulp = require("gulp"),
	sass = require("gulp-sass"),
	connect = require("gulp-connect");

gulp.task("sass", function() {
	gulp.src("./src/scss/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("./src/css"))
		.pipe(connect.reload());
});

gulp.task("prod_sass", function() {
	gulp.src("./src/scss/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("./dist/css"))
		.pipe(connect.reload());
});

gulp.task("html", function() {
	gulp.src("./src/**/*.html")
		.pipe(connect.reload());
});

gulp.task("prod_html", function() {
	gulp.src("./src/**/*.html")
		// .pipe(htmlmin())
		.pipe(gulp.dest("./dist"))
		.pipe(connect.reload());
});

gulp.task("js", function() {
	gulp.src("./src/js/*.js")
		.pipe(connect.reload());
});

gulp.task("prod_js", function() {
	gulp.src("./src/js/*.js")
		// .pipe(uglify())
		.pipe(gulp.dest("./dist"))
		.pipe(connect.reload());
});
gulp.task("copy-images", function() {
	gulp.src("./src/images/**/*.*")
		.pipe(gulp.dest("./dist/images"));
});
gulp.task("copy-lib", function() {
	gulp.src("./src/lib/**/*.*")
		.pipe(gulp.dest("./dist/lib"));
});
gulp.task("prod_copy", ["copy-images", "copy-lib"]);


gulp.task("connect", function() {
	connect.server({
		root : "src",
		livereload : true
	});
});

gulp.task("watch", function(){
	gulp.watch("./src/**/*.html", ["html"]);
	gulp.watch("./src/js/*.js", ["js"]);
	gulp.watch("./src/scss/*.scss", ["sass"]);
});
gulp
gulp.task("dev", ["sass", "html", "js", "connect", "watch"]);
gulp.task("production", ["prod_sass", "prod_html", "prod_js", "prod_copy", "connect", "watch"]);