/*global window define */
define(['../jquery/jquery.tableofcontents'], function () {

    var $toc,
        expandableClass = 'toc-expandable',
        collapsibleClass = 'toc-collapsible';

	return {
		init: function (){
            $toc = $('<ul>')
                .appendTo('#toc')
                .tableOfContents(document, {startLevel:2});
            /*
            $toc.find('>li>ul>li')
                .each(function(){
                    var $this = $(this),
                        $link = $this.find('>a'),
                        $items = $this.find('>ul');
                    if ($items.length > 0){
                        $link.addClass(expandableClass);
                        $items.hide();
                    }
                });
            $toc.find('>li>ul>li>a').click(function(){
                var $this = $(this);
                if ($this.hasClass(expandableClass)){
                    $this
                        .removeClass(expandableClass)
                        .addClass(collapsibleClass);
                    $this.parent().find('>ul').slideDown();
                }else if ($this.hasClass(collapsibleClass)){
                    $this
                        .removeClass(collapsibleClass)
                        .addClass(expandableClass);
                    $this.parent().find('>ul').slideUp();
                }
            })
            */
		}
	}
});
