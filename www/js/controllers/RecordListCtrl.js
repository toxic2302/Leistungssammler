/**
 * Record List Controller zum anlegen und anzeigen von records
 * Created by flo on 21.10.14.
 */
'use strict';
angular.module('recordsApp').controller('RecordListCtrl',
    function ($state, RecordData, StatisticData, $ionicPopup, $ionicPopover, $scope) {

        this.records = RecordData.findAll();
        var thisSt = this;
        //Für Zustandswechsel anmelden
        $scope.$on('$stateChangeStart',
            function (event) {
                if (thisSt.searchActive == true) {
                    var saveSearchQuery = localStorage.setItem('saveQuery', JSON.stringify(thisSt.searchQuery));
                }
            });
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
                    //console.log(id);
                    thisSt.records = RecordData.findAll();
                }
            });
        };
        this.searchActive = false;
        if (localStorage.getItem('saveQuery')) {
            this.searchActive = true;
            this.searchQuery = JSON.parse(localStorage.getItem('saveQuery'));
            localStorage.removeItem('saveQuery');
        }
        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        };

        $ionicPopover.fromTemplateUrl('popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });
        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        this.mailFunc = function () {
            var records = RecordData.findAll();
            var recordStr = '';

            if (window.cordova && cordova.plugins.email) {

                for (var i = 0; i < records.length; i++) {
                    recordStr += records[i].name + ' ' + records[i].mark + '%<br />';
                }

                cordova.plugins.email.open({
                    to: 'toxic@gmx.de',
                    subject: 'Meine Studienleistungen',
                    body: '<b>Meine Studienleistungen:</b><br />' + '<br><b>Statistiken:</b>' + '<br>Leistungen: ' + StatisticData.countRecords() + '<br>Summe Crp: ' + StatisticData.sumCrp() + '<br>Crp bis Ziel: ' + StatisticData.remainCrp() + '<br>Durchschnitt: ' + StatisticData.avg() + ' %' + '<br>50% Leistungen: ' + StatisticData.countWeight() + '<b>Leistungen:</b><br />' + recordStr
                });
            } else {
                $ionicPopup.alert({
                    title: 'Info',
                    template: 'Keine Email-Unterstützung!',
                    buttons: [{
                        text: 'Schließen',
                        type: 'button-positive'
                    }]
                });
            }
        }
    });