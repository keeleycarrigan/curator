## Demo Style Guide

Main Curator CSS file:

```
<link rel="stylesheet" href="/assets/css/curator.css">
```

Main Curator JS file:

```
<script src="/assets/js/curator.js"></script>
```

#### Colors

<ul class="c-swatch-list">
	<li class="c-swatch-item">
		<figure class="c-swatch" style="border-top-color: #BDDEDC;"></figure>
		<figcaption>
			<h6 class="c-heading-6">$c-color-1</h6>
			<p>#68B3AF</p>
		</figcaption>
	</li>

	<li class="c-swatch-item">
		<figure class="c-swatch" style="border-top-color: #9BCDCA;"></figure>
		<figcaption>
			<h6 class="c-heading-6">$c-color-2</h6>
			<p>#68B3AF</p>
		</figcaption>
	</li>

	<li class="c-swatch-item">
		<figure class="c-swatch" style="border-top-color: #68B3AF;"></figure>
		<figcaption>
			<h6 class="c-heading-6">$c-color-3</h6>
			<p>#68B3AF</p>
		</figcaption>
	</li>

	<li class="c-swatch-item">
		<figure class="c-swatch" style="border-top-color: #458986;"></figure>
		<figcaption>
			<h6 class="c-heading-6">$c-color-4</h6>
			<p>#68B3AF</p>
		</figcaption>
	</li>
	<li class="c-swatch-item">
		<figure class="c-swatch" style="border-top-color: #346765;"></figure>
		<figcaption>
			<h6 class="c-heading-6">$c-color-5</h6>
			<p>#68B3AF</p>
		</figcaption>
	</li>
</ul>

#### Markdown Syntax Guide

View `styleguide/overview.md` for source code. Curator examples from [Markdown Here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#lines)

##### Paragraphs & Links

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

[I'm an inline-style link](https://www.google.com)

##### Images

Adding images:

```
![alt text](http://www.fillmurray.com/200/300 "Some Bill Murray")
```

![alt text](http://www.fillmurray.com/200/300 "Some Bill Murray")

##### Line Breaks

Line breaks can be made by hitting `space` twice at the end of a line.    
Or you can hit `enter` twice between lines--

--for an empty line You can also achieve this with two spaces on empty lines.

##### Lists

1. First ordered list item
2. Another item
  * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.  
   Note that this line is separate, but within the same paragraph.  
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)


* Unordered list can use asterisks
  * Unordered sub-list.
- Or minuses
+ Or pluses

##### Code Blocks

Inline `code` has `back-ticks around` it.  

Blocks of code are either fenced by lines with three back-ticks ```, or are indented with four spaces. I recommend only using the fenced code blocks -- they're easier and only they support syntax highlighting.

```javascript
var s = "JavaScript syntax highlighting";

alert(s);
```

##### Inline HTML

You can also use raw HTML in your Markdown. All markdown has Curator specific classes on it so Curator styles don't mingle with your styleguide styles. See the completely unstyled headers below?  
  
**Tip** Separate your tags with an empty return so the Markdown compiler doesn't put random `p` tags between them.

<h1>Header 1</h1>

<h2>Header 2</h2>

<h3>Header 3</h3>

<h4>Header 4</h4>

<h5>Header 5</h5>

<h6>Header 6</h6>


##### Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

##### Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.


Quote break.


> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

##### Horizontal Rules

Three or more...

---

`---` Hyphens

***

`***` Asterisks

___

`___` Underscores
