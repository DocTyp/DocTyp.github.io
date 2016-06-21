/*
  if (redistribute == true) {
    return credit;
  }
  
  --------------------------------------------------
  
  @DocTyp
  @author: Alexander Hovy
*/
/*========================================================================================================================
==========================================================================================================================
========================================================================================================================*/
/*============================================================
==========================LoadScript==========================
============================================================*/
var LoadScript = (function() {
  return function(url) {
    var script = document.createElement('script'),
      ref = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    ref.appendChild(script);
  };
})();
/*============================================================
==========================LoadStyle===========================
============================================================*/
var LoadStyle = (function() {
  return function(url) {
    var link = document.createElement('link'),
      ref = document.getElementsByTagName('head')[0];
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    link.media = 'none';
    link.onload = function() {
      if (link.media != 'all') {
        link.media = 'all';
      }
    };
    ref.appendChild(link);
  };
})();

/*========================================================================================================================
==========================================================================================================================
========================================================================================================================*/
var Settings = (function(E) {
  E.class = 'doctyp-';
  E.header = {
    'header4': {remove: /\#{4,}/gm, regex: /\#{4,}.+/gm},
    'header3': {remove: /\#{3}/gm, regex: /\#{3}.+/gm},
    'header2': {remove: /\#{2}/gm, regex: /\#{2}.+/gm},
    'header1': {remove: /\#/gm, regex: /\#.+/gm}
  };
  E.text = {
    'bold': {remove: /\*{2}/gm, regex: /\*{2}(?!\*{2,})(.*?)\*{2}/gm},
    'italic': {remove: /\*/gm, regex: /\*(?!\*{3,})(.*?)\*/gm},
    'underline': {remove: /\_/gm, regex: /\_{2}(?!\_{2,})(.*?)\_{2}/gm},
    'strike': {remove: /\~/gm, regex: /\~{2}(?!\~{2,})(.*?)\~{2}/gm},
    'highlight': {remove: /\=/gm, regex: /\={2}(?!\={2,})(.*?)\={2}/gm},
    'superscript': {remove: /\+/gm, regex: /\+{2}(?!\+{2,})(.*?)\+{2}/gm},
    'subscript': {remove: /\-/gm, regex: /\-{2}(?!\-{2,})(.*?)\-{2}/gm}
  };
  E.rule = {
    'rule-solid': {remove: /[]/gm, regex: /\_{4,}/gm},
    'rule-dash': {remove: /[]/gm, regex: /\-{4,}/gm},
    'rule-dotted': {remove: /[]/gm, regex: /\.{4,}/gm},
    'rule-double': {remove: /[]/gm, regex: /\={4,}/gm},
    'rule-thick': {remove: /[]/gm, regex: /\+{4,}/gm}
  };
  E.quote = {
    'quote-code': {remove: /\`/gm, regex: /\`(.*?)\`/gm},
    'quote-extra': {remove: /[]/gm, regex: /\[(.*?)\]\{\[([\s\S]*?)\]\}/gm},
    'quote-plain': {remove: /(\{\[([\s\n]{1,})?|([\s\n]{1,})?\]\})/gm, regex: /\{\[([\s\S]*?)\]\}/gm}
  };
  E.code = {
    'code-extra': {remove: /[]/gm, regex: /\[(.*?)\]\{\(([\s\S]*?)\)\}/gm},
    'code-plain': {remove: /(\{\(([\s\n]{1,})?|([\s\n]{1,})?\)\})/gm, regex: /\{\(([\s\S]*?)\)\}/gm}
  };
  E.list = {
    'list-disc': {remove: /(\-)/gm, regex: /(^\-(?!\-{3,}).+\n){1,}/gm},
    'list-circle': {remove: /(\*)/gm, regex: /(^\*(?!\*{3,}).+\n){1,}/gm},
    'list-square': {remove: /(\@)/gm, regex: /(^\@(?!\@{3,}).+\n){1,}/gm},
    'list-decimal': {remove: /(\o\.)/gm, regex: /(^\o\..+\n){1,}/igm},
    'list-roman': {remove: /(\i\.)/gm, regex: /(^\i\..+\n){1,}/igm},
    'list-alpha': {remove: /(\a\.)/gm, regex: /(^\a\..+\n){1,}/igm},
    'checklist': {remove: /\[[Xx\s]?\]/gm, regex: /(^\[[Xx\s]?\].+\n){1,}/gm}
  };
  E.link = {
    'url': {remove: /[]/gm, regex: /(\[(.*?)\]\((.*?)(https?|ftp|file)\:\/{2}(.*?)\)|\b((https?|ftp|file)\:\/{2}([\w\d\.]+)([\/\?\&\w\d\=\,\.\+\:\;\@\$\%\#\!\_\-]+)?)\b)/gm},
    'email': {remove: /[]/gm, regex: /\b(([\w\d\.\_\%\+\-]+)\@([\w\d\.\-]+)(\.\w{2,}))\b/gm}
  };
  E.image = {
    'image-extra': {remove: /[]/gm, regex: /\[(.*?)\]\!\((.*?)\)/gm},
    'image-plain': {remove: /(\!\(|\))/gm, regex: /\!\((.*?)\)/gm},
    'image-grid': {remove: /(\{\!([\s\n]{1,})?|([\s\n]{1,})?\!\})/gm, regex: /\{\!([\s\S]*?)\!\}/gm}
  };
  E.table = {
    'table': {remove: /\=/gm, regex: /\{\|([\s\S]*?)\|\}/gm}
  };
  return E;
})({});

/*========================================================================================================================
==========================================================================================================================
========================================================================================================================*/
var Modules = (function(E, S) {
  /*============================================================
  ============================Private===========================
  ============================================================*/
  function Glue(sep) {
    if (arguments.length > 2) {
      var str = '';
      for (var a = 0; a < arguments.length; a++) {
        if (a > 1) {
          str += sep + arguments[a];
        } else if (a != 0) {
          str += arguments[a];
        }
      }
      return str;
    } else if (arguments.length == 2) {
      return arguments[1];
    } else {
      return '';
    }
  }
  function Prepare(doc) {
    return doc.replace(/\<(\/)?(.*?)\>/gm, '');
  }
  function Trim(doc) {
    return doc.replace(/(^\s+|\s+$)/gm, '');
  }
  function Clean(doc) {
    return doc.replace(/\n{3,}/gm, '<br><br>').replace(/\n/gm, '<br>');
  }
  function Escape(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  }
  function Complete(element, doc) {
    //Create the article Tag
    var article = document.createElement('article');
    article.setAttribute('class', 'doctyp');
    article.innerHTML = doc;
    //Replace the old Element with new
    element.parentNode.replaceChild(article, element);
    if (article.querySelectorAll('pre').length > 0) {
      Syntax(article.querySelectorAll('pre'));
    }
  }
  function Syntax(elements) {
    for (var a = 0; a < elements.length; a++) {
      var element = elements[a],
        code = element.innerHTML,
        fixed = code.replace(/\<br\>/gm, '\n');
      element.innerHTML = fixed;
    }
  }
  /*============================================================
  =============================Query============================
  ============================================================*/
  E.SingleQuery = function(element) {
    //Fetch element text
    var doc = element.innerHTML;
    //Processing
    doc = E.Header(doc);
    doc = E.Text(doc);
    doc = E.Rule(doc);
    doc = E.Quote(doc);
    doc = E.Code(doc);
    doc = E.List(doc);
    doc = E.Link(doc);
    doc = E.Image(doc);
    doc = E.Table(doc);
    doc = Escape(Clean(doc));
    //Complete Process
    Complete(element, doc);
  };
  E.MultipleQuery = function(elements) {
    //Check if any elements were found
    if (elements.length > 0) {
      for (var a = 0; a < elements.length; a++) {
        var element = elements[a];
        //Fetch element text
        var doc = element.innerHTML;
        //Processing
        doc = E.Header(doc);
        doc = E.Text(doc);
        doc = E.Rule(doc);
        doc = E.Quote(doc);
        doc = E.Code(doc);
        doc = E.List(doc);
        doc = E.Link(doc);
        doc = E.Image(doc);
        doc = E.Table(doc);
        doc = Escape(Clean(doc));
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
  E.Header = function(doc) {
    for (key in S.header) {
      doc = doc.replace(S.header[key].regex, function(match) {
        var temp = Prepare(match).replace(S.header[key].remove, '');
        if (key == 'header1') {
          return '<span class="' + S.class + key + '">' + Trim(temp) + '</span><hr class="' + S.class + 'rule-header">';
        } else if (key == 'header2') {
          return '<span class="' + S.class + key + ' ' + S.class + 'rule-header">' + Trim(temp) + '</span>';
        } else {
          return '<span class="' + S.class + key + '">' + Trim(temp) + '</span>';
        }
      });
    }
    return doc;
  };
  E.Text = function(doc) {
    for (key in S.text) {
      doc = doc.replace(S.text[key].regex, function(match) {
        var temp = Prepare(match).replace(S.text[key].remove, '');
        return '<span class="' + S.class + key + '">' + Trim(temp) + '</span>';
      });
    }
    return doc;
  };
  E.Rule = function(doc) {
    for (key in S.rule) {
      doc = doc.replace(S.rule[key].regex, function(match) {
        return '<hr class="' + S.class + key + '">';
      });
    }
    return doc;
  };
  E.Quote = function(doc) {
    for (key in S.quote) {
      doc = doc.replace(S.quote[key].regex, function(match) {
        if (key == 'quote-code') {
          var temp = Prepare(match).replace(S.quote[key].remove, ''),
            classes = Glue(' ', S.class + key, 'nohighlight', 'language-none');
          return '<code class="' + classes + '">' + Trim(temp) + '</code>';
        } else if (key == 'quote-extra') {
          var extra = Prepare(match).split(/\]\{\[([\s\n]{1,})?/),
            credit = extra[0].split(/\[/)[1],
            content = extra[2].split(/([\s\n]{1,})?\]\}/)[0],
            classes = Glue(' ', S.class + key);
          return '<div class="' + classes + '"><span class="' + S.class + 'quote">"' + Trim(content) + '"</span><br><span class="' + S.class + 'credit">' + Trim(credit) + '</span></div>';
        } else {
          var temp = Prepare(match).replace(S.quote[key].remove, ''),
            classes = Glue(' ', S.class + key);
          return '<div class="' + classes + '">"' + Trim(temp) + '"</div>';
        }
      });
    }
    return doc;
  };
  E.Code = function(doc) {
    for (key in S.code) {
      doc = doc.replace(S.code[key].regex, function(match) {
        if (key == 'code-extra') {
          var extra = Prepare(match).split(/\]\{\(([\s\n]{1,})?/),
            first = extra[0].split(/\[/)[1].split(/\|/),
            second = extra[2].split(/([\s\n]{1,})?\)\}/)[0],
            language = Trim(first[0]).toLowerCase(),
            service = Trim(first[1]).toLowerCase(),
            classes = Glue(' ', S.class + key, 'language-' + language, 'sh_' + language, 'prettyprint', 'lang-' + language),
            dataClasses = language;
          LoadScript('Syntax/' + service + '/script.js');
          LoadStyle('Syntax/' + service + '/' + S.theme + '.css');
          return '<pre class="' + classes + '" data-language="' + dataClasses + '"><code class="' + classes + '" data-language="' + dataClasses + '">' + second + '</code></pre>';
        } else {
          var temp = Prepare(match).replace(S.code[key].remove, ''),
            classes = Glue(' ', 'nohighlight', 'language-none');
          return '<pre class="' + S.class + key + ' ' + classes + '"><code class="' + classes + '">' + temp + '</code></pre>';
        }
      });
    }
    return doc;
  };
  E.List = function(doc) {
    for (key in S.list) {
      doc = doc.replace(S.list[key].regex, function(match) {
        if (key == 'list-disc' || key == 'list-circle' || key == 'list-square') {
          return '<ul class="' + S.class + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = Prepare(line).replace(S.list[key].remove, '');
            return '<li>' + Trim(temp) + '</li>';
          }) + '</ul>';
        } else if (key == 'list-decimal' || key == 'list-roman' || key == 'list-alpha') {
          return '<ol class="' + S.class + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = Prepare(line).replace(S.list[key].remove, '');
            return '<li>' + Trim(temp) + '</li>';
          }) + '</ol>';
        } else {
          return '<div class="' + S.class + key + '">' + match.replace(/.+\n/gm, function(line) {
            var temp = Prepare(line).replace(/\[[Xx\s]?\]/gm, ''),
              tag = (new RegExp(/\[\s?\]/gm)).test(line) ? 'unchecked' : 'checked';
            return '<span class="' + S.class + tag + '"><span class="' + S.class + 'box"></span><span class="' + S.class + 'item">' + Trim(temp) + '</span></span><br>';
          }) + '</div>';
        }
      });
    }
    return doc;
  };
  E.Link = function(doc) {
    for (key in S.link) {
      doc = doc.replace(S.link[key].regex, function(match) {
        if (key == 'url') {
          if ((new RegExp(/^\[(.*?)\]\((.*?)(https?|ftp|file)\:\/{2}(.*?)\)$/gm)).test(match)) {
            var extra = Prepare(match).split(/\]\(/),
              title = extra[0].split(/\[/)[1],
              url = extra[1].split(/\]/)[0];
            return '<a class="' + S.class + key + '" href="' + Trim(url) + '" target="_blank">' + Trim(title) + '</a>';
          } else {
            return '<a class="' + S.class + key + '" href="' + Trim(match) + '" target="_blank">' + Trim(match) + '</a>';
          }
        } else {
          return '<a class="' + S.class + key + '" href="mailto:' + Trim(match) + '" target="_blank">' + Trim(match) + '</a>';
        }
      });
    }
    return doc;
  };
  E.Image = function(doc) {
    for (key in S.image) {
      if (key == 'image-extra') {
        doc = doc.replace(S.image[key].regex, function(match) {
          var extra = Prepare(match).split(/\]\!\(/),
            alt = extra[0].split(/\[/)[1],
            url = extra[1].split(/\)/)[0];
          return '<div class="' + S.class + key + '"><img class="' + S.class + 'image" src="' + Trim(url) + '" alt="' + Trim(alt) + '"><div class="' + S.class + 'text">' + Trim(alt) + '</div></div>';
        });
      } else if (key == 'image-plain') {
        doc = doc.replace(S.image[key].regex, function(match) {
          var temp = Prepare(match).replace(S.image[key].remove, '');
          return '<img class="' + S.class + key + '" src="' + Trim(temp) + '">';
        });
      } else {
        doc = doc.replace(S.image[key].regex, function(match) {
          var temp = match.replace(S.image[key].remove, '').replace(/(\n|\<br\>)/gm, '');
          return '<div class="' + S.class + key + '">' + Trim(temp) + '</div>';
        });
      }
    }
    return doc;
  };
  E.Table = function(doc) {
    for (key in S.table) {
      doc = '<table class="' + S.prefix + key + '"><tbody>' + doc.replace(S.table[key].regex, function(match) {
        var extra = Prepare(match).split(/\{\|/)[1].split(/\|\}/)[0],
          rows = extra.split(/\|{2}/),
          data = '';
        for (var a = 0; a < rows.length; a++) {
          var row = rows[a],
            count = row.match(/.+\n/gm).length,
            width = (100 / count).toFixed(0),
            tag = (new RegExp(/\={2}/gm)).test(row) ? 'th' : 'td';
          data += '<tr class="' + S.class + tag + '">' + row.replace(/.+\n/gm, function(col) {
            var temp = col.replace(S.table[key].remove, '');
            return '<' + tag + ' class="' + S.class + 'col" style="width: ' + width + '%;">' + Trim(temp) + '</' + tag + '>';
          }) + '</tr>';
        }
        return data;
      }) + '</tbody></table>';
    }
    return doc;
  };
  /*============================================================
  ============================Export============================
  ============================================================*/
  return E;
})({}, Settings || {});

/*========================================================================================================================
==========================================================================================================================
========================================================================================================================*/
var DocTypBeta = (function(S, M) {
  //DocTyp with arguments
  return function(query, theme) {
    //Check if the Modules exist yet
    if ((typeof S !== 'undefined') && (typeof M !== 'undefined') {
      //Check if theme was assigned
      if (typeof theme !== 'undefined') {
        //Setting it to lower case
        theme = theme.toLowerCase();
        //Saving the theme
        S.theme = theme;
        //Loading the theme
        LoadStyle('https://doctyp.github.io/src/Style/' + theme + '.css');
      } else {
        //Saving the default theme
        S.theme = 'light';
      }
      //Check if there are multiple elements
      if (query.nodeType && query.nodeType == 1) {
        //Processing Elements
        M.SingleQuery(query);
      } else {
        //Get Elements
        var elements = document.querySelectorAll(query);
        //Processing Elements
        M.MultipleQuery(elements);
      }
    }
  };
})(Settings || {}, Modules || {});
