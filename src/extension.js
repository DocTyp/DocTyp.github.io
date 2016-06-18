(function(exports) {
  /*============================================================
  ===========================Variable===========================
  ============================================================*/
  
  /*============================================================
  ============================Private===========================
  ============================================================*/
  function Output(doc) {
    for (var pattern in patterns) {
      doc = doc.replace(pattern.regex, function(match) {
        match = match.replace(pattern.remove, '');
        return '<span class="doctype-' + pattern.type + '">' + match + '</span>';
      });
    }
    return doc;
  }
  
  /*============================================================
  ============================Public============================
  ============================================================*/
  exports.Header = function(doc) {
    return doc;
  };
  exports.Style = function(doc) {
    return doc;
  };
  exports.Rule = function(doc) {
    return doc;
  };
  exports.Block = function(doc) {
    return doc;
  };
  exports.List = function(doc) {
    return doc;
  };
  exports.Link = function(doc) {
    return doc;
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})(DocTyp || {});
