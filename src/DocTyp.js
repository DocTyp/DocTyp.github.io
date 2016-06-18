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
    style - You can optionally set the style to Dark or Light.
    doc - The elements text that will be Docified.
*/
var DocTyp = (function(exports) {
  /*============================================================
  ===========================Variable===========================
  ============================================================*/
  
  /*============================================================
  ============================Private===========================
  ============================================================*/
  function LoadStyle(style) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'Style/' + style.toLowerCase() + '.css';
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
    return doc;
  }
  function Style(doc) {
    return doc;
  }
  function Rule(doc) {
    return doc;
  }
  function Block(doc) {
    return doc;
  }
  function List(doc) {
    return doc;
  }
  function Link(doc) {
    return doc;
  }
  function Clean(doc) {
    return doc.replace(/\n/gm, '<br/>');
  }
  
  /*============================================================
  ============================Public============================
  ============================================================*/
  exports.Docify = function(element, style) {
    //Check if element is an element
    if (element.nodeType && element.nodeType == 1) {
      //Check if user is using their own style
      if (style !== undefined) {
        LoadStyle(style);
      }
      //Make sure that the element text can still be fetched
      var doc = element.innerText ? element.innerText : element.textContent;
      //Processing
      doc = Header(doc);
      doc = Style(doc);
      doc = Rule(doc);
      doc = Block(doc);
      doc = List(doc);
      doc = Clean(doc);
      //Cater for older browsers
      if (element.innerText) {
        element.innerText = doc;
      } else {
        element.textContent = doc;
      }
    } else {
      throw('The element is not defined or is not a DOM element.');
    }
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})({});
