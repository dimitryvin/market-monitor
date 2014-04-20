module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-htmlmin');      // used to minify html
    grunt.loadNpmTasks('grunt-yui-compressor');       // used to compress CSS and JavaScript
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');       // used to combine multiple files into one
    grunt.loadNpmTasks('grunt-contrib-connect');      // used for dev server
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    var shell = require('shelljs');

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            main: {
                src: ['client/src/compiled/market.js'],
                dest: 'build/js/market.min.js'
            }
        },

        concat: {
            mainApp: {
            src: ["client/src/lib/js/**/*.js", "client/src/compiled/templates.js", "client/src/js/**/*.js", 'client/src/js/AppMain.js'],
              dest: 'client/src/compiled/market.js'
            }
        },

        htmlmin: {
          dist: {
            options: {
              removeComments: true,
              collapseWhitespace: true
            },
            files: {
              'build/index.html': 'client/src/index.html'
            }
          }
        },

        watch: { 
            options: {
                livereload: true,
            },
            handlebars: {
                files: 'client/src/templates/**/*.handlebars',
                tasks: ['h', 'js']
            },
            less: {
                files: ['client/src/less/**/*.less'],
                tasks: 'less'
            },
            js: {
                files: ['client/src/js/**/*.js'],
                tasks: 'js'
            }
        },

        less: {
            task: {
                files: {
                    "client/src/compiled/market.css": ['client/src/css/*.css', "client/src/less/**/*.less", "client/src/lib/css/*.css"]
                }
            }
        },

        cssmin: {
            one: {
                src: 'client/src/compiled/*.css',
                dest: 'build/css/market.min.css'
            }
        },

        connect: {
            dev: {
                options: {
                    port: 3000,
                    base: 'client/src',
                    keepalive: true
                }
            },
            web: {
              options: {
                port: 3001,
                base: 'build',
                keepalive: true
              }
            }
        }

    });

    /* THIS IS USED TO BUILD TEMPLATES
     grunt h
    */

    grunt.registerTask('h', 'Compiling templates', function() {
        shell.exec('handlebars client/src/templates -f client/src/compiled/templates.js');
    });

    /* THIS CAN BE RUN IF YOU ONLY WANT TO REBUILD THE JAVASCRIPT SHIT 
     grunt js
    */

    grunt.registerTask('js', ['cleanjs', 'h', 'uglify', 'concat']);

    grunt.registerTask('css', ['cleancss', 'less', 'cssmin']);

    /* THIS DOES THE ENTIRE GRUNT PROCEEDURE, WILL RUN BY DEFAULT
      grunt -force
    */

    grunt.registerTask('cleanjs', 'Removing release folder', function() {
        shell.rm('-rf', 'client/src/compiled/market.js');
        shell.rm('-rf', 'client/src/js/templates.js');
    });

    grunt.registerTask('cleancss', 'Removing release folder', function() {
        shell.rm('-rf', 'client/src/compiled/market.css');
    });

    grunt.registerTask('clean', 'Removing release folder', function() {
        shell.rm('-rf', 'build');
        shell.rm('-rf', 'client/src/compiled/market.js');
        shell.rm('-rf', 'client/src/compiled/templates.js');
        shell.rm('-rf', 'client/src/compiled/market.css');
    });

    grunt.registerTask('dev', ['clean', 'h', 'concat', 'css']);

    grunt.registerTask('default', ['clean', 'h', 'js', 'css', 'htmlmin']);

};