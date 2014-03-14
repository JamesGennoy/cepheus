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
    copy: {
      copy: {
        files: [
          // Bootstrap
          {dest: 'dist/css/', src: 'bower_components/bootstrap/dist/css/*', expand: true, flatten: true},
          {dest: 'dist/fonts/', src: 'bower_components/bootstrap/dist/fonts/*', expand: true, flatten: true},
          {dest: 'dist/js/', src: 'bower_components/bootstrap/dist/js/*', expand: true, flatten: true},
          // JQuery
          {dest: 'dist/js/', src: 'bower_components/jquery/dist/*', expand: true, flatten: true}
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
      js: {
        files: ['js/<%= pkg.name %>/*.js'],
        tasks: ['concat', 'uglify']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'sass', 'includereplace', 'copy']);

};