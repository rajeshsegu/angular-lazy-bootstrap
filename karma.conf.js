// Karma configuration

module.exports = function (config) {

    config.set({

        basePath: '.',

        frameworks: ['jasmine'],

        files: [
            'lib/jquery/jquery.js',
            'lib/angular/angular.js',
            'lib/angular/angular-mocks.js',
            'src/bootstrap.js',
            'test/bootstrap.spec.js'
        ],

        exclude: [],

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

        captureTimeout: 60000,

        singleRun: false,

        preprocessors: {
            'src/**/!(*.spec)+(.js)': ['coverage']
        },

        coverageReporter: {
            reporters: [{
                type: 'lcov',
                dir: 'coverage/'
            },{
                type: 'text-summary'
            }]
        },

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ]
    });
};