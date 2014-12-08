'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        language: grunt.option('lang') || 'en',

        meta: {
            banner: '/**\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * License: <%= pkg.license %>\n */\n'
        },

        build_dir: 'dist',

        files: {

            core: [
                'src/bootstrap.js'
            ],

            test: ['test/**/*.js']
        },

        jshint: {

            options: {
                jshintrc: true
            },

            all: ['Gruntfile.js', '<%= files.core %>', '<%= files.test %>'],

            core: {
                files: {
                    src: ['<%= files.core %>']
                }
            },

            test: {
                files: {
                    src: ['<%= files.test %>']
                }
            }
        },

        uglify: {
            core: {
                files: {
                    '<%= build_dir %>/bootstrap.min.js': '<%= files.core %>'
                }
            }
        },

        karma: {
            'unit': {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('process', ['jshint:all', 'uglify:core']);
    grunt.registerTask('test', ['karma:unit']);

    grunt.registerTask('default', ['process', 'test']);

};