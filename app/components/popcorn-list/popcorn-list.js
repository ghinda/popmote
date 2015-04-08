/* popcorn-list component
 * list of popcorn time instances
 */

app.controller('popcornListCtrl', function (ptApiService) {
  
  var ctrl = this;
  
  ctrl.loadingAutodetect = false;
  
  ctrl.Autodetect = function(){

    ctrl.loadingAutodetect = true;
    
    ptApiService
    .Autodetect()
    .then(function(res) {
      
      console.log(res);
      
    })
    .catch(function(e) {
      
      alert(e);
      
    })
    .finally(function() {
      
      ctrl.loadingAutodetect = false;
      
    });
    
  };
  
});

app.directive('popcornList', function (){
  return {
    scope: {},
    controller: 'popcornListCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    transclude: true,
    link: function(scope, element, attrs, ctrl, transclude) {
      transclude(scope, function(clone) {
        element.append(clone);
      });
    }
  };
});
