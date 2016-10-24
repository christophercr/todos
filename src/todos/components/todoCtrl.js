(function () {
    'use strict';

    /**
     * The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    angular.module('app')
        .controller('TodoCtrl', ['$scope', '$filter', 'store', function ($scope, $filter, store) {
            var $ctrl = this;

            $ctrl.todos = [];

            store.get().then(function () {
                $ctrl.todos = store.todos;
            });

            $ctrl.status = '';
            $ctrl.newTodo = '';
            $ctrl.editedTodo = null;

            $scope.$watch('$ctrl.todos', function () {
                $ctrl.remainingCount = $filter('filter')($ctrl.todos, {completed: false}).length;
                $ctrl.completedCount = $ctrl.todos.length - $ctrl.remainingCount;
                $ctrl.allChecked = !$ctrl.remainingCount;
            }, true);

            $ctrl.showAll = function (status) {
                $ctrl.status = status || '';
                $ctrl.statusFilter = (status === 'active') ?
                {completed: false} : (status === 'completed') ?
                {completed: true} : {};
            };

            $ctrl.addTodo = function () {
                var newTodo = {
                    title: $ctrl.newTodo.trim(),
                    completed: false
                };

                if (!newTodo.title) {
                    return;
                }

                $ctrl.saving = true;
                store.insert(newTodo)
                    .then(function success() {
                        $ctrl.newTodo = '';
                    })
                    .finally(function () {
                        $ctrl.saving = false;
                    });
            };

            $ctrl.editTodo = function (todo) {
                $ctrl.editedTodo = todo;
                // Clone the original todo to restore it on demand.
                $ctrl.originalTodo = angular.extend({}, todo);
            };

            $ctrl.saveEdits = function (todo, event) {
                // Blur events are automatically triggered after the form submit event.
                // This does some unfortunate logic handling to prevent saving twice.
                if (event === 'blur' && $ctrl.saveEvent === 'submit') {
                    $ctrl.saveEvent = null;
                    return;
                }

                $ctrl.saveEvent = event;

                if ($ctrl.reverted) {
                    // Todo edits were reverted-- don't save.
                    $ctrl.reverted = null;
                    return;
                }

                todo.title = todo.title.trim();

                if (todo.title === $ctrl.originalTodo.title) {
                    $ctrl.editedTodo = null;
                    return;
                }

                store[todo.title ? 'put' : 'delete'](todo)
                    .then(function success() {
                    }, function error() {
                        todo.title = $ctrl.originalTodo.title;
                    })
                    .finally(function () {
                        $ctrl.editedTodo = null;
                    });
            };

            $ctrl.revertEdits = function (todo) {
                $ctrl.todos[$ctrl.todos.indexOf(todo)] = $ctrl.originalTodo;
                $ctrl.editedTodo = null;
                $ctrl.originalTodo = null;
                $ctrl.reverted = true;
            };

            $ctrl.removeTodo = function (todo) {
                store.delete(todo);
            };

            $ctrl.saveTodo = function (todo) {
                store.put(todo);
            };

            $ctrl.toggleCompleted = function (todo, completed) {
                if (angular.isDefined(completed)) {
                    todo.completed = completed;
                }
                store.put(todo)
                    .then(function success() {
                    }, function error() {
                        todo.completed = !todo.completed;
                    });
            };

            $ctrl.clearCompletedTodos = function () {
                var todos = $ctrl.todos.slice(0);

                todos.forEach(function (todo) {
                    if (todo.completed) {
                        store.delete(todo);
                    }
                });
            };

            $ctrl.markAll = function (completed) {
                $ctrl.todos.forEach(function (todo) {
                    if (todo.completed !== completed) {
                        $ctrl.toggleCompleted(todo, completed);
                    }
                });
            };
        }]);
})();
