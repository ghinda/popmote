/* instance-list component
 * list of popcorn time instances
 */

app.controller('instanceListCtrl', function (ptApiService, dataService, viewTransition) {
  
  var ctrl = this;
  
  ctrl.viewTransition = viewTransition;
  
  ctrl.data = dataService.model;
  ctrl.api = ptApiService.model;
  
  dataService.GetInstances();
  
  ctrl.Autodetect = function(){
    
    ptApiService
    .Autodetect({
      url: 'http://192.168.1.',
      port: '8008',
      username:  'popcorn',
      password: 'popcorn'
    })
    .then(function(res) {
      
      // TODO check if we don't already have it in the list
      // and replace details if we do
      
      var a = document.createElement('a');
      a.href = res.url;

      dataService.AddInstance({
        name: 'Popcorn Time ' + res.popcornVersion,
        port: a.port,
        ip: a.hostname,
        username: 'popcorn',
        password: 'popcorn'
      });
      
    })
    .catch(function(e) {
      
      alert(e);
      
    });
    
  };
  
});

app.directive('instanceList', function (){
  return {
    scope: {},
    controller: 'instanceListCtrl',
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
