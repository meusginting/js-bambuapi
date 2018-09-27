'use strict';

module.exports = function(app) {
    var investorList = require('../controller/controller');

    app.route('/')
        .get(investorList.index);

    app.route('/investors')
        .get(investorList.investors);
	 
	app.route('/people-like-you/age=:inv_age&latitude=:inv_latitude&longtitude=:inv_longtitude&monthlyincome=:inv_monthlyincome&experienced=:inv_experienced')
        .get(investorList.findInvestors);
    
};