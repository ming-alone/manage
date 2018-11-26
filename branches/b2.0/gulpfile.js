var gulp = require("gulp"),
    transport = require("gulp-seajs-transport"), //对seajs的模块进行预处理：添加模块标识
    concat = require("gulp-seajs-concat"), //seajs模块合并
    uglify = require("gulp-uglify"); //js压缩混淆

var project = "manageweb/",
    srcScript = project + "v1/**/*.js",
    dstScript = project + "dist";

gulp.task("copy", function () {
    return gulp
        .src([srcScript, '!manageweb/v1/seajs-cfg.js'])
        .pipe(transport())
        .pipe(
            concat({
                base: "manageweb/v1"
            })
        )
        .pipe(
            uglify({
                mangle: {
                    reserved: ["require", "exports", "module"] //这几个变量不能压缩混淆，否则会引发seajs的一些意外问题
                }
            }).on('error', function (e) {
                console.log(e);
            })
        )
        .pipe(gulp.dest(dstScript));
});
gulp.task('watch', function () {
    gulp.watch(srcScript, ['copy']).on('error', function (error) {
        throw error;
    })
});