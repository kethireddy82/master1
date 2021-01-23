({
    doInit : function(component, event, helper) {
        helper.contactDetailHelper(component);
    },
    
    handleSaveContact: function(component, event, helper) {
        if(helper.validateContactForm(component)) {
            var saveContactAction = component.get("c.saveContactWithAccount");
            saveContactAction.setParams({
                "contact": component.get("v.newContact")
            });
            saveContactAction.setCallback(this, function(response) {
                var state = response.getState();
                if(state === "SUCCESS") {
                }
                else if (state === "ERROR") {
                    console.log('Problem saving contact, response state: ' + state);
                }
                    else {
                        console.log('Unknown problem, response state: ' + state);
                    }
            });
            
            // Send the request to create the new contact
            $A.enqueueAction(saveContactAction);
        }
        
    },
    
    handleCancel: function(component) {
        var caseId = component.get("v.caseId");
        window.location.assign('/'+caseId);
    },
    handleComponentEvent : function(component, event, helper) {
        // get the selected Account record from the COMPONETN event 	 
        var selectedAccountGetFromEvent = event.getParam("recordByEvent");
        if(typeof selectedAccountGetFromEvent != 'undefined')
        component.set("v.newContact.AccoundId",selectedAccountGetFromEvent);
    },
})