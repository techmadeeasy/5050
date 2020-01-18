module.exports.query_select = (data_point) => {

    switch (data_point) {
        case '1':
        return ' ID, farm_name, size, personnel ';

        case '2':
        return ' ID, lat, lng ';

        case '3':
        return ' ID, district ';

        case '4':
        return ' ID, rain, has_consistent_source, has_irrigation_system ';

        case '5':
        return ' ID, electricity_source ';

        case '5-1':
        return ' ID, other_resources ';

        case '6':
        return ' ID, land_status ';

        case '7':
        return ' ID, current_crops, land_status, size ';

        case '7-1':
        return ' ID, historic_crops ';

        case '8':
        return ' ID, is_registered, has_insurance, has_business_plan, sells_to_produce ';

        case '8-1':
        return ' ID, works_fulltime, has_formal_training, years_experience ';

        case '9':
        return ' ID, has_ceda_support, has_ydf_support, has_ispaad_support,  has_lea_support ';

        case '10':
        return " ID, farm_owner ";
        default:

        return ' * ';

    }

};

module.exports.query_update = (data_point) => {

    switch (data_point) {
        case '1':
        return ' farm_name=?, size=?, personnel=? ';

        case '2':
        return ' lat=?, lng=? ';

        case '3':
        return ' district=? ';

        case '4':
        return ' rain=?, has_consistent_source=?, has_irrigation_system=? ';

        case '5':
        return ' electricity_source=? ';

        case '5-1':
        return ' other_resources=? ';

        case '6':
        return ' land_status=? ';

        case '7':
        return ' current_crops=? ';

        case '7-1':
        return ' historic_crops=? ';

        case '8':
        return ' is_registered=?, has_insurance=?, has_business_plan=?, sells_to_produce=? ';

        case '8-1':
        return ' works_fulltime=?, has_formal_training=?, years_experience=? ';

        case '9':
        return ' has_ceda_support=?, has_ydf_support=?, has_ispaad_support=?,  has_lea_support=?';

        case '10':
        return " farm_owner=? ";
        default:
        return '  ';

    }

};

module.exports.parse_body = (data_point, body) => {
    switch (data_point) {
        case '1':
        return {farm_name: body.farm_name, size: body.size, personnel: body.personnel};

        case '2':
        return {lat: body.lat, lng: body.lng};

        case '3':
        return {district: body.district};

        case '4':
        return  {rain :body.rain,
            has_consistent_source: body.has_consistent_source,
            has_irrigation_system: body.has_irrigation_system};

        case '5':
        return {
            electricity_source : Array.isArray(body.electricity_source) ?  JSON.stringify(body.electricity_source) : JSON.stringify([body.electricity_source])
        };

        case '5-1':
        return {other_resources:Array.isArray(body.other_resources) ?  JSON.stringify(body.other_resources) : JSON.stringify([body.other_resources])};

        case '6':
        return {land_status:Array.isArray(body.land_status) ?  JSON.stringify(body.land_status) : JSON.stringify([body.land_status])};

        case '7':
        return {current_crops:body.current_crops};

        case '7-1':
        return {historic_crops:body.historic_crops};

        case '8':
        return  {is_registered:body.is_registered, has_insurance:body.has_insurance, has_business_plan:body.has_business_plan, sells_to_produce:body.sells_to_produce} ;

        case '8-1':
        return {works_fulltime:body.works_fulltime, has_formal_training:body.has_formal_training, years_experience:body.years_experience};

        case '9':
        return {has_ceda_support:body.has_ceda_support, has_ydf_support:body.has_ydf_support,
            has_ispaad_support:body.has_ispaad_support,  has_lea_support:body.has_lea_support};

        case '10':
        return {farm_owner: body.farm_owner};

        default:
        return '  ';

    }
};

module.exports.next_url = (current) => {

        switch (current) {
            case '1':

            return '2';
            case '2':

            return '3';
            case '3':

            return '4';

            case '4':
            return '5';

            case '5':
            return '5-1';

            case '5-1':
            return '6';

            case '6':
            return '7';

            case '7':
            return '7-1';

            case '7-1':
            return '8';

            case '8':
            return '8-1';

            case '8-1':
            return '9';

            case '9':
            return '10';

            default:
            return 'last';

        }
};
