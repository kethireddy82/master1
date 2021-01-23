({
    validateContactForm: function(component) {
        var validContact = true;
        console.log(component.get("v.selectedLookUpRecord").Id);
        if (component.get("v.newContact.LastName") == '' || component.get("v.selectedLookUpRecord").Id == undefined){
            validContact = false;
            alert('Please enter the last name and Account field before saving the Contact Record');  
        }
        return(validContact);
    },
    contactDetailHelper : function(component) {
        var action = component.get("c.getContactDetails");
        action.setParams({"caseId": component.get("v.recordId")});
        
        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();
            console.log('===@@result@@===='+ JSON.stringify(result));
            if(state === "SUCCESS") {
                if(typeof result.LastName == 'undefined' || result.LastName == '')
                    component.set("v.newContact.LastName",result.FirstName);
                else{
                    component.set("v.newContact.FirstName",result.FirstName);
                    component.set("v.newContact.LastName",result.LastName);
                }
                component.set("v.newContact.Email",result.Email);
            } else {
                console.log('Problem getting account, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
    
})