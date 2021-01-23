({
	/*showAppropriateHighlighting : function(component,target1,target2) {
        if(target1!=null && target1!=''){
			var cmpTarget = component.find(target1);
            $A.util.removeClass(cmpTarget, 'inactive-background');
            $A.util.addClass(cmpTarget, 'active-background');
        }
        if(target2!=null && target2!=''){
            var cmpTarget1 = component.find(target2);
        	$A.util.addClass(cmpTarget1, 'inactive-background');
        	$A.util.removeClass(cmpTarget1, 'active-background');
        }
	}*/
    showAppropriateHighlighting : function(component,value){
        component.set('v.showChevron',false);
        var records = component.get('v.records');
        for(var i in records){
            if(records[i].key == value)
                records[i].cssClass='active';
            else if(records[i].key < value)
                records[i].cssClass = 'visited';
            else
                records[i].cssClass = '';
        }
        component.set('v.records',records);
        component.set('v.showChevron',true);
    },
    
    showAppropriateSection : function(component,val){
        switch(val){
            case 1 :component.set("v.sectionName","contactAndComplainant");
                break;
            case 2: component.set("v.sectionName","educationBenefits");
                break;
            case 3: component.set("v.sectionName","complaint");
                break;
            case 4: component.set("v.sectionName","education");
                break;
        }
	}
})