var LoadScript = function(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://doctyp.github.io/src/' + url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

var LoadStyle = function(url) {
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

var DocTypBeta = (function(exports) {
  return exports;
})({});
