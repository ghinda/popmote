/* pt api service
 */

app.factory('ptApiService', function($q, $http){
  'use strict';
  
  // TODO set api username and password in model
  
  var model = {
    url: '',
    username: '',
    password: '',
    loading: false
  };
  
  var ShowLoading = function() {
    model.loading = true;
  };
  
  var HideLoading = function() {
    model.loading = false;
  };
  
  var SetApiDetails = function(params) {
    
    angular.extend(model, params);
    
  };
  
  var CallPtApi = function(data, returnDeferred) {
    
    var deferred = $q.defer();
    
    ShowLoading();

    data.params = data.params || {};
    data.id = 10;
    data.jsonrpc = '2.0';
    
    // get url, username and password from global model,
    // but allow individual call overwrite.
    var apiUrl = data.url || model.url;
    var authorization = data.username || model.username;
    authorization += ':';
    authorization += data.password || model.password;
    
    $http({
      method: 'POST',
      url: apiUrl,
      data: data,
      headers: {
        'Authorization': window.btoa(authorization)
      },
      timeout: deferred.promise
    })
    .success(function(res) {
      
      if(data.url) {
        res.result.url = data.url;
      }
      
      deferred.resolve(res.result);

    })
    .error(function(err) {
      
      deferred.reject(err);
      
    })
    .finally(function() {
      
      if(!returnDeferred) {
        HideLoading();
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
      
      HideLoading();
      
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
          url: partialIp + i + ':8008',
          username: 'popcorn',
          password: 'popcorn'
        }, true);
      
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
      
      HideLoading();
      
      deferred.reject('not found');
      
    });
    
    return deferred.promise;
    
  };
  
  return {
    model: model,
    ShowLoading: ShowLoading,
    HideLoading: HideLoading,
    
    Autodetect: Autodetect,
    CallPtApi: CallPtApi,
    SetApiDetails: SetApiDetails
  }

});
