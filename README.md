angular-lazy-bootstrap
======================

[![Build Status](https://travis-ci.org/rajeshsegu/angular-lazy-bootstrap.svg?branch=master)](https://travis-ci.org/rajeshsegu/angular-lazy-bootstrap)
[![Gitter chat](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/rajeshsegu/angular-lazy-bootstrap)

This elegant piece of code would help any Angular based single page web application to ideally load the initial configuration, global variables, server flags and UI flags before initializing the UI. It deffers the Angular bootstrapping process until we resolve all the chained promises. 

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

### Error Case

```js

angular.lazy("demoApp")
  .resolve(['$q', '$timeout', function ($q, $timeout) {
       var deferred = $q.defer();
       $timeout(function () {
           deferred.reject('EXCEPTION');
       }, 2000);
       return deferred.promise;
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
In this code sample, ```demoApp``` would not load since the promise is rejected. We have an ```error()``` handler that gives UI a chance to handle error initializing the app or to start a new flow.

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

### DEMO

I have included a node webserver to make this easy to try:

```
git clone https://github.com/rajeshsegu/angular-lazy-bootstrap.git
npm install
node webserver.js
[ access server at http://localhost:5050/ ]
```
You can try out working samples at:

```Simple Case```   : http://localhost:5050/demo/simple.html

```Multi Case```    : http://localhost:5050/demo/multi.html

```Error Case```    : http://localhost:5050/demo/error.html

## License

[MIT](http://opensource.org/licenses/MIT) © Rajesh Segu
