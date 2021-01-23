({
	//This is called when user clicks on Search button
    searchDetailsOnButtonClick : function(component, event, helper) {
        //Calling helper method to search for the user entered fields
        helper.searchDetails(component, event, helper);
    },
    
    
    //This is a key press event controller
    // On Enter key press calls search action, key code 13 represents 'Enter' key
    // On Esc key press calls Clear action, key code 27 represents 'Esc' key
    keyBoardEventHandler : function(component, event, helper) {
        //Call the search method when the user presses the Enter button
        if(event.keyCode === 13){
            //Calling helper method to search for the user entered details
            helper.searchDetails(component, event, helper);
        }
        
        //Call the clear method when the user presses the Escape button
        if(event.keyCode === 27){
            //Calling the helper method to clear the user provided input values
            helper.clearSearchForm(component, event, helper);
        }
        
    },
    
    
    
    //Clears Search Form
    clearSearchForm :function(component, event, helper) {
        //Calling the helper method to clear the user provided input values
        helper.clearSearchForm(component, event, helper);
    },
    
    //Clear Form errors on value change
    //Also hides the Create New Contact button
    clearFormErrorOnValueChange :function(component, event, helper) {
        component.set("v.errorMessage",'');
    },
})