(function (angular) {

    'use strict';

    //Generic   

    function makeArray(arr) {
        return angular.isArray(arr) ? arr : [arr];
    }

    //Angular

    function provideRootElement(modules, element) {
        element = angular.element(element);
        modules.unshift(['$provide',
            function ($provide) {
                $provide.value('$rootElement', element);
            }]);
    }

    function createInjector(injectorModules, element) {
        var modules = ['ng'].concat(makeArray(injectorModules));
        if (element) {
            provideRootElement(modules, element);
        }
        return angular.injector(modules);
    }

    var _injector;
    function getInjector() {
        if (!_injector) {
            _injector = createInjector(["ng"]);
        }
        return _injector;
    }

    function bootstrapApplication(angularApp) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, [angularApp]);
        });
    }

    angular.lazy = function () {

        console.log('angular.lazy called');

        var injector = getInjector(),
            $q = injector.get('$q'),
            promises = [];

        return {

            resolve: function (promise) {
                console.log('Resolve added');
                promise = $q.when(injector.instantiate(promise));
                promises.push(promise);
                return this;
            },

            bootstrap: function (angularApp) {
                console.log('Bootstrap called');
                $q.all(promises).then(function () {
                    bootstrapApplication(angularApp)
                }, function () {
                    alert('Error bootstraping Angular app.');
                });
            }
        }

    }

})(angular);