module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var _ = require('lodash');
    var appConfig = {
        app: 'app/',
        dist: 'dist/',
        temp: 'temp/',
        js: [
                "*-module.js",
                "*-!(module).js",
                "modules/**/*-module.js",
                "modules/**/*-+(config|routes|view|controller|filter|directive|service).js"
        ],
        css: '**/*.css',
        image: '**/*.+(jpg|jpeg|png|gif)'
    };

    grunt.initConfig({
        yeoman: appConfig,
        appConfig: appConfig,

        express: {
            dist: {
                options: {
                    port: 9011,
                    hostname: "0.0.0.0",
                    bases: ['./dist/'],
                    livereload: true
                }
            }
        },

        watch: {
            js: {
                files: appConfig.js.map(function(p){ return appConfig.app+p; }),
                tasks: ['js-application'],
            },
            css: {
                files: '<%= appConfig.app %>'+appConfig.css,
                tasks: ['css-application'],
            },
            html: {
                files: '<%= appConfig.app %>**/*.html',
                tasks: ['html']
            },
            data: {
                files: '<%= appConfig.app %>**/*.json',
                tasks: ['data']
            },
            vendor: {
                files: 'bower.json',
                tasks: ['vendor']
            },
            image: {
                files: '<%= appConfig.app %>**/*.+(jpg|jpeg|png|gif)',
                tasks: ['image']
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.app %>',
                    dest: '<%= appConfig.dist %>',
                    src: [ '**/*.html']
                }]
            },
            data: {
                options: {
                    noProcess: '**/*.json'
                },
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.app %>',
                    dest: '<%= appConfig.dist %>',
                    src: '**/*.json'
                }]
            },
            image: {
                options: {
                    noProcess: '<%= appConfig.image %>'
                },
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.app %>',
                    dest: '<%= appConfig.dist %>',
                    src: '<%= appConfig.image %>'
                }]
            },
            fonts: {
                options: {
                    noProcess: "**/*.+(eot|woff2|woff|ttf|svg|ijmap)"
                },
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.app %>',
                    src: '**/*.+(eot|woff2|woff|ttf|svg|ijmap)',
                    dest: '<%= appConfig.dist %>'
                }]
            }
        },

        clean: {
            js: ['<%= appConfig.dist %>**.*js'],
            temp: ['<%= appConfig.temp %>'],
            dist: ['<%= appConfig.dist %>'],
            distJs: ['<%= appConfig.dist %>assets/app.js']
        },

        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port %>'
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },

        protractor: {
            options: {
                noColor: false,
                args: { }
            },
            e2e: {
                options: {
                    configFile: "e2e/protractor.conf.js",
                    // Stops Grunt process if a test fails
                    keepAlive: false
                }
            }
        },

        htmlmin: {
            html: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= appConfig.app %>',
                    src: ['**/*.html'],
                    dest: '<%= appConfig.dist %>'
                }]
            }
        },

        uglify: {
            js: {
                options:{
                    compress: {
                        booleans: false
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= appConfig.temp %>',
                    src: 'assets/app.js',
                    dest: '<%= appConfig.dist %>'
                }]
            }
        },

        processhtml: {
            options: {
                process: true
            },
            dist: {
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        },

        cssmin: {
            css: {
                /*files: [{
                    expand: true,
                    cwd: '<%= appConfig.app %>',
                    src: '<%= appConfig.css %>',
                    dest: '<%= appConfig.dist %>assets/app.css'
                }]*/
                files: {
                    '<%= appConfig.dist %>assets/app.css': '<%= appConfig.app %>'+appConfig.css
                }
            }
        },

        sass: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app/assets',
                    src: ['*.scss'],
                    dest: 'app/assets',
                    ext: '.css'
                }]
            }
        },

        ngAnnotate: {
            options: {

            },
            js: {
                files: [{
                    expand: true,

                    cwd: '<%= appConfig.app %>',
                    src: '<%= appConfig.js %>',
                    dest: '<%= appConfig.temp %>'
                }]
            }
        },

        bower_concat: {
            'js-vendor': {
                dest: {
                    'js': '<%= appConfig.dist %>assets/vendor.js',
                },
                exclude: [
                ],

                dependencies: {

                },
                mainFiles: {
                },
                bowerOptions: {
                    relative: false
                }
            },
            'css-vendor': {
                dest: {
                    'css': '<%= appConfig.dist %>assets/vendor.css'
                },
                exclude: [
                ],
                dependencies: {

                },
                callback: function(mainFiles, component) {
                    return _.map(mainFiles, function(filepath) {
                        // Use minified files if available
                        var min = filepath.replace(/\.js$/, '.min.js');
                            return grunt.file.exists(min) ? min : filepath;
                        }
                    );
                },
                mainFiles: {
                },
                bowerOptions: {
                    relative: false
                }
            }
        },

        concat: {
            js: {
                files:{
                    //'<%= appConfig.temp %>assets/app.js': appConfig.js.map(function(p){return appConfig.temp+p;})
                    '<%= appConfig.dist %>assets/app.js': appConfig.js.map(function(p){return appConfig.temp+p;})
                }
                /*files:[{
                    expand: true,
                    cwd: '<%= appConfig.temp %>',
                    src: appConfig.js,
                    dest: '<%= appConfig.temp %>assets/app.js'
                }]*/
            }
        }


    });


    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.task.run(['serve:' + target]);
    });
    // Creates the `server` task
    grunt.registerTask('serve', [
        'build',
        'express:dist',
        'watch'
    ]);

    grunt.registerTask('build',[
        'clean:dist',
        'html',
        'application',
        'vendor'
    ]);

    grunt.registerTask('default', [
        'build',
        'test'
        //'e2e'
    ]);

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('e2e', ['protractor:e2e']);

    grunt.registerTask('html', ['htmlmin:html']);
    grunt.registerTask('js-application', [
        'clean:temp',
        'clean:js',
        'ngAnnotate:js',
        'concat:js',
        //'uglify:js',
        'clean:temp'
    ]);
    grunt.registerTask('css-application', ['cssmin:css']);
    grunt.registerTask('application', ['js-application', 'css-application', 'data', 'image', 'fonts']);
    grunt.registerTask('js-vendor', ['bower_concat:js-vendor']);
    grunt.registerTask('css-vendor',['bower_concat:css-vendor']);
    grunt.registerTask('vendor', ['js-vendor', 'css-vendor']);
    grunt.registerTask('data', ['copy:data']);
    grunt.registerTask('fonts', ['copy:fonts']);
    grunt.registerTask('image', ['copy:image']);
};
