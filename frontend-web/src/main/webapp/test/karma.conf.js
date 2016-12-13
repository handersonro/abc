module.exports = function(config){
    if(process.argv[3] && process.argv[3] !== ''){
        var arg = process.argv[3].split('--')[1];

        var suites = arg.split('=');
        if(suites[0]=='suite'){
            suite = suites[1];
        }else {
            suite = '';
        }
    }else {
        suite = '';
    }



    config.set({

        basePath : './../',
		//you can configure wiredep from here (optional)
        wiredep: {
            dependencies: true,    // default: true
            devDependencies: true, // default: false
            exclude: [],
            overrides: {}
        },

        files : [


            { pattern: 'app/*-module.js', watched: true, included: true, served: true},
            { pattern: 'app/*-!(module).js', watched: true, included: true, served: true},
            { pattern: 'app/modules/**/*-module.js', watched: true, included: true, served: true},
            { pattern: 'app/modules/**/*-+(config|routes|view|controller|filter|directive|service).js', watched: true, included: true, served: true},
			{ pattern: 'app/modules/**/*-+(test).js', watched: true, included: true, served: true}

        ],

        autoWatch : true,

        frameworks: [
            'wiredep',
            'jasmine',
            'jasmine-matchers'
        ],

        //browsers : ['Chrome', 'PhantomJS'],
        browsers : ['PhantomJS2'],


        singleRun: true,

        plugins : [
            'karma-wiredep',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-phantomjs2-launcher',
            'karma-htmlfile-reporter'
            //'karma-junit-reporter'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        proxies: {
            /*'/modules/': '/base/modules/',
            '/filters/': '/base/filters/',
            '/directives/': '/base/directives/'*/
        },

        reporters: ['progress', 'html'],

        htmlReporter: {
          outputFile: './../test/html-reporter-unit/htmlReportUnit.html',

          // Optional
          pageTitle: 'Unit Tests',
          subPageTitle: 'A sample project description',
          groupSuites: true,
          useCompactStyle: true,
          useLegacyStyle: true
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }

    });
};
