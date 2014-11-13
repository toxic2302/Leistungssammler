/**
 * Created by flo on 13.11.2014.
 */
angular.module('recordsApp').service('ModuleData',
    function (Module) {
        this.findAll = function () {
            var modules = localStorage.getItem('modules');
            if (!modules) {
                modules = [];
                //add some test data
                modules.push(new Module('CS1019', 'Compilerbau', 6));
                modules.push(new Module('CS1022', 'Betriebssysteme', 6));

                localStorage.setItem('modules', JSON.stringify(modules));

            } else {
                modules = JSON.parse(modules);
            }
            return modules;
        };
    });