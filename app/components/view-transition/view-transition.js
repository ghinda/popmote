/* view-transition component
 */

app.directive('viewTransition', function ($location, $timeout, $animate){
  
  return {
    scope: {},
    link: function(scope, element, attrs) {
      
      var path = attrs.href.replace('#', '');
      var transition = attrs.viewTransition;
      var $body = $('body');
      
      element.on('click', function(e) {
        
        e.preventDefault();
        
        $body.addClass(transition);
        
        $location.path(path);
        
        scope.$apply();
        
      });
          
      var pfx = ['webkit', 'moz', 'MS', 'o', ''];
      var addPrefixedEvent = function(element, type, callback) {
        for (var p = 0; p < pfx.length; p++) {
          if (!pfx[p]) type = type.toLowerCase();
          element.addEventListener(pfx[p]+type, callback, false);
        }
      };
      
              
      addPrefixedEvent(document.body, 'AnimationEnd', function() {
        
        $body.removeClass(transition);
        
        console.log('end');
        
      });
      
      
      
    }
  }
  
});
