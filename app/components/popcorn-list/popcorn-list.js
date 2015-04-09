/* popcorn-list component
 * list of popcorn time instances
 */

app.controller('popcornListCtrl', function (ptApiService, dataService) {
  
  var ctrl = this;
  
  ctrl.data = dataService.model;
  ctrl.api = ptApiService.model;
  
  dataService.GetInstances();
  
  ctrl.Autodetect = function(){
    
    ptApiService
    .Autodetect()
    .then(function(res) {
      
      // TODO check if we don't already have it in the list
      // and replace details if we do
      
      dataService.AddInstance(res);
      
    })
    .catch(function(e) {
      
      alert(e);
      
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
