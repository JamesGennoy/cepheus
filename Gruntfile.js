module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    cssmin: {
      cssmin: {
        files: {
          'dist/css/<%= pkg.name %>.min.css' : 'dist/css/<%= pkg.name %>.css'
        }
      }
    },
    concat: {
      js : {
        files: {
          'dist/js/<%= pkg.name %>.js' : 'js/*.js'
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
      copy: {
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
          includesDir: 'includes/'
        },
        src: '*.html',
        dest: 'dist/'
      }
    },
    sass: {
      sass: {
        files: {
          'dist/css/<%= pkg.name %>.css': 'sass/main.scss'
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
        files: ['**/*.html', '!dist/**'],
        tasks: ['includereplace']
      },
      js: {
        files: ['js/<%= pkg.name %>/*.js'],
        tasks: ['concat', 'uglify']
      },
      sass: {
        files: ['sass/*'],
        tasks: ['sass', 'cssmin']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'sass', 'cssmin', 'includereplace', 'copy', 'connect', 'watch']);

};