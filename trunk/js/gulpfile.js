var gulp = require("gulp"),
    transport = require("gulp-seajs-transport"), //对seajs的模块进行预处理：添加模块标识
    concat = require("gulp-seajs-concat"), //seajs模块合并
    connect = require('gulp-connect'),
    uglify = require("gulp-uglify"); //js压缩混淆

var project = "manageweb/",
    srcScript = "src/**/*.js",
    dstScript = "dist";

gulp.task("copy", function() {
    return gulp
        // .src([srcScript, '!src/lib/*.js'])
        .src(srcScript)
        .pipe(transport())
        .pipe(
            concat({
                base: "src"
            })
        )
        .pipe(
            uglify({
                mangle: {
                    //except: ['require', 'exports', 'module', '$']
                    reserved: ["require", "exports", "module"] //这几个变量不能压缩混淆，否则会引发seajs的一些意外问题
                }
            }).on('error', function(e) {
                console.log(e);
            })
        )
        .pipe(gulp.dest(dstScript));
});


// gulp.task('watch', function() {
//     gulp.watch(srcScript, ['copy']).on('error', function(error) {
//         throw error;
//     })
// });

gulp.task('connect', function() {
    connect.server({
        index: 'index.html',
        name: '后台管理',
        root: '../../trunk/',
        host: 'manageweb.qiujm.7391test.com',
        port: 8080,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['../**/*.html', 'seajs-cfg.js', './src/**/*.js'], ['html']); //监听html目录下所有文件
});

gulp.task('default', ['watch', 'html', 'connect']);
