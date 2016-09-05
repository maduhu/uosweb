'use strict';

(function () {

    var _rightPosition = 0;

    /**
     * @ngdoc overview
     * @name wikiApp
     * @description
     * # wikiApp
     *
     * Main module of the application.
     */
    angular.module('wikiApp', [
            'ngAnimate',
            'ngCookies',
            'ngMarkDown',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch'
    ])
        .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

            //================================================
            // Add an interceptor for AJAX errors
            //================================================
            $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
                return {
                    'request': function (config) {
                        return config;
                    },
                    'response': function (response) {
                        return response;
                    },
                    'responseError': function (rejection) {

                        // Error: check the error status to get only the 401
                        if (rejection.status === 401) {
                            $location.url('#/');
                        } else {
                            //notification.pop(rejection.statusText);
                        }

                        // do something on error
                        /*if (canRecover(rejection)) {
                            return responseOrNewPromise
                        }*/
                        return $q.reject(rejection);
                    }
                }
            }]);

            //================================================
            // Routes
            //================================================
            $routeProvider
                .when('/{{page.id}}', {

                    // match routes without being case sensitive
                    caseInsensitiveMatch: false,

                    // don't reload route when $location.search() or $location.hash() changes
                    reloadOnSearch: false
                })
                .otherwise({
                    redirectTo: '/'
                });

        }])
        .config(['markdownConverterProvider', function (markdownConverterProvider) {
            // options to be passed to Showdown
            // see: https://github.com/coreyti/showdown#extensions
            markdownConverterProvider.config({
                //extensions: ['twitter', 'github', 'google-prettify']
            });
        }])
        .run(['$http', function ($http) {
        }]);


    /**
     * @ngdoc function
     * @name wikiApp.controller:WikiCtrl
     * @description
     * # MarkDownCtrl
     * Controller of the wikiApp
     */
    //http://stackoverflow.com/questions/1319657/javascript-to-convert-markdown-textile-to-html-and-ideally-back-to-markdown-t
    //http://softwaremaniacs.org/playground/showdown-highlight/
    angular.module('wikiApp')
        .controller('wikiCtrl', [
            '$scope',
            '$location',
            '$http', function ($scope, $location, $http) {
                $scope.index = {
                    items: []
                };

                var location = $location.path();

                if (location && location !== '/') {
                    $scope.path = 'en/' + $location.path() + '.md';
                }

                $http.get('en/index.json')
                    .then(function (res) {
                        $scope.index.items = res.data;
                        console.log('loaded menu', res.data);
                    });

                $scope.$watch('index.currentNode', function (newObj, oldObj) {
                    if ($scope.index && angular.isObject($scope.index.currentNode)) {
                        $scope.path = 'en/' + $scope.index.currentNode.asset + '.md';
                    }
                }, false);
            }]);

    /**
     * @ngdoc directive
     * @name wikiApp.directive:mark-down
     * @description
     * # mark-down
     */
    angular.module('ngMarkDown', ['ngSanitize']).
        provider('markdownConverter', function () {
            var opts = {};
            return {
                config: function (newOpts) {
                    opts = newOpts;
                },
                $get: function () {
                    return new Showdown.converter(opts);
                }
            };
        }).
        directive('ngMarkDown', function ($sanitize, markdownConverter) {
            return {
                restrict: 'AE',
                link: function (scope, element, attrs) {
                    if (attrs.ngMarkDown) {
                        scope.$watch(attrs.ngMarkDown, function (newVal) {
                            var html = newVal ? $sanitize(markdownConverter.makeHtml(newVal)) : '';
                            element.html(html);
                            $(element).css({
                                width: 'calc(100% - ' + _rightPosition + 'px)'
                            });
                        });
                    } else {
                        var html = $sanitize(markdownConverter.makeHtml(element.text()));
                        element.html(html);
                        $(element).css({
                            width: 'calc(100% - ' + _rightPosition + 'px)'
                        });
                    }
                }
            };
        });


    /**
     * @ngdoc directive
     * @name wikiApp.directive:index
     * @description
     * # index
     * http://sporto.github.io/blog/2013/06/24/nested-recursive-directives-in-angular/
     * https://github.com/eu81273/angular.treeview
     */
    angular.module('wikiApp').
        directive('ngIndex', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    //tree id
                    var treeId = attrs.treeId;

                    //tree model
                    var treeModel = attrs.treeModel;

                    //node id
                    var nodeId = attrs.nodeId || 'id';

                    //node label
                    var nodeLabel = attrs.nodeLabel || 'label';

                    //children
                    var nodeChildren = attrs.nodeChildren || 'children';

                    //tree template
                    var template = '<li data-ng-class="{ collapsed: node.' + nodeChildren + '.length && node.collapsed, expanded: node.' + nodeChildren + '.length && !node.collapsed }" data-ng-repeat="node in ' + treeModel + '">' +
                        '<small data-ng-click="' + treeId + '.selectNodeHead(node, arguments)"></small>' +
                        '<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
                        '<ul ng-index="true" data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></ul>' +
                        '</li>';

                    //check tree id, tree model
                    if (treeId && treeModel) {

                        //root node
                        if (attrs.ngIndex) {

                            //create tree object if not exists
                            scope[treeId] = scope[treeId] || {};

                            //if node head clicks,
                            scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {

                                //Collapse or Expand
                                selectedNode.collapsed = !selectedNode.collapsed;
                            };

                            //if node label clicks,
                            scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {

                                //remove highlight from previous node
                                if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
                                    scope[treeId].currentNode.selected = undefined;
                                }

                                //set highlight to selected node
                                selectedNode.selected = 'selected';

                                //set currentNode
                                scope[treeId].currentNode = selectedNode;
                            };
                        }

                        //Rendering template.
                        element.html('').append($compile(template)(scope));

                    }
                }
            };
        }]);

    /**
     * @ngdoc directive
     * @name wikiApp.directive:resizer
     * @description
     * # resizer
     */
    angular.module('wikiApp').
        directive('ngResizer', function ($document) {

            return function ($scope, $element, $attrs) {

                function refresh() {
                    var $left = $($attrs.resizerLeft), x = $left.outerWidth() + parseInt($left.css('margin-left')),
                        split = parseInt($left.css('margin-right'));

                    _rightPosition = x + split;

                    $element.css({
                        left: (x + $left.position().left) + 'px',
                        width: split + 'px'
                    });

                    return split;
                };

                var split = refresh();

                $element.on('mousedown', function (event) {
                    event.preventDefault();

                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {

                    // Handle vertical resizer
                    var x = event.pageX;

                    if ($attrs.resizerMax && x > $attrs.resizerMax) {
                        x = parseInt($attrs.resizerMax);
                    }

                    $($attrs.resizerLeft).css({
                        width: x + 'px'
                    });

                    $element.css({
                        left: x + 'px'
                    });

                    _rightPosition = x + split;

                    $($attrs.resizerRight).css({
                        width: 'calc(100% - ' + _rightPosition + 'px)'
                    });
                }

                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }
            };
        });
})();