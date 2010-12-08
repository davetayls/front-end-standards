---
title: Front-End Standards
layout: master
---

Integrating Front End
=====================

Best Practices
--------------

* When putting example links within front end code which will be integrated at a later date use href="none" instead of href="#". These will then show up when we crawl for broken links.
* Put all media including images which will end up being added by the CMS in to the /cms-content folder within the root of the site
* Always have the logo as a single img on the page
* Try to use the least specific css selector needed to achieve a style
* Don't use id's for layout columns

Why is accessibility so important
---------------------------------

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
http://www.w3.org/WAI/PF/aria/roles.html
http://www.w3.org/WAI/PF/aria/rdf_model.svg 

Business Rules
--------------

Our aim is to provide a set of rules for:

* consistency and readability
* allows us to test for issues
* modularising structure for smooth transition to a cms environment
* Structure ids and classes are added to the structure stylesheet
* Non semantic classes are added to the reusable stylesheet
* For semantic classes use the following rule:

	[prefix]-[name]-[member](T[type])

* We have: Layouts, Components, Modules, Navigation


Components
----------

* small / reusable / specific
* cannot contain layouts/components/modules
* css prefix cp
* also availble prefixes for large scale sites

	* hp - hotspot
	* cta - call to action components
	* hl - highlight




Layouts
-------

We maintain all template column layouts in a modular way. They are defined in the content area. 

(the cc class is our shorthand for clearFix)

For example:

<div id="content">

  <div class="lay-3column cc">

    <div class="lay-3column-left cc"></div>

    <div class="lay-3column-middle cc"></div>

    <div class="lay-3column-right cc"></div>

  </div>

</div>




 css prefix lay

Don't use id's for layout columns (ie #sidebar)

Modules
-------

* css prefix mod
* Discoverability

Progressive enhancement
-----------------------

* Javascript

Integrating common UI code
--------------------------
* Tabs
* Forms

### Tabs

We have two tab types.

* Dynamic content (jQuery)
* Static tab bar with links to separate pages

HTML
----

<div class="nav-tabs"> <!-- or use nav-tabBar for static -->

    <ul class="nav-tabs-nav">

        <li><a href="#tabid">tab caption</a></li>

    </ul>

    <div id="tabid">tab content</div>

</div>

CSS:all base css and customisations should be in the navs css.

Go to http://jqueryui.com/demos/tabs/ for full jQuery integration.

Forms
-----

We have different types of forms

* form-stack
* form-margin

Demo: http://the-taylors.org/standards/forms.htm


 

