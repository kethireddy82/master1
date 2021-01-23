({
    doInit : function(component, event, helper) {
        helper.contactDetailHelper(component);
    },
    
    handleSaveContact: function(component, event, helper) {
        console.log('On Save==='+JSON.stringify(component.get("v.newContact")));
        if(helper.validateContactForm(component)) {
            
            var conObj = component.get("v.newContact");
            conObj.AccountId = null ; 
            if(component.get("v.selectedLookUpRecord").Id != undefined){
                conObj.AccountId = component.get("v.selectedLookUpRecord").Id;
            } 
            
            var saveContactAction = component.get("c.saveContactWithAccount");
            saveContactAction.setParams({
                "contact": conObj
            });
            saveContactAction.setCallback(this, function(response) {
                var state = response.getState();
                console.log(state);
                if(state === "SUCCESS") {
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Contact Saved",
                        "message": "The new contact was created.",
                        "type" : "success"
                    });
                    $A.get("e.force:closeQuickAction").fire();
                    resultsToast.fire();
                    $A.get("e.force:refreshView").fire();
                    var strURL = '#/sObject/'+component.get("v.recordId")+'/view';
                    window.location.assign('/'+strURL);
                }
                else if (state === "ERROR") {
                    console.log('Problem saving contact, response state: ' + state);
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Contact Saved Error",
                        "message": "Error while saving new Contact ::" + state,
                        "type" : "error"
                    });
                    $A.get("e.force:closeQuickAction").fire();
                    resultsToast.fire();
                    $A.get("e.force:refreshView").fire();
                }
            });
            $A.enqueueAction(saveContactAction);
        }
        
    },
    
    handleCancel: function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
        $A.get("e.force:closeQuickAction").fire();
    },
})