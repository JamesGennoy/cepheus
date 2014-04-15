module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    concat: {
      js : {
        files: {
          'dist/js/<%= pkg.name %>.js' : 'src/js/*.js'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          open: true
        }
      }
    },
    copy: {
      copysrc: {
        files: [
          // Images
          {dest: 'dist/img/', src: '**', cwd: 'src/img/', expand: true}
        ]
      },
      copylibs: {
        files: [
          // Bootstrap
          {dest: 'dist/css/', src: 'bower_components/bootstrap/dist/css/*', expand: true, flatten: true},
          {dest: 'dist/fonts/', src: 'bower_components/bootstrap/dist/fonts/*', expand: true, flatten: true},
          {dest: 'dist/js/', src: 'bower_components/bootstrap/dist/js/*', expand: true, flatten: true},
          // JQuery
          {dest: 'dist/js/', src: 'bower_components/jquery/dist/*', expand: true, flatten: true},
          // Modernizr
          {dest: 'dist/js/', src: 'bower_components/modernizr/modernizr.js', expand: true, flatten: true}
        ]
      }
    },
    includereplace: {
      dist: {
        options: {
          includesDir: 'src/_includes/'
        },
        files: [
          {dest: 'dist/', src: ['**/*.html', '!_includes/**'], expand: true, flatten: false, cwd: 'src/'},
        ]
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'dist/css',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'dist/css'
        }
      }
    },
    uglify: {
      js: {
        files: {
          'dist/js/<%= pkg.name %>.js' : 'dist/js/<%= pkg.name %>.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['includereplace']
      },
      img: {
        files: ['src/img/**'],
        tasks: ['copy:copysrc']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify']
      },
      sass: {
        files: ['src/sass/*'],
        tasks: ['compass:dev']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'compass:dev', 'includereplace', 'copy', 'connect', 'watch']);
  grunt.registerTask('production', ['clean', 'concat', 'uglify', 'compass:dist', 'includereplace', 'copy']);

};