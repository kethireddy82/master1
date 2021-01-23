({
    validateContactForm: function(component) {
        var validContact;
        // Show error messages if required fields are blank
        validContact = component.find('contactField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
        if (validContact)
            alert('Please enter the last name field before saving the Contact Record');  
        if( component.get("v.newContact.AccoundId") == '' )
            alert('Please enter the Account field before saving the Contact Record');  
        return(validContact);
    },
    contactDetailHelper : function(component) {
        var action = component.get("c.getContactDetails");
        action.setParams({"caseId": component.get("v.caseId")});
        
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