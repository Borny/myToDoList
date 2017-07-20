module.exports = function(grunt) {

    // Import du package
    grunt.loadNpmTasks('grunt-contrib-sass') //
    grunt.loadNpmTasks('grunt-contrib-concat') // Installation of concat to concatanate the js files
    grunt.loadNpmTasks('grunt-contrib-uglify') // Installation of uglify to minify the js files
    grunt.loadNpmTasks('grunt-contrib-watch') // Installation of watch to automate the tasks

    var jsSrc = ['js/updateFileName.js', 'js/updateFileName.js', 'js/updateFileName.js'],
        jsDist = 'js/main.js';

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: jsSrc,
                dest: jsDist
            }
        },
        uglify: {
            options: {
                separator : ';'
            },
            dist: {
                src: ['js/updateFileName.js', 'js/updateFileName.js', 'js/updateFileName.js'],
                dest: 'js/main.js'
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: 'js/*.js', // tous les fichiers JavaScript de n'importe quel dossier
                tasks: 'concat'
            },
            styles: {
                files: '**/*.scss', // tous les fichiers Sass de n'importe quel dossier
                tasks: 'sass'
            }
        }
    })

    // Redéfinition de la tâche `default` qui est la tâche lancée dès que vous lancez Grunt sans rien spécifier.
    // Note : ici, nous définissons sass comme une tâche à lancer si on lance la tâche `default`.
    grunt.registerTask('default', ['sass', 'watch'])

    // Tache dev
    grunt.registerTask('dev', ['sass', 'concat'])

    // Tache dist
    grunt.registerTask('dist', ['sass', 'uglify'])
}