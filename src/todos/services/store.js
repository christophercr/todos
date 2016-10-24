(function () {
    'use strict';

    /**
     * Services that persists and retrieves todos from localStorage or a backend API
     * if available.
     *
     * They both follow the same API, returning promises for all changes to the
     * model.
     */
    angular.module('app')
        .service('store', ['$http', '$log', function ($http, $log) {
            var store = this;

            store.todos = [];

            store.clearCompleted = function () {
                var originalTodos = store.todos.slice(0);

                var incompleteTodos = store.todos.filter(function (todo) {
                    return !todo.completed;
                });

                angular.copy(incompleteTodos, store.todos);

                return $http.delete('api/todos').then(
                    function success() {
                        // nothing to do on success
                    }, function error(resp) {
                        $log.error('store: delete failed', resp);
                        angular.copy(originalTodos, store.todos);
                    }
                );
            };

            store.delete = function (todo) {
                var originalTodos = store.todos.slice(0);

                store.todos.splice(store.todos.indexOf(todo), 1);

                return $http.delete('api/todos/' + todo.id).then(
                    function success() {
                        // nothing to do on success
                    }, function error(resp) {
                        $log.error('store: delete failed', resp);
                        angular.copy(originalTodos, store.todos);
                    }
                );
            };

            store.get = function () {
                return $http.get('api/todos').then(
                    function success(resp) {
                        angular.copy(resp.data, store.todos);
                    }, function error(resp) {
                        $log.error('store: get failed', resp);
                    }
                );
            };

            store.insert = function (todo) {
                var originalTodos = store.todos.slice(0);

                var httpPromise = $http.post('api/todos', todo);

                httpPromise.then(
                    function success(resp) {
                        todo.id = resp.data.id;
                        store.todos.push(todo);
                    }, function error(resp) {
                        $log.error('store: insert failed', resp);
                        angular.copy(originalTodos, store.todos);
                    }
                );

                return httpPromise;
            };

            store.put = function (todo) {
                return $http.put('api/todos/' + todo.id, todo);
            };
        }]);
})();
