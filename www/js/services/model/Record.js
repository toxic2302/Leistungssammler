/**
 * Legt objekte vom Typ Record mit seinen Eigenschaften an
 * Created by flo on 03.11.14.
 */
'use strict';
angular.module('recordsApp').factory('Record',
    function () {
        var Record = function (id, modulnr, name, crp, mark, gewicht, isSummerSem, year) {
                this.id = id;
                this.modulnr = modulnr;
                this.name = name;
                this.crp = crp;
                this.mark = mark;
                this.gewicht = gewicht;
                this.isSummerSem = isSummerSem;
                this.year = year;
            }
            ;
        return Record;
    });