import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import protobuf from 'gulp-protobufjs';
import path from 'path';

const paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'bin/'
  },
  protobuf: {
    src: 'mlmodel_specification/*.proto',
    dest: 'bin/messages'
  }
};

export function compileScripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function compileProtobuf() {
  return gulp.src(paths.protobuf.src)
    .pipe(protobuf({
      path: paths.protobuf.src,
      showStack: true
    }))
    .pipe(gulp.dest(paths.protobuf.dest));
}
