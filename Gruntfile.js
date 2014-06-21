module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [ 'Gruntfile.js', 'src/**/*.js', 'test/**/*.js' ]
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          optimize: 'none',
          name: "knowitall", 
          insertRequire: [ 'knowitall' ],
          out: "build/knowitall.js"
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['jshint', 'requirejs']);

};