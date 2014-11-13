/**
 * Das Serviceobjekt berechnet die Daten für die Statistikanzeige in der RecordListCtrl.
 * Created by flo on 07.11.14.
 */
'use strict';
angular.module('recordsApp').service('StatisticData', function ($ionicPopup, RecordData) {

    /**
     *
     * @returns {*} anzahl der Leistungen
     */
    this.countRecords = function () {
        var records = RecordData.findAll();
        return records.length;
    }
    /**
     *
     * @returns {number} summe aller CreditPoints
     */
    this.sumCrp = function () {
        var records = RecordData.findAll();
        var sum = 0;

        for (var i = 0; i < records.length; i++) {
            if (records[i].mark >= 50) {
                sum = sum + parseInt(records[i].crp);
            }
        }
        return sum;
    }
    /**
     *
     * @returns {number} noch benötigte CreditPoints
     */
    this.remainCrp = function () {
        return 180 - this.sumCrp();
    }
    /**
     *
     * @returns {string} durchschnittsnote auf 2 stellen gerundet
     */
    this.avg = function () {
        var records = RecordData.findAll();
        var avg = 0;
        var avg_half = 0;
        var countCrp = 0;
        var result = 0;

        for (var i = 0; i < records.length; i++) {
            if (records[i].mark >= 50) {
                if (records[i].gewicht) {
                    //mit halben credits mal nehmen und durch volle teilen
                    avg_half = avg_half + (((parseInt(records[i].mark) * records[i].crp) / 2) / parseInt(records[i].crp));
                } else {
                    avg = avg + ((parseInt(records[i].mark) * records[i].crp) / parseInt(records[i].crp));
                }
            }
        }
        result = (avg_half + avg) / this.countRecords();
        return result.toFixed(1);
    }
    /**
     *
     * @returns {number} anzahl von 50% gewichtungen
     */
    this.countWeight = function () {
        var records = RecordData.findAll();
        var countWeight = 0;

        for (var i = 0; i < records.length; i++) {
            if (records[i].mark >= 50 && records[i].gewicht == true) {
                countWeight++;
            }
        }
        return countWeight;
    }
});
