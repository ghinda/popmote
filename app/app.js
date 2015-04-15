/* popmote
 * Popcorn Time Remote for FirefoxOS
 */

var app = angular.module('popmote', [
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'ngRouteAnimationManager'
]).config(function($routeProvider, $compileProvider) {
  'use strict';

  $routeProvider
  .when('/', {
    templateUrl: '/components/instance-list/instance-list.html',
    data: {
      animationConf: {
        'instance/:id?': 'popdown'
      }
    }
  })
  .when('/instance/:id?', {
    templateUrl: '/components/instance/instance.html',
    data: {
      animationConf: {
        root: 'popup'
      }
    }
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
