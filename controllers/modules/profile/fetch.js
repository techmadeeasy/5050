var promise_query = require('../utils/promise_connection');
var data_point_factory = require('../utils/data_point_factory');

module.exports = (params) => {
    return new Promise((resolve, reject) => {
        console.log('fetching...');
        console.log(params);
        if (params.profile_id === 0) {
            promise_query('insert into FarmProfile(FarmerID)values(?)', [params.farmer_id])
            .then(result => promise_query('select ID, ' + data_point_factory.query_select(params.data_point) + ' from FarmProfile where ID = ?', [result.insertId]))
            .then(results => resolve({data:results[0]}))
            .catch(error => reject({message: error.message}));
        }else{
            promise_query('select ' + data_point_factory.query_select(params.data_point) + ' from FarmProfile where ID = ?', [params.profile_id])
            .then(results => resolve({data:results[0]}))
            .catch(error => reject({message: error.message}));
        }



    });
};
