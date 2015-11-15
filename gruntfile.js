module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['gruntfile.js', 'static/**/*.js']
        },
        copy:{
            setup: {
                files: [
                    {expand: true, cwd: 'bower_components/tal/', src: [' **'], dest: 'antie/'}
                ]

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint']);

};