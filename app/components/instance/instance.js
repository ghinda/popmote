/* instance component
 */

app.controller('instanceCtrl', function (ptApiService, dataService, viewTransition, $routeParams) {
  
  var ctrl = this;
  
  ctrl.viewTransition = viewTransition;
  
  ctrl.data = dataService.model;
  ctrl.api = ptApiService.model;
  
  ctrl.instance = {
    name: '',
    ip: '',
    port: '',
    username: '',
    password: ''
  };
  
  ctrl.SaveInstance = function(){
    
    // TODO save and redirect
    
    ctrl.viewTransition.Go('/', 'popdown');
    
  };
  
  if($routeParams.id) {
    
    dataService.GetInstance({
      id: $routeParams.id
    })
    .then(function(res) {
      
      console.log(res);
      
      angular.copy(res, ctrl.instance);
      
    });
    
  }
  
});

app.directive('instance', function (){
  return {
    scope: {},
    controller: 'instanceCtrl',
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
