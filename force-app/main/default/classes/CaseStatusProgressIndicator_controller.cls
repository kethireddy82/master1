public class CaseStatusProgressIndicator_controller {
	@AuraEnabled
    public static List<String> getPickListValues(){
       List<String> pickListValuesList= new List<String>();
		Schema.DescribeFieldResult fieldResult = Case.Status.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList;
    }
}