var promise_query = require('../utils/promise_connection');


module.exports = (params) => {

  return new Promise((resolve, reject) => {
    let query = "";
    let param = "";
    if (params.farmer_id) {
      query = "select ID,farm_name from FarmProfile where FarmerID = ?";
      param = [params.farmer_id];
    } else {
       query = "select * from FarmProfile where FarmerID = ?";
       param = [params.farm_id];
    }

    promise_query(query,param)
      .then(results => {
        return resolve(results);
      })
      .catch(error => {
          console.log(error);
          return reject({ message: error.message });
      });
    });
};
