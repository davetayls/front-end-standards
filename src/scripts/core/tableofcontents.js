define(['jquery', 'jquery/jquery.tableofcontents'], function ($) {
	return {
		init: function(){
			$('#toc').tableOfContents();
		}
	}
});