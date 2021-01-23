({
    doInit : function(component, event, helper) {
        console.log('hi');
        $A.get("e.force:closeQuickAction").fire();
        var recordId = component.get('v.recordId');
        var firedRecordId = event.getParam("recordId");
        if(recordId != null && firedRecordId == recordId){
            component.set("v.isOpenPopup",true);
            helper.getICPObj(component);
        }
    },
    
    closeModal : function(component, event, helper) {
        component.set("v.isOpenPopup",false);
        $A.get("e.force:closeQuickAction").fire();
    },
    
    downloadCSV : function(component, event, helper) {
        // call the helper function which "return" the CSV data as a String
        var csv = helper.convertArrayOfObjectsToCSV(component);
        // ####--code for create a temp. <a> html tag [link tag] for download the CSV file--####
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self'; //
        hiddenElement.download = 'Web Verification.csv';  // CSV file Name* you can change it.[only name not .csv]
        document.body.appendChild(hiddenElement); // Required for FireFox browser
        hiddenElement.click(); // using click() js function to download csv file
    }
    
})