/**
 * Created by flo on 13.11.2014.
 */
'use strict'
angular.module('recordsApp').factory('Module',
    function () {
        var Module = function (modulnr, name, crp) {
                this.modulnr = modulnr;
                this.name = name;
                this.crp = crp;
            }
            ;
        return Module;
    });