var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var minifyhtml = require("gulp-minify-html");
var sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");
var cssmin = require("gulp-uglifycss");
var htmlPath = require("gulp-rewrite-image-path");
var cssurl = require("gulp-rewrite-cssurl");

var src = "public_html/src";
var dist = "public_html/dist";

var path = {
	sImg : src+"/images/**/*.*",
	dImg : dist+"/images",
	s_sass : src+"/sass/*.scss",
	d_css : dist+"/css",
	s_js : src+"/js/*.js",
	d_js : dist+"/js",
	s_html : src+"/**/*.html",
	d_html : dist+"/"
};
function swallowError (error){
	console.log(error.toString());
	this.emit('end');
}
gulp.task("compile-sass",function(){
	return gulp.src(path.s_sass)
		.pipe(sass())
		.on('error',swallowError)
		.pipe(cssmin())
		.pipe(gulp.dest(path.d_css));
});
gulp.task("img-min",function(){
	return gulp.src(path.sImg)
		.pipe(imagemin())
		.pipe(gulp.dest(path.dImg));
});
gulp.task("js-min",function(){
	return gulp.src(path.s_js)
		.pipe(uglify())
		.pipe(gulp.dest(path.d_js));
});
gulp.task("html-min",function(){
	return gulp.src(path.s_html)
		.pipe(htmlPath({path:"images"}))
		.pipe(gulp.dest(path.d_html));
});
gulp.task("watch",function(){
	livereload.listen();
	gulp.watch(path.sImg,["img-min"]);
	gulp.watch(path.s_sass,["compile-sass"]);
	gulp.watch(path.s_js,["js-min"]);
	gulp.watch(path.s_html,["html-min"]);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});
gulp.task("default",["img-min","compile-sass","js-min","watch","html-min"],function(){
	return console.log("===== gulp end =====");
});

