define('core/tableofcontents',['jquery/jquery.tableofcontents'], function () {
	return {
		init: function(){
			$('#toc').tableOfContents(document, {startLevel:2});
		}
	}
});
require(["core/debug","h5f/h5f"], function() {
    $(function() {
	
		$('pre code').addClass('brush: js');
		SyntaxHighlighter.config.tagName = 'code';
		SyntaxHighlighter.all();
		
		require(['core/tableofcontents'], function(toc){
			toc.init();
		});
		require(['jquery/quicksearch/jquery.quicksearch'], function(toc){
			$('#search').quicksearch('#toc li');
		});
		require(['jquery/jquery.stickyHeader'], function(toc){
			$('body').stickyHeader({
				headlineSelector: '#main>h2'
			});
		});

	});
});
define("core/main", function(){});

// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function () {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments));
    }
};
define("core/debug", function(){});
/*
 * HTML5 Forms Chapter JavaScript Library
 * http://thecssninja.com/javascript/H5F
 *
 * Copyright (c) 2010 Ryan Seddon - http://thecssninja.com/
 * Dual-licensed under the BSD and MIT licenses.
 * http://thecssninja.com/H5F/license.txt
 */

var H5F = H5F || {};

(function(d){
    
    var field = d.createElement("input"),
        emailPatt = new RegExp("^([a-z0-9_.-]+)@([0-9a-z.-]+).([a-z.]{2,6})$","i"), 
        urlPatt = new RegExp("[a-z][-\.+a-z]*:\/\/","i"),
        usrPatt, curEvt, args;
    
    H5F.setup = function(form,settings) {
        var isCollection = !form.nodeType || false;
        
        var opts = {
            validClass : "valid",
            invalidClass : "error",
            requiredClass : "required"
        };

        if(typeof settings === "object") {
            for (var i in opts) {
                if(typeof settings[i] === "undefined") { settings[i] = opts[i]; }
            }
        }
        
        args = settings || opts;
        
        if(isCollection) {
            for(var k=0,len=form.length;k<len;k++) {
                H5F.validation(form[k]);
            }
        } else {
            H5F.validation(form);
        }
    };
    
    H5F.validation = function(form) {
        var f = form.elements,
            flen = f.length,
            isRequired;
        
        H5F.listen(form,"invalid",H5F.checkField,true);
        H5F.listen(form,"blur",H5F.checkField,true);
        H5F.listen(form,"input",H5F.checkField,true);
        H5F.listen(form,"keyup",H5F.checkField,true);
        H5F.listen(form,"focus",H5F.checkField,true);
        
        if(!H5F.support()) { 
            form.checkValidity = function() { return H5F.checkValidity(form); };
            
            while(flen--) {
                isRequired = !!(f[flen].attributes["required"]);
                // Firefox includes fieldsets inside elements nodelist so we filter it out.
                if(f[flen].nodeName !== "FIELDSET" && isRequired) {
                    H5F.validity(f[flen]); // Add validity object to field
                }
            }
        }
    };
    H5F.validity = function(el) {
        var elem = el,
            missing = H5F.valueMissing(elem),
            type = elem.getAttribute("type"),
            pattern = elem.getAttribute("pattern"),
            placeholder = elem.getAttribute("placeholder"),
            isType = /^(email|url)$/i,
			evt = /^(input|keyup)$/i,
            fType = ((isType.test(type)) ? type : ((pattern) ? pattern : false)),
            patt = H5F.pattern(elem,fType),
            step = H5F.range(elem,"step"),
            min = H5F.range(elem,"min"),
            max = H5F.range(elem,"max");
        
        elem.validity = {
            patternMismatch: patt,
            rangeOverflow: max,
            rangeUnderflow: min,
            stepMismatch: step,
            valid: (!missing && !patt && !step && !min && !max),
            valueMissing: missing
        };
        
        if(placeholder && !evt.test(curEvt)) { H5F.placeholder(elem); }
        elem.checkValidity = function() { return H5F.checkValidity(elem); };
    };
    H5F.checkField = function (e) {
        var el = H5F.getTarget(e) || e, // checkValidity method passes element not event
            events = /^(input|keyup|focusin|focus)$/i,
			checkForm = true;
        
        curEvt = e.type;
        if(!H5F.support()) { H5F.validity(el); }
        
        if(el.validity.valid) {
            H5F.removeClass(el,[args.invalidClass,args.requiredClass]);
            H5F.addClass(el,args.validClass);
        } else if(!events.test(curEvt)) {
            if(el.validity.valueMissing) {
                H5F.removeClass(el,[args.invalidClass,args.validClass]);
                H5F.addClass(el,args.requiredClass);
            } else {
                H5F.removeClass(el,[args.validClass,args.requiredClass]);
                H5F.addClass(el,args.invalidClass);
            }
        } else if(el.validity.valueMissing) {
            H5F.removeClass(el,[args.requiredClass,args.invalidClass,args.validClass]);
        }
		if(curEvt === "input" && checkForm) {
			// If input is triggered remove the keyup event
			H5F.unlisten(el.form,"keyup",H5F.checkField,true);
			checkForm = false;
		}
    };
    H5F.checkValidity = function (el) {
        var f, ff, isRequired, invalid = false;
        
        if(el.nodeName === "FORM") {
            f = el.elements;
            
            for(var i = 0,len = f.length;i < len;i++) {
                ff = f[i];
                
                isRequired = !!(ff.attributes["required"]);
                hasPattern = !!(ff.attributes["pattern"]);
                
                if(ff.nodeName !== "FIELDSET" && (isRequired || hasPattern)) {
                    H5F.checkField(ff);
                    if(!ff.validity.valid && !invalid) {
                        ff.focus();
                        invalid = true;
                    }
                }
            }
            return !invalid;
        } else {
            H5F.checkField(el);
            return el.validity.valid;
        }
    };
    
    H5F.support = function() {
        return (H5F.isHostMethod(field,"validity") && H5F.isHostMethod(field,"checkValidity"));
    };

    // Create helper methods to emulate attributes in older browsers
    H5F.pattern = function(el, type) {
        if(type === "email") {
            return !emailPatt.test(el.value);
        } else if(type === "url") {
            return !urlPatt.test(el.value);
        } else if(!type) {
            return false;
        } else {
            usrPatt = new RegExp(type);
            return !usrPatt.test(el.value);
        }
    };
    H5F.placeholder = function(el) {
        var placeholder = el.getAttribute("placeholder"),
            focus = /^(focus|focusin)$/i,
            node = /^(input|textarea)$/i,
            isNative = !!("placeholder" in field);
        
        if(!isNative && node.test(el.nodeName)) {
            if(el.value === "") {
                el.value = placeholder;
            } else if(el.value === placeholder && focus.test(curEvt)) {
                el.value = "";
            }
        }
    };
    H5F.range = function(el,type) {
        // Emulate min, max and step
        var min = parseInt(el.getAttribute("min"),10) || 0,
            max = parseInt(el.getAttribute("max"),10) || false,
            step = parseInt(el.getAttribute("step"),10) || 1,
            val = parseInt(el.value,10),
            mismatch = (val-min)%step;
        
        if(!H5F.valueMissing(el) && !isNaN(val)) {
            if(type === "step") {
                return (el.getAttribute("step")) ? (mismatch !== 0) : false;
            } else if(type === "min") {
                return (el.getAttribute("min")) ? (val < min) : false;
            } else if(type === "max") {
                return (el.getAttribute("max")) ? (val > max) : false;
            } 
        } else if(el.getAttribute("type") === "number") { 
            return true;
        } else {
            return false;
        }
    };
    H5F.required = function(el) {
        var required = !!(el.attributes["required"]);
        
        return (required) ? H5F.valueMissing(el) : false;
    };
    H5F.valueMissing = function(el) {
        var placeholder = el.getAttribute("placeholder"),
            isRequired = !!(el.attributes["required"]);
        return !!(isRequired && (el.value === "" || el.value === placeholder));
    };
    
    /* Util methods */
    H5F.listen = function (node,type,fn,capture) {
        if(H5F.isHostMethod(window,"addEventListener")) {
            /* FF & Other Browsers */
            node.addEventListener( type, fn, capture );
        } else if(H5F.isHostMethod(window,"attachEvent") && typeof window.event !== "undefined") {
            /* Internet Explorer way */
            if(type === "blur") {
                type = "focusout";
            } else if(type === "focus") {
                type = "focusin";
            }
            node.attachEvent( "on" + type, fn );
        }
    };
	H5F.unlisten = function (node,type,fn,capture) {
        if(H5F.isHostMethod(window,"removeEventListener")) {
            /* FF & Other Browsers */
            node.removeEventListener( type, fn, capture );
        } else if(H5F.isHostMethod(window,"detachEvent") && typeof window.event !== "undefined") {
            /* Internet Explorer way */
            node.detachEvent( "on" + type, fn );
        }
    };
    H5F.preventActions = function (evt) {
        evt = evt || window.event;
        
        if(evt.stopPropagation && evt.preventDefault) {
            evt.stopPropagation();
            evt.preventDefault();
        } else {
            evt.cancelBubble = true;
            evt.returnValue = false;
        }
    };
    H5F.getTarget = function (evt) {
        evt = evt || window.event;
        return evt.target || evt.srcElement;
    };
    H5F.addClass = function (e,c) {
        var re;
        if (!e.className) {
            e.className = c;
        }
        else {
            re = new RegExp('(^|\\s)' + c + '(\\s|$)');
            if (!re.test(e.className)) { e.className += ' ' + c; }
        }
    };
    H5F.removeClass = function (e,c) {
        var re, m, arr = (typeof c === "object") ? c.length : 1, len = arr;
        if (e.className) {
            if (e.className == c) {
                e.className = '';
            }
            else {        
                while(arr--) {
                    re = new RegExp('(^|\\s)' + ((len > 1) ? c[arr] : c) + '(\\s|$)');
                    m = e.className.match(re);
                    if (m && m.length == 3) { e.className = e.className.replace(re, (m[1] && m[2])?' ':''); }
                }
            }
        }
    };
    H5F.isHostMethod = function(o, m) {
        var t = typeof o[m], reFeaturedMethod = new RegExp('^function|object$', 'i');
        return !!((reFeaturedMethod.test(t) && o[m]) || t == 'unknown');
    };

})(document);
define("h5f/h5f", function(){});
/*
	TableOfContents Plugin for jQuery
	
	Programmed by Doug Neiner
	
	Version: 0.8
	
	Based on code and concept by Janko Jovanovic 
	  in his article: http://www.jankoatwarpspeed.com/post/2009/08/20/Table-of-contents-using-jQuery.aspx
	
	This plugin is offered under the MIT license:
	
	(c) 2009 by Doug Neiner, http://dougneiner.com
	
	Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:
    
    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/


(function($){
	
    $.TableOfContents = function(el, scope, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el; 

		base.toc = "";                               // We use this to build our TOC;
		base.listStyle = null;                       // This will store the type of list
		base.tags = ["h1","h2","h3","h4","h5","h6"]; // The six header tags

        
        base.init = function(){
			// Merge the defaultOptions with any options passed in
            base.options = $.extend({},$.TableOfContents.defaultOptions, options);

			// Gets the scope. Defaults to the entire document if not specified
            if(typeof(scope) == "undefined" || scope == null) scope = document.body;
            base.$scope = $(scope);

			// Find the first heading withing the scope
			var $first = base.$scope.find(base.tags.join(', ')).filter(':first');
			
			// If no headings were found, stop building the TOC
			if($first.length != 1) return; 
			
			// Set the starting depth
			base.starting_depth = base.options.startLevel;

			// Quick validation on depth
			if(base.options.depth < 1) base.options.depth = 1;
			
			// Get only the tags starting with startLevel, and counting the depth
			var filtered_tags = base.tags.splice(base.options.startLevel - 1, base.options.depth);
			
			// Cache all the headings that match our new filter
			base.$headings = base.$scope.find(filtered_tags.join(', '));

			
			// If topLinks is enabled, set/get an id for the body element
			if(base.options.topLinks !== false){
				var id = $(document.body).attr('id');
				if(id == "") {
					id = base.options.topBodyId;
					document.body.id = id;
				};
				
				// Cache the id locally
				base.topLinkId = id;
			};


			// Find out which list style to use
			if(base.$el.is('ul')){
				base.listStyle = 'ul';
			} else if (base.$el.is('ol')){
				base.listStyle = 'ol';
			};


			base.buildTOC();
			
			if(base.options.proportionateSpacing === true && !base.tieredList()){
				base.addSpacing();
			};
			
			return base; // Return this object for memory cleanup
        };

		// Helper function that returns true for both OL and UL lists
		base.tieredList = function(){
			return (base.listStyle == 'ul' || base.listStyle == 'ol');
		};

		base.buildTOC = function(){
			base.current_depth = base.starting_depth;
			
			base.$headings.each(function(i,element){
				// Get current depth base on h1, h2, h3, etc.
				var depth = this.nodeName.toLowerCase().substr(1,1);
				
				// This changes depth, or adds separators, only if not the first item
				if(i > 0 || ( i == 0 && depth != base.current_depth)){

					base.changeDepth(depth)
				};
				
				// Add the TOC link
				base.toc += base.formatLink(this, depth, i) + "\n";
				
				// Add the topLink if enabled
				if(base.options.topLinks !== false) base.addTopLink(this);
			});
			
			// Close up any nested list
			base.changeDepth(base.starting_depth, true);
			
			// Wrap entire TOC in an LI if item was nested.
			if(base.tieredList()) base.toc = "<li>\n" + base.toc + "</li>\n";
			
			// Update the TOC element with the completed TOC
			base.$el.html(base.toc);
		};
		
		base.addTopLink = function(element){
			// Get the text for the link (if topLinks === true, it defaults to "Top")
			var text = (base.options.topLinks === true ? "Top" : base.options.topLinks );
			var $a = $("<a href='#" + base.topLinkId + "' class='" + base.options.topLinkClass + "'></a>").html(text);
			
			// Append to the current Header element
			$(element).append($a);
		};
		
		base.formatLink = function(element, depth, index){	
			// Get the current id of the header element
			var id = element.id;
			
			// If no id exisits, create a unique one
			if(id == ""){
				id = base.buildSlug($(element).text());
				element.id = id;
			};
			
			// Start building the a link
			var a = "<a href='#" + id + "'";
			
			// If this isn't a tiered list, we need to add the depth class
			if(!base.tieredList()) a += " class='" + base.depthClass(depth) + "'";
			
			// Finish building the link
			a += ">" + base.options.levelText.replace('%', $(element).text()) + '</a>';
			return a;
		};
		
		base.changeDepth = function(new_depth, last){
			if(last !== true) last = false;
			
			// If straight links, just change depth and return
			if(!base.tieredList()){
				base.current_depth = new_depth;
				return true;
			};
			
			// If nested
			if(new_depth > base.current_depth){
				// Add enough opening tags to step into the heading
				// as it is possible that a poorly built document
				// steps from h1 to h3 without an h2
				var opening_tags = [];
				for(var i = base.current_depth; i < new_depth; i++){
					opening_tags.push('<' + base.listStyle + '>' + "\n");
				};
				var li = "<li>\n";
				
				// Add the code to our TOC and an opening LI
				base.toc += opening_tags.join(li) + li;
				
			} else if (new_depth < base.current_depth){
				// Close all the loops
				var closing_tags = [];
				for(var i = base.current_depth; i > new_depth; i--){
					closing_tags.push('</' + base.listStyle + '>' + "\n");
				};
				
				// Add closing LI and any additional closing tags
				base.toc += "</li>\n" + closing_tags.join('</li>' + "\n");
				
				// Open next block
				if (!last) {
					base.toc += "</li>\n<li>\n";
				}
			} else {
				// Just close a tag and open a new one
				// since the depth has not changed
				if (!last) {
					base.toc += "</li>\n<li>\n";
				}
			};
			
			// Store the new depth
			base.current_depth = new_depth;
		};
		
		base.buildSlug = function(text){
			text = text.toLowerCase().replace(/[^a-z0-9 -]/gi,'').replace(/ /gi,'-');
			text = text.substr(0,50);
			return text;
		};
		
		base.depthClass = function(depth){
			// Normalizes the depths to always start at 1, even if the starting tier is a h4
			return base.options.levelClass.replace('%', (depth - ( base.starting_depth - 1 ) ) );
		};
		
		base.addSpacing = function(){
			var start = base.$headings.filter(':first').position().top;
			
			base.$headings.each(function(i,el){
				var $a = base.$el.find('a:eq(' + i + ')');
				var pos = (
						( $(this).position().top - start ) / 
						( base.$scope.height()   - start )
					) * base.$el.height();
				$a.css({
					position: "absolute",
					top: pos
				});
			});
		};
        
        return base.init();
    };

	
    $.TableOfContents.defaultOptions = {
		// One option is set by the container element, and not by changing
		// a setting here. That is the type of TOC to output. For a nested ordered list
		// make sure your wrapping element is an <ol>. For a nested bulleted list
		// make sure your wrapping element is an <ul>. For a straight outputting of links
		// use any other element.
	
		// Which H tags should be the root items. h1 = 1, h2 = 2, etc.
		startLevel: 1,
		
		// How many levels of H tags should be shown, including the startLevel
		// startLevel: 1, depth: 3 = h1, h2, h3
		// startLevel: 2, depth: 3 = h2, h3, h4
        depth: 3,

		// Each link in a straight set is give a class designating how deep it is. 
		// You can change the class by changing this option,
		// but you must include a % sign where you want the number to go.
		// Nested lists do not add classes, as you can determine their depth with straight css
		levelClass: "toc-depth-%",
		
		// When each link is formed, you can supply additional html or text to be formatted
		// with the text of the header. % represents the text of the header
		levelText: "%",

		// This plugin can add "To Top" links to each header element if you want.
		// Set topLinks to true to use the text "Top" or set it to some text or html
		// content you wish to use as the body of the link
		topLinks: false,
		
		// If topLinks is either true or a text/html value, you can also set the following options:
		
		// Class of the link that is added to the headers
		topLinkClass: "toc-top-link",
		
		// Which class should be added to the body element if it does not
		// already have an id associated with it
		topBodyId: "toc-top",
		
		// To have the TOC spaced proportionatly to the spacing of the headings,
		// you must have a fixed height on the TOC wrapper, and it must "haveLayout"
		// either position = fixed | absolute | relative
		// Finally, the TOC wrapper must not be a UL or an LI or this setting will
		// have no effect
		proportionateSpacing: false
		
    };
	

    $.fn.tableOfContents = function(scope, options){
        return this.each(function(){
            var toc = new $.TableOfContents(this, scope, options);
			delete toc; // Free memory
        });
    };

	
})(jQuery);
define("jquery/jquery.tableofcontents", function(){});
(function($, window, document, undefined) {
	$.fn.quicksearch = function (target, opt) {
		
		var timeout, cache, rowcache, jq_results, val = '', e = this, options = $.extend({ 
			delay: 100,
			selector: null,
			stripeRows: null,
			loader: null,
			noResults: '',
			bind: 'keyup',
			onBefore: function () { 
				return;
			},
			onAfter: function () { 
				return;
			},
			show: function () {
				this.style.display = "";
			},
			hide: function () {
				this.style.display = "none";
			},
			prepareQuery: function (val) {
				return val.toLowerCase().split(' ');
			},
			testQuery: function (query, txt, _row) {
				for (var i = 0; i < query.length; i += 1) {
					if (txt.indexOf(query[i]) === -1) {
						return false;
					}
				}
				return true;
			}
		}, opt);
		
		this.go = function () {
			
			var i = 0, 
			noresults = true, 
			query = options.prepareQuery(val),
			val_empty = (val.replace(' ', '').length === 0);
			
			for (var i = 0, len = rowcache.length; i < len; i++) {
				if (val_empty || options.testQuery(query, cache[i], rowcache[i])) {
					options.show.apply(rowcache[i]);
					noresults = false;
				} else {
					options.hide.apply(rowcache[i]);
				}
			}
			
			if (noresults) {
				this.results(false);
			} else {
				this.results(true);
				this.stripe();
			}
			
			this.loader(false);
			options.onAfter();
			
			return this;
		};
		
		this.stripe = function () {
			
			if (typeof options.stripeRows === "object" && options.stripeRows !== null)
			{
				var joined = options.stripeRows.join(' ');
				var stripeRows_length = options.stripeRows.length;
				
				jq_results.not(':hidden').each(function (i) {
					$(this).removeClass(joined).addClass(options.stripeRows[i % stripeRows_length]);
				});
			}
			
			return this;
		};
		
		this.strip_html = function (input) {
			var output = input.replace(new RegExp('<[^<]+\>', 'g'), "");
			output = $.trim(output.toLowerCase());
			return output;
		};
		
		this.results = function (bool) {
			if (typeof options.noResults === "string" && options.noResults !== "") {
				if (bool) {
					$(options.noResults).hide();
				} else {
					$(options.noResults).show();
				}
			}
			return this;
		};
		
		this.loader = function (bool) {
			if (typeof options.loader === "string" && options.loader !== "") {
				 (bool) ? $(options.loader).show() : $(options.loader).hide();
			}
			return this;
		};
		
		this.cache = function () {
			
			jq_results = $(target);
			
			if (typeof options.noResults === "string" && options.noResults !== "") {
				jq_results = jq_results.not(options.noResults);
			}
			
			var t = (typeof options.selector === "string") ? jq_results.find(options.selector) : $(target).not(options.noResults);
			cache = t.map(function () {
				return e.strip_html(this.innerHTML);
			});
			
			rowcache = jq_results.map(function () {
				return this;
			});
			
			return this.go();
		};
		
		this.trigger = function () {
			this.loader(true);
			options.onBefore();
			
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function () {
				e.go();
			}, options.delay);
			
			return this;
		};
		
		this.cache();
		this.results(true);
		this.stripe();
		this.loader(false);
		
		return this.each(function () {
			$(this).bind(options.bind, function () {
				val = $(this).val();
				e.trigger();
			});
		});
		
	};

}(jQuery, this, document));
define("jquery/quicksearch/jquery.quicksearch", function(){});
/*
	Sticky Header
	Copyright (c) 2010 David Taylor (http://the-taylors.org) 
	Inspired by: stickySectionHeaders by Florian Plank (http://www.polarblau.com/)
	Dual licensed under the MIT (MIT-LICENSE.txt)
	and GPL (GPL-LICENSE.txt) licenses.
 
	USAGE:
	<div id="container">
		<h2>header</h2>
		<p>content</p>
		<h2>header</h2>
		<p>content</p>
		<h2>header</h2>
		<p>content</p>
	</div>
	$('#container').stickyHeader({
  		stickyClass: 'sticky',
		stickyActiveClass: 'stickyActive',
		stickyHeaderClass: 'stickyHeader',
		scrollContainerClass: 'stickyContainer',
  		headlineSelector: '>h2'
	});
 */

