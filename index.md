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

Best Practices
--------------

### Pillars of Front-end Development

*	Separation of presentation, content, and behavior.
*	[Markup should be well-formed, semantically correct](http://www.bbc.co.uk/guidelines/futuremedia/technical/semantic_markup.shtml) and [generally valid](#validation).
*	[Javascript should progressively enhance](http://icant.co.uk/articles/pragmatic-progressive-enhancement/) the experience

### Links
When putting example links within front end code which will be integrated at a later date use href="none" instead of href="#". These will then show up when we crawl for broken links.

		<a href="none">link</a>


### Media

*	Always have the logo as a single img on the page. This will enable it to be picked up easily when the page is shared with social sites.
*	Put all media including images which will end up being added by the CMS in to the /cms-content folder within the root of the site

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

*	Make use of DL (definition lists) and BLOCKQUOTE, when appropriate.
*	Use label fields to label each form field, the for attribute should associate itself with the input field, so users can click the labels. cursor:pointer; on the label is wise, as well. note 1 note 2
*	Do not use the size attribute on your input fields. The size attribute is relative to the font-size of the text inside the input. Instead use css width.
*	Place an html comment on some closing div tags to indicate what element you're closing. It will help when there is lots of nesting and indentation.
*	Tables shouldn't be used for page layout (duh).
*	Use microformats where appropriate, specifically hCard and adr.
*	Always use title-case for headers and titles. Do not use **ALL CAPS** or all **lowercase** titles in markup, instead apply the CSS property `text-transform:uppercase/lowercase`.

#### Lists
*	Items in list form should always be housed in a UL, OL, or DL, never a set of DIVs or Ps.
*	`<ul>` and `<ol>` type lists MUST have at least one `<li>` item.
*	All lists SHOULD be preceded by a header - `<h*>description</h*>` - that describes the content of the list as suggested in WCAG 2.0. This helps users with assistive technologies to understand the semantics of the list.

	*	[http://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/H42.html#H42-ex1](http://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/H42.html#H42-ex1)
	*	[http://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/H69.html#H69-ex2](http://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/H69.html#H69-ex2)
	*	[http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.5](http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.5)

	##### Adding a header to indicate the list is navigation
	
		<!-- Logo, banner graphic, search form, etc.  -->
		<h2>Navigation</h2>
		<ul>
			<li><a href="about.htm">About us</a></li>
			<li><a href="contact.htm">Contact us</a></li>
			...
		</ul>
		<h2>All about headings</h2>
		<!-- Text, images, other material 
			 making up the main content... --> 

	##### These headers can be visually hidden if not present on the design.
	
		<h2 class="visuallyhidden">Navigation</h2>
	


CSS
---

### Specificity

CSS [Specificity](http://www.w3.org/TR/CSS2/cascade.html#specificity) is a standard which is surprisingly misunderstood and missused.

In this example, the color of the P element would be green. The declaration in the "style" attribute will override the one in the STYLE element because of cascading rule 3, since it has a higher specificity.	

	// simply put calculate using the concatenated 
	// number from style|id|class|element
	// eg: 0|1|0|0 = 100, 0|1|0|12 = 1012
	*	            {}  /*	a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
	li            {}  /*	a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
	li:first-line {}  /*	a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
	ul li         {}  /*	a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
	ul ol+li      {}  /*	a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
	h1 + *[rel=up]{}  /*	a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
	ul ol li.red  {}  /*	a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
	li.red.level  {}  /*	a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
	#x34y         {}  /*	a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
	style=""          /*	a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */

	<HEAD>
		<STYLE type="text/css">
			#x97z { color: red }
		</STYLE>
	</HEAD>
	<BODY>
		<P ID=x97z style="color: green">
	</BODY>

*	We structure and separate code in to semantically named CSS files. 
*	Try to use the least specific css selector needed to achieve a style

#### Useful articles
*	[Specificity Spec](http://www.w3.org/TR/CSS2/cascade.html#specificity)
*	[CSS Specificity And Inheritance](http://www.smashingmagazine.com/2010/04/07/css-specificity-and-inheritance/)
*	[CSS: Specificity Wars](http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html)

### Inline Styles

We strive to maintain proper separation of content and design, and therefore highly discourage the use of inline style="..." attributes. This not only makes maintenance a nightmare, but inextricably ties the presentation to the data it represents.

Note: An exception to this rule is style="display:none" for revealing hidden elements via JavaScript.

### CSS Validation

It's likely not a wise use of time to validate your CSS with the W3C validator, though it may identify a few problems.

### CSS Formatting

Some developers prefer css properties on their own line. Others prefer putting them next to eachother and doing one rule per line. Both are good approaches; at the outset of development, the project team should decide which they want to do.

### Pixels vs. Ems

We use the em unit of measurement to define `font-size`, because it is the most accessible way to allow text resizing cross browser. We realise that from IE7 you can use zoom but we have decided this isn't quite the same thing. 

However we only use ems for `font-size` and not for `margin` or `padding`. All other units should be in px or % where appropriate.

Additionally, unit-less `line-height` is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the `font-size`.

#### Correct

	#selector {
		font-size: 13px;
		line-height: 1.5;  /*	 13 *	1.5 = 19.5 ~ Rounds to 20px. */
	}

#### Incorrect

	/*	 Equivalent to 13px font-size and 20px line-height, 
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
*	[MSDN HasLayout Overview](http://msdn.microsoft.com/en-us/library/bb250481.aspx)
*	[http://www.satzansatz.de/cssd/onhavinglayout.html](http://www.satzansatz.de/cssd/onhavinglayout.html)

### Shorthand

In general, CSS shorthand is preferred because of its terseness, and the ability to later go back and add in values that are already present, such as the case with margin and padding. 

*	Developers should be aware of Top, Right, Bottom, Left, denoting the order in which the sides of an element are defined, in a clock-wise manner. 
	
	#### If bottom is undefined, it inherits its value from top. 
		
		.pad { padding: 10px 0; } // equivalent: 10px 0 10px 0
	
	#### Likewise, if left is undefined, it inherits its value from right. 
		
		.pad { padding: 0 10px 2px; } // equivalent: 0 10px 2px 10px
		
	#### If only the top value is defined, all sides inherit from that one declaration.
		
		.pad { padding: 10px; } // equivalent: 10px 10px 10px 10px

For more on reducing stylesheet code redundancy, and using CSS shorthand in general:
*	[http://qrayg.com/journal/news/css-background-shorthand](http://qrayg.com/journal/news/css-background-shorthand)
*	[http://sonspring.com/journal/css-redundancy](http://sonspring.com/journal/css-redundancy)
*	[http://dustindiaz.com/css-shorthand](http://dustindiaz.com/css-shorthand)

### General coding principles
*	Add css through external files.
*	Css links should always be in the `<head>` of the document and before any `<script>` declarations.
*	Use the `<link />` tag to include, never the @import.
  Including a stylesheet
  
		<link rel="stylesheet" type="text/css" href="myStylesheet.css" />
	
*	Don't use inline styling

		<p style="font-size: 12px; color: #FFFFFF">This is poor form, I say</p>

*	Don't include styles inline in the document, either in a style tag or on the elements. It's harder to track down style rules.
*	Use a reset css file (like Eric Meyers reset) to zero our cross-browser weirdness.
*	Use a font-normalization file like YUI fonts.css
*	Elements that occur only once inside a document should use IDs, otherwise, use classes.
*	Understand cascading and selector specificity so you can write very terse and effective code.
*	Write selectors that are optimized for speed. Aka:
	*	where possible, avoid expensive css selectors. 
	*	Avoid the *	wildcard selector. 
	*	Don't qualify ID selectors (e.g. div#myid) or class selectors (e.g. table.results) unless its neccessary for readability or for efficiency. 
  
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

*	For repeating images, use something larger than 1x1 pixels
*	You should never be using spacer images.
*	Use CSS sprites generously. They make hover states easy, improve page load time, and reduce carbon dioxide emissions.
*	Typically, all images should be sliced with a transparent background (PNG8). All should be cropped tightly to the image boundaries.

	*	However, the logo should always have a background matte and have padding before the crop. (so other people can hotlink to the file)

JavaScript
----------

### General coding principles
*	99% of code should be housed in external javascript files. They should be included at the END of the BODY tag for maximum page performance.
*	Don't rely on the user-agent string if you don't have to. Do proper feature detection. (More at [Dive Into HTML5: Detection](http://diveintohtml5.org/detect.html) & [jQuery.support docs](http://api.jquery.com/jQuery.support/))
*	Don't use `document.write()`.
*	All Boolean variables should start with "is". Test for positive conditions

		isValid = (test.value >= 4 && test.success);

*	Name variables and functions logically: For example, popUpWindowForAd rather than myWindow.
*	Large blocks of code should be separated by flowerbox comments to indicate chapters of the file.
*	Constants or configuration variables (like animation durations, etc.) should be at the top of the file.
*	Strive to create functions which can be generalized, take parameters, and return values. This allows for substantial code reuse and, when combined with includes or external scripts, can reduce the overhead when scripts need to change.

	*	For example, instead of hard coding a pop-window with window size, options, and url, consider creating:
            
            function(size, url, options){ ... }.
	
*	Comment your code! It helps reduce time spent troubleshooting JavaScript functions.
*	Don't waste your time with <!-- --> comments surrounding your inline javascript, unless you care about Netscape 4. :)
*	Surround your inline javascript with `<![CDATA[ ]]>` if you're working in XHTML.
*	Minimize global variables.
*	When specifying any global variable, clearly identify it

		window.globalVar = { ... }

### White-space

In general, the use of whitespace should follow longstanding English reading conventions. Such that, there will be one space after each comma and colon (and semi-colon where applicable), but no spaces immediately inside the right and left sides of parenthesis. In short, we advocate readability within reason. Additionally, braces should always appear on the same line as their preceding argument.

#### Consider the following examples of a JavaScript for-loop...

##### Correct

	for (var i = 0, j = arr.length; i < j; i++) {
		// Do something.
	}

##### Incorrect

	for ( var i = 0, j = arr.length; i < j; i++ )
	{
		// Do something.
	}

##### Also incorrect

	for(var i=0,j=arr.length;i<j;i++){
		// Do something.
	}


### Intellisense and Documenting
*	[JsDoc Toolkit](http://code.google.com/p/jsdoc-toolkit-vsdoc/)
*	[Javascript Intellisense in Visual Studio "Orcas"](http://weblogs.asp.net/scottgu/archive/2007/04/24/javascript-intellisense-in-visual-studio-orcas.aspx)
*	[VS 2008 JavaScript Intellisense](http://weblogs.asp.net/scottgu/archive/2007/06/21/vs-2008-javascript-intellisense.aspx)
*	[JavaScript Intellisense Improvements with VS 2010](http://weblogs.asp.net/scottgu/archive/2010/04/08/javascript-intellisense-improvements-with-vs-2010.aspx)
*	[VS Intellisense Comments](http://weblogs.asp.net/bleroy/archive/2007/04/23/the-format-for-javascript-doc-comments.aspx)


Accessibility
-------------

We take a lot of care to ensure that our web sites are accessible. Not only is it required by law but more site visitors will enjoy a better browsing experience. You will also find that as a result the site's discoverability will improve which mean it's easier to index by search engines. Google will love you!

*   Take a look at the [pixels vs ems](#pixels_vs_ems) section.

Here is an example of a stylesheet which a visually impaired user can add to a browser to apply styles across websites.

    /*Copyright 2002 One Format Design - 011000 - version 0703*/
    /*Code:*/
    body {background: none #FFFFFF !important}
    body * {background: none #FFFFFF !important}
    img {background-color: #FFFFFF !important}
    input {background-color: #DEDEDE !important}
    option {background-color: #DEDEDE !important}
    textarea {background-color: #DEDEDE !important}
    body {color: #00193E !important}
    body * {color: #00193E !important}
    font {color: #00193E !important}
    a:link {color: #0035FA !important}
    a:link * {color: #0035FA !important}
    a:visited {color: #0035FA !important}
    a:visited * {color: #0035FA !important}
    a:hover {color: #FE660D !important}
    a:hover * {color: #FE660D !important}
    a:active {color: #FE660D !important}
    a:active * {color: #FE660D !important}
    input {color: #00193E !important}
    option {color: #00193E !important}
    textarea {color: #00193E !important}
    h1,h2,h3,h4,h5,h6 {color: #00193E !important}
    h1 font,h2 font,h3 font,h4 font,h5 font,h6 font {color: #00193E !important}
    body {font-family: Arial, Verdana, Helvetica, sans-serif !important}
    body * {font-family: Arial, Verdana, Helvetica, sans-serif !important}
    body {font-size: 11pt !important}
    body * {font-size: 11pt !important}
    h1 {font-size: 1.50em !important}
    h2 {font-size: 1.25em !important}
    h3 {font-size: 1.15em !important}
    h4,h5,h6 {font-size: 1.0em !important}
    h1 font {font-size: 1.0em !important}
    h2 font {font-size: 1.0em !important}
    h3 font {font-size: 1.0em !important}
    h4 font,h5 font,h6 font {font-size: 1.0em !important}
    * {font-style: normal !important}
    * {line-height: 1.3 !important}
    * {text-decoration: none !important}
    input {height: 1.7em !important}
    option {height: 1.7em !important}
    textarea {height:       !important}


ARIA -Accessible Rich Internet Applications TODO
------------------------------------------------

Perception:
Widgets aren't percieved like we do as contained items

Roles and regions

*	[Roles](http://www.w3.org/WAI/PF/aria/roles.html)
*	[Regions](http://www.w3.org/WAI/PF/aria/rdf_model.svg)

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
	

Progressive Enhancement and Feature Detection TODO
--------------------------------------------------

Progressive enhancement is an approach to web development that aims to deliver the best possible experience to the widest possible audience - whether your users are viewing your sites on an iPhone, a high-end desktop system, a Kindle, or hearing them on a screen-reader, their experience should be as fully featured and functional as possible.

*   [Articles on progressive enhancement from the Filament Group](http://www.filamentgroup.com/lab/tag/progressive_enhancement/)

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


Forms TODO
----------
*	For compound elements (where text is used to label a form element), the `<label>` tag MUST be used to explicitly associate the relevant text label with its form element.
*	This MUST be done using a 'for' attribute on the label and a pairing 'id' attribute on the element.
	
		<label for="apple">apple</label><input id="apple" />.

*	A label-input pair SHOULD NOT be contained in a `<dl>`, as this provides no additional structural information.


We have different types of forms

*	form-stack
*	form-margin

Demo: http://the-taylors.org/standards/forms.htm

Validation TODO
---------------
Validation
 

References
----------
Thanks to the following sites for inspiration and reuse.

*	[XHTML Integrity Standards](http://www.bbc.co.uk/guidelines/futuremedia/technical/xhtml_integrity.shtml)
*	[Fellowship Technologies - Design Patterns and Code Standards](http://developer.fellowshipone.com/patterns/code.php)
*	[Isobar Code Standards & Front-End Development Best Practices](http://na.isobar.com/standards/)
*   [Code Conventions for the JavaScript Programming Language](http://javascript.crockford.com/code.html)