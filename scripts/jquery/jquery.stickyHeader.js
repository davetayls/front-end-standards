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