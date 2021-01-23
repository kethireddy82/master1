({
	//Method to search details according to the user entered input values
    searchDetails : function(component, event, helper) {
        var isInputProvided=false;
        var isValidCombinationProvided=false;
        component.set("v.errorMessage",'');
        
        //Clear the previous Asset, Contact and Case details similar to when user clears the form
        //Incorporated as per Anubhav's suggestion
        var formClearedAppEvent = $A.get("e.c:ClearSearchForm_event");
        formClearedAppEvent.fire();
        //Get the values provided in the inputs and then validate them
        var IsValidSearchFormInput = component.find('searchForm').reduce(function (validSoFar, inputComponent) {
            inputComponent.showHelpMessageIfInvalid();
            var inputComponentHasValue=helper.hasValue(component,helper.getTrimmedValue(component,inputComponent.get('v.value')));
            if(inputComponentHasValue){
                isInputProvided=true;
            }
            
            return validSoFar && inputComponent.get('v.validity').valid;
        }, true);
        
        //Make sure at least one input is given
        if(!isInputProvided){
            //Show error if input not provided
            component.set("v.errorMessage","You haven't provided any input");
        }else if(!IsValidSearchFormInput){
            //If input is invalid and users clicks on Search button show error message
            component.set("v.errorMessage","Please provide a valid input");
        }else if(IsValidSearchFormInput&&helper.isInputCombinationValid(component)){
            //If all the input is valid and also the search criteria combination, perform the search
            //Disable Search button
            component.find("search").set("v.disabled",true);
            //Remove Error Messages
            component.set("v.errorMessage",'');
            //performSearch
            helper.triggerSearchAsPerInput(component);
            //Populate component on callback
        }
    },
    
    triggerSearchAsPerInput : function(component) {
        var inputEmailID=$A.util.isUndefined(component.find('searchForm')[0]) ? '' :this.getTrimmedValue(component,component.find('searchForm')[0].get("v.value"));
        var inputCaseNumber=$A.util.isUndefined(component.find('searchForm')[1]) ? '' :this.getTrimmedValue(component,component.find('searchForm')[1].get("v.value"));
        var emailAction;
        
        //IF VON,Line,Model Year and family code are provided then perform VON search
        if(this.hasValue(component,inputEmailID) && this.hasValue(component,inputCaseNumber)){
            component.set('v.showSpinner',true);
            var caseResult = null;
            //Call the apex method to get details
            emailAction = component.get("c.getCaseDetails");
            //Set parameters for the apex method
            emailAction.setParams({ 
                emailId : inputEmailID,
                caseNumber : inputCaseNumber
            });
            //Set callback for the method
            emailAction.setCallback(this, function(response) {
                //Get the state of the callback
                var state = response.getState();
                //Check if the state is success
                if (state == "SUCCESS") {
                    //Check if the return value is not null and undefined and empty
                    if(response.getReturnValue!=null && response.getReturnValue!='' && response.getReturnValue()!=undefined){
                        //Sroe the response value returned in a var
                        caseResult = response.getReturnValue();
                        var caseResultRetrieved = $A.get("e.c:CaseResults_event");
                        caseResultRetrieved.setParams({ "caseObj" :  caseResult});
                        caseResultRetrieved.fire();
                    }
                    else{
                        component.set("v.showError",true);
                        component.set("v.errorMessage","No case was found for the above combination of case number and email id");
                    }
                }
                //Enable Search button
                component.find("search").set("v.disabled",false);
                component.set('v.showSpinner',false);
            });
        }
        //Enqueue Email Search Action
        if(emailAction!=null&&emailAction!=undefined){
            $A.enqueueAction(emailAction);
        }
    },
    
    //Validates the combination of Input Search Criteria, returns false if combination is invalid, otherwise true
    isInputCombinationValid : function(component) {
        var isValid=true;
        var inputEmailID=$A.util.isUndefined(component.find('searchForm')[0]) ? '' :this.getTrimmedValue(component,component.find('searchForm')[0].get("v.value"));
        var inputCaseNumber=$A.util.isUndefined(component.find('searchForm')[1]) ? '' :this.getTrimmedValue(component,component.find('searchForm')[1].get("v.value"));
        
        var inputCounter = 0;
        if(this.hasValue(component,inputCaseNumber)){
            inputCounter=inputCounter+1;
        }
        if(this.hasValue(component,inputEmailID)){
            inputCounter=inputCounter+1;
        }
        if(inputCounter<2){
            component.set("v.showError",true);
            component.set("v.errorMessage","Please enter a case number and email id");
            isValid=false;
            return isValid;
        }
        return isValid;
    },
    
 	//Utility  to get trimmed value
    getTrimmedValue : function(component, inputField) {
        var isDefined = !$A.util.isUndefined(inputField);
        var isEmpty = $A.util.isEmpty(inputField);
        if(isDefined&&!isEmpty){
            inputField=inputField.trim();
            return inputField;
        }else{
            return inputField;
        }
        
    },
    
    //Utility to check whether a field has value
    hasValue : function(component, inputField) {
        var isDefined = !$A.util.isUndefined(inputField);
        var isEmpty = $A.util.isEmpty(inputField);
        if(isDefined&&!isEmpty){
            return true;
        }else{
            return false;
        }
        
    },
    
    //Utility to check whether a field has null or blank values
    isNullorBlank : function(component, inputField) {
        var isUnDefined = $A.util.isUndefined(inputField);
        var isEmpty = $A.util.isEmpty(inputField);
        if(isUnDefined||isEmpty){
            return true;
        }else{
            return false;
        }
        
    },
    

	//Sets all the form field value to null
    setFormValueToNull : function(component) {
        var inputFieldArray=component.find('searchForm');
        var arrayLength=inputFieldArray.length;
        
        for(var i=0; i<arrayLength; i++){
            inputFieldArray[i].set("v.value", null);
        }
    },
    
    //removes error from all the form fields
    removeFormError : function(component) {
        component.set("v.showError",false);
        var inputFieldArray=component.find('searchForm');
        var arrayLength=inputFieldArray.length;
        
        for(var i=0; i<arrayLength; i++){
            inputFieldArray[i].set('v.validity', {valid:true, badInput :false});
        }
        //Removing the error message and set to default value
        component.set("v.errorMessage",'');
    },
    
    //Iterates focus from top to bottom on all the form fields
    iterateFocusOnForm : function(component) {
        var inputFieldArray=component.find('searchForm');
        var arrayLength=inputFieldArray.length;
        
        for(var i=0; i<arrayLength; i++){
            inputFieldArray[i].focus();
        }
        //At the end focus should go to VIN field.
        inputFieldArray[0].focus();
    },
    
    //Clears Search Form
    clearSearchForm :function(component, event, helper) {
        this.setFormValueToNull(component);
        this.removeFormError(component);
        //enable Search button
        component.find("search").set("v.disabled",false);
        //Trigger Form Clear Event, this event is listened by other search form components
        var formClearedAppEvent = $A.get("e.c:ClearSearchForm_event");
        formClearedAppEvent.fire();
    },
})