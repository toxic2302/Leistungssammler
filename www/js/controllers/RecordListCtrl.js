/**
 * Record List Controller zum anlegen und anzeigen von records
 * Created by flo on 21.10.14.
 */
'use strict';
angular.module('recordsApp').controller('RecordListCtrl',
    function ($state, RecordData, StatisticData, $ionicPopup) {

        this.records = RecordData.findAll();
        var thisSt = this;
        /**
         * Verursacht einen State-wechsel zur "RecordFormView"
         */
        this.addRecord = function () {
            $state.go('records-form', {id: 'new'})
        };
        /**
         * Generiert die die Statistiken und zeigt sie in einem Popup an
         */
        this.showStats = function () {
            $ionicPopup.alert({
                title: 'Statistik',
                template: 'Leistungen: ' + StatisticData.countRecords() + '<br> Summe Crp: ' + StatisticData.sumCrp() + '<br>Crp bis Ziel: ' + StatisticData.remainCrp() + '<br>Durchschnitt: ' + StatisticData.avg() + ' %' + '<br>50% Leistungen: ' + StatisticData.countWeight()
            })
        };
        /**
         * DeleteMod löscht einen Eintrag und aktualisiert die Liste
         * @param id die gelöscht werden soll
         */
        this.deleteMod = function (id) {
            var confirm = $ionicPopup.confirm({
                title: 'Eintrag löschen',
                template: 'Wollen sie den Eintrag wirklich löschen?',
                cancelText: 'Abbrechen'
            });
            confirm.then(function (res) {
                if (res) {
                    RecordData.delete(id);
                    thisSt.records = RecordData.findAll();
                }
            });
        };
    });