({
	doInit : function(component, event, helper) {
        component.set("v.showSpinner",true);
		var action = component.get("c.getYears");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()!=null && response.getReturnValue()!=undefined){
                    component.set("v.years",response.getReturnValue());
                }
            }
            component.set("v.showSpinner",false);
        });
        $A.enqueueAction(action);
	},
    
    handleClick : function(component, event, helper){
        var yearValue = component.find("yearPicklist").get("v.value");
        if(yearValue == null || yearValue == undefined || yearValue == ""){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!",
                "type" : "error",
                "message": "Please select a year from the dropdown."
            });
    		toastEvent.fire();
        }
        else{
            component.set("v.showSpinner",true);
            var action = component.get("c.getAssessmentScoring");
            action.setParams({
                "year" : yearValue
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    if(response.getReturnValue()!=null && response.getReturnValue()!=undefined){
                        component.set("v.assessmentScoreRecords",response.getReturnValue());
                        // call the helper function which "return" the CSV data as a String
                        var csv = helper.convertArrayOfObjectsToCSV(component);
                        // ####--code for create a temp. <a> html tag [link tag] for download the CSV file--####
                        var hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                        hiddenElement.target = '_self'; //
                        hiddenElement.download = 'Assessment Score for Year '+yearValue+'.csv';  // CSV file Name* you can change it.[only name not .csv]
                        document.body.appendChild(hiddenElement); // Required for FireFox browser
                        hiddenElement.click(); // using click() js function to download csv file
                    }
                    else{
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Information",
                            "type" : "info",
                            "message": "Sorry but there is no record for the select year."
                        });
                        toastEvent.fire();
                    }
                }
                component.set("v.showSpinner",false);
            });
            $A.enqueueAction(action);
        }
    }
})