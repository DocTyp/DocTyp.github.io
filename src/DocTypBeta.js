/*
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
/*============================================================
==========================LoadFiles===========================
============================================================*/
LoadScript('https://doctyp.github.io/src/Settings.js');
LoadScript('https://doctyp.github.io/src/Modules.js');
/*============================================================
============================DocTyp============================
============================================================*/
var DocTypBeta = (function() {
  //DocTyp with arguments
  return function(query, theme) {
    //Check if the Modules exist yet
    if ((typeof Settings !== 'undefined') && (typeof Modules !== 'undefined') {
      //Check if theme was assigned
      if (typeof theme !== 'undefined') {
        //Setting it to lower case
        theme = theme.toLowerCase();
        //Saving the theme
        Settings.theme = theme;
        //Loading the theme
        LoadStyle('https://doctyp.github.io/src/Style/' + theme + '.css');
      } else {
        //Saving the default theme
        Settings.theme = 'light';
      }
      //Check if there are multiple elements
      if (query.nodeType && query.nodeType == 1) {
        //Processing Elements
        Modules.SingleQuery(query);
      } else {
        //Get Elements
        var elements = document.querySelectorAll(query);
        //Processing Elements
        Modules.MultipleQuery(elements);
      }
    }
  };
})();
