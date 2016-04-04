var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
var rsync = require('gulp-rsync');
var watch = require('gulp-watch');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});


gulp.task('deploy', function() {
  gulp.src(['./*','./models/*'])
    .pipe(rsync({
      root: './',
      username: 'energy',
      hostname: '192.168.1.116',
      exclude:['./node_modules'],
      destination: '/home/energy/productive/api'
    }));
});

gulp.task('watch', function () {
        gulp.watch('./*.js', ['deploy']);
});
gulp.task('watchMija', function () {
        gulp.watch('./*.js', ['deployMija']);
})
