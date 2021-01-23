({
	doInit : function(component, event, helper) {
        var recId = component.get('v.recordId');
        var pageReference = component.get("v.pageReference");
        var site = component.get('v.site');
        var locationURL = window.location.href;
        var isPortal = false;
        var sitePrefix= $A.get("$Label.c.Community_URL");
        if (locationURL.indexOf('/'+sitePrefix+'/s/') != -1) {
            isPortal = true;
        }
        var urlEvent = $A.get("e.force:navigateToURL");
        var redirectUrl = '';
        
            if (isPortal){
                 window.open('/'+sitePrefix+'/s/casecreation', '_self');
                
                /* urlEvent.setParams({
     		 		"url": '/'+sitePrefix+'/s/warrantyregistration?c__id=' + recId
   				 });
                 urlEvent.fire();*/
            } 
                    
    }
})