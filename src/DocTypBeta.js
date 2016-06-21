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
  return function(url, async) {
    async = (typeof async !== 'undefined') ? async : true;
    var script = document.createElement('script'),
      ref = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.async = async;
    script.src = url;
    ref.appendChild(script);
  };
})();
/*============================================================
==========================LoadStyle===========================
============================================================*/
var LoadStyle = (function() {
  return function(url, async = true) {
    async = (typeof async !== 'undefined') ? async : true;
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
  };
})();
LoadScript('https://doctyp.github.io/src/Settings.js', false);
LoadScript('https://doctyp.github.io/src/Modules.js', false);
/*========================================================================================================================
==========================================================================================================================
========================================================================================================================*/
var DocTypBeta = (function(S, M) {
  //DocTyp with arguments
  return function(query, theme) {
    //Check if the Modules exist yet
    if ((typeof S !== 'undefined') && (typeof M !== 'undefined')) {
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
