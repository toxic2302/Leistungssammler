/**
 * Created by flo on 13.11.2014.
 */
angular.module('recordsApp').service('ModuleData',
    function ($http, Module) {
        this.load = function () {
            var url = 'http://suessdev1.thm.de/mapp/modules.json';
            var lastModified = localStorage.getItem('modulesLastModified');
            var reqOptions = {};

            if (lastModified) {
                reqOptions.headers = {'If-Modified-Since': lastModified};
            }
            var promise = $http.get(url, reqOptions);
            promise.success(function (data, status, headers, config) {
                // status 200 == ok new data
                if (status == 200 && angular.isArray(data)) {
                    localStorage.setItem('modules', JSON.stringify(data));
                    var respHeaders = headers();
                    localStorage.setItem('modulesLastModified',
                        respHeaders['last-modified']);
                }
            }).error(function(data, status, headers, config){
                // status 0 == no network
                // status 0 == modules.json not modified in browser
                // status 304 == modules.json not modified on device
            });
            //return lastModified;
        };
        this.findAll = function () {
            var modules = localStorage.getItem('modules');
            if (!modules) {
                modules = [];
                //add some test data
                //modules.push(new Module('CS1019', 'Compilerbau', 6));
                //modules.push(new Module('CS1022', 'Betriebssysteme', 6));

                localStorage.setItem('modules', JSON.stringify(modules));

            } else {
                modules = JSON.parse(modules);
            }
            return modules;
        };
    });