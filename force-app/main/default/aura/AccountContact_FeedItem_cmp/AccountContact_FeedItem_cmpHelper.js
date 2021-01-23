({	
    contactDetailHelper : function(component) {
        var parentId = component.get("v.selectedLookUpRecord").Id;
        var feedtype = component.get("v.feedtype");
       // alert('You selected ' + feedtype);
        window.open("/apex/FeedPDFGenerator?parentId="+parentId+"&feedtype="+feedtype+"&sd="+component.get("v.startDate")+"&ed="+component.get("v.endDate"));
    },
    // function for clear the Record Selaction 
    clearHelper : function(component){
        component.set("v.selectedLookUpRecord", {} );   
    },
    caseCountHelper : function(component) {
        console.log('Inside Helper');
        component.set("v.caseMesg","");        
        component.set("v.latestCaseRecords",[]);
        var action = component.get("c.getCaseCount");
        action.setParams({
            parentId : component.get("v.selectedLookUpRecord").Id,
            objectType : component.get("v.objectType")
        });
        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();
            console.log(result.length+'===@@result@@===='+ JSON.stringify(result));
            if(state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                if(result.length == 0){   
                    toastEvent.setParams({
                        "title": "Sorry!",
                        "message": "No Case Record Found.",
                        "type": "error"	
                    });
                }
                else{              
                    var str = '';
                    if(result.length == 1){
                        str = result.length + " Case Found."
                        component.set("v.caseMesg",str);
                    }
                    else{
                        str = result.length + " Cases Found.";
                        component.set("v.caseMesg",str);                        
                    }                    
                    component.set("v.latestCaseRecords",result);
                    toastEvent.setParams({
                        "message": str,
                        "type": "success"
                    });
                    
                }
                var toggleSec1 = component.find("selectFeed");
                $A.util.removeClass(toggleSec1, "toggleHide");
                var toggleSec2 = component.find("datefilter");
                $A.util.removeClass(toggleSec2, "toggleHide");
                toastEvent.fire();
            } else {
                console.log('Problem getting account, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
})