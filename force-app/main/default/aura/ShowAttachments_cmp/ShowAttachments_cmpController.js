({
	handleUploadFinished: function(component, event, helper) {
        var uploadedFiles = event.getParam("files");  
        console.log(JSON.stringify(uploadedFiles));
        var init = component.get("v.attachmentList");
        for(var j in uploadedFiles){
            var detailtemp = {};
            detailtemp = {attachId:'',attachName:'',attachSize:'',attachType:''};
            detailtemp.attachId = uploadedFiles[j].documentId;
            detailtemp.attachName = uploadedFiles[j].name;
            init.push(detailtemp);
        }  
        component.set("v.attachmentList",init); 
    },
})