require(["core/debug","h5f/h5f"], function() {
    $(function() {
	
		require(['core/tableofcontents'], function(toc){
			toc.init();
		});
		require(['jquery/quicksearch/jquery.quicksearch'], function(toc){
			$('#search').quicksearch('#toc li');
		});
		$('pre code').addClass('brush: js');
		SyntaxHighlighter.config.tagName = 'code';
		SyntaxHighlighter.all();
		
	});
});
