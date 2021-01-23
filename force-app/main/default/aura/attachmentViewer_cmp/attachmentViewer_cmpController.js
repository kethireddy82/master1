({
    openPicker : function(component, event, helper) {
        var docId = event.currentTarget.id;  
        if (confirm("Confirm to delete the Attachment?")) { 
			if(component.get('v.isICPWebVerificationAttachment') == true){
				var attachmentLst = component.get('v.attachmentLst');
				var newCartItemList = [];
				for(var j in attachmentLst){
					if(attachmentLst[j].attachId != docId){
						var detailtemp = {};
						detailtemp = {attachId:'',attachName:'',attachSize:'',attachType:''};
						detailtemp.attachId = attachmentLst[j].attachId;
						detailtemp.attachName = attachmentLst[j].attachName;
						detailtemp.attachSize = attachmentLst[j].attachSize;
						detailtemp.attachType = attachmentLst[j].attachType;
						newCartItemList.push(detailtemp);
					}
				}
				component.set("v.attachmentLst",newCartItemList);
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
    
    viewAttachment : function(component,event,helper){
        window.open('/' + event.getSource().get('v.value'));
    }
})