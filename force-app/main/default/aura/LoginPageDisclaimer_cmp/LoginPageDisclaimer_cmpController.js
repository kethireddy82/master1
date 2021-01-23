({
	closeModal : function(component, event, helper) {
		component.set("v.isOpen",false);
	},
    
    acceptTerms : function(component, event, helper) {
		component.set("v.isOpen",false);
	},
    
    scrollPage : function(component, event, helper) {
        var contentPage = document.getElementById('modal-content-id-1');
        var page1 = document.getElementById('page1');
        var page2 = document.getElementById('page2');
        var difference = 0;
        if(page1.scrollHeight > page2.scrollHeight){
            difference = contentPage.scrollHeight - page1.scrollHeight;
            if(contentPage.scrollTop > (difference - page1.scrollHeight/2)){
                component.set('v.headingMessage',component.get('v.heading2'));
            }
            else{
                component.set('v.headingMessage',component.get('v.heading1'));
            }
        }
        else{
            difference = contentPage.scrollHeight - page2.scrollHeight;
            if(contentPage.scrollTop > (difference - page2.scrollHeight/2)){
                component.set('v.headingMessage',component.get('v.heading2'));
            }
            else{
                component.set('v.headingMessage',component.get('v.heading1'));
            }
        }
    }
})