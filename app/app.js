/* popmote
 * Popcorn Time Remote for FirefoxOS
 */

var app = angular.module('popmote', [
  'ngRoute',
  'ngTouch',
  'ngAnimate'
]).config(function($routeProvider, $compileProvider) {
  'use strict';

  $routeProvider
  .when('/', {
    templateUrl: '/components/instance-list/instance-list.html'
  })
  .when('/instance/:id?', {
    templateUrl: '/components/instance/instance.html'
  })
  .when('/remote/:id', {
    templateUrl: '/components/remote/remote.html'
  })
  .otherwise({
    redirectTo: '/'
  });

  // AngularJS doesn't trust the FirefoxOS app:// protocol by default
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);

});

app.run(function($rootScope, $location, $timeout){
  'use strict';
  
  var root = $rootScope.root = {};

});
