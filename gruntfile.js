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
        },
        plato: {
            src: {
                options : {
                    exclude: /\.min\.js$/
                },
                files: {
                    'reports/plato': ['static/script/**/*.js']
                }
            }
        },
        open : {
            plato : {
                path: 'reports/plato/index.html',
                app: 'Google Chrome'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-open');
    grunt.registerTask('launch-plato', ['plato', 'open:plato']);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint']);

};