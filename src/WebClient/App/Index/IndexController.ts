﻿/// <reference path="../_references.ts" />
module app.controllers {

    export class IndexController extends app.base.ControllerBase {
        public static $inject = ["$scope"];

        constructor($scope: any) {
            super();
        }
    }
}