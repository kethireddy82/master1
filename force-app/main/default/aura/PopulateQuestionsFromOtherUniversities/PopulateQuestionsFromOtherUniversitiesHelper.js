({
	getBasicDetails : function(component, event, helper) {
		var action= component.get("c.getBasicInfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = JSON.parse(response.getReturnValue());
                component.set('v.DefaultUniversity', res.defaultAccount);
                component.set('v.AllUniversities', res.lstUniversities);
                component.set('v.ICPYears', res.ICPYears);
                //component.set('v.IsServicingDealer', false);
            }
            else{
                component.set('v.IsServicingDealer', true);
            }
         });
        $A.enqueueAction(action);	
	}
})