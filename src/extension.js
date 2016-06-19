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
    'bold': {pattern: /\*{2}/gm, regex: /\*{2}(.*?)\*{2}/gm},
    'italic': {pattern: /\*/gm, regex: /\*(.*?)\*/gm},
    'underline': {pattern: /\_/gm, regex: /\_{2}(.*?)\_{2}/gm},
    'strike': {pattern: /\~/gm, regex: /\~{2}(.*?)\~{2}/gm},
    'highlight': {pattern: /\=/gm, regex: /\={2}(.*?)\={2}/gm},
    'superscript': {pattern: /\+/gm, regex: /\+{2}(.*?)\+{2}/gm},
    'subscript': {pattern: /\-/gm, regex: /\-{2}(.*?)\-{2}/gm}
  };
  var rule = {
    'rule-solid': {pattern: /[]/gm, regex: /^\-{4,}/gm},
    'rule-dash': {pattern: /[]/gm, regex: /^\.{4,}/gm},
    'rule-dotted': {pattern: /[]/gm, regex: /^\.{4,}/gm}
  };
  var quote = {
    'quote-code': {pattern: /\`/gm, regex: /\`(.*?)\`/gm},
    'quote-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\{\[([\s\S]*?)\]\}/gm},
    'quote-plain': {pattern: /(\{\[|\]\})/gm, regex: /\{\[([\s\S]*?)\]\}/gm}
  };
  var code = {
    'code-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\{\(([\s\S]*?)\)\}/gm},
    'code-plain': {pattern: /(\{\(|\)\})/gm, regex: /\{\(([\s\S]*?)\)\}/gm}
  };
  var list = {
    'list-solid': {pattern: /(\-|\n)/gm, regex: /(^\-(?!\-{3,}).+\n){1,}/gm},
    'list-empty': {pattern: /(\*|\n)/gm, regex: /(^\*(?!\*{3,}).+\n){1,}/gm},
    'list-square': {pattern: /(\#|\n)/gm, regex: /(^\#(?!\#{3,}).+\n){1,}/gm},
    'list-number': {pattern: /(\0\.|\n)/gm, regex: /(^\0\..+\n){1,}/gm},
    'list-roman': {pattern: /(\1\.|\n)/gm, regex: /(^\1\..+\n){1,}/gm},
    'list-letter': {pattern: /(\a\.|\n)/gm, regex: /(^\a\..+\n){1,}/gm},
    'checklist': {pattern: /(\[[Xx\s]?\]|\n)/gm, regex: /(^\[[Xx\s]?\].+\n){1,}/gm}
  };
  var image = {
    'image': {pattern: /[]/gm, regex: /\!\[(.*?)\]\((.*?)\)/gm}
  };
  var link = {
    'url-extra': {pattern: /[]/gm, regex: /\[(.*?)\]\((.*?)(https?|ftp|file)\:\/{2}(.*?)\)/gm},
    'url-plain': {pattern: /[]/gm, regex: /\b((https?|ftp|file)\:\/{2}([\w\d\.]+)([\/\?\&\w\d\=\,\.\+\:\;\@\$\%\#\!\_\-]+)?)\b/gm},
    'email': {pattern: /[]/gm, regex: /\b(([\w\d\.\_\%\+\-]+)\@([\w\d\.\-]+)(\.\w{2,}))\b/gm}
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
          var extra = exports.Prepare(match).split(']{['),
            credit = extra[0].split('[')[1],
            content = extra[1].split(']}')[0],
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
          var extra = exports.Prepare(match).split(']{('),
            first = extra[0].split('[')[1].split('|'),
            second = extra[1].split(')}')[0],
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
        if (key == 'list-solid' || key == 'list-empty' || key == 'list-square') {
          return '<ul class="' + prefix + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = exports.Prepare(line).replace(list[key].pattern, '');
            return '<li>' + exports.Trim(temp) + '</li>';
          }) + '</ul>';
        } else if (key == 'list-number' || key == 'list-roman' || key == 'list-letter') {
          return '<ol class="' + prefix + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = exports.Prepare(line).replace(list[key].pattern, '');
            return '<li>' + exports.Trim(temp) + '</li>';
          }) + '</ol>';
        } else {
          return '<span class="' + prefix + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = exports.Prepare(line).replace(/\[[Xx\s]?\]/gm, ''),
              tag = (new RegExp(/\[\s?\]/gm)).test(line) ? 'unchecked' : 'checked';
            return '<span class="' + prefix + 'box"></span><span class="' + prefix + 'item">' + exports.Trim(temp) + '</span>';
          }) + '</span>';
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
      doc = doc.replace(image[key].regex, function(match) {
        var extra = exports.Prepare(match).split(']('),
          alt = exports.Trim(extra[0].split('![')[1]).toLowerCase(),
          path = exports.Trim(extra[1].split(')')[0]).toLowerCase();
        return '<img class="' + prefix + key + '" href="' + url + '" alt="' + alt + '"></img>';
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
