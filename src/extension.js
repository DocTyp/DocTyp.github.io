(function(exports) {
  /*============================================================
  ============================Header============================
  ============================================================*/
  exports.Header = function(doc) {
    for (key in header) {
      doc = doc.replace(header[key].regex, function(match) {
        var temp = Prepare(match).replace(header[key].pattern, '');
        return '<span class="' + prefix + key + '">' + temp + '</span>';
      });
    }
    return doc;
  };
  
  /*============================================================
  ============================Style=============================
  ============================================================*/
  exports.Style = function(doc) {
    for (key in style) {
      doc = doc.replace(style[key].regex, function(match) {
        var temp = Prepare(match).replace(style[key].pattern, '');
        return '<span class="' + prefix + key + '">' + temp + '</span>';
      });
    }
    return doc;
  };
  
  /*============================================================
  =============================Rule=============================
  ============================================================*/
  exports.Rule = function(doc) {
    for (key in rule) {
      doc = doc.replace(rule[key].regex, function(match) {
        return '<hr class="' + prefix + key + '"/>';
      });
    }
    return doc;
  };
  
  /*============================================================
  ============================Block=============================
  ============================================================*/
  exports.Block = function(doc) {
    for (key in block) {
      doc = doc.replace(block[key].regex, function(match) {
        var temp;
        if (key != 'pre-external') {
          temp = Prepare(match).replace(block[key].pattern, '');
        }
        if (key == 'code') {
          return '<code class="' + prefix + key + ' nohighlight language-none">' + Trim(temp) + '</code>';
        } else if (key == 'pre-external') {
          var extra = Prepare(match).replace(/(\[|\]|\`([\s\S]*?)\`)/gm, ''),
            language = extra.split('|')[0].toLowerCase(),
            url = 'Syntax/' + extra.split('|')[1].toLowerCase();
          temp = Prepare(match).replace(block[key].pattern, '');
          LoadScript(url + '/script.js');
          LoadStyle(url + '/' + scheme + '.css');
          return '<pre class="' + prefix + key + '"><code class="language-' + language + '">' + Trim(temp) + '</code></pre>';
        } else if (key == 'pre') {
          return '<pre class="' + prefix + key + '"><code class="nohighlight language-none">' + Trim(temp) + '</code></pre>';
        } else {
          return '<span class="' + prefix + key + '">' + Trim(temp) + '</span>';
        }
      });
    }
    return doc;
  };
  
  /*============================================================
  =============================List=============================
  ============================================================*/
  exports.List = function(doc) {
    return doc;
  };
  
  /*============================================================
  =============================Link=============================
  ============================================================*/
  exports.Link = function(doc) {
    return doc;
  };
  
  /*============================================================
  ===========================Cleaning===========================
  ============================================================*/
  exports.Prepare = function(doc) {
    return doc.replace(/\<(\/)?span(.*?)\>/gm, '');
  };
  exports.Trim = function(doc) {
    return doc.replace(/(^\s+|\s+$)/gm, '');
  };
  exports.Clean = function(doc) {
    return doc.replace(/\n/gm, '<br/>');
  };
  
  /*============================================================
  ============================Export============================
  ============================================================*/
  return exports;
})(DocTyp || {});
