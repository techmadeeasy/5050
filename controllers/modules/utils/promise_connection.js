require('dotenv').config({ path: require('app-root-path') + '/.env' });
const pool  = require('mysql').createPool({
  connectionLimit : 10,
  host            : 'localhost',
  port            : 3306,
  user            : 'root',
  password        : 'vckVCK1995',
  database        : '5050_farmers_db'
});
module.exports = (sql, args) => {

    return new Promise((resolve, reject) => {
        pool.query(sql, args,
            (error, results) => {
                if(error) return reject(error);

                if(results) return resolve(results);

                return reject({message: 'no results'});
            }
        );
    });

};
