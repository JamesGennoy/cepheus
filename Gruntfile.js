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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'sass', 'includereplace']);

};