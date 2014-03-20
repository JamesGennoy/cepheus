module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    cssmin: {
      cssmin: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css', '!bootstrap*.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
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
      copycss: {
        files: [
          // CSS
          {dest: 'dist/css/', src: 'src/css/*', expand: true, flatten: true}
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
          includesDir: 'src/includes/'
        },
        files: [
          {dest: 'dist/', src: ['**/*.html', '!includes/**'], expand: true, flatten: false, cwd: 'src/'},
        ]
      }
    },
    compass: {
      sass: {
        options: {
          cssDir: 'dist/css',
          sassDir: 'src/sass'
        }
      }
    },
    uglify: {
      js: {
        files: {
          'dist/js/<%= pkg.name %>.min.js' : 'dist/js/<%= pkg.name %>.js'
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
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify']
      },
      sass: {
        files: ['src/sass/*'],
        tasks: ['compass', 'cssmin']
      },
      css: {
        files: ['src/css/*'],
        tasks: ['copy:copycss', 'cssmin']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy:copycss', 'compass', 'cssmin', 'includereplace', 'copy:copylibs', 'connect', 'watch']);

};