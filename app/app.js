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
    templateUrl: '/components/popcorn-list/popcorn-list.html'
  })
  .when('/remote/:id', {
    templateUrl: '/components/remote/remote.html'
  })
  .otherwise({
    redirectTo: '/'
  });

  // AngularJS doesn't trust app:// protocol by default, which is the protocol
  // Firefox OS uses for packaged apps
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);

});

app.run(function($rootScope, $location, $timeout){
  'use strict';

});
