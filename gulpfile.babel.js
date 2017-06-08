import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
const exec = require('child_process').exec;

const paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'bin/'
  },
  protobuf: {
    src: 'mlmodel_specification/*.proto',
    dest: 'bin/messages/'
  }
};

export function compileES() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function compileProtobuf(cb) {
  exec(`mkdir -p ${paths.protobuf.dest}
        protoc --proto_path=mlmodel_specification --js_out=import_style=commonjs,binary:${paths.protobuf.dest} ${paths.protobuf.src}`,
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
}

const compile = gulp.parallel(compileES, compileProtobuf);
export default compile;
