/// <reference path="_references.ts" />
define(["require", "exports", "aurelia-router", "app/routes"], function (require, exports, aur, routes) {
    var App = (function () {
        function App(router) {
            this.router = router;
            this.router.configure(function (config) {
                config.title = "Aurelia demo";
                config.map(routes.Routes.getRoutes());
            });
        }
        App.inject = [aur.Router];
        return App;
    })();
    exports.App = App;
});
//# sourceMappingURL=app.js.map