/* global _, angular */

'use strict';

angular.module('ngJson', []).directive('jsonText', function () {
    return {
        restrict: 'A', // only activate on element attribute
        require: 'ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModelCtrl) {
            function fromUser(text) {
                // Beware: trim() is not available in old browsers
                if (!text || text.trim() === '') {
                    //do nothing
                }
                else {
                    try {
                        var newObject = angular.fromJson(text);
                        return newObject;
                    }
                    catch (e) {
                        //do nothing when invalid
                    }

                }

            }

            function toUser(object) {
                // better than JSON.stringify(), because it formats + filters $$hashKey etc.
                if (object) {
                    return angular.toJson(object, true);
                }

            }

            ngModelCtrl.$parsers.push(fromUser);
            ngModelCtrl.$formatters.push(toUser);

        }
    };
});
