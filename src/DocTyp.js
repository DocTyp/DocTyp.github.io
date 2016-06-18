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
    element - The HTML DOM element that will be Docified.
    theme - You can optionally set the style to Dark or Light.
    doc - The elements text that will be Docified.
  @credit: 
    Prism, Highlight
*/
var DocTyp = (function(exports) {
  /*============================================================
  ===========================Variable===========================
  ============================================================*/
  var prefix = 'doctyp-',
    scheme;
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
    'header1': {pattern: /\#/gm, regex: /^\#{1}(?!\#)(.*?)$/gm},
    'header2': {pattern: /\#/gm, regex: /^\#{2}(?!\#)(.*?)$/gm},
    'header3': {pattern: /\#/gm, regex: /^\#{3}(?!\#)(.*?)$/gm},
    'header4': {pattern: /\#/gm, regex: /^\#{4,}(.*?)$/gm}
  };
  var link = {
    'header1': {pattern: /\#/gm, regex: /^\#{1}(?!\#)(.*?)$/gm},
    'header2': {pattern: /\#/gm, regex: /^\#{2}(?!\#)(.*?)$/gm},
    'header3': {pattern: /\#/gm, regex: /^\#{3}(?!\#)(.*?)$/gm},
    'header4': {pattern: /\#/gm, regex: /^\#{4,}(.*?)$/gm}
  };
  
  /*============================================================
  ============================Private===========================
  ============================================================*/
  function LoadScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://doctyp.github.io/src/' + url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  function LoadStyle(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'https://doctyp.github.io/src/' + url;
    link.media = 'none';
    link.onload = function() {
      if (media != 'all') {
        link.media = 'all';
      }
    };
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  //Processing
  function Header(doc) {
    for (key in header) {
      doc = doc.replace(header[key].regex, function(match) {
        var temp = Prepare(match).replace(header[key].pattern, '');
        return '<span class="' + prefix + key + '">' + temp + '</span>';
      });
    }
    return doc;
  }
  function Style(doc) {
    for (key in style) {
      doc = doc.replace(style[key].regex, function(match) {
        var temp = Prepare(match).replace(style[key].pattern, '');
        return '<span class="' + prefix + key + '">' + temp + '</span>';
      });
    }
    return doc;
  }
  function Rule(doc) {
    for (key in rule) {
      doc = doc.replace(rule[key].regex, function(match) {
        return '<hr class="' + prefix + key + '"/>';
      });
    }
    return doc;
  }
  function Block(doc) {
    for (key in block) {
      doc = doc.replace(block[key].regex, function(match) {
        var temp;
        if (key != 'pre-external') {
          temp = Prepare(match).replace(block[key].pattern, '');
        }
        if (key == 'code') {
          return '<code class="' + prefix + key + '">' + Trim(temp) + '</code>';
        } else if (key == 'pre-external') {
          var extra = Prepare(match).replace(/(\[|\]|\`([\s\S]*?)\`)/gm, ''),
            language = extra.split('|')[0].toLowerCase(),
            url = 'Syntax/' + extra.split('|')[1].toLowerCase();
          temp = Prepare(match).replace(block[key].pattern, '');
          LoadScript(url + '/script.js');
          LoadStyle(url + '/' + scheme + '.css');
          return '<pre class="' + prefix + key + ' language-' + language + ' ' + language + '"><code class="language-' + language + ' ' + language + '">' + Trim(temp) + '</code></pre>';
        } else if (key == 'pre') {
          return '<pre class="' + prefix + key + ' nohighlight language-none"><code class="nohighlight language-none">' + Trim(temp) + '</code></pre>';
        } else {
          return '<span class="' + prefix + key + '">' + Trim(temp) + '</span>';
        }
      });
    }
    return doc;
  }
  function List(doc) {
    return doc;
  }
  function Link(doc) {
    return doc;
  }
  //Cleaning
  function Prepare(doc) {
    return doc.replace(/\<(\/)?span(.*?)\>/gm, '');
  }
  function Trim(doc) {
    return doc.replace(/(^\s+|\s+$)/gm, '');
  }
  function Clean(doc) {
    return doc.replace(/\n/gm, '<br/>');
  }
  
  /*============================================================
  ============================Public============================
  ============================================================*/
  exports.Docify = function(element, theme) {
    //Check if element is an element
    if (element.nodeType && element.nodeType == 1) {
      //Check if user is using their own style
      if (theme !== undefined) {
        scheme = theme.toLowerCase();
        LoadStyle('Style/' + theme.toLowerCase() + '.css');
      } else {
        scheme = 'light';
      }
      //Cater for older browsers
      var doc = element.innerText ? element.innerText : element.textContent;
      //Processing
      doc = Header(doc);
      doc = Style(doc);
      doc = Rule(doc);
      doc = Block(doc);
      doc = List(doc);
      doc = Clean(doc);
      //Replace text with new text
      element.innerHTML = doc;
    } else {
      throw('The element is not defined or is not a DOM element.');
    }
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})({});
