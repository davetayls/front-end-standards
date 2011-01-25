require(["core/debug"], function() {
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
