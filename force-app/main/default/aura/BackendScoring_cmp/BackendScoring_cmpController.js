({
	doInit : function(component, event, helper) {
		var action = component.get('c.getICPObject');
        action.setParams({
            'recordId' : component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var appEvent = $A.get("e.c:BackendScoringEvent");
                appEvent.setParams({ 
                    "recordId" : component.get("v.recordId")
                });
                appEvent.fire();
                $A.get("e.force:closeQuickAction").fire();
            }
        });
        $A.enqueueAction(action);
	},
})