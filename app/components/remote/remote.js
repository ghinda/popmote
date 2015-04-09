/* remote component
 */

app.controller('remoteCtrl', function ($routeParams, ptApiService, dataService) {
  
  var ctrl = this;
  
  ctrl.data = dataService.model;
  
  ctrl.instance = null;
  
  ctrl.subtitles = [];
  
  dataService.GetInstance({
    id: $routeParams.id
  })
  .then(function(instance) {
    
    ctrl.instance = instance;
    
    ptApiService.SetApiDetails({
      url: instance.url,
      username: 'popcorn',
      password: 'popcorn'
    });
    
    ptApiService.CallPtApi({
      method: 'getsubtitles'
    })
    .then(function(res) {
      
      ctrl.subtitles = res.subtitles;
      
    });
    
  });
  
  ctrl.PtAction = function(action) {
    
    ptApiService.CallPtApi({
      method: action
    });
    
  };
  
  
});

app.directive('remote', function (){
  return {
    scope: {},
    controller: 'remoteCtrl',
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
