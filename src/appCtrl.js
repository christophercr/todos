(function() {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', ['$log', function ($log) {
            $log.debug('app - loading...');

            this.$onInit = function () {
                $log.debug('app - initialized');
            };
        }]);
})();
