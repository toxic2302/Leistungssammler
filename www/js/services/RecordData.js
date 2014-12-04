/**
 * RecordData saves, update, delete and find a record. Based on the cloudstorage from Firebase
 * Created by flo on 03.11.14.
 */
'use strict';
angular.module('recordsApp').factory('RecordData', function ($firebase, FIREBASE_URL) {

    var rootRef = new Firebase(FIREBASE_URL);
    var recordsRef = rootRef.child('records');
    //var rootObj = $firebase(new Firebase(FIREBASE_URL)).$asObject();

    //Angularfire Wrapper
    var recordsRefAngular = $firebase(recordsRef);

    var service = {
        findAll: function () {
            return recordsRefAngular.$asArray();
        },
        findById: function (id) {
            return this.findAll().$getRecord(id);
        },
        delete: function (id) {
            var item = this.findById(id);
            this.findAll().$remove(item);
        },
        persist: function (record) {
            this.findAll().$add(record);
        },
        update: function (record) {
            this.findAll().$save(record);
        }
    };
    return service;
});

/* var service = {
 */
/**
 * get all records from the localStorage
 * @returns {*} an array of records
 */
/*
 findAll: function () {
 var records = localStorage.getItem('records');
 if (!records) {
 var records = [];
 localStorage.setItem('records', JSON.stringify(records));
 localStorage.setItem('nextRecordId', records.length + 1);
 }
 else {
 records = JSON.parse(records);
 }
 return records;
 },
 */
/**
 * get a record by his Id
 * @param id to search for
 * @returns {*} a record or null
 */
/*
 findById: function (id) {
 var records = this.findAll();

 for (var i = 0; i < records.length; i++) {
 if (records[i].id == id) {
 return records[i];
 }
 }
 return null;
 },
 */
/**
 * delete a record from the localStorage
 * @param id which want to delete
 */
/*
 delete: function (id) {
 var records = this.findAll();
 records.splice(id-1,1);

 for (var i = id-1; i<records.length; i++){
 records[i].id = parseInt(records[i].id)-1;
 }
 localStorage.setItem('records', JSON.stringify(records));
 localStorage.setItem('nextRecordId', records.length + 1);

 */
/*for (var i = 0; i < records.length; i++){

 if (records[i].id == id){
 records.splice(i, 1);
 }
 }*/
/*
 },
 */
/**
 * save a record to the localStorage
 * @param record to save in the localStorage
 */
/*
 persist: function (record) {
 var records = this.findAll();
 record.id = localStorage.getItem('nextRecordId')
 records.push(record);
 localStorage.setItem('records', JSON.stringify(records));
 localStorage.setItem('nextRecordId', records.length + 1);
 },
 */
/**
 * update a record to the localStorage
 * @param record to update
 */
/*
 update: function (record) {
 var records = this.findAll();
 //record zu der richtigen ID updaten
 for (var i = 0; i < records.length; i++){
 if (records[i].id == record.id){
 records[i] = record;
 }
 }
 localStorage.setItem('records', JSON.stringify(records));
 }
 };*/