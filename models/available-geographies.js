exports.get = function (query, cb) {
  var data = [];
  var meta = {};

  if (!query.country_code) {
    // set to global
    query.country_code = "GLOBAL";
  }

  if (query.goal && query.target_id) {
    var country = DASHBOARDS.filter(function (d) {
      return query.country_code === d.country_code;
    });
    
    if (country && country[0]) {
      country = country[0];
      meta.country_name = country.country_name;
      meta.goal = query.goal;

      if (country.dashboards[query.goal]) {
        if (country.dashboards[query.goal][query.target_id]) {
          data = country.dashboards[query.goal][query.target_id].levels;
        }
      }
    }
  } 
  var json = {
    data: data,
    meta: meta,
    errors: {}
  };

  cb(null, json);
}