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
    elements - An array of Elements.
  @credit: 
    Prism, Highlight, SHJS, Rainbow, Prettify
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
    'header1': {pattern: /\#/gm, regex: /\#.+/gm}
  };
  var style = {
    'bold': {pattern: /\*{2}/gm, regex: /\*{2}(?!\*{2,})(.*?)\*{2}/gm},
    'italic': {pattern: /\*/gm, regex: /\*(?!\*{3,})(.*?)\*/gm},
    'underline': {pattern: /\_/gm, regex: /\_{2}(?!\_{2,})(.*?)\_{2}/gm},
    'strike': {pattern: /\~/gm, regex: /\~{2}(?!\~{2,})(.*?)\~{2}/gm},
    'highlight': {pattern: /\=/gm, regex: /\={2}(?!\={2,})(.*?)\={2}/gm},
    'superscript': {pattern: /\+/gm, regex: /\+{2}(?!\+{2,})(.*?)\+{2}/gm},
    'subscript': {pattern: /\-/gm, regex: /\-{2}(?!\-{2,})(.*?)\-{2}/gm}
  };
  var rule = {
    'rule-solid': {pattern: /[]/gm, regex: /\_{4,}/gm},
    'rule-dash': {pattern: /[]/gm, regex: /\-{4,}/gm},
    'rule-dotted': {pattern: /[]/gm, regex: /\.{4,}/gm},
    'rule-double': {pattern: /[]/gm, regex: /\={4,}/gm},
    'rule-thick': {pattern: /[]/gm, regex: /\+{4,}/gm}
  };
  var quote = {
    'quote-code': {pattern: /\`/gm, regex: /\`(.*?)\`/gm},
    'quote-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\{\[([\s\S]*?)\]\}/gm},
    'quote-plain': {pattern: /(\{\[([\s\n]{1,})?|([\s\n]{1,})?\]\})/gm, regex: /\{\[([\s\S]*?)\]\}/gm}
  };
  var code = {
    'code-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\{\(([\s\S]*?)\)\}/gm},
    'code-plain': {pattern: /(\{\(([\s\n]{1,})?|([\s\n]{1,})?\)\})/gm, regex: /\{\(([\s\S]*?)\)\}/gm}
  };
  var list = {
    'list-disc': {pattern: /(\-)/gm, regex: /(^\-(?!\-{3,}).+\n){1,}/gm},
    'list-circle': {pattern: /(\*)/gm, regex: /(^\*(?!\*{3,}).+\n){1,}/gm},
    'list-square': {pattern: /(\@)/gm, regex: /(^\@(?!\@{3,}).+\n){1,}/gm},
    'list-decimal': {pattern: /(\o\.)/gm, regex: /(^\o\..+\n){1,}/igm},
    'list-roman': {pattern: /(\i\.)/gm, regex: /(^\i\..+\n){1,}/igm},
    'list-alpha': {pattern: /(\a\.)/gm, regex: /(^\a\..+\n){1,}/igm},
    'checklist': {pattern: /\[[Xx\s]?\]/gm, regex: /(^\[[Xx\s]?\].+\n){1,}/gm}
  };
  var link = {
    'url': {pattern: /[]/gm, regex: /(\[(.*?)\]\((.*?)(https?|ftp|file)\:\/{2}(.*?)\)|\b((https?|ftp|file)\:\/{2}([\w\d\.]+)([\/\?\&\w\d\=\,\.\+\:\;\@\$\%\#\!\_\-]+)?)\b)/gm},
    'email': {pattern: /[]/gm, regex: /\b(([\w\d\.\_\%\+\-]+)\@([\w\d\.\-]+)(\.\w{2,}))\b/gm}
  };
  var image = {
    'image-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\!\((.*?)\)/gm},
    'image-plain': {pattern: /(\!\(|\))/gm, regex: /\!\((.*?)\)/gm},
    'image-grid': {pattern: /(\{\!([\s\n]{1,})?|([\s\n]{1,})?\!\})/gm, regex: /\{\!([\s\S]*?)\!\}/gm}
  };
  var table = {
    'table': {pattern: /\=/gm, regex: /\{\|([\s\S]*?)\|\}/gm}
  };
  
  /*============================================================
  ============================Private===========================
  ============================================================*/
  
  /*============================================================
  ============================Header============================
  ============================================================*/
  exports.Header = function(doc) {
    for (key in header) {
      doc = doc.replace(header[key].regex, function(match) {
        var temp = exports.Prepare(match).replace(header[key].pattern, '');
        if (key == 'header1') {
          return '<span class="' + prefix + key + '">' + exports.Trim(temp) + '</span><hr class="' + prefix + 'rule-header">';
        } else if (key == 'header2') {
          return '<span class="' + prefix + key + ' ' + prefix + 'rule-header">' + exports.Trim(temp) + '</span>';
        } else {
          return '<span class="' + prefix + key + '">' + exports.Trim(temp) + '</span>';
        }
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
  ============================Quote=============================
  ============================================================*/
  exports.Quote = function(doc) {
    for (key in quote) {
      doc = doc.replace(quote[key].regex, function(match) {
        if (key == 'quote-code') {
          var temp = exports.Prepare(match).replace(quote[key].pattern, ''),
            classes = prefix + key + ' nohighlight language-none';
          return '<code class="' + classes + '">' + exports.Trim(temp) + '</code>';
        } else if (key == 'quote-extra') {
          var extra = exports.Prepare(match).split(/\]\{\[([\s\n]{1,})?/),
            credit = extra[0].split(/\[/)[1],
            content = extra[2].split(/([\s\n]{1,})?\]\}/)[0],
            classes = prefix + key;
          return '<div class="' + classes + '"><span class="' + prefix + 'quote">"' + exports.Trim(content) + '"</span><br><span class="' + prefix + 'credit">' + exports.Trim(credit) + '</span></div>';
        } else {
          var temp = exports.Prepare(match).replace(quote[key].pattern, ''),
            classes = prefix + key;
          return '<div class="' + classes + '">"' + exports.Trim(temp) + '"</div>';
        }
      });
    }
    return doc;
  };
  
  /*============================================================
  ============================Code==============================
  ============================================================*/
  exports.Code = function(doc) {
    for (key in code) {
      doc = doc.replace(code[key].regex, function(match) {
        if (key == 'code-extra') {
          var extra = exports.Prepare(match).split(/\]\{\(([\s\n]{1,})?/),
            first = extra[0].split(/\[/)[1].split(/\|/),
            second = extra[2].split(/([\s\n]{1,})?\)\}/)[0],
            language = exports.Trim(first[0]).toLowerCase(),
            service = exports.Trim(first[1]).toLowerCase(),
            classes = prefix + key + ' language-' + language + ' sh_' + language + ' prettyprint lang-' + language,
            dataClasses = language;
          exports.LoadScript('Syntax/' + service + '/script.js');
          exports.LoadStyle('Syntax/' + service + '/' + exports.theme + '.css');
          return '<pre class="' + classes + '" data-language="' + dataClasses + '"><code class="' + classes + '" data-language="' + dataClasses + '">' + second + '</code></pre>';
        } else {
          var temp = exports.Prepare(match).replace(code[key].pattern, ''),
            classes = 'nohighlight language-none';
          return '<pre class="' + prefix + key + ' ' + classes + '"><code class="' + classes + '">' + temp + '</code></pre>';
        }
      });
    }
    return doc;
  };
  
  /*============================================================
  =============================List=============================
  ============================================================*/
  exports.List = function(doc) {
    for (key in list) {
      doc = doc.replace(list[key].regex, function(match) {
        if (key == 'list-disc' || key == 'list-circle' || key == 'list-square') {
          return '<ul class="' + prefix + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = exports.Prepare(line).replace(list[key].pattern, '');
            return '<li>' + exports.Trim(temp) + '</li>';
          }) + '</ul>';
        } else if (key == 'list-decimal' || key == 'list-roman' || key == 'list-alpha') {
          return '<ol class="' + prefix + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = exports.Prepare(line).replace(list[key].pattern, '');
            return '<li>' + exports.Trim(temp) + '</li>';
          }) + '</ol>';
        } else {
          return '<div class="' + prefix + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = exports.Prepare(line).replace(/\[[Xx\s]?\]/gm, ''),
              tag = (new RegExp(/\[\s?\]/gm)).test(line) ? 'unchecked' : 'checked';
            return '<span class="' + prefix + tag + '"><span class="' + prefix + 'box"></span><span class="' + prefix + 'item">' + exports.Trim(temp) + '</span></span><br>';
          }) + '</div>';
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
        if (key == 'url') {
          if ((new RegExp(/^\[(.*?)\]\((.*?)(https?|ftp|file)\:\/{2}(.*?)\)$/gm)).test(match)) {
            var extra = exports.Prepare(match).split(/\]\(/),
              title = extra[0].split(/\[/)[1],
              url = extra[1].split(/\]/)[0];
            return '<a class="' + prefix + key + '" href="' + exports.Trim(url) + '" target="_blank">' + exports.Trim(title) + '</a>';
          } else {
            return '<a class="' + prefix + key + '" href="' + exports.Trim(match) + '" target="_blank">' + exports.Trim(match) + '</a>';
          }
        } else {
          return '<a class="' + prefix + key + '" href="mailto:' + exports.Trim(match) + '" target="_blank">' + exports.Trim(match) + '</a>';
        }
      });
    }
    return doc;
  };
  
  /*============================================================
  ============================Image=============================
  ============================================================*/
  exports.Image = function(doc) {
    for (key in image) {
      if (key == 'image-extra') {
        doc = doc.replace(image[key].regex, function(match) {
          var extra = exports.Prepare(match).split(/\]\!\(/),
            alt = extra[0].split(/\[/)[1],
            url = extra[1].split(/\)/)[0];
          return '<div class="' + prefix + key + '"><img class="' + prefix + 'image" src="' + exports.Trim(url) + '" alt="' + exports.Trim(alt) + '"><div class="' + prefix + 'text">' + exports.Trim(alt) + '</div></div>';
        });
      } else if (key == 'image-plain') {
        doc = doc.replace(image[key].regex, function(match) {
          var temp = exports.Prepare(match).replace(image[key].pattern, '');
          return '<img class="' + prefix + key + '" src="' + exports.Trim(temp) + '">';
        });
      } else {
        doc = doc.replace(image[key].regex, function(match) {
          var temp = match.replace(image[key].pattern, '').replace(/(\n|\<br\>)/gm, '');
          return '<div class="' + prefix + key + '">' + exports.Trim(temp) + '</div>';
        });
      }
    }
    return doc;
  };
  
  /*============================================================
  ============================Table=============================
  ============================================================*/
  exports.Table = function(doc) {
    for (key in table) {
      doc = '<table class="' + prefix + key + '"><tbody>' + doc.replace(table[key].regex, function(match) {
        var extra = exports.Prepare(match).split(/\{\|/)[1].split(/\|\}/)[0],
          rows = extra.split(/\|\|/),
          data = '';
        for (var a = 0; a < rows.length; a++) {
          var row = rows[a],
            count = row.match(/.+\n/gm).length,
            width = (100 / count).toFixed(0),
            tag = (new RegExp(/\={2}/gm)).test(row) ? 'th' : 'td';
          data += '<tr class="' + prefix + tag + '">' + row.replace(/.+\n/gm, function(col) {
            var temp = col.replace(table[key].pattern, '');
            return '<' + tag + ' class="' + prefix + 'col" style="width: ' + width + '%;">' + exports.Trim(temp) + '</' + tag + '>';
          }) + '</tr>';
        }
        return data;
      }) + '</tbody></table>';
    }
    return doc;
  };
  
  /*============================================================
  ===========================Cleaning===========================
  ============================================================*/
  exports.Prepare = function(doc) {
    return doc.replace(/\<(\/)?(.*?)\>/gm, '');
  };
  exports.Trim = function(doc) {
    return doc.replace(/(^\s+|\s+$)/gm, '');
  };
  exports.Clean = function(doc) {
    return doc.replace(/\n{3,}/gm, '<br><br>').replace(/\n/gm, '<br>');
  };
  
  /*============================================================
  ============================Syntax============================
  ============================================================*/
  exports.Syntax = function(elements) {
    for (var a = 0; a < elements.length; a++) {
      var element = elements[a],
        code = element.innerHTML,
        fixed = code.replace(/\<br\>/gm, '\n');
      element.innerHTML = fixed;
    }
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})(DocTyp || {});
