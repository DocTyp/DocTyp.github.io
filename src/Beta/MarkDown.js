/*
============================================================
Global Functions
============================================================
*/
/*Loop Array
==============================*/
var ForEach = (function() {
  return function(array, callback) {
    if (typeof callback === 'function') {
      for (var a = 0; a < array.length; a++) {
        try {
          callback(a, array[a]); } catch (error) {
        try {
          callback(a); } catch (error) {
        try {
          callback(); } catch (error) { }}
        }
      }
    } else {
      throw('Usage: ForEach(array, function(index, value) { ... });');
    }
  };
})();
/*Iterate Dictionary
==============================*/
var Iterate = (function() {
  return function(obj, callback) {
    if (typeof callback === 'function') {
      for (prop in obj) {
        if (obj.hasOwnProperty(prop) && isNaN(prop)) {
          try {
            callback(prop, obj[prop]); } catch (error) {
          try {
            callback(prop); } catch (error) {
          try {
            callback(); } catch (error) { }}
          }
          Iterate(obj[prop], callback);
        }
      }
    } else {
      throw('Usage: Iterate(dictionary, function(key, value) { ... });');
    }
  };
})();
/*Create RegExp
==============================*/
var RegEx = (function() {
  return function(regex, scope) {
    scope = (typeof scope !== 'undefined') ? scope : 'gm';
    return (regex.source) ? regex : new RegExp(regex, scope);
  };
})();
/*Create Nested RegExp
==============================*/
var RegExNest = (function() {
  return function(value, begin, end) {
    var open = 0,
      close = 0,
      nests = [];
    begin = RegEx(begin);
    end = RegEx(end);
    value.replace(/(^\n|.+)/gm, function(line) {
      if (end.source != '(?:)') {
        line.replace(RegEx('(' + begin.source + '|' + end.source + ')'), function(match) {
          open += (begin.test(match) == true) ? match.match(begin).length : 0;
          close += (end.test(match) == true) ? match.match(end).length : 0;
          if (open > 0 && close > 0 && open == close) {
            var regex = '(' + begin.source + '([\\s\\S]*?)){1}([\\s\\S]*?)(([\\s\\S]*?)' + end.source + '){' + close + '}';
            if (nests.indexOf(regex) < 0) {
              nests.push(regex);
            }
            open = 0;
            close = 0;
            return;
          }
        });
      } else {
        if (nests.indexOf(begin.source) < 0) {
          nests.push(begin.source);
        }
      }
    });
    return nests;
  };
})();
/*
============================================================
Core
============================================================
*/
var PaintDocz = (function(exports) {
  /*Variable
  ==============================*/
  var regex = {
    h6: RegEx(/\#{6}.+$/gm),
    h6: RegEx(/\#{5}.+$/gm),
    h6: RegEx(/\#{4}.+$/gm),
    h6: RegEx(/\#{3}.+$/gm),
    h6: RegEx(/\#{2}.+$/gm),
    h6: RegEx(/\#{1}.+$/gm),
    h6: RegEx(/\#{6}.+$/gm),
    h6: RegEx(/\#{6}.+$/gm),
    h6: RegEx(/\#{6}.+$/gm),
    h6: RegEx(/\#{6}.+$/gm),
    h6: RegEx(/\#{6}.+$/gm),
    h6: RegEx(/\#{6}.+$/gm)
  };
  /*Load Stylesheet File
  ==============================*/
  function LoadStyle(url, async) {
    async = async || true;
    var link = document.createElement('link'),
      ref = document.getElementsByTagName('head')[0];
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    if (async) {
      link.media = 'none';
      link.onload = function() {
        if (link.media != 'all') {
          link.media = 'all';
        }
      };
    } else {
      link.media = 'all';
    }
    ref.appendChild(link);
  }
  /*Load JavaScript File
  ==============================*/
  function LoadScript(url, async) {
    async = async || true;
    var script = document.createElement('script'),
      ref = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.async = async;
    script.src = url;
    ref.appendChild(script);
  }
  /*Helpers
  ==============================*/
  function Clean(value) {
    return value.replace(/\<\/?(.*?)\>/gm, '');
  }
  /*Initialize
  ==============================*/
  function Docify() {
    var query = document.querySelectorAll('article .PaintDocz');
    ForEach(query, function(index, element) {
      element.innerHTML = Clean(element.innerHTML);
      element.innerHTML = 
    });
  }
  /*Theme File
  ==============================*/
  return function() {
    var query = document.querySelectorAll('script[src*="PaintDocz.js?"]');
    if (query.length > 0) {
      var regex = RegEx(/([\w]+)$/gm),
        url = query[0].src,
        paint = url.match(regex)[0];
      LoadStyle('https://paintdocz.github.io/src/Paint/' + paint.toLowerCase() + '.css', true);
    } else {
      LoadStyle('https://paintdocz.github.io/src/Paint/default.css', true);
    }
    Docify();
  };
})();
/*
============================================================
Load when Ready
============================================================
*/
(function() {
  window.onload = function() {
    PaintDocz();
  };
})();
