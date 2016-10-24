(function () {
    'use strict';

    angular.module('app')
        .component('todo', {
            templateUrl: './todos/components/todo.html',
            controller: 'TodoCtrl'
        });

})();
