({
    doInit : function(component, event, helper) {
        
        var action = component.get('c.getContactDetails');
        
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                if(response.getReturnValue() !=''){
                	component.set('v.ContactInfo',JSON.parse(response.getReturnValue()));  
                    component.set('v.isOpenModal',true);
                } else{
                    component.set('v.isOpenModal',false);
                }
                
            }
        });
        $A.enqueueAction(action);
    },
    closeModel : function(component, event, helper) {
        component.set('v.isOpenModal',false);    
    },
    EditDetails : function(component, event, helper) {
        console.log(component.get('v.selectedvalue'));
        if(component.get('v.selectedvalue') === 'No'){
            component.set('v.isUpdateContact',true);    
        } else{
            component.set('v.isUpdateContact',false); 
        }
        
        
    },
    clickSubmit : function(component, event, helper) {
        if(component.get('v.selectedvalue') === 'No'){
            var action = component.get('c.updateSessionDetails');
            
            action.setCallback(this,function(response){
            	component.set('v.isOpenModal',false);   
            });
            $A.enqueueAction(action);
                
        } else{
            //component.get('v.ContactInfo'); 
            var action = component.get('c.updateContactDetails');
            action.setParams({
                "ContactDetails":JSON.stringify(component.get('v.ContactInfo'))
            });
            action.setCallback(this,function(response){
                var state = response.getState();
                if(state === "SUCCESS"){
                    if(response.getReturnValue() === true){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"success",
                            "title": "Success!",
                            "message": "Contact Details has been updated successfully."
                        });
                        toastEvent.fire();
                    } else{
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"error",
                            "title": "error!",
                            "message": "Failed to update the contact details"
                        });
                        toastEvent.fire();
                    }
                    component.set('v.ContactInfo',JSON.parse(response.getReturnValue()));
                } else{
                    var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"error",
                            "title": "error!",
                            "message": "Failed to update the contact details"
                        });
                        toastEvent.fire();
                }
                component.set('v.isOpenModal',false);
            });
            $A.enqueueAction(action);
            
        }
    }
})