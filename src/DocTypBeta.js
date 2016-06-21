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
  E.header = {
    'header4': {remove: /[]/gm, regex: /[]/gm}
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
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  E.Text = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  E.Escape = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  E.Escape = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
  };
  E.Escape = function(doc) {
    return doc.replace(/\\./gm, function(match) {
      return match.replace(/\\/gm, '');
    });
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
