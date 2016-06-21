# DocTyp

Create beautiful styled markdown documents that contain many features and useful functions. It is easy to learn and doesn't require hours of focus. Setting up a simple markdown document should only take a couple of minutes.

See Examples: [DocTyp](https://doctyp.github.io)


## Usage

###### URL
`https://doctyp.github.io/src/DocTyp.js`

**OR**

`https://doctyp.github.io/src/DocTyp.min.js`

*If you use the minified version it will load all the needed files in a minified verion.*

```html
<head>
  ...
  <script type="text/javascript" src="https://doctyp.github.io/src/DocTyp.min.js"></script>
  ...
</head>
<body onload="DocTyp('pre', 'Dark');">
  ...
  <pre>
    # Hello World!
  </pre>
  ...
</body>
```

**Parameters**
- `query`: You could specify the element by its Tag Name, Class, ID or by fetching it with JavaScript.
- `theme`: The theme is optional, Dark, Light or leave it blank for a custom theme.

*[Custom Styling Template](https://raw.githubusercontent.com/DocTyp/DocTyp.github.io/master/src/Style/Template.css)*

*If you don't want it in the body tag, you'll have to call `DocTyp('pre', 'Dark');` in an onload event or when the `document` is ready.*


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
- `__ Underline __`
- `~~ Strike ~~`
- `== Highlight ==`
- `Word++ Superscript ++`
- `Word-- Subscript --`

----

###### Horizontal Ruling
- `____`: Solid
- `----`: Dash
- `....`: Dotted
- `====`: Double
- `++++`: Thick

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
- `@ Unordered`: Square
- `o. Ordered`: Number
- `i. Ordered`: Roman
- `a. Ordered`: Letter
- `[X] Checked`
- `[ ] Unchecked`

*Ordered Lists increment automatically. e.g. No need for a., b., c., ...*

----

###### Links
- `doctypgithub@gmail.com`
- `https://doctyp.github.io`
- `[ Doctyp ]( https://doctyp.github.io )`

----

###### Images
Accepts: **https, http, ftp, file & Base64**
- `!( https://doctyp.github.io/Images/icon.png )`: Without Title
- `[ DocTyp Logo ]!( https://doctyp.github.io/Images/icon.png )`: With Title
- `{! ... !}`: Grid Layout
```
{!
[ DocTyp Logo ]!( https://doctyp.github.io/Images/icon.png )
[ DocTyp Logo ]!( https://doctyp.github.io/Images/icon.png )
!}
```

----

###### Tables
```
{|
== Title 1
== Title 2
||
= Row 1 Col 1
= Row 1 Col 2
||
= Row 2 Col 1
= Row 2 Col 2
|}
```


## Example
###### HTML
```html
<pre class="doctyp" id="doctyp">
# Hello World!

[JavaScript|Highlight]{(
var msg = 'Hello World!';
alert(msg);
)}
</pre>
```

###### JavaScript
```javascript
//External Syntax Highlighting will be adjusted to the selected DocTyp Theme
//You can specify Tag-, Class- or ID Name
DocTyp.Docify('.doctyp');//, 'Light');

//OR

//document.getElementsByTagName('pre')[0] for selected elements
var element = document.getElementsByTagName('pre');
DocTyp.Docify(element, 'Dark');
```

###### Output
# Hello World!

```javascript
var msg = 'Hello World!';
alert(msg);
```


## Credit

Credit is given to all the Syntax Highlighting Services:

- [Highlight](https://highlightjs.org)
- [Prettify](https://github.com/google/code-prettify)
- [Prism](http://prismjs.com)
- [Rainbow](https://craig.is/making/rainbows)
- [SHJS](http://shjs.sourceforge.net)
