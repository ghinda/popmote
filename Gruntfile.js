'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'public'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      stylus: {
        files: [ '<%= yeoman.app %>/styles/{,*/}*.styl' ],
        tasks: [ 'stylus:server' ]
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.{html,js}',
          '<%= yeoman.app %>/{components,shared}/{,*/}*.{html,js}',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    clean: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.dist %>',
          src: [
            '*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/passwordmaker/*.js'
      ]
    },
    stylus: {
      options: {
         'include css': true,
          compress: false,
          linenos: true
      },
      dist: {
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.styl'
        }
      },
      server: {
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.styl'
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: [
        '<%= yeoman.app %>/{,*/}index.html'
      ],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images'
        ],
        patterns: {
          js: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm]
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          cache: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'CNAME',
            '*.*',
            'images/{,*/}*.*',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/building-blocks/style',
          dest: '<%= yeoman.dist %>/styles',
          src: [
            '**/*.{png,jpg,jpeg}'
          ]
        }]
      }
    },
    ngtemplates: {
      dist: {
        options: {
          usemin: '<%= yeoman.dist %>/scripts/app.js',
          module: 'passwordmaker-mobile'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/scripts/templates.js'
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    compress: {
      dist: {
        options: {
          archive: 'passwordmaker-mobile.zip'
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: ['**'],
            dest: './'
          }
        ]
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'stylus:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'stylus:dist',
    'imagemin',
    'htmlmin',
    'useminPrepare',
    'ngtemplates',
    'copy:dist',
    'concat',
    'ngAnnotate',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build',
    'compress'
  ]);

};
