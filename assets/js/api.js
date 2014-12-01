var API = (function() {
  var post = function(url, data, cb) {
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(data) || {},
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      success: function(res){
        cb(null, res);
      },
      error: function(jqXHR, textStatus, errorThrown ){
        cb({msg: errorThrown});
      }
    });
  };

  var urls = {
    'createChallenge': '/challenge/create',
    'getChallenge': '/challenge/search'
  }

  return {
    consume: function(name, data, cb) {
      post(urls[name], data, cb);
    }
  }
})();