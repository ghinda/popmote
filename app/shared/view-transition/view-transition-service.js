/* view-transition component
 */

app.factory('viewTransition', function ($location, $rootScope){
  
  var root = $rootScope.root;
      
  var Go = function(path, pageAnimation) {
    root.viewTransition = pageAnimation;

    $location.path(path);
  };
    
  return {
    Go: Go
  };
});
