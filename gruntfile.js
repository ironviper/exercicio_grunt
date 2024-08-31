
module.exports = function(grunt) 
{
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            less: {
                dev: {
                    options: {
                        sourceMap: true,
                        compress: true
                    },
                    files: {
                        'dev/styles/main.min.css': 'src/styles/main.less'
                    }
                },
                dist: {
                    options: {
                        compress: true
                    },
                    files: {
                        'dist/styles/main.min.css': 'src/styles/main.less'
                    }
                }
            },
            replace: {
                dev: {
                    options: {
                        patterns: [
                            {
                                match: 'CSS_PATH',
                                replace: 'styles/main.min.css'
                            },
                            {
                                match: 'JS_PATH',
                                replace: 'scripts/main.min.js'
                            }
                        ]
                    },
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: 'src/index.html',
                            dest: 'prebuild/'
                        }
                    ]
                },
                dist: {
                    options: {
                        patterns: [
                            {
                                match: 'CSS_PATH',
                                replace: 'styles/main.min.css'
                            },
                            {
                                match: 'JS_PATH',
                                replace: 'scripts/main.min.js'
                            }
                        ]
                    },
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: 'src/index.html',
                            dest: 'prebuild/'
                        }
                    ]
                }
            },
            clean: ['prebuild'],
            uglify: {
                dev: {
                    options: {
                        sourceMap: true,
                        compress: true
                    },
                    files: {
                        'dev/scripts/main.min.js': 'src/scripts/*.js'
                    }
                },
                dist: {
                    options: {
                        compress: true
                    },
                    files: {
                        'dist/scripts/main.min.js': 'src/scripts/*.js'
                    }
                }
            },
            htmlmin: {
                dev: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [
                        {
                            'dev/index.html': 'prebuild/index.html'
                        }
                    ]
                },
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [
                        {
                            'dist/index.html': 'prebuild/index.html'
                        }
                    ]
                }
            }
        }
    )



    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    
    
    grunt.registerTask('devBuild', ['less:dev', 'replace:dev', 'uglify:dev', 'htmlmin:dev', 'clean']);

    grunt.registerTask('distBuild', ['less:dist', 'replace:dist', 'uglify:dist', 'htmlmin:dist', 'clean']);


}


