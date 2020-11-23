

var unityInstance = UnityLoader.instantiate("unityContainer", "Build/Desktop.json", {onProgress: UnityProgress});
	window.addEventListener("resize",OnResize);
	document.addEventListener('wheel', (event) => {
		 unityInstance.SendMessage("ButtonHtml","Timeplay");
	});
	document.addEventListener('touchmove', (event) => {
		 unityInstance.SendMessage("ButtonHtml","Timeplay");
	});	
	function OnResize() 
	{
		unityInstance.SendMessage("DebugText","SetWidth",window.innerWidth);
		unityInstance.SendMessage("DebugText","SetHeigth",window.innerHeight);
		unityInstance.SendMessage("DebugText","OnResize");
		var Screen=window.innerWidth/window.innerHeight;
		
		if(Screen<1.77) 
		{
		    document.getElementById("unityContainer").style.height=innerHeight+"px"; 
		    var Widthtsmallscreen=innerHeight*1.77;
		    document.getElementById("unityContainer").style.width = Widthtsmallscreen+"px";
	
		}
		else
		{
		   document.getElementById("unityContainer").style.height=100+"%"; 
		   document.getElementById("unityContainer").style.width = 100+"%";		

		}
	}  
	function  Video() 
	{
               window.alert("Hello, world!");
		var vid = document.getElementById("myVideo");
 		vid.onended = function() {
		unityInstance.SendMessage("VideoEnd","Videoend");
		}
	}

function UnityProgress(unityInstance, progress) {
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
  if (progress == 1)
    unityInstance.logo.style.display = unityInstance.progress.style.display = "none";
}