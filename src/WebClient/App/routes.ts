﻿/// <reference path="_references.ts" />
"use strict";

module app {


    ///https://github.com/angular-ui/ui-router/wiki
    export class Routes {

        // start page
        public static home: ng.ui.IState = {
            name: "home",
            url: "/",
            templateUrl: "app/Index/IndexView.cshtml",
        //    controller: app.controllers.IndexController,
            data: {
                isVisible: true,
            }
        };

        public static metadataDefinitionGroups: ng.ui.IState = {
            name: "metadatadefinitiongroups",
            url: "/metadatadefinitiongroups",
            templateUrl: "app/metadatadefinitiongroups/MetadataDefinitionGroupView.cshtml",
            controller: app.controllers.MetadataDefinitionGroupController,
            data: {
                isVisible: true,
            }
        };

        public static metadataDefinitionGroupsEdit: ng.ui.IState = {
            name: "metadatadefinitiongroupsedit",
            url: "/metadatadefinitiongroupsedit",
            templateUrl: "app/metadatadefinitiongroups/MetadataDefinitionGroupEdit.cshtml",
            controller: app.controllers.MetadataDefinitionGroupEditController,
            data: {
                isVisible: true,
            }
        };

        public static metadataDefinitionGroupsUpdate: ng.ui.IState = {
            name: "metadataDefinitionGroupsupdate",
            url: "/metadatadefinitiongroupsedit/{identity}",
            templateUrl: "app/metadatadefinitiongroups/MetadataDefinitionGroupEdit.cshtml",
            controller: app.controllers.MetadataDefinitionGroupEditController,
            data: {
                isVisible: true,
            }
        };


        public static metadataDefinitions: ng.ui.IState = {
            name: "metadatadefinitions",
            url: "/metadatadefinitions",
            templateUrl: "app/metadatadefinitions/MetadataDefinitionView.cshtml",
            controller: app.controllers.MetadataDefinitionController,
            data: {
                isVisible: true,
            }
        };

        public static metadataDefinitionEdit: ng.ui.IState = {
            name: "metadatadefinitionsedit",
            url: "/metadatadefinitionsedit",
            templateUrl: "app/metadatadefinitions/MetadataDefinitionEdit.cshtml",
            controller: app.controllers.MetadataDefinitionEditController,
            data: {
                isVisible: true,
            }
        };

        public static metadataDefinitionUpdate: ng.ui.IState = {
            name: "metadatadefinitionsupdate",
            url: "/metadatadefinitionsedit/{identity}",
            templateUrl: "app/metadatadefinitions/MetadataDefinitionEdit.cshtml",
            controller: app.controllers.MetadataDefinitionEditController,
            data: {
                isVisible: true,
            }
        };

        public static entities: ng.ui.IState = {
            name: "entities",
            url: "/entities",
            templateUrl: "app/entities/EntityView.cshtml",
            controller: app.controllers.EntityController,
            data: {
                isVisible: true,
            }
        };

        public static entityCreate: ng.ui.IState = {
            name: "entitycreate",
            url: "/entitycreate",
            templateUrl: "app/entities/EntityEdit.cshtml",
            controller: app.controllers.EntityEditController,
            data: {
                isVisible: true,
            }
        };

        public static entityEdit: ng.ui.IState = {
            name: "entityedit",
            url: "/entityedit/{identity}",
            templateUrl: "app/entities/EntityEdit.cshtml",
            controller: app.controllers.EntityEditController,
            data: {
                isVisible: true,
            }
        };

        public static entityDuplicate: ng.ui.IState = {
            name: "entityduplicate",
            url: "/entityedit/{identity}/duplicate",
            templateUrl: "app/entities/EntityEdit.cshtml",
            controller: app.controllers.EntityEditController,
            data: {
                isVisible: true,
                duplicate: true
            }
        };

        public static search: ng.ui.IState = {
            name: "search",
            url: "/search",
            templateUrl: 'app/Search/Search.cshtml',
            data:
            {
                isVisible: true,
            }
        };


        public static getRoutes(): Array<ng.ui.IState> {

            var list = new Array<ng.ui.IState>();

            //http://www.ng-newsletter.com/posts/angular-ui-router.cshtml
            list.push(
                Routes.home,
                Routes.metadataDefinitionGroups,
                Routes.metadataDefinitionGroupsUpdate,
                Routes.metadataDefinitionGroupsEdit,
                Routes.metadataDefinitions,
                Routes.metadataDefinitionEdit,
                Routes.metadataDefinitionUpdate,
                Routes.entities,
                Routes.entityCreate,
                Routes.entityEdit,
                Routes.entityDuplicate
            );


            //_.each(this.getRoutes(), (route: any) => {
            //    app.log("routes -> " + route.config.title);
            //    if (route.config && route.config.title) {
            //        var view: nav = {
            //            name: route.config.title,
            //            url: "/" + route.url,
            //            templateUrl: route.config.templateUrl,
            //            controller: app.controllers[route.config.title],
            //            params: route.config.settings,
            //        };

            //        list.push(view);
            //    } else {
            //        app.log("Dud route = " + route);
            //    }


            //  });
            app.log.debug("total routes -> " + list.length.toLocaleString());
            return list;

        }

    }
}