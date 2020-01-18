var promise_query = require('../utils/promise_connection');


module.exports = (params) => {
    console.log(params );
    return new Promise((resolve, reject) => {
        var payload = {};
        promise_query('select email_address, phone_number, fullname from Farmer where ID = ?', [params.farmer_id])
        .then(result =>  {
            payload['profile'] = result[0];
            return promise_query('select * from FarmProfile where ID = ?', [params.farm_id]);
        })
        .then(farm_profile => {
            if(farm_profile.length > 0){
                payload['farm_profile'] = farm_profile[0];
            }else{
                payload['farm_profile'] = {};
            }
            payload['title'] = payload.profile.fullname;
            payload['message'] = '';
            console.log(payload);
            return resolve(payload);
        })
        .catch(error => reject(error));

    });
};
