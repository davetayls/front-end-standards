---
title: Front-End Standards
layout: master
---

Front-End Code Standards and Best Practices
===========================================

	 ///,        ////
	 \  /,      /  >.
	  \  /,   _/  /.
	   \_  /_/   /.
		\__/_   <    TIME TO
		/<<< \_\_    FLY
	   /,)^>>_._ \
	   (/   \\ /\\\
			// ````
	 ======((`=======
	// I am loving ascii art, inspired by looking at Paul Irish's source ;o)

Best Practices
--------------

### Pillars of Front-end Development

* Separation of presentation, content, and behavior.
* [Markup should be well-formed, semantically correct](http://www.bbc.co.uk/guidelines/futuremedia/technical/semantic_markup.shtml) and [generally valid](#validation).
* [Javascript should progressively enhance](http://icant.co.uk/articles/pragmatic-progressive-enhancement/) the experience

### Links
When putting example links within front end code which will be integrated at a later date use href="none" instead of href="#". These will then show up when we crawl for broken links.

		<a href="none">link</a>


### Media

* Always have the logo as a single img on the page. This will enable it to be picked up easily when the page is shared with social sites.
* Put all media including images which will end up being added by the CMS in to the /cms-content folder within the root of the site

### Indentation
For all code languages, we require indentation to be done via soft tabs (using the space character). Hitting Tab in your text editor shall be equivalent to **four spaces**

Markup
------

HTML5 is a new version of HTML and XHTML. The [HTML5 draft specification](http://dev.w3.org/html5/spec/Overview.html) defines a single language that can be written in HTML and XML. It attempts to solve issues found in previous iterations of HTML and addresses the needs of Web Applications, an area previously not adequately covered by HTML. ([source](http://html5.org/))

### Doctype

#### HTML 5
A nice aspect of HTML5 is that it streamlines the amount of code that is required. Meaningless attributes have been dropped, and the DOCTYPE declaration has been simplified significantly. Additionally, there is no need to use CDATA to escape inline JavaScript, formerly a requirement to meet XML strictness in XHTML.

	<!DOCTYPE html>

Developers are also need to support legacy sites running xhtml doctypes:

#### XHTML 1.0 Strict Doctype

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

#### XHTML 1.0 Transitional Doctype

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	

### Coding Practices

* Make use of DL (definition lists) and BLOCKQUOTE, when appropriate.
* Items in list form should always be housed in a UL, OL, or DL, never a set of DIVs or Ps.
* Use label fields to label each form field, the for attribute should associate itself with the input field, so users can click the labels. cursor:pointer; on the label is wise, as well. note 1 note 2
* Do not use the size attribute on your input fields. The size attribute is relative to the font-size of the text inside the input. Instead use css width.
* Place an html comment on some closing div tags to indicate what element you're closing. It will help when there is lots of nesting and indentation.
* Tables shouldn't be used for page layout (duh).
* Use microformats where appropriate, specifically hCard and adr.
* Always use title-case for headers and titles. Do not use **ALL CAPS** or all **lowercase** titles in markup, instead apply the CSS property `text-transform:uppercase/lowercase`.

	
CSS
---

### Specificity

CSS [Specificity](http://www.w3.org/TR/CSS2/cascade.html#specificity) is a standard which is surprisingly misunderstood and missused.

In this example, the color of the P element would be green. The declaration in the "style" attribute will override the one in the STYLE element because of cascading rule 3, since it has a higher specificity.	

	// simply put calculate using the concatenated 
	// number from style|id|class|element
	// eg: 0|1|0|0 = 100, 0|1|0|12 = 1012
	*             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
	li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
	li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
	ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
	ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
	h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
	ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
	li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
	#x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
	style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */

	<HEAD>
		<STYLE type="text/css">
			#x97z { color: red }
		</STYLE>
	</HEAD>
	<BODY>
		<P ID=x97z style="color: green">
	</BODY>

* We structure and separate code in to semantically named CSS files. 
* Try to use the least specific css selector needed to achieve a style

#### Useful articles
* [Specificity Spec](http://www.w3.org/TR/CSS2/cascade.html#specificity)
* [CSS Specificity And Inheritance](http://www.smashingmagazine.com/2010/04/07/css-specificity-and-inheritance/)
* [CSS: Specificity Wars](http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html)

### Inline Styles

We strive to maintain proper separation of content and design, and therefore highly discourage the use of inline style="..." attributes. This not only makes maintenance a nightmare, but inextricably ties the presentation to the data it represents.

Note: An exception to this rule is style="display:none" for revealing hidden elements via JavaScript.

### CSS Validation

It's likely not a wise use of time to validate your CSS with the W3C validator, though it may identify a few problems.

### CSS Formatting

Some developers prefer css properties on their own line. Others prefer putting them next to eachother and doing one rule per line. Both are good approaches; at the outset of development, the project team should decide which they want to do.

### Pixels vs. Ems

We use the px unit of measurement to define font size, because it offers absolute control over text. We realize that using the em unit for font sizing used to be popular, to accommodate for Internet Explorer 6 not resizing pixel based text. However, all major browsers (including IE7 and IE8) now support text resizing of pixel units and/or full-page zooming. Since IE6 is largely considered deprecated, pixels sizing is preferred. Additionally, unit-less line-height is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the font-size.

#### Correct

	#selector {
		font-size: 13px;
		line-height: 1.5;  /*  13 * 1.5 = 19.5 ~ Rounds to 20px. */
	}

#### Incorrect

	/*  Equivalent to 13px font-size and 20px line-height, 
		but only if the browser default text size is 16px. */
	#selector {
		font-size: 0.813em;
		line-height: 1.25em;
	}

### Internet Explorer Bugs

Inevitably, when all other browsers appear to be working correctly, any and all versions of Internet Explorer will introduce a few nonsensical bugs, delaying time to deployment. While we encourage troubleshooting and building code that will work in all browsers without special modifications, sometimes it is necessary to use conditional if IE comments for CSS hooks we can use in our stylesheets. Read more on paulirish.com

#### Fixing IE

	<!--[if lt IE 7 ]> <body class="ie6"> <![endif]-->
	<!--[if IE 7 ]>    <body class="ie7"> <![endif]-->
	<!--[if IE 8 ]>    <body class="ie8"> <![endif]-->
	<!--[if IE 9 ]>    <body class="ie9"> <![endif]-->
	<!--[if !IE]><!--> <body> <!--<![endif]-->
	.box { float: left; margin-left: 20px; }
	.ie6 .box { margin-left: 10px; }


Stoyan Stefanov writes about how these [conditional comments can block downloads in some browsers](http://www.phpied.com/conditional-comments-block-downloads/) while interpreting these comments. He prescribes a successful method which involves the injection of an empty conditional comment before any substantive conditional comments.

	<!--[if IE]><![endif]-->
	<html lang="en">
		<head>
			<title>base page</title>
			<link type="text/css" rel="stylesheet" 
			href="http://tools.w3clubs.com/pagr/1.expires.css">
			<!--[if IE 6]>
				<link type="text/css" rel="stylesheet"
				href="http://tools.w3clubs.com/pagr/2.expires.css">
			<![endif]-->
			<!--[if IE 7]>
				<link type="text/css" rel="stylesheet"
				href="http://tools.w3clubs.com/pagr/3.expires.css">
			<![endif]-->
		</head>

#### ie HasLayout

There are several bugs in Internet Explorer that can be worked around by forcing "a layout" (an IE internal data structure) on an element (like, [dimensional bug fixes](http://www.communitymx.com/content/article.cfm?page=2&cid=C37E0) and [Holly hack](http://www.communitymx.com/content/article.cfm?page=2&cid=C37E0)). 

Most users are not aware of the implications of having "a layout" applied to an element. [This document](http://msdn.microsoft.com/en-us/library/bb250481.aspx) explains what happens when an element has a layout and what implications that has.

To begin with, there are two sets of elements.

Elements that rely on a parent element to size and arrange their contents
Elements that are responsible for sizing and arranging their own contents
In general, elements in Internet Explorer's Dynamic HTML engine are not responsible for arranging themselves. A `div` or a `p` element may have a position within the source-order and flow of the document, but their contents are arranged by their nearest ancestor with a layout (frequently `body`). These elements rely on the ancestor layout to do all the heavy lifting of determining size and measurement information for them.

**Note:** The element that is responsible for sizing and positioning an element may be an ancestor, not just the element's immediate parent.) The major benefits of each element not having its own layout are performance and simplicity.

**Keep Reading:**
* [MSDN HasLayout Overview](http://msdn.microsoft.com/en-us/library/bb250481.aspx)
* [http://www.satzansatz.de/cssd/onhavinglayout.html](http://www.satzansatz.de/cssd/onhavinglayout.html)

### Shorthand

In general, CSS shorthand is preferred because of its terseness, and the ability to later go back and add in values that are already present, such as the case with margin and padding. 

* Developers should be aware of Top, Right, Bottom, Left, denoting the order in which the sides of an element are defined, in a clock-wise manner. 
	
	#### If bottom is undefined, it inherits its value from top. 
		
		.pad { padding: 10px 0; } // equivalent: 10px 0 10px 0
	
	#### Likewise, if left is undefined, it inherits its value from right. 
		
		.pad { padding: 0 10px 2px; } // equivalent: 0 10px 2px 10px
		
	#### If only the top value is defined, all sides inherit from that one declaration.
		
		.pad { padding: 10px; } // equivalent: 10px 10px 10px 10px

For more on reducing stylesheet code redundancy, and using CSS shorthand in general:
* [http://qrayg.com/journal/news/css-background-shorthand](http://qrayg.com/journal/news/css-background-shorthand)
* [http://sonspring.com/journal/css-redundancy](http://sonspring.com/journal/css-redundancy)
* [http://dustindiaz.com/css-shorthand](http://dustindiaz.com/css-shorthand)

### General coding principles
* Add css through external files.
* Css links should always be in the `<head>` of the document and before any `<script>` declarations.
* Use the `<link />` tag to include, never the @import.
  Including a stylesheet
  
		<link rel="stylesheet" type="text/css" href="myStylesheet.css" />
	
* Don't use inline styling

		<p style="font-size: 12px; color: #FFFFFF">This is poor form, I say</p>

* Don't include styles inline in the document, either in a style tag or on the elements. It's harder to track down style rules.
* Use a reset css file (like Eric Meyers reset) to zero our cross-browser weirdness.
* Use a font-normalization file like YUI fonts.css
* Elements that occur only once inside a document should use IDs, otherwise, use classes.
* Understand cascading and selector specificity so you can write very terse and effective code.
* Write selectors that are optimized for speed. Aka:
	* where possible, avoid expensive css selectors. 
	* Avoid the * wildcard selector. 
	* Don't qualify ID selectors (e.g. div#myid) or class selectors (e.g. table.results) unless its neccessary for readability or for efficiency. 
  
  More on [writing efficient css on the MDC](https://developer.mozilla.org/en/Writing_Efficient_CSS).

#### Reasonable use of qualifying class selectors

	.error {color:#ff0000;}
	input[type=text].error, textarea.error {background-color:#ffe6e6;}
	select.error {border:1px solid #ff0000;}

#### Multiple classes and IE6.

	p.disclosure.warning { text-align: center; color: red; }

#### IE6 will ignore the earlier class rule and treat that rule like:

	p.warning { text-align: center; color: red; }

### Images

* For repeating images, use something larger than 1x1 pixels
* You should never be using spacer images.
* Use CSS sprites generously. They make hover states easy, improve page load time, and reduce carbon dioxide emissions.
* Typically, all images should be sliced with a transparent background (PNG8). All should be cropped tightly to the image boundaries.

	* However, the logo should always have a background matte and have padding before the crop. (so other people can hotlink to the file)

JavaScript
----------

### Intellisense and Documenting
* [JsDoc Toolkit](http://code.google.com/p/jsdoc-toolkit-vsdoc/)
* [Javascript Intellisense in Visual Studio "Orcas"](http://weblogs.asp.net/scottgu/archive/2007/04/24/javascript-intellisense-in-visual-studio-orcas.aspx)
* [VS 2008 JavaScript Intellisense](http://weblogs.asp.net/scottgu/archive/2007/06/21/vs-2008-javascript-intellisense.aspx)
* [JavaScript Intellisense Improvements with VS 2010](http://weblogs.asp.net/scottgu/archive/2010/04/08/javascript-intellisense-improvements-with-vs-2010.aspx)
* [VS Intellisense Comments](http://weblogs.asp.net/bleroy/archive/2007/04/23/the-format-for-javascript-doc-comments.aspx)


Accessibility
-------------

* It's the law!
* More site visitors
* Better browsing experience
* Google likes it
* Improves your image
* It's not just a "disabled issue".

ARIA -Accessible Rich Internet Applications
-------------------------------------------

Perception:
Widgets aren't percieved like we do as contained items

Roles and regions

* [Roles](http://www.w3.org/WAI/PF/aria/roles.html)
* [Regions](http://www.w3.org/WAI/PF/aria/rdf_model.svg)

A good start is to apply the `role` attribute to particular sections of the page. Here's a basic guide:

	<div id="search" role="search">
		<label for="search">Search</label>
		<input type="text" name="search" />
		...
	</div>
	<div id="nav-primary" role="navigation"></div>
	<div id="nav-secondary" role="navigation"></div>
	<ul id="breadcrumb" role="breadcrumbs">
		<li>Page</li>
	</ul>
	<div id="content" role="main"></div>
	

Progressive enhancement
-----------------------

* Javascript

Integrating common UI code
--------------------------

### Dynamic Tabs (jQuery)

	// Go to http://jqueryui.com/demos/tabs/ for full jQuery integration.
	<div class="nav-tabs">
		<ul class="nav-tabs-nav">
			<li><a href="#tabname">Tab Name</li>
		</ul>
		<div id="tabname" class="nav-tab"></div>
	</div>

### Static tab bar with links to separate pages

	<div class="nav-tabsTstatic">
		<ul class="nav-tabs-nav">
			<li><a href="#tabname">Tab Name</li>
		</ul>
		<div id="tabname" class="nav-tab"></div>
	</div>


Forms
-----

We have different types of forms

* form-stack
* form-margin

Demo:�http://the-taylors.org/standards/forms.htm

Validation
----------
Validation
�

References
----------
Thanks to the following sites for inspiration and reuse.

* [XHTML Integrity Standards](http://www.bbc.co.uk/guidelines/futuremedia/technical/xhtml_integrity.shtml)
* [Fellowship Technologies - Design Patterns and Code Standards](http://developer.fellowshipone.com/patterns/code.php)
* [ISOBAR CODE STANDARDS & FRONT-END DEVELOPMENT BEST PRACTICES](http://na.isobar.com/standards/)