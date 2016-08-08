// npm install

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const del = require('del');
const plumber = require('gulp-plumber');
const glob = require("glob");
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

const dist_dir = 'dist';
const dist_assets_dir = dist_dir + '/assets';

const src_sync_files = ['src/**/*.ico'];
const dist_sync_dir = dist_dir;

const src_assets_image_files = 'src/assets/**/*.{jpg,jpeg,png,gif}';
const dist_assets_image_dir = dist_assets_dir;

const src_js_files = ['src/!(assets)/**/*.{js,es6}', 'src/*.{js,es6}'];
const dist_js_dir = dist_dir;

// 静态资源文件
const dist_assets_files = 'dist/assets/**/*.{jpg,jpeg,png,gif}';

// 代码里引用了静态资源的文件
const dist_assets_reference_files = 'dist/**/*.{js,jsx,css,html}';
const dist_assets_reference_dir = dist_dir;

gulp.task('clean', () => {
    return del(dist_dir);
});

gulp.task('sync', () => {
    return gulp.src(src_sync_files)
        .pipe(plumber())
        .pipe(changed(dist_sync_dir))
        .pipe(gulp.dest(dist_sync_dir));
});

gulp.task('build-js', () => {
    return gulp.src(src_js_files)
        .pipe(plumber())
        .pipe(changed(dist_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_js_dir));
});

gulp.task('min-assets-image', () => {
    return gulp.src(src_assets_image_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_image_dir))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist_assets_image_dir));
});

/**
 * 静态资源加指纹
 */
gulp.task('fingerprint-assets', () => {
    return gulp.src(dist_assets_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_dir))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_dir))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_dir));
});

/**
 * 修改静态资源引用
 */
gulp.task('fingerprint-code', () => {
    return gulp.src(['dist/assets/rev-*.json',dist_assets_reference_files])
        .pipe(plumber())
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(dist_assets_reference_dir));
});

gulp.task('watch', () => {
    gulp.watch(src_sync_files, ['sync']);
    gulp.watch(src_js_files, ['build-js']);
    gulp.watch(src_assets_image_files, runSequence('min-assets-image'));
});

gulp.task('build', () => {
    return runSequence(['sync','min-assets-image','build-js']);
});

gulp.task('rebuild', () => {
    return runSequence('clean','build');
});

gulp.task('release', () => {
    return runSequence('build','fingerprint-assets','fingerprint-code');
});
