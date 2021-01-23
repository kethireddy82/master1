({
    doInit: function(component, event, helper) {
        helper.getBasicDetails(component, event, helper);
        
    },
    submit: function(component, event, helper) {
        var ICP = component.find("statusPicklist").get("v.value");
        var listUniversities = component.get("v.AllUniversities");
        /*if(ICP ===''){
        	var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "Please select atleast one ICP"
                });
                toastEvent.fire();     
        }*/
        var action= component.get("c.CreateQuestionsToAllUniversities");
        action.setParams({
            ICPName : ICP ,
            Universitywrapper : JSON.stringify(component.get("v.AllUniversities"))
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Batch has been initiated to create the Assessment Questions"
                });
                toastEvent.fire(); 
                var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                  "recordId": $A.get("$Label.c.DefaultUniversity"),
                  "slideDevName": "details"
                });
                navEvt.fire();
            }
        });
        $A.enqueueAction(action);
    },
    handleSelectAllContact: function(component, event, helper) {
        var acclist = component.get("v.AllUniversities")
        var checkvalue = component.find("selectAll").get("v.checked");
        if(checkvalue == true){
            for(var i=0; i<acclist.length; i++){
            	acclist[i].isSelected = true;	    
            }
        } else{
            for(var i=0; i<acclist.length; i++){
            	acclist[i].isSelected = false;	    
            }
        }
        component.set("v.AllUniversities",acclist)
    },
    
    getQuestions: function(component, event, helper) {
       var selectedICP = component.find("statusPicklist").get("v.value");
        
        var action= component.get("c.getAstQuestions");
        action.setParams({ ICPName : selectedICP });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = JSON.parse(response.getReturnValue());
                component.set('v.AllQuestions', res);
                component.set('v.ICPSelected', true);
            }
           
         });
        $A.enqueueAction(action);
        
    }
})