/**
 * Record Form Controller um leistungen anzulegen oder zu editieren.
 * Created by flo on 28.10.14.
 */
'use strict';
angular.module('recordsApp').controller('RecordFormCtrl',
    function ($stateParams, $ionicNavBarDelegate, RecordData, $ionicPopup, $state, $scope, $ionicModal, ModuleData) {
        var isEditMode = false;
        if ($stateParams.id == 'new') {
            //create
            $ionicNavBarDelegate.setTitle('Leistung anlegen');
            this.record = {};
        } else {
            // edit
            isEditMode = true;
            $ionicNavBarDelegate.setTitle('Leistung editieren');
            this.record = RecordData.findById($stateParams.id);
        }
        // create years
        var years = [];
        for (var i = 2014; i > 1999; i--) {
            years.push(i);
        }
        this.years = years;
        /**
         * Überprüft ob alle Angaben korrekt sind und gibt notfalls einen Fehler mithilfe eines Popup aus
         */
        this.save = function () {
            var error = '';
            // simple validation
            if (!this.record.name || this.record.name.length == 0) {
                error = error + "<b>Name</b> darf nicht leer sein!</br>";
            }
            if (!this.record.modulnr || this.record.modulnr.length == 0) {
                error = error + "Kein <b>Modul</b> ausgewält!</br>";
            }
            if (!this.record.year || this.record.year.length == 0) {
                error = error + "Kein <b>Jahr</b> ausgewählt!</br>";
            }
            if (!this.record.crp || this.record.crp.length == 0) {
                error = error + "Keine <b>CreditPoints</b> eingetragen!</br>";
            }
            if (!this.record.mark || this.record.mark.length == 0) {
                error = error + "Bitte tragen sie ihre <b>Prozentzahl</b> ein!</br>";
            }
            //shows the error popup
            if (error.length > 0) {
                $ionicPopup.alert({
                    title: 'Fehler',
                    template: error
                });
            }
            else {
                if (isEditMode) {
                    //update record
                    RecordData.update(this.record);
                } else {
                    //save record
                    RecordData.persist(this.record);
                }
                $ionicNavBarDelegate.back();
            }
        },
        /**
         * DeleteForm löscht einen Eintrag und verursacht einen state-wechsel zur RecordList
         */
            this.deleteForm = function (id) {
                var confirm = $ionicPopup.confirm({
                    title: 'Eintrag löschen',
                    template: 'Wollen sie den Eintrag wirklich löschen?',
                    cancelText: 'Abbrechen'
                });
                confirm.then(function (res) {
                    if (res) {
                        RecordData.delete(id);
                        $state.go('records');
                    }
                });
            }
        $ionicModal.fromTemplateUrl('templates/ModuleSearchModal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal){
            $scope.modal = modal;
        });

        this.openModal = function () {
            $scope.modules = ModuleData.load();
            $scope.modal.show();
        };

        var thisCtrl = this;
        $scope.moduleSelected = function (module) {
            // this == child scope modal
            thisCtrl.record.name = module.name;
            thisCtrl.record.crp = module.crp;
            thisCtrl.record.modulnr = module.modulnr;
            $scope.modal.hide();
        };
    });