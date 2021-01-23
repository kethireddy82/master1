({
	searchCase : function(component, event, helper) {
		component.set('v.showCreateCase',false);
        component.set('v.showSearchCase',true);
	},
    
    newCase : function(component, event, helper) {
		component.set('v.showCreateCase',true);
        component.set('v.showSearchCase',false);
	},
})