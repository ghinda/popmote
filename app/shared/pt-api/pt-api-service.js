/* pt api service
 */

app.factory('ptApiService', function($q, $http, dataService){
  'use strict';
  
  var model = {
    apiUrl: ''
  };
  
  var CallPtApi = function(data, ip, returnDeferred) {
    
    var deferred = $q.defer();
    
    dataService.ShowLoading();

    data.params = data.params || {};
    data.id = 10;
    data.jsonrpc = '2.0';
    
    $http({
      method: 'POST',
      url: ip || config.apiUrl,
      data: data,
      headers: {
        'Authorization': window.btoa(data.username + ':' + data.password)
      },
      timeout: deferred.promise
    })
    .success(function(res) {
      
      if(ip) {
        res.result.url = ip;
      }
      
      deferred.resolve(res.result);

    })
    .error(function(err) {
      
      deferred.reject(err);
      
    })
    .finally(function() {
      
      if(!ip) {
        dataService.HideLoading();
      }
      
    });

    if(returnDeferred) {
      return [deferred.promise, deferred];
    }
    
    return deferred.promise;
    
  };

  var promiseQueue;
  var deferQueue;
  var limit = 255;

  var autodetectCallback = function(err, res, deferred) {
    
    if(!err) {
      
      dataService.HideLoading();
      
      deferQueue.forEach(function(q) {
        q.resolve();
      });
      
      return deferred.resolve(res);
      
    }
    
  };
  
  var Autodetect = function() {
    
    var deferred = $q.defer();
    
    var partialIp = 'http://192.168.1.';
    
    promiseQueue = [];
    deferQueue = [];
    
    for(var i = 0; i <= limit; i++) {
      
      var def = CallPtApi({
          method: 'ping',
          username: 'popcorn',
          password: 'popcorn'
        }, partialIp + i + ':8008', true);
      
      def[0]
      .then(function(res) {
        autodetectCallback(null, res, deferred)
      })
      .catch(function() {
        autodetectCallback(true, {}, deferred)
      });
      
      promiseQueue.push(def[0]);
      deferQueue.push(def[1]);
      
    }
    
    $q
    .all(promiseQueue)
    .then(function() {
      
      dataService.HideLoading();
      
      deferred.reject('not found');
      
    });
    
    return deferred.promise;
    
  };
  
  return {
    Autodetect: Autodetect,
    CallPtApi: CallPtApi
  }

});
