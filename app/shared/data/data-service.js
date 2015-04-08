/* data service
 */

app.factory('dataService', function($q, $http, $timeout){
  'use strict';
  
  var model = {
    loading: false,
    instances: []
  };
  
  var ShowLoading = function() {
    model.loading = true;
  };
  
  var HideLoading = function() {
    model.loading = false;
  };
  
  var GetInstances = function() {
    
    var deferred = $q.defer();

    ShowLoading();
    
    // get from localforage
    localforage
    .getItem('instances')
    .then(function(instances) {
      
      $timeout(function() {
      
        if(instances) {
          model.instances = instances;
        }

        deferred.resolve(model.instances);
      
        HideLoading();
      
      });

    });

    return deferred.promise;
    
  };
  
  var AddInstance = function(data) {
    
    var deferred = $q.defer();
    
    model.instances.push(data);

    // save with localforage
    localforage.setItem('instances', model.instances);

    deferred.resolve(model.instances);

    return deferred.promise;
    
  };
  
  return {
    model: model,
    ShowLoading: ShowLoading,
    HideLoading: HideLoading,
    
    GetInstances: GetInstances,
    AddInstance: AddInstance
  }

});
