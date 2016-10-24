/*global jasmine, describe, beforeEach, afterEach, it, xit, module, inject, expect */

(function () {

    'use strict';

    describe('sanity checks', function () {

        var $log;

        beforeEach(inject(function (_$log_) {
            $log = _$log_;
        }));

        it('should be able to test', function () {
            expect(true).toBe(true);
        });

        it('should inject angular mock services correctly', function () {
            expect($log).not.toBeNull();
            expect($log).not.toBeUndefined();
        });

        xit('should skip this', function () {
            expect(4).toEqual(40);
        });
    });
})();