(function($){
  $.fn.stickyHeader = function(options) {
	
  	var settings = $.extend({
  		stickyClass: 'sticky',
		stickyActiveClass: 'stickyActive',
		stickyHeaderClass: 'stickyHeader',
		scrollContainerClass: 'stickyContainer',
  		headlineSelector: '>h2'
  	}, options);

  	return this.each(function() {
  		var $this = $(this),
			isBody = this.tagName === 'BODY'
			;
		var onScroll = function(e) {
			var scrollTop = $(this).scrollTop();
			stickyHeader$.hide();
  			stickyHeaders$.each(function() {
  				var this$ = $(this),
					t = isBody ? this$.position().top - scrollTop : this$.position().top,
					h = this$.outerHeight(),
					header$ = this$.find(settings.headlineSelector);
  				console.log(t);
				if (t < 0) {
  					this$.addClass(settings.stickyClass);
					stickyHeader$.html(this$.html());
					stickyHeader$.show();
  				} else {
					$(this).removeClass(settings.stickyClass);
				}
  			});
  		};

		var stickyHeader$ = $('<div />')
				.addClass(settings.stickyHeaderClass)
				.hide(),
			scrollContainer$ = $('<div />')
				.addClass(settings.scrollContainerClass)
				.scroll(onScroll),
			stickyHeaders$ = $this.find(settings.headlineSelector)
			;
  		$this.addClass(settings.stickyActiveClass);
		if (isBody){
			$(window).scroll(onScroll);
		}else{
			$this.wrapInner(scrollContainer$);
		}
		$this.prepend(stickyHeader$);
		

  	});
  };


})(jQuery);
define("jquery/jquery.stickyHeader", function(){});
