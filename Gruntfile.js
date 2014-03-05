module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    concat: {
      js: {
        src: [
          'src/js/<%= pkg.name %>/*.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    includereplace: {
      dist: {
        options: {
          includesDir: 'src/includes/'
        },
        src: '*.html',
        dest: 'dist/',
        expand: true,
        cwd: 'src/'
      }
    },
    uglify: {
      js: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      js: {
        files: ['src/js/<%= pkg.name %>/*.js'],
        tasks: ['concat', 'uglify']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'includereplace']);

};