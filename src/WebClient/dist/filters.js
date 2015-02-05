/// <reference path="_references.ts" />
'use strict';
var app;
(function (app) {
    (function (filters) {
        var RangeTo = (function () {
            function RangeTo() {
            }
            RangeTo.prototype.filter = function (start, end) {
                var out = [];
                for (var i = start; i < end; ++i)
                    out.push(i);
                return out;
            };
            return RangeTo;
        })();
        filters.RangeTo = RangeTo;

        var Splice = (function () {
            function Splice() {
            }
            Splice.prototype.filter = function (input, start, howMany) {
                return input.splice(start, howMany);
            };
            return Splice;
        })();
        filters.Splice = Splice;
    })(app.filters || (app.filters = {}));
    var filters = app.filters;
})(app || (app = {}));

app.registerFilter('RangeTo', []);
app.registerFilter('Splice', []);

angular.module("app").filter('stringArrayFilter', function () {
    return function (myArray) {
        return myArray.join(', ');
    };
});
//# sourceMappingURL=../src/filters.js.map