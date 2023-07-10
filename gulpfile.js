const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');

gulp.task('html', function () {
    return gulp.src('page--*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(rename(function (path) {
            path.basename = path.basename.split('page--').join('');
            path.extname = ".html";
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('watch', function () {
    gulp.watch('page--*.html', gulp.series('html'));
});

gulp.task('default', gulp.series('html', 'watch'));