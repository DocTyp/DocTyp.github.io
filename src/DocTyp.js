var DocTyp = (function(exports) {
  var patterns = {
    { type: 'header1',
      remove: /[\#]/igm,
      regex: /[\#]{1}.+/igm },
    { type: 'header2',
      remove: /[\#]/igm,
      regex: /[\#]{2}.+/igm },
    { type: 'header3',
      remove: /[\#]/igm,
      regex: /[\#]{3}.+/igm },
    { type: 'header4',
      remove: /[\#]/igm,
      regex: /[\#]{4}.+/igm },
    { type: 'bold',
      remove: /[\*]/igm,
      regex: /[\*]{2}(.*?)[\*]{2}/igm },
    { type: 'italic',
      remove: /[\*]/igm,
      regex: /[\*]{1}(.*?)[\*]{1}(?![\*])/igm },
    { type: 'rule-solid',
      remove: /[\-]/igm,
      regex: /[\-]{4,}.+/igm },
    { type: 'rule-dash',
      remove: /[\_]/igm,
      regex: /[\_]{4,}.+/igm }
  };
  function Output(doc) {
    for (var pattern in patterns) {
      doc = doc.replace(pattern.regex, function(match) {
        match = match.replace(pattern.remove, '');
        return '<span class="doctype-' + pattern.type + '">' + match + '</span>';
      });
    }
    return doc;
  }
  exports.Style = function(element) {
    if (element.nodeType && element.nodeType == 1) {
      var doc = element.innerText ? element.innerText : element.textContent,
        output = Output(doc),
        newDoc = output.replace(/\n/gm, '<br/>');

      if (element.innerText) {
        element.innerText = newDoc;
      } else {
        element.textContent = newDoc;
      }
    } else {
      throw('The element is not defined or is not a DOM element.');
    }
  };
  return exports;
})({});
