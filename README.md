angular-lazy-bootstrap
======================

This framework helps to lazy bootstrap any given Angular application. This would help any single page web application to ideally load the initial configuration, global variables, server flags and UI flags before initializing the UI.

## Usage

Instead of using the ```ng-app``` directive or ```angular.bootstrap()```, use the ```angular.lazy().resolve().bootstrap()``` to initialize your app.

### Simple Case

```js

angular.lazy("demoApp")
  .resolve(['$http', function ($http) {
      return $http.get('/demo/api/config.json')
          .then(function (resp) {
              window.app.config = resp.data;
          });
      }])
  .bootstrap();

```
In this code sample, ```demoApp``` would be lazily initialized once you fetch the config from the server and make it available to the angular app though global variables or any angular service as designed by the application.

### Multiple Dependecies Case

```js

angular.lazy("demoApp")
  .resolve(['$http', function ($http) {
     return $http.get('/demo/api/config.json')
        .then(function (resp) {
              window.app.config = resp.data;
           }, function (err){
               angular.element('#error').show();
           });
   }])
  .resolve(['$http', function ($http) {
     return $http.get('/demo/api/config-next.json')
        .then(function (resp) {
             window.app.config = resp.data;
        }, function (err){
             angular.element('#error').show();
        });
   }])
  .resolve(['$q', '$timeout', function ($q, $timeout) {
       var deferred = $q.defer();
       $timeout(function () {
           window.app.const = 'My Constant';
           deferred.resolve();
       }, 2000);
       return deferred.promise;
  }])
  .bootstrap();

```
In this code sample, ```demoApp``` would be lazily initialized once resolve each promise in the given order. In this case, it fetches initial config and then fetches a next config for partner website and then has a timeout resolve ( just an example ) before it boostraps the actual angular application. 

**Note** You can handle errors individually per promise or globally ( below example )

### More Control 

```js

angular.lazy("demoApp")
  .resolve(['$http', function ($http) {
      return $http.get('/demo/api/config.json')
          .then(function (resp) {
              window.app.config = resp.data;
          });
      }])
   .loading(function(){
       angular.element('#loading').show();
   })
   .error(function(){
       angular.element('#error').show();
   })
   .done(function() {
       angular.element('#loading').hide();
   })
   .bootstrap();

```
This framework allows you to tap into different states during initializing the angular app, 

```loading()```: Gives control for the UI on loading phase ( promises are resolving during this state ) 

```error()```  : Gives control if an error occurs ( if any of the promise results in failure )

```done()```   : Gives control once the app is initialized

