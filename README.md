angular-lazy-bootstrap
======================

Lazy bootstrap Angular application once you have the required information to initialize it.



This component provides a global resolve function for your app. It works similar to the resolve functions you may know from ngRoute or ui-router: You define what needs to be loaded from the back-end before your application can be started and the deferred bootstrapper takes care of loading the data and bootstrapping the application.

 This would help any single page web application to ideally load the initial configuration, global variables, server flags before initializing the UI.

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

