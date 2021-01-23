({
	doInit : function(component, event, helper) {
		var action = component.get('c.getPickListValues'); 
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                component.set('v.steps', a.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})