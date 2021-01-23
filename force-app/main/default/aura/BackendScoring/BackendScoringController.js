({
    doInit : function(component, event, helper) {
        var appEvent = $A.get("e.c:BackendScoringEvent");
        appEvent.setParams({ 
            "recordId" : component.get("v.recordId")
        });
        appEvent.fire();
        $A.get("e.force:closeQuickAction").fire();
	}
})