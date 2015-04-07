/* popcorn-list component
 * list of popcorn time instances
 */

app.controller('popcornListCtrl', function () {
  
  this.test = 'test';
  
});

app.directive('popcornList', function () {
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
