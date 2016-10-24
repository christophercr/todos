/*global FakeRest, sinon */

(function () {
    'use strict';

    var appModule = angular.module('app', []);

    appModule.component('app', {
        templateUrl: 'app.html',
        controller: 'AppCtrl'
    });

    appModule.run(['$http', '$log', function ($http, $log) {
        $log.debug('Application running');

        $http.get('api/data').then(
            function success(res) {
                $log.log('api data fetched', res.data);

                var apiUrl = 'api';
                var skippedUrls = [/\.html$/];

                var restServer = new FakeRest.Server(apiUrl);

                restServer.init(res.data);

                // logging is off by default, enable it to see network calls in the console
                restServer.toggleLogging();

                // use sinon.js to monkey-patch XmlHttpRequest
                var sinonServer = sinon.fakeServer.create();
                sinonServer.autoRespond = true;
                sinonServer.autoRespondAfter = 150; // delay in milliseconds

                sinonServer.xhr.useFilters = true;

                skippedUrls.forEach(function (skippedUrl) {

                    sinonServer.xhr.addFilter(function (method, url) {
                        //whenever this returns true the request will NOT be faked
                        if (url.search(skippedUrl) >= 0) {
                            $log.log('FakeRest server skipping request: ' + url);
                            return true;
                        }

                        return false;
                    });

                });

                sinonServer.respondWith(restServer.getHandler());
                $log.log('FakeRest server started with url ' + apiUrl);
            }, function error() {
                $log.error('api data not found!');
                $log.error('unable to initialize fakerest server');
            }
        );
    }]);
})();
