/**
 * Created by flo on 13.11.2014.
 */
angular.module('recordsApp').service('ModuleData',
    function ($http, Module) {
        this.load = function () {
            var url = 'http://suessdev1.thm.de/mapp/modules.json';
            //var url = 'http://87.106.18.242/mapp/modules.json';
            var lastModified = localStorage.getItem('modulesLastModified');
            var reqOptions = {};
            var lastUpdate = 0;
            var newDate = new Date().getTime();
            lastUpdate = localStorage.getItem('lastUpdate');
            var checkDate = (newDate - lastUpdate) / (1000 * 60 * 60);
            //console.log(checkDate);

            if (lastModified) {
                reqOptions.headers = {'If-Modified-Since': lastModified};
            }
            if (checkDate >= 24) {
                var promise = $http.get(url, reqOptions);
                promise.success(function (data, status, headers, config) {
                    // status 200 == ok new data
                    if (status == 200 && angular.isArray(data)) {
                        localStorage.setItem('modules', JSON.stringify(data));
                        var respHeaders = headers();
                        localStorage.setItem('modulesLastModified',
                            respHeaders['last-modified']);

                        lastUpdate = new Date().getTime();
                        lastUpdate = localStorage.setItem('lastUpdate', lastUpdate);
                        return status;
                    }
                }).error(function (data, status, headers, config) {
                    return status
                });
            } else {
                console.log("noch keine 24 Stunden vergangen");
            }
        };
        this.findAll = function () {
            var modules = localStorage.getItem('modules');
            if (!modules) {
                modules = [];
                localStorage.setItem('modules', JSON.stringify(modules));

            } else {
                modules = JSON.parse(modules);
            }
            return modules;
        };
    });