var Settings = (function(E) {
  E.class = 'doctyp-';
  E.header = {
    'header4': {remove: /\#{4,}/gm, regex: /\#{4,}.+/gm},
    'header3': {remove: /\#{3}/gm, regex: /\#{3}.+/gm},
    'header2': {remove: /\#{2}/gm, regex: /\#{2}.+/gm},
    'header1': {remove: /\#/gm, regex: /\#.+/gm}
  };
  E.text = {
    'bold': {remove: /\*{2}/gm, regex: /\*{2}(?!\*{2,})(.*?)\*{2}/gm},
    'italic': {remove: /\*/gm, regex: /\*(?!\*{3,})(.*?)\*/gm},
    'underline': {remove: /\_/gm, regex: /\_{2}(?!\_{2,})(.*?)\_{2}/gm},
    'strike': {remove: /\~/gm, regex: /\~{2}(?!\~{2,})(.*?)\~{2}/gm},
    'highlight': {remove: /\=/gm, regex: /\={2}(?!\={2,})(.*?)\={2}/gm},
    'superscript': {remove: /\+/gm, regex: /\+{2}(?!\+{2,})(.*?)\+{2}/gm},
    'subscript': {remove: /\-/gm, regex: /\-{2}(?!\-{2,})(.*?)\-{2}/gm}
  };
  E.rule = {
    'rule-solid': {remove: /[]/gm, regex: /\_{4,}/gm},
    'rule-dash': {remove: /[]/gm, regex: /\-{4,}/gm},
    'rule-dotted': {remove: /[]/gm, regex: /\.{4,}/gm},
    'rule-double': {remove: /[]/gm, regex: /\={4,}/gm},
    'rule-thick': {remove: /[]/gm, regex: /\+{4,}/gm}
  };
  E.quote = {
    'quote-code': {remove: /\`/gm, regex: /\`(.*?)\`/gm},
    'quote-extra': {remove: /[]/gm, regex: /\[(.*?)\]\{\[([\s\S]*?)\]\}/gm},
    'quote-plain': {remove: /(\{\[([\s\n]{1,})?|([\s\n]{1,})?\]\})/gm, regex: /\{\[([\s\S]*?)\]\}/gm}
  };
  E.code = {
    'code-extra': {remove: /[]/gm, regex: /\[(.*?)\]\{\(([\s\S]*?)\)\}/gm},
    'code-plain': {remove: /(\{\(([\s\n]{1,})?|([\s\n]{1,})?\)\})/gm, regex: /\{\(([\s\S]*?)\)\}/gm}
  };
  E.list = {
    'list-disc': {remove: /(\-)/gm, regex: /(^\-(?!\-{3,}).+\n){1,}/gm},
    'list-circle': {remove: /(\*)/gm, regex: /(^\*(?!\*{3,}).+\n){1,}/gm},
    'list-square': {remove: /(\@)/gm, regex: /(^\@(?!\@{3,}).+\n){1,}/gm},
    'list-decimal': {remove: /(\o\.)/gm, regex: /(^\o\..+\n){1,}/igm},
    'list-roman': {remove: /(\i\.)/gm, regex: /(^\i\..+\n){1,}/igm},
    'list-alpha': {remove: /(\a\.)/gm, regex: /(^\a\..+\n){1,}/igm},
    'checklist': {remove: /\[[Xx\s]?\]/gm, regex: /(^\[[Xx\s]?\].+\n){1,}/gm}
  };
  E.link = {
    'url': {remove: /[]/gm, regex: /(\[(.*?)\]\((.*?)(https?|ftp|file)\:\/{2}(.*?)\)|\b((https?|ftp|file)\:\/{2}([\w\d\.]+)([\/\?\&\w\d\=\,\.\+\:\;\@\$\%\#\!\_\-]+)?)\b)/gm},
    'email': {remove: /[]/gm, regex: /\b(([\w\d\.\_\%\+\-]+)\@([\w\d\.\-]+)(\.\w{2,}))\b/gm}
  };
  E.image = {
    'image-extra': {remove: /[]/gm, regex: /\[(.*?)\]\!\((.*?)\)/gm},
    'image-plain': {remove: /(\!\(|\))/gm, regex: /\!\((.*?)\)/gm},
    'image-grid': {remove: /(\{\!([\s\n]{1,})?|([\s\n]{1,})?\!\})/gm, regex: /\{\!([\s\S]*?)\!\}/gm}
  };
  E.table = {
    'table': {remove: /\=/gm, regex: /\{\|([\s\S]*?)\|\}/gm}
  };
  return E;
})({});
