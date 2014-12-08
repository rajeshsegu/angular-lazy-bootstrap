describe('lazyBootstrap', function () {

    it('should provide lazy bootstrap function', function () {
        expect(angular.lazy).toEqual(jasmine.any(Function));
    });

    it('should provide bootstrap function chaining', function () {

        function check(link){
            expect(link.resolve).toEqual(jasmine.any(Function));
            expect(link.error).toEqual(jasmine.any(Function));
            expect(link.done).toEqual(jasmine.any(Function));
            expect(link.loading).toEqual(jasmine.any(Function));
            expect(link.bootstrap).toEqual(jasmine.any(Function));
        }

        var link = angular.lazy('demoApp');
        check(link);

        link = link.resolve(['$timeout', '$q', function($timeout, $q){
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve('VALUE');
            }, 2000);
            return deferred.promise;
        }]);
        check(link);

        link = link.error();
        check(link);

        link = link.done();
        check(link);

        link = link.loading();
        check(link);

    });

    it('should bootstrap the application', function(done){

        window.appConfig = {};

        angular.lazy('demoApp')
            .resolve(['$q', '$timeout', function ($q, $timeout) {
                var deferred = $q.defer();
                $timeout(function () {
                    window.appConfig.const = 'My Constant';
                    deferred.resolve();
                }, 2000);
                return deferred.promise;
            }])
            .bootstrap();

        angular.module('demoApp', [])
            .config(function () {
                expect(window.appConfig).toEqual({const: 'My Constant'});
                done();
            });

    });

    it('should bootstrap the application with various hooks', function(done){

        window.app = {};

        angular.lazy('demoApp')
            .resolve(['$q', '$timeout', function ($q, $timeout) {
                var deferred = $q.defer();
                $timeout(function () {
                    window.app.const = 'My Constant';
                    deferred.resolve();
                }, 2000);
                return deferred.promise;
            }])
            .loading(function(){
                expect(window.app.const).not.toBeDefined();
            })
            .done(function() {
                expect(window.app.const).toEqual('My Constant');
            })
            .bootstrap();

        angular.module('demoApp', [])
            .config(function () {
                expect(window.appConfig).toEqual({const: 'My Constant'});
                done();
            });

    });


});