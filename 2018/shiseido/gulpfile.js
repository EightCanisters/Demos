const gulp = require("gulp"),
	sass = require("gulp-sass"),
	connect = require("gulp-connect"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel"),
	htmlmin = require("gulp-htmlmin");

// 编译SCSS文件
gulp.task("sass", function() {
	gulp.src("./src/scss/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("./src/css"))
		.pipe(connect.reload());
});
// html文件修改刷新
gulp.task("html", function() {
	gulp.src("./src/**/*.html")
		.pipe(connect.reload());
});
// js文件修改刷新
gulp.task("js", function() {
	gulp.src("./src/js/*.js")
		.pipe(connect.reload());
});
// 启动服务器
gulp.task("connect", function() {
	connect.server({
		root : "src",
		livereload : true
	});
});
// 监视任务
gulp.task("watch", function(){
	gulp.watch("./src/**/*.html", ["html"]);
	gulp.watch("./src/js/*.js", ["js"]);
	gulp.watch("./src/scss/*.scss", ["sass"]);
});
// 开发环境下的gulp任务
gulp.task("dev", ["sass", "html", "js", "connect", "watch"]);





/***************************************************************/
// 生产环境下的 gulp 任务，将项目生成到 dist 目录下
// dist 目录下的资源是直接用于生产环境（发布项目）的资源
// 编译SCSS文件：生产环境
gulp.task("prod_sass", function() {
	gulp.src("./src/scss/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("./dist/css"))
		.pipe(connect.reload());
});
// html文件压缩
gulp.task("prod_html", function() {
	gulp.src("./src/**/*.html")
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest("./dist"))
		.pipe(connect.reload());
});
// JS转换及压缩
gulp.task("prod_js", function() {
	gulp.src("./src/js/*.js")
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"))
		.pipe(connect.reload());
});
// 复制源文件夹下资源到目标文件夹
gulp.task("copy-images", function() {
	gulp.src("./src/images/**/*.*")
		.pipe(gulp.dest("./dist/images"));
});
gulp.task("copy-lib", function() {
	gulp.src("./src/lib/**/*.*")
		.pipe(gulp.dest("./dist/lib"));
});
gulp.task("prod_copy", ["copy-images", "copy-lib"]);
// 监视任务
gulp.task("prod_watch", function(){
	gulp.watch("./src/**/*.html", ["prod_html"]);
	gulp.watch("./src/js/*.js", ["prod_js"]);
	gulp.watch("./src/scss/*.scss", ["prod_sass"]);
});
// 启动服务器
gulp.task("prod_connect", function() {
	connect.server({
		root : "dist",
		livereload : true
	});
});
// 生产环境gulp任务
gulp.task("production", ["prod_sass", "prod_html", "prod_js", "prod_copy", "prod_connect", "prod_watch"]);
