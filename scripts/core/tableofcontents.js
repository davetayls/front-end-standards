define(['jquery/jquery.tableofcontents'], function () {
	return {
		init: function(){
			$('#toc').tableOfContents(document, {startLevel:2});
		}
	}
});
