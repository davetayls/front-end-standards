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
        
        // forms
        $("#showErrors").click(function(){
            $(".field-item")
                .addClass("field-itemTerror")
                .append('\<\span class="label-error-msg">there is a validation error on this field<\/\span>')
                .prepend('<span class="error-num"><span class="visuallyhidden">Error: <\/span>1<\/span>');
            $(".field-group")
                .addClass("field-groupTerror")
                .prepend('<span class="error-num"><span class="visuallyhidden">Error: <\/span>1<\/span>');
            $("fieldset").addClass("fieldsetTerror");
            $(".form-errorSummary").show();
            return false;
        });
        $("#hideErrors").click(function(){
            $(".label-error-msg").remove();
            $(".field-item").removeClass("field-itemTerror");
            $(".field-group").removeClass("field-groupTerror");
            $("fieldset").removeClass("fieldsetTerror");
            $(".form-errorSummary").hide();
            $('.error-num').remove();
            return false;
        });
        $("#formTypeOptions input[type=radio]").click(function(){
            $("#mainForm").attr("class","formT"+$(this).attr("value"));
        });
        
	});
});
