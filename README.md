# DocTyp



See Examples: [Images]()


## Usage
###### HTML
URL: `https://doctyp.github.io/src/DocTyp.js` **OR** `https://doctyp.github.io/src/DocTyp.min.js`

```html
<head>
  ...
  <script type="text/javascript" src="https://doctyp.github.io/src/DocTyp.min.js"></script>
  ...
</head>
<body>
  ...
  <pre>
    # Hello World!
  </pre>
  ...
</body>
```

###### JavaScript
**Parameters**
- `element`: You could specify the element by its Tag Name, Class, ID or by fetching it with JavaScript.
- `theme`: The theme is optional, Dark, Light or leave it blank for a custom theme.
```javascript
DocTyp.Docify('pre', 'Dark');
```


## Syntax
###### Headers
- `# Header 1`
- `## Header 2`
- `### Header 3`
- `#### Header 4`

----

###### Styling Text
- `** Bold **`
- `* Italic *`
- `_ Underline _`
- `~ Strike ~`
- `= Highlight =`
- `Word+ Superscript +`
- `Word- Subscript -`

----

###### Horizontal Ruling
- `____`: Solid
- `----`: Dash
- `....`: Dotted

----

###### Quoting Blocks
**Quoting Code**
```
` Quoting Code `
```
**Quoting Text**
```
{[ Quoting Text ]}
```
**Quoting Text with Credit**
```
[Credit]{[ Quoting Text ]}
```

----

###### Coding Blocks
**Preformatted Code**
```
{( Preformatted Code )}
```
**Preformatted Code with Syntax Highlighting**
```
[Language|Service]{( Preformatted Code )}
```
**Syntax Highlighting Services**
- [Highlight](https://highlightjs.org)
- [Prettify](https://github.com/google/code-prettify)
- [Prism](http://prismjs.com)
- [Rainbow](https://craig.is/making/rainbows)
- [SHJS](http://shjs.sourceforge.net)

----

###### Lists
- `- Unordered`: Solid Circle
- `* Unordered`: Empty Circle
- `# Unordered`: Square
- `0. Ordered`: Number
- `1. Ordered`: Roman
- `a. Ordered`: Letter
- `[X] Checked`
- `[ ] Unchecked`

*Ordered Lists increment automatically. e.g. No need for 1., 2., 3., ...*

----

###### Images
```
![ Alt Text ]( Path to Image )
```

----

###### Links
- `doctypgithub@gmail.com`
- `https://doctyp.github.io`
- `[ Doctyp ]( https://doctyp.github.io )`


## Example
###### Preformatted Code
```html
<pre class="doctyp" id="doctyp">
# Hello World!

[JavaScript|Prism]{(
var msg = 'Hello World!';
alert(msg);
)}
</pre>
```

###### JavaScript
```javascript
//External Syntax Highlighting will be adjusted to the selected DocTyp Theme
//All pre Tags with Dark theme
//document.getElementsByTagName('pre')[0] for selected index
var element = document.getElementsByTagName('pre');
DocTyp.Docify(element, 'Dark');
//OR
//You can specify Tag-, Class- or ID Name
//With no theme
DocTyp.Docify('.doctyp');//, 'Light');
```


## Credit

Credit is given to all the Syntax Highlighting Services:

- [Highlight](https://highlightjs.org)
- [Prettify](https://github.com/google/code-prettify)
- [Prism](http://prismjs.com)
- [Rainbow](https://craig.is/making/rainbows)
- [SHJS](http://shjs.sourceforge.net)
