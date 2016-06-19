/*
  Convert the contents of an HTML DOM element into a
  styled text document for an easier reading
  experience or to bring out certain features in the
  document. You can create your own README document.
  
  if (redistribute == true) {
    return credit;
  }
  
  --------------------------------------------------
  
  @DocTyp
  @author: Alexander Hovy
  @param: 
    exports - Contains all the public variables and functions of the module.
    doc - The elements text that will be Docified.
  @credit: 
    Prism, Highlight, SHJS, Rainbow
*/
(function(exports) {
  /*============================================================
  ===========================Variables==========================
  ============================================================*/
  var prefix = 'doctyp-';
  var header = {
    'header1': {pattern: /\#/gm, regex: /^\#{1}(?!\#)(.*?)$/gm},
    'header2': {pattern: /\#/gm, regex: /^\#{2}(?!\#)(.*?)$/gm},
    'header3': {pattern: /\#/gm, regex: /^\#{3}(?!\#)(.*?)$/gm},
    'header4': {pattern: /\#/gm, regex: /^\#{4,}(.*?)$/gm}
  };
  var style = {
    'bold': {pattern: /\*/gm, regex: /\*{1,}(.*?)\*{1,}/gm},
    'italic': {pattern: /\//gm, regex: /\/{1,}(.*?)\/{1,}/gm},
    'underline': {pattern: /\_/gm, regex: /\_{1,}(.*?)\_{1,}/gm},
    'strike': {pattern: /\~/gm, regex: /\~{1,}(.*?)\~{1,}/gm},
    'highlight': {pattern: /\=/gm, regex: /\={1,}(.*?)\={1,}/gm}
  };
  var rule = {
    'rule-solid': {pattern: /\-/gm, regex: /\-{4,}/gm},
    'rule-dash': {pattern: /\./gm, regex: /\.{4,}/gm}
  };
  var block = {
    'code': {pattern: /\|/gm, regex: /\|{1,}(.*?)\|{1,}/gm},
    'pre-external': {pattern: /(\`|\[(.*?)\])/gm, regex: /(\[(.*?)\|(.*?)\])\`{1,}([\s\S]*?)\`{1,}/gm},
    'pre': {pattern: /\`/gm, regex: /\`{1,}([\s\S]*?)\`{1,}/gm},
    'quote': {pattern: /[\{\}]/gm, regex: /\{{1,}([\s\S]*?)\}{1,}/gm}
  };
  var list = {
    //'unordered': {pattern: /\-/gm, regex: /((.*?)\-(?!(.*?)\-).+$\n){1,}/gm},
    //'ordered': {pattern: /\d{1,}\./gm, regex: /((.*?)\d{1,}\..+$\n){1,}/gm}
  };
  var link = {
    'header1': {pattern: /\#/gm, regex: /^\#{1}(?!\#)(.*?)$/gm},
    'header2': {pattern: /\#/gm, regex: /^\#{2}(?!\#)(.*?)$/gm},
    'header3': {pattern: /\#/gm, regex: /^\#{3}(?!\#)(.*?)$/gm},
    'header4': {pattern: /\#/gm, regex: /^\#{4,}(.*?)$/gm}
  };
  
  /*============================================================
  ============================Header============================
  ============================================================*/
  exports.Header = function(doc) {
    for (key in header) {
      doc = doc.replace(header[key].regex, function(match) {
        var temp = exports.Prepare(match).replace(header[key].pattern, '');
        return '<span class="' + prefix + key + '">' + temp + '</span>';
      });
    }
    return doc;
  };
  
  /*============================================================
  ============================Style=============================
  ============================================================*/
  exports.Style = function(doc) {
    for (key in style) {
      doc = doc.replace(style[key].regex, function(match) {
        var temp = exports.Prepare(match).replace(style[key].pattern, '');
        return '<span class="' + prefix + key + '">' + temp + '</span>';
      });
    }
    return doc;
  };
  
  /*============================================================
  =============================Rule=============================
  ============================================================*/
  exports.Rule = function(doc) {
    for (key in rule) {
      doc = doc.replace(rule[key].regex, function(match) {
        return '<hr class="' + prefix + key + '"/>';
      });
    }
    return doc;
  };
  
  /*============================================================
  ============================Block=============================
  ============================================================*/
  exports.Block = function(doc) {
    for (key in block) {
      doc = doc.replace(block[key].regex, function(match) {
        var temp;
        if (key != 'pre-external') {
          temp = exports.Prepare(match).replace(block[key].pattern, '');
        }
        if (key == 'code') {
          return '<code class="' + prefix + key + ' nohighlight language-none">' + exports.Trim(temp) + '</code>';
        } else if (key == 'pre-external') {
          var extra = exports.Prepare(match).replace(/(\[|\]|\`([\s\S]*?)\`)/gm, ''),
            language = extra.split('|')[0].toLowerCase(),
            url = 'Syntax/' + extra.split('|')[1].toLowerCase();
          temp = exports.Prepare(match).replace(block[key].pattern, '');
          exports.LoadScript(url + '/script.js');
          exports.LoadStyle(url + '/' + exports.theme + '.css');
          var classes = 'language-' + language + ' sh_' + language + ' prettyprint lang-' + language;
          var dataClasses = 'data-language="' + language + '"';
          return '<pre class="' + prefix + key + ' ' + classes + '" ' + dataClasses + '><code class="' + classes + '" ' + dataClasses + '>' + exports.Trim(temp) + '</code></pre>';
        } else if (key == 'pre') {
          return '<pre class="' + prefix + key + '"><code class="nohighlight language-none">' + exports.Trim(temp) + '</code></pre>';
        } else {
          return '<span class="' + prefix + key + '">' + exports.Trim(temp) + '</span>';
        }
      });
    }
    return doc;
  };
  
  /*============================================================
  =============================List=============================
  ============================================================*/
  exports.List = function(doc) {
    for (key in style) {
      doc = doc.replace(style[key].regex, function(match) {
        var tag = key == 'unordered' ? 'ul' : 'ol';
        return '<' + tag + ' class="' + prefix + key + '"' + match.replace(/.+/gm, function(line) {
          var temp = exports.Prepare(line).replace(style[key].pattern, '');
          return '<li>' + exports.Trim(temp) + '</li>';
        }) + '</' + tag + '>';
      });
    }
    return doc;
  };
  
  /*============================================================
  =============================Link=============================
  ============================================================*/
  exports.Link = function(doc) {
    return doc;
  };
  
  /*============================================================
  ===========================Cleaning===========================
  ============================================================*/
  exports.Prepare = function(doc) {
    return doc.replace(/\<(\/)?span(.*?)\>/gm, '');
  };
  exports.Trim = function(doc) {
    return doc.replace(/(^\s+|\s+$)/gm, '');
  };
  exports.Clean = function(doc) {
    return doc.replace(/\n/gm, '<br/>');
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})(DocTyp || {});
