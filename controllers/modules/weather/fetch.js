const axios = require("axios");

module.exports = (params) => {

  // THIS IS MY DEV KEY..SIGN UP AT https://developer.here.com/c/geocoding FOR A FREE KEY.
    const key = "EBzCnZjybo4F5km0TXNJbCJY_4JyYYIS1OiqFWFFZrU";
    
    let url = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apikey=${key}&searchtext=${params.search}`;

    console.log("geocoder url: ", url);

    return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then(res => {
            const data = res.data.Response.View[0].Result[0].Location.DisplayPosition;
            return resolve(data);
          })
          .catch(error => reject({ message: error.message }));
    });
}


