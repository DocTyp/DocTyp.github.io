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
    element - HTML DOM Element or Tag-, Class- or ID Name of a HTML DOM Element.
    theme - You can optionally set the style to Dark or Light.
    doc - The elements text that will be Docified.
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
  function Single(element, theme) {
    //Check if element is an element
    if (element.nodeType && element.nodeType == 1) {
      //Adding class to element
      element.setAttribute('class', 'doctyp');
      //Check if user is using their own style
      if (theme !== undefined) {
        exports.theme = theme.toLowerCase();
        exports.LoadStyle('Style/' + theme.toLowerCase() + '.css');
      } else {
        exports.theme = 'light';
      }
      //Cater for older browsers
      var doc = element.innerText ? element.innerText : element.textContent;
      //Processing
      doc = exports.Header(doc);
      doc = exports.Style(doc);
      doc = exports.Rule(doc);
      doc = exports.Block(doc);
      doc = exports.List(doc);
      doc = exports.Clean(doc);
      //Replace text with new text
      element.innerHTML = doc;
    } else {
      throw('The element is not defined or is not a DOM element.');
    }
  }
  
  function Multiple(elements, theme) {
    for (element in elements.nodeList) {
      console.log(element);
      //Check if element is an element
      if (element.nodeType && element.nodeType == 1) {
        //Adding class to element
        element.setAttribute('class', 'doctyp');
        //Check if user is using their own style
        if (theme !== undefined) {
          exports.theme = theme.toLowerCase();
          exports.LoadStyle('Style/' + theme.toLowerCase() + '.css');
        } else {
          exports.theme = 'light';
        }
        //Cater for older browsers
        var doc = element.innerText ? element.innerText : element.textContent;
        //Processing
        doc = exports.Header(doc);
        doc = exports.Style(doc);
        doc = exports.Rule(doc);
        doc = exports.Block(doc);
        doc = exports.List(doc);
        doc = exports.Clean(doc);
        //Replace text with new text
        element.innerHTML = doc;
      } else {
        throw('The element is not defined or is not a DOM element.');
      }
    }
  }
  
  /*============================================================
  ============================Public============================
  ============================================================*/
  exports.Docify = function(element, theme) {
    //Check if element is an element
    if (element.nodeType && element.nodeType == 1) {
      Single(element, theme);
    } else {
      //Detecting if Tag-, Class- or ID Name
      var object = document.getElementsByTagName(element) ||
        document.getElementById(element) ||
        document.getElementsByClassName(element);
      //Check if more than one element
      if (!object.length) {
        Single(object, theme);
      } else {
        Multiple(object, theme);
      }
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
