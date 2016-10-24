(function () {
    'use strict';

    /**
     * Directive that executes an expression when the element it is applied to gets an `escape` keydown event.
     */
    angular.module('app')
        .directive('todoEscape', ['$log', function ($log) {
            return {
                restrict: 'A',
                scope: false, // uses parent's scope
                link: function (scope, elem, attrs) {
                    $log.log('todoEscape directive loaded');
                    var ESCAPE_KEY = 27;

                    elem.bind('keydown', function (event) {
                        if (event.keyCode === ESCAPE_KEY) {
                            scope.$apply(attrs.todoEscape);
                        }
                    });

                    scope.$on('$destroy', function () {
                        elem.unbind('keydown');
                    });
                }
            };
        }]);
})();
