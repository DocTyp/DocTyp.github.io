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
    'header4': {pattern: /\#{4,}/gm, regex: /\#{4,}.+/gm},
    'header3': {pattern: /\#{3}/gm, regex: /\#{3}.+/gm},
    'header2': {pattern: /\#{2}/gm, regex: /\#{2}.+/gm},
    'header1': {pattern: /\#{1}/gm, regex: /\#{1}.+/gm}
  };
  var style = {
    'bold': {pattern: /\*{2}/gm, regex: /\*{2}(.*?)\*{2}/gm},
    'italic': {pattern: /\*{1}/gm, regex: /\*{1}(.*?)\*{1}/gm},
    'underline': {pattern: /\_{1,}/gm, regex: /\_{1,}(.*?)\_{1,}/gm},
    'strike': {pattern: /\~{1,}/gm, regex: /\~{1,}(.*?)\~{1,}/gm},
    'highlight': {pattern: /\={1,}/gm, regex: /\={1,}(?!\")(.*?)\={1,}/gm},
    'superscript': {pattern: /\^{2}/gm, regex: /\^{2}(.*?)\^{2}/gm},
    'subscript': {pattern: /\^{1}/gm, regex: /\^{1}(.*?)\^{1}/gm}
  };
  var rule = {
    'rule-solid': {pattern: /[]/gm, regex: /\-{4,}/gm},
    'rule-dash': {pattern: /[]/gm, regex: /\.{4,}/gm}
  };
  var block = {
    'pre-extra': {pattern: /[]/gm, regex: /\[(.*?)\|(.*?)\]\`{3,}([\s\S]*?)\`{3,}/gm},
    'quote-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\`{2}([\s\S]*?)\`{2}/gm},
    'pre': {pattern: /\`{3,}/gm, regex: /\`{3,}([\s\S]*?)\`{3,}/gm},
    'quote': {pattern: /\`{2}/gm, regex: /\`{2}([\s\S]*?)\`{2}/gm},
    'code': {pattern: /\`{1}/gm, regex: /\`{1}(.*?)\`{1}/gm}
  };
  var list = {
    'unordered': {pattern: /\-{1}/gm, regex: /(^\-{1}(?!\-{3,}).+\n){1,}/gm},
    'ordered': {pattern: /\d{1,}\./gm, regex: /(^\d{1,}\..+\n){1,}/gm},
    'checklist': {pattern: /[]/gm, regex: /(^\[[Xx]?\].+\n){1,}/gm}
  };
  var link = {
    'url-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\((.*?)(https?|ftp|file)\:\/{2}(.*?)\)/gm},
    'url': {pattern: /[]/gm, regex: /\b((https?|ftp|file)\:\/{2}([\w\d\.]+)([\/\?\&\w\d\=\,\.\+\:\;\@\$\%\#\!\_\-]+)?)\b/gm},
    'email': {pattern: /[]/gm, regex: /\b(([\w\d\.\_\%\+\-]+)\@([\w\d\.\-]+)(\.\w{2,}))\b/gm}
  };
  
  /*============================================================
  ============================Header============================
  ============================================================*/
  exports.Header = function(doc) {
    for (key in header) {
      doc = doc.replace(header[key].regex, function(match) {
        var temp = exports.Prepare(match).replace(header[key].pattern, '');
        return '<span class="' + prefix + key + '">' + exports.Trim(temp) + '</span>';
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
        return '<span class="' + prefix + key + '">' + exports.Trim(temp) + '</span>';
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
        return '<hr class="' + prefix + key + '">';
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
        if (key == 'pre-extra') {
          var extra = exports.Prepare(match).split(']```'),
            first = extra[0].split('[')[1].split('|'),
            second = extra[1].split('```')[0],
            language = exports.Trim(first[0]).toLowerCase(),
            service = exports.Trim(first[1]).toLowerCase(),
            classes = 'language-' + language + ' sh_' + language + ' prettyprint lang-' + language,
            dataClasses = 'data-language="' + language + '"';
          exports.LoadScript('Syntax/' + service + '/script.js');
          exports.LoadStyle('Syntax/' + service + '/' + exports.theme + '.css');
          return '<pre class="' + prefix + key + ' ' + classes + '" ' + dataClasses + '><code class="' + classes + '" ' + dataClasses + '>' + exports.Trim(second) + '</code></pre>';
        } else if (key == 'quote-extra') {
          var extra = exports.Prepare(match).split(']``'),
            credit = extra[0].split('[')[1],
            quote = extra[1].split('``')[0];
          return '<span class="' + prefix + key + '"><span class="' + prefix + 'quote">' + exports.Trim(quote) + '</span><span class="' + prefix + 'credit">' + exports.Trim(credit) + '</span></span>';
        } else {
          var temp = exports.Prepare(match).replace(block[key].pattern, ''),
            classes = 'nohighlight language-none';
          if (key == 'pre') {
            return '<pre class="' + prefix + key + ' ' + classes + '"><code class="' + classes + '">' + exports.Trim(temp) + '</code></pre>';
          } else if (key == 'quote') {
            return '<span class="' + prefix + key + '">' + exports.Trim(temp) + '</span>';
          } else {
            return '<code class="' + prefix + key + ' ' + classes + '">' + exports.Trim(temp) + '</code>';
          }
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
        if (key == 'unordered' || key == 'ordered') {
          var tag = key == 'unordered' ? 'ul' : 'ol';
          return '<' + tag + ' class="' + prefix + key + '">' + match.replace(/.+/gm, function(line) {
            var temp = exports.Prepare(line).replace(style[key].pattern, '');
            return '<li>' + exports.Trim(temp) + '</li>';
          }) + '</' + tag + '>';
        } else {
          return '<span class="' + prefix + key + '">' + match.replace(/.+/gm, function(line) {
            var temp = exports.Prepare(line).replace(/\[\]/gm, ''),
              tag = (new RegExp('\[\]', 'gm')).test(line) ? 'unchecked' : 'checked' ;
            return '<span class="' + prefix + tag + '"><span class="' + prefix + 'box"></span><span class="' + prefix + 'item">' + exports.Trim(temp) + '</span></span>';
          }) + '</span>';
        }
      });
    }
    return doc;
  };
  
  /*============================================================
  =============================Link=============================
  ============================================================*/
  exports.Link = function(doc) {
    for (key in link) {
      doc = doc.replace(link[key].regex, function(match) {
        if (key == 'url-extra') {
          var extra = exports.Prepare(match).split(']('),
            title = extra[0].split('[')[1],
            url = extra[1].split(']')[0];
          return '<a class="' + prefix + key + '" href="' + exports.Trim(url) + '" target="_blank">' + exports.Trim(title) + '</a>';
        } else {
          return '<a class="' + prefix + key + '" href="' + exports.Trim(match) + '" target="_blank">' + exports.Trim(match) + '</a>';
        }
      });
    }
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
    return doc.replace(/\n/gm, '<br>');
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})(DocTyp || {});
