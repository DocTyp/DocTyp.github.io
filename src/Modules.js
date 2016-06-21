var Modules = (function(exports) {
  /*============================================================
  =============================Query============================
  ============================================================*/
  exports.SingleQuery = function(element) {
    //Fetch element text
    var doc = element.innerHTML;
    //Processing
    doc = exports.Header(doc);
    doc = exports.Style(doc);
    doc = exports.Rule(doc);
    doc = exports.Quote(doc);
    doc = exports.Code(doc);
    doc = exports.List(doc);
    doc = exports.Link(doc);
    doc = exports.Image(doc);
    doc = exports.Table(doc);
    doc = exports.Clean(doc);
    //Complete Process
    Complete(element, doc);
  };
  exports.MultipleQuery = function(elements) {
    //Check if any elements were found
    if (elements.length > 0) {
      for (var a = 0; a < elements.length; a++) {
        var element = elements[a];
        //Fetch element text
        var doc = element.innerHTML;
        //Processing
        doc = exports.Header(doc);
        doc = exports.Style(doc);
        doc = exports.Rule(doc);
        doc = exports.Quote(doc);
        doc = exports.Code(doc);
        doc = exports.List(doc);
        doc = exports.Link(doc);
        doc = exports.Image(doc);
        doc = exports.Table(doc);
        doc = exports.Clean(doc);
        //Complete Process
        Complete(element, doc);
      }
    } else {
      throw('The elements are not defined or are not DOM elements.');
    }
  };
  /*============================================================
  ==========================Processing==========================
  ============================================================*/
  exports.Header = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  exports.Text = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  exports.Escape = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  exports.Escape = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  exports.Escape = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})({});
