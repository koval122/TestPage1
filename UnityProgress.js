define([
    'jquery',
    'Deep_Presentation/js/vendor/UnityLoader',
], function ($) {
    'use strict';

    function unityInit(config) {
        var unityInstance = UnityLoader.instantiate(config.container, config.webglBuildUrl,
            {
                onProgress: unityProgress
            }
        );

        window.addEventListener("resize", function () {
        try {
		unityInstance.SendMessage("DebugText","SetWidth",window.innerWidth);
		unityInstance.SendMessage("DebugText","SetHeigth",window.innerHeight);
		unityInstance.SendMessage("DebugText","OnResize");
		var Screen=window.innerWidth/window.innerHeight;
		document.getElementsByClassName("page-main")[0].style.zIndex = "1";
		document.getElementsByClassName("page-header")[0].style.zIndex = "10";
  		document.getElementsByClassName("page-footer")[0].style.zIndex = "10";
		document.getElementsByClassName("page-footer")[0].style.marginBottom = "12px";
		if(window.innerWidth < window.innerHeight) 
		{
		         document.getElementById("unityContainer").style.height=100+"%"; 
		  	 document.getElementById("unityContainer").style.width = 100+"%";	   
	
		}
		else
		{
		    	if(Screen <1.77)
		   	{
		   		document.getElementById("unityContainer").style.height=innerHeight+"px"; 
		   		var Widthtsmallscreen=innerHeight*1.77;
		    		document.getElementById("unityContainer").style.width = Widthtsmallscreen+"px";
		    		document.getElementById("unityContainer").focus();	
		     	}
		    	else
		   	 {
		    		 document.getElementById("unityContainer").style.height=100+"%"; 
		  	 	document.getElementById("unityContainer").style.width = 100+"%";	
		    	}	

		}
	    }
		catch (e) { }
        });

        document.addEventListener('wheel', (event) => {
            try {
		if (event.deltaY < 0)
		{
			 unityInstance.SendMessage("ButtonHtml","UpScrool");
		}
		else if (event.deltaY > 0)
		{
			 unityInstance.SendMessage("ButtonHtml","DownScroll");
		}
		}
	   catch (e) { }
        });
        document.addEventListener('touchmove', (event) => {
            try {
		 unityInstance.SendMessage("ButtonHtml","Timeplay");
		}
		catch (e) { }
        });
    }

    function unityProgress(unityInstance, progress) {
        if (!unityInstance.Module)
            return;
        if (!unityInstance.logo) {
            unityInstance.logo = document.createElement("div");
            unityInstance.logo.className = "logo " + unityInstance.Module.splashScreenStyle;
            unityInstance.container.appendChild(unityInstance.logo);
        }
        if (!unityInstance.progress) {
            unityInstance.progress = document.createElement("div");
            unityInstance.progress.className = "progress " + unityInstance.Module.splashScreenStyle;
            unityInstance.progress.empty = document.createElement("div");
            unityInstance.progress.empty.className = "empty";
            unityInstance.progress.appendChild(unityInstance.progress.empty);
            unityInstance.progress.full = document.createElement("div");
            unityInstance.progress.full.className = "full";
            unityInstance.progress.appendChild(unityInstance.progress.full);
            unityInstance.container.appendChild(unityInstance.progress);
        }
        unityInstance.progress.full.style.width = (100 * progress) + "%";
        unityInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
        if (progress === 1)
            unityInstance.logo.style.display = unityInstance.progress.style.display = "none";
    }

    return function (config) {
        unityInit(config);
    };
});
