({
 // common reusable function for toggle sections
    toggleSection : function(component, event, helper) {
        // dynamically get aura:id name from 'data-auraId' attribute
        var sectionAuraId = event.target.getAttribute("data-auraId");
        // get section Div element using aura:id
        var sectionDiv = component.find(sectionAuraId).getElement();
        /* The search() method searches for 'slds-is-open' class, and returns the position of the match.
         * This method returns -1 if no match is found.
        */
        var sectionState = sectionDiv.getAttribute('class').search('slds-is-open'); 
        
        // -1 if 'slds-is-open' class is missing...then set 'slds-is-open' class else set slds-is-close class to element
        if(sectionState == -1){
            sectionDiv.setAttribute('class' , 'slds-section slds-is-open');
        }else{
            sectionDiv.setAttribute('class' , 'slds-section slds-is-close');
        }
    },
    doInit : function(component, event, helper)  {
        var action = component.get('c.getAccountInfo');
        
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS"){
                var rest = JSON.parse(response.getReturnValue())
                component.set('v.usr',rest.userAccount);
                var resp = rest.userAccount;
                var BillingStreet ='';
                var BillingCity = '';
                var BillingState = '';
                var BillingPostalCode = '';
                if(resp.BillingStreet != null && resp.BillingStreet!=undefined && resp.BillingStreet!=''){
                	BillingStreet =  resp.BillingStreet +',';   
                }
                if(resp.BillingCity != null && resp.BillingCity!=undefined && resp.BillingCity!=''){
                    BillingCity =  resp.BillingCity +',';   
                }
                if(resp.BillingState != null && resp.BillingState!=undefined && resp.BillingState!=''){
                    BillingState =  resp.BillingState +',';   
                }
                if(resp.BillingPostalCode != null && resp.BillingPostalCode!=undefined && resp.BillingPostalCode!=''){
                    BillingPostalCode =  resp.BillingPostalCode ;   
                }
                
                
                
                var res = BillingStreet+BillingCity+BillingState+BillingPostalCode;
                component.set('v.SigningAuthority',rest.userSignAuthority);
            	component.set('v.AccountAddress',res);
            }
        });
        $A.enqueueAction(action);
    }
})