({
    openPicker : function(component, event, helper) {
        var docId = event.currentTarget.id;  
        if (confirm("Confirm to delete the Attachment?")) {   
            var init = component.get("v.intiMethod");
            var currentStage = component.get("v.stage.id");
            if(component.get("v.attachType") == 'responseAttach'){
                console.log('responseAttach');
                for(var i in init){
                    if(init[i].questionOrder == currentStage.substr(2) ){
                        var initAttach = init[i].responseAttach;
                        var newCartItemList = [];
                        for(var j in initAttach){
                            if(initAttach[j].attachId != docId){
                                var detailtemp = {};
                                detailtemp = {attachId:'',attachName:'',attachSize:'',attachType:''};
                                detailtemp.attachId = initAttach[j].attachId;
                                detailtemp.attachName = initAttach[j].attachName;
                                detailtemp.attachSize = initAttach[j].attachSize;
                                detailtemp.attachType = initAttach[j].attachType;
                                newCartItemList.push(detailtemp);
                            }
                        }
                        init[i].responseAttach = newCartItemList;
                    }
                }       
                component.set("v.intiMethod",init);   
            }
            else if(component.get("v.attachType") == 'masterAttach'){
                var initAttach = init[0].assessmentAttach;
                var newCartItemList = [];
                for(var j in initAttach){
                    if(initAttach[j].attachId != docId){
                        var detailtemp = {};
                        detailtemp = {attachId:'',attachName:'',attachSize:'',attachType:''};
                        detailtemp.attachId = initAttach[j].attachId;
                        detailtemp.attachName = initAttach[j].attachName;
                        detailtemp.attachSize = initAttach[j].attachSize;
                        detailtemp.attachType = initAttach[j].attachType;
                        newCartItemList.push(detailtemp);
                    }
                }
                init[0].assessmentAttach = newCartItemList;
                component.set("v.intiMethod",init);
            }  
            else{
                if(component.get('v.isICPWebVerificationAttachment') == true){
            		var attachmentLst = component.get('v.attachmentLst');
                    var newCartItemList = [];
                    for(var j in initAttach){
                        if(initAttach[j].attachId != docId){
                            var detailtemp = {};
                            detailtemp = {attachId:'',attachName:'',attachSize:'',attachType:''};
                            detailtemp.attachId = initAttach[j].attachId;
                            detailtemp.attachName = initAttach[j].attachName;
                            detailtemp.attachSize = initAttach[j].attachSize;
                            detailtemp.attachType = initAttach[j].attachType;
                            newCartItemList.push(detailtemp);
                        }
                    }
                    component.set("v.attachmentLst",newCartItemList);
                }
            }
            
            var action = component.get("c.deleteContentDoc");
            action.setParams({
                contentDocId : docId
            });
            action.setCallback(this, function(a) {
                if (a.getState() === "SUCCESS") {
                    var result = a.getReturnValue();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Deleted!",
                        "type" : "info",
                        "message": "File has been deleted successfully!"
                    });
                    toastEvent.fire();
                } else if (a.getState() === "ERROR") {
                    $A.log("Errors", a.getError());
                }
            });        
            $A.enqueueAction(action);	
        } 
    },
})