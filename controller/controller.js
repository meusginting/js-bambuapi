'use strict';

var response = require('../res');
var connection = require('../dbconnection/conn');

exports.investors = function(req, res) {
    connection.query('SELECT name,age,latitude,longtitude,monthlyincome,experienced FROM investor limit 10', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Connect to Investor Database", res)
};

exports.findInvestorsbyage = function(req, res) {
    
    var inv_age = req.params.inv_age;
    var sql = "SELECT name,age,latitude,longtitude,monthlyincome,experienced, @curRank := @curRank + 0.01 AS score FROM investor, (SELECT @curRank := 0.1) r WHERE age = ? order by score desc limit 10";
    connection.query(sql,[inv_age], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findInvestors = function(req, res, next) {
    
    var inv_age = req.params.inv_age;
	var inv_latitude = req.params.inv_latitude;
	var inv_longtitude = req.params.inv_longtitude;
	var inv_monthlyincome = req.params.inv_monthlyincome;
	var inv_experienced = req.params.inv_experienced;	
    var sql = "SELECT name,age,latitude,longtitude,monthlyincome,experienced, @curRank := @curRank + 0.01 AS score FROM investor, (SELECT @curRank := 0.1) r WHERE age = ? AND latitude >= ? AND longtitude <=? AND monthlyincome >= ? AND experienced = ? order by score desc limit 10";
    connection.query(sql,[inv_age, inv_latitude, inv_longtitude, inv_monthlyincome, inv_experienced], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

