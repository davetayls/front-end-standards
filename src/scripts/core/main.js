require(["core/debug","h5f/h5f"], function() {
    $(function() {
	
		require(['core/tableofcontents.js'], function(toc){
			toc.init();
		});
        //This function is called when the page is loaded (the DOMContentLoaded
        //event) and when all required scripts are loaded.

        //Do nested require() calls in here if you want to load code
        //after page load.
    });
});
