(function () {
    'use strict';

    /**
     * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
     */
    angular.module('app')
        .directive('todoFocus', ['$log', '$timeout', function ($log, $timeout) {
            return {
                restrict: 'A',
                scope: false, // uses parent's scope
                link: function (scope, elem, attrs) {
                    $log.log('todoFocus directive loaded');

                    scope.$watch(attrs.todoFocus, function (newVal) {
                        if (newVal) {
                            $timeout(function () {
                                elem[0].focus();
                            }, 0, false);
                        }
                    });
                }
            };
        }]);
})();
