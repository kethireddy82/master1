({
    handleCheckAcc : function(component, event, helper) {
        var toggleText = component.find("lookupContact");
        $A.util.addClass(toggleText, "toggleHide");
        var toggleText2 = component.find("lookupAccount");
        $A.util.removeClass(toggleText2, "toggleHide");
        component.set("v.objectType","Account");
        var toggleText3 = component.find("selectFeed");
        $A.util.addClass(toggleText3, "toggleHide");
        //var toggleDdl = component.find("selectDropDown");        
        //$A.util.addClass(toggleDdl, "toggleShow");        
        //helper.clearHelper(component);
    },
    resetPage : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },
    changeCaseTable : function(component, event, helper) {
    },
    handleCheckCont : function(component, event, helper) {
        var toggleText = component.find("lookupContact");
        $A.util.removeClass(toggleText, "toggleHide");
        var toggleText2 = component.find("lookupAccount");
        $A.util.addClass(toggleText2, "toggleHide");
        var toggleText3 = component.find("selectFeed");
        $A.util.addClass(toggleText3, "toggleHide");
        component.set("v.objectType","Contact");
        //var toggleDdl = component.find("selectDropDown");     
        //$A.util.addClass(toggleDdl, "toggleHide");
        //helper.clearHelper(component);
    },
    handleFeedItem : function(component, event, helper) {
        var selected = event.getSource().get("v.text");
        console.log(selected);
        component.set("v.feedtype",selected);
        component.set("v.isDisabled",false);
    },
    exportTOPDF : function(component, event, helper) {
        if(component.get("v.startDate") == null || component.get("v.endDate") == null)
            alert('Enter date range in the Search criteria');
        else if(component.get("v.startDate") > component.get("v.endDate"))
            alert('End Date should be greater then Start Date');
            else
                helper.contactDetailHelper(component);
    },
    handleValueChange : function (component, event, helper) {
        // handle value change
        //console.log("old value: " + JSON.stringify(event.getParam("oldValue")));
        //console.log("current value: " + JSON.stringify(event.getParam("value")));
        var currentvalue = event.getParam("value");
        console.log(typeof currentvalue);
        console.log(currentvalue.Id);
        if(currentvalue.Id != undefined){
            helper.caseCountHelper(component);            
        }
        else{
            var toggleSec1 = component.find("selectFeed");
            $A.util.addClass(toggleSec1, "toggleHide");
            var toggleSec2 = component.find("datefilter");
            $A.util.addClass(toggleSec2, "toggleHide");
            component.set("v.isDisabled",true);
        }
    },
})