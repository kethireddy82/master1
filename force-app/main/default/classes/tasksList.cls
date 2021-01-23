public class tasksList {
    
    @AuraEnabled
    public static List <Task > fetchTasks() {
        //Qyery 10 accounts
        List<Task> tskList = [SELECT id,Owner.Name,ActivityDate,Status,TaskSubtype,Subject FROM Task];
        //return list of accounts
        return tskList;
    }

}