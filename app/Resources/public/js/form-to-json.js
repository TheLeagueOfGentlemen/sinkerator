var serializer = function(form) {
  var pieces = form.serializeArray(),
      s = {};

  for (i = 0; i < pieces.length; i++) {
    s[pieces[i].name] = pieces[i].value;
  }

  return s;
};

module.exports = serializer;
