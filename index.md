---
title: Front-End Standards
layout: master
---

Front-End Code Standards
========================

These standards are separated in to requirements which should be testable and guides to encourage further improvements and help with the requirements.

Revision History
----------------

13/07/2011
: Updates to [Javascript Requirements](#javascript-requirements)

05/04/2011
: Split layout in to requirements and guides
    


Code Structure
---------------

### Requirements

1.  Separation of presentation, content, and behavior.
    
    *   No css in style attributes in basic HTML output 

3.	[Javascript should progressively enhance](http://icant.co.uk/articles/pragmatic-progressive-enhancement/) the experience
4.  Links
    
    *   When putting example links within front end code which will be integrated at a later date use `href="none"` instead of `href="#"`. These will then show up when we crawl for broken links.

            <a href="none">link</a>

5.  Media

    *	Always have the logo as a single img on the page. This will enable it to be picked up easily when the page is shared with social sites.
    *	Put all media including images which will end up being added by the CMS in to the /cms-content folder within the root of the site

6.  Indentation

    *   We require indentation to be done via **soft tabs** (using the space character). Hitting Tab in your text editor shall be equivalent to **four spaces**

Markup
------

### Requirements {#markup-requirements}

1.  New projects should be coded using the HTML5 doctype

        <!DOCTYPE html>

2.  All markup should validate [with a few exceptions](#markup_validation_exceptions)
3.  All markup should work as expected without [CSS](#css) and [JavaScript](#javascript)
4.	Markup should be well-formed and [semantically correct](#semantics)
5.  A set of skip navigation links should be included near the beginning of the page
6.  [ID's and Classes](#ids_and_classes) should be used appropriately to aid good maintainability

#### Semantics

##### General
*	Tables shouldn't be used for page layout (duh).

##### Navigation and Lists
*   All navigation should be marked up using lists
*	Items in list form should always be housed in a UL, OL, or DL, never a set of DIVs or Ps.
*	`<ul>` and `<ol>` type lists MUST have at least one `<li>` item.
*	All lists SHOULD be preceded by a header that describes the content of the list. [See example](#lists-header).

#### Markup Validation Exceptions

*   _allowed_ : target attribute on `<a>` tags

        <a href="http://www.google.com" target="_blank">External Link</a>

### Guides {#markup-guides}

HTML5 is a new version of HTML and XHTML. The [HTML5 draft specification](http://dev.w3.org/html5/spec/Overview.html) defines a single language that can be written in HTML and XML. It attempts to solve issues found in previous iterations of HTML and addresses the needs of Web Applications, an area previously not adequately covered by HTML. ([source](http://html5.org/)). 

Developers are also need to support legacy sites running xhtml doctypes:


#### HTML 5
A nice aspect of HTML5 is that it streamlines the amount of code that is required. Meaningless attributes have been dropped, and the DOCTYPE declaration has been simplified significantly. Additionally, there is no need to use CDATA to escape inline JavaScript, formerly a requirement to meet XML strictness in XHTML.

	<!DOCTYPE html>

#### XHTML 1.0 Strict Doctype

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

#### XHTML 1.0 Transitional Doctype

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	

#### Coding Practices

*	Make use of DL (definition lists) and BLOCKQUOTE, when appropriate.
*	Do not use the size attribute on your input fields. The size attribute is relative to the font-size of the text inside the input. Instead use css width.
*	Place an html comment on some closing div tags to indicate what element you're closing. It will help when there is lots of nesting and indentation.
*	Use microformats where appropriate, specifically hCard and adr.
*	Always use title-case for headers and titles. Do not use **ALL CAPS** or all **lowercase** titles in markup, instead apply the CSS property `text-transform:uppercase/lowercase`.

#### IDs and Classes

We reduce the use of IDs to core structural elements such as the main header and footer and primay/secondary navigation.

Otherwise we only use IDs on content that should be accessed through a #tag in the url (this includes tabs). We don't use IDs on content based layouts such as 3 column navigation,body and aside containers.

Here is an example illustrating this:

    <body>
        <header id="mainHeader"></header>
        <nav id="nav-primary">...</nav>
        <div class="leftColumn">
            <nav id="nav-secondary">...</nav>
        </div>
        <div class="contentBody">
            ...
        </div>
        <aside class="contentAside">
        </aside>
        <footer id="mainFooter"></footer>
    </body>

#### Lists
*	Items in list form should always be housed in a UL, OL, or DL, never a set of DIVs or Ps.
*	`<ul>` and `<ol>` type lists MUST have at least one `<li>` item.
*	{#lists-header}All lists SHOULD be preceded by a header - `<h*>description</h*>` - that describes the content of the list as suggested in WCAG 2.0. This helps users with assistive technologies to understand the semantics of the list.

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

### Requirements {#css-requirements}

1.  No use of inline styles using the `style` attribute. [more](#inline_styles)
2.  CSS Validates with a [few exceptions](#css_validation)
3.  font-size should use ems. [more](#pixels_vs_ems)
4.  line-height values should be unitless ie: `line-height: 1.5`. [more](#pixels_vs_ems)
5.	Add css through external files.
6.	Css links should always be in the `<head>` of the document and before any `<script>` declarations.
7.	Use the `<link />` tag to include, never the @import.

        <link rel="stylesheet" type="text/css" href="myStylesheet.css" />

8.	Don't use inline styling

		<p style="font-size: 12px; color: #FFFFFF">This is poor form, I say</p>

9.	Use a reset css file ([like Eric Meyers reset](http://meyerweb.com/eric/thoughts/2007/05/01/reset-reloaded/)) to zero our cross-browser weirdness.
10.	Elements that occur only once inside a document should use IDs, otherwise, use classes.


### Guides {#css-guides}

#### General Principles

*	Use a font-normalization file like YUI fonts.css
*	Understand cascading and selector specificity so you can write very terse and effective code.
*	Write selectors that are optimized for speed. Aka:
	*	where possible, avoid expensive css selectors. 
	*	Avoid the *	wildcard selector. 
	*	Don't qualify ID selectors (e.g. div#myid) or class selectors (e.g. table.results) unless its neccessary for readability or for efficiency. 
  
  More on [writing efficient css on the MDC](https://developer.mozilla.org/en/Writing_Efficient_CSS).

#### Specificity

CSS [Specificity](http://www.w3.org/TR/CSS2/cascade.html#specificity) is a standard which is surprisingly misunderstood and missused.

In this example, the color of the P element would be green. The declaration in the "style" attribute will override the one in the STYLE element because of cascading rule 3, since it has a higher specificity.	

	// simply put calculate using the concatenated 
	// number from style|id|class|element
	// eg: 0|1|0|0 = 100, 0|1|0|12 = 1012
	*	          {}  /*	a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
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

##### Useful articles
*	[Specificity Spec](http://www.w3.org/TR/CSS2/cascade.html#specificity)
*	[CSS Specificity And Inheritance](http://www.smashingmagazine.com/2010/04/07/css-specificity-and-inheritance/)
*	[CSS: Specificity Wars](http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html)

#### Inline Styles

We strive to maintain proper separation of content and design, and therefore highly discourage the use of inline style="..." attributes. This not only makes maintenance a nightmare, but inextricably ties the presentation to the data it represents.

Note: An exception to this rule is style="display:none" for revealing hidden elements via JavaScript.

#### CSS Validation

We validate our CSS with the W3C validator. Because of the nature of cross browser CSS there are a few exceptions which we allow to pass.

*   We allow the use of the star hack to target ie6/ie7
    
        .className { *display: block; }

*   We allow the use of the zoom property (with or without the * hack) with a value of 1
    
        .className { zoom: 1; }

#### CSS Formatting

Some developers prefer css properties on their own line. Others prefer putting them next to eachother and doing one rule per line. Both are good approaches; at the outset of development, the project team should decide which they want to do.

#### Pixels vs. Ems

We use the em unit of measurement to define `font-size`, because it is the most accessible way to allow text resizing cross browser. We realise that from IE7 you can use zoom but we have decided this isn't quite the same thing. 

However we only use ems for `font-size` and not for `margin` or `padding`. All other units should be in px or % where appropriate.

Additionally, unit-less `line-height` is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the `font-size`.

##### Correct

	/*	 Equivalent to 13px font-size and 20px line-height, 
		but only if the browser default text size is 16px. */
	#selector {
		font-size: 0.813em;
		line-height: 1.5;  /*	 13 *	1.5 = 19.5 ~ Rounds to 20px. */
	}

##### Incorrect

	#selector {
		font-size: 13px;
		line-height: 1.25em;
	}

#### Internet Explorer Bugs

Inevitably, when all other browsers appear to be working correctly, any and all versions of Internet Explorer will introduce a few nonsensical bugs, delaying time to deployment. While we encourage troubleshooting and building code that will work in all browsers without special modifications, sometimes it is necessary to use conditional if IE comments for CSS hooks we can use in our stylesheets. Read more on paulirish.com

##### Fixing IE

    <!doctype html>
    <!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
    <!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
    <!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
    <!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    ...
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

##### ie HasLayout

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

#### Shorthand

In general, CSS shorthand is preferred because of its terseness, and the ability to later go back and add in values that are already present, such as the case with margin and padding. 

Developers should be aware of Top, Right, Bottom, Left, denoting the order in which the sides of an element are defined, in a clock-wise manner. 
	
*   If bottom is undefined, it inherits its value from top. 

        .pad { padding: 10px 0; } // equivalent: 10px 0 10px 0

*   Likewise, if left is undefined, it inherits its value from right. 

        .pad { padding: 0 10px 2px; } // equivalent: 0 10px 2px 10px

*   If only the top value is defined, all sides inherit from that one declaration.

        .pad { padding: 10px; } // equivalent: 10px 10px 10px 10px

For more on reducing stylesheet code redundancy, and using CSS shorthand in general:
*	[http://qrayg.com/journal/news/css-background-shorthand](http://qrayg.com/journal/news/css-background-shorthand)
*	[http://sonspring.com/journal/css-redundancy](http://sonspring.com/journal/css-redundancy)
*	[http://dustindiaz.com/css-shorthand](http://dustindiaz.com/css-shorthand)

##### Reasonable use of qualifying class selectors

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

### Requirements {#javascript-requirements}
#### General Principles
*	99% of code should be housed in external javascript files. They should be included at the END of the BODY tag for maximum page performance.
*	Don't rely on the user-agent string if you don't have to. Do proper feature detection. (More at [Modernizr](http://modernizr.com), [Dive Into HTML5: Detection](http://diveintohtml5.org/detect.html) & [jQuery.support docs](http://api.jquery.com/jQuery.support/))
*	Don't use `document.write()`.
*	Large blocks of code should be separated by flowerbox comments to indicate chapters of the file.
*	Constants or configuration variables (like animation durations, etc.) should be at the top of the file.
*	Strive to create functions which can be generalized, take parameters, and return values. This allows for substantial code reuse and, when combined with includes or external scripts, can reduce the overhead when scripts need to change.

	*	For example, instead of hard coding a pop-window with window size, options, and url, consider creating:
            
            function(size, url, options){ ... }.
	
*	Comment your code! It helps reduce time spent troubleshooting JavaScript functions.
*	Don't waste your time with <!-- --> comments surrounding your inline javascript, unless you care about Netscape 4. :)
*	Minimize global variables.
*	When specifying any global variable, clearly identify it

		window.globalVar = { ... }

#### Naming Conventions

*	All Boolean variables should start with "is". Test for positive conditions

		isValid = (test.value >= 4 && test.success);

*	Name variables and functions logically: For example, popUpWindowForAd rather than myWindow.
*   Prepend all variables which are a jQuery object with the `$` symbol (eg `$listItems`).

#### White-space

In general, the use of whitespace should follow longstanding English reading conventions. Such that, there will be one space after each comma and colon (and semi-colon where applicable), but no spaces immediately inside the right and left sides of parenthesis. In short, we advocate readability within reason. Additionally, braces should always appear on the same line as their preceding argument.

##### Consider the following examples of a JavaScript for-loop...

###### Correct

	for (var i = 0, j = arr.length; i < j; i++) {
		// Do something.
	}

###### Incorrect

	for ( var i = 0, j = arr.length; i < j; i++ )
	{
		// Do something.
	}

###### Also incorrect

	for(var i=0,j=arr.length;i<j;i++){
		// Do something.
	}

#### JsLint

We use [JsLint](http://www.jslint.com) to validate our JavaScript. We recognise that it can be a little strict and so in the defense of sanity we don't mind developers using the `/*jslint*/` comment block to relax the validation process. 

However the following should not be used:

*   cap
*   nomen
*   newcap
*   on

##### Here are a couple of articles which should help with using jsLint

*   [Include jsLint in your validation using nAnt, batch files or Ajax](http://the-taylors.org/blog/2010/05/25/including-jslint-in-your-validation-using-nant-batch-files-or-ajax/)
*   [Add jsLint Checking to Visual Studio](http://the-taylors.org/blog/2010/07/09/add-jslint-checking-to-visual-studio/)


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


Forms
-----

*	For compound elements (where text is used to label a form element), the `<label>` tag MUST be used to explicitly associate the relevant text label with its form element.
*	This MUST be done using a 'for' attribute on the label and a pairing 'id' attribute on the element.
	
		<label for="apple">apple</label><input id="apple" />.

*	A label-input pair SHOULD NOT be contained in a `<dl>`, as this provides no additional structural information.


As this section contains a lot of code samples it has been split in to a [separate page](forms/index.html).

References
----------

Thanks to the following sites for inspiration and reuse.

*	[XHTML Integrity Standards](http://www.bbc.co.uk/guidelines/futuremedia/technical/xhtml_integrity.shtml)
*	[Fellowship Technologies - Design Patterns and Code Standards](http://developer.fellowshipone.com/patterns/code.php)
*	[Isobar Code Standards & Front-End Development Best Practices](http://na.isobar.com/standards/)
*   [Code Conventions for the JavaScript Programming Language](http://javascript.crockford.com/code.html)
*   [BBC Semantic Markup](http://www.bbc.co.uk/guidelines/futuremedia/technical/semantic_markup.shtml)
