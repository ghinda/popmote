/* pt api service
 */

app.factory('ptApiService', function($q, $http){
  'use strict';
  
  var pingPopcorn = function(ip, deferred) {
      
    var xhr = new XMLHttpRequest();

    var request = {};
    request.params = {};
    request.id = 10;
    request.method = 'ping';
    request.jsonrpc = '2.0';

    xhr.addEventListener('load', function(e) {
      pingCallback(e, ip, deferred);
    }, false);
    xhr.addEventListener('error', function(e) {
      pingCallback(e, ip, deferred)
    }, false);

    xhr.open('POST', ip, true);
    xhr.setRequestHeader('Authorization', window.btoa('popcorn:popcorn'));
    xhr.send(JSON.stringify(request));
    
    return xhr;

  };

  var searchQueue;
  var searchIndex;
  var limit = 255;
  var startTime;

  var pingCallback = function(e, url, deferred) {

    searchIndex++;
    
    if(e.type !== 'error') {
      
      var foundTime = Date.now() - startTime;
        
      searchQueue.forEach(function(q) {
        if(q.readystate !== 4) {
          q.abort();
        }
      });
      
      return deferred.resolve('found at ' + url + ', in ' + (foundTime / 1000) + 's.');
      
    }
      
    if(searchIndex === limit) {
      deferred.reject('not found');
    }
    
  };
  
  var Autodetect = function() {
    
    var deferred = $q.defer();
    
    startTime = Date.now();
    
    var partialIp = 'http://192.168.1.';
    
    searchIndex = 0;
    searchQueue = [];
    
    for(var i = 0; i <= limit; i++) {
      searchQueue.push(
        pingPopcorn(partialIp + i + ':8008', deferred)
      );
    }
    
    return deferred.promise;
    
  };
  
  return {
    Autodetect: Autodetect
  }

});
