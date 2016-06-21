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
    query - HTML DOM Element or Tag-, Class- or ID Name of a HTML DOM Element.
    element - HTML DOM Element.
    elements - An array of Elements.
    theme - You can optionally set the style to Dark or Light.
    url - Content of the url that needs to be loaded.
  @credit: 
    Prism, Highlight, SHJS, Rainbow, Prettify
*/
var DocTyp = (function(exports) {
  /*============================================================
  ===========================Variable===========================
  ============================================================*/
  
  /*============================================================
  ============================Private===========================
  ============================================================*/
  function Complete(element, doc) {
    //Create the article Tag
    var article = document.createElement('article');
    article.setAttribute('class', 'doctyp');
    article.innerHTML = doc;
    //Replace the old Element with new
    element.parentNode.replaceChild(article, element);
    if (article.querySelectorAll('pre').length > 0) {
      exports.Syntax(article.querySelectorAll('pre'));
    }
  }
  
  function Single(element) {
    element.onload = function() {
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
  }
  
  function Multiple(elements) {
    //Check if any elements were found
    if (elements.length > 0) {
      for (var a = 0; a < elements.length; a++) {
        var element = elements[a];
        element.onload = function() {
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
      }
    } else {
      throw('The element is not defined or is not a DOM element.');
    }
  }
  
  /*============================================================
  ============================Public============================
  ============================================================*/
  exports.Docify = function(query, theme) {
    //Check if user is using their own style
    if (theme !== undefined) {
      exports.theme = theme.toLowerCase();
      exports.LoadStyle('Style/' + theme.toLowerCase() + '.css');
    } else {
      exports.theme = 'light';
    }
    //Check if there are multiple elements
    if (query.nodeType && query.nodeType == 1) {
      Single(query);
    } else {
      //Get Elements
      var elements = document.querySelectorAll(query);
      Multiple(elements);
    }
  };
  
  /*============================================================
  ============================Loader============================
  ============================================================*/
  exports.LoadScript = function(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://doctyp.github.io/src/' + url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };
  exports.LoadStyle = function(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'https://doctyp.github.io/src/' + url;
    link.media = 'none';
    link.onload = function() {
      if (link.media != 'all') {
        link.media = 'all';
      }
    };
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})({});
//Load Extra
DocTyp.LoadScript('extension.js');
