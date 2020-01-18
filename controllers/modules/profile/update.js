var promise_query = require('../utils/promise_connection');
var data_point_factory = require('../utils/data_point_factory');

module.exports = (params) => {
    return new Promise((resolve, reject) => {
        console.log('updating...');
        console.log(params);
        var changelog = {};
        promise_query('select ID, ' + data_point_factory.query_select(params.data_point) + ' from FarmProfile where ID = ?', [params.profile_id])
        .then(results => {
            changelog['old_state'] = JSON.stringify(results[0]);
            changelog['FarmProfileID'] = parseInt(params.profile_id);
            var result_arr = Object.keys(params.data).map((key) => params.data[key]);
            result_arr.push(params.profile_id);
            return promise_query('update FarmProfile set'+ data_point_factory.query_update(params.data_point) +' where ID = ?',result_arr);
        })
        .then(result => {
            changelog['new_state'] = JSON.stringify(params.data);
            changelog['data_point'] = params.data_point;
            changelog['date'] = params.date;
            return promise_query('insert into ChangeLog set ?', changelog);
        })
        .then(result => resolve())
        .catch(error => reject({message:error.message}));


    });
};
