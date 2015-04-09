/* data service
 */

app.factory('dataService', function($q, $http, $timeout, ptApiService){
  'use strict';
  
  var model = {
    instances: []
  };
  
  var GetInstances = function() {
    
    var deferred = $q.defer();
    
    if(model.instances.length) {
      
      deferred.resolve(model.instances);
      
    } else {
    
      // get from localforage
      localforage
      .getItem('instances')
      .then(function(instances) {
        
        $timeout(function() {
        
          if(instances) {
            model.instances = instances;
          }

          deferred.resolve(model.instances);
        
        });

      });
      
    }

    return deferred.promise;
    
  };
  
  var GetInstance = function(params) {
    
    var deferred = $q.defer();
    
    var instance;
    
    params.id = parseInt(params.id);
    
    if(model.instances.length) {
      
      instance = model.instances[params.id]
      
      deferred.resolve(instance);
      
    } else {
    
      GetInstances()
      .then(function(instances) {
        
        instance = model.instances[params.id]
        
        deferred.resolve(instance);
        
      });
      
    }

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
    
    GetInstances: GetInstances,
    GetInstance: GetInstance,
    AddInstance: AddInstance
  }

});
