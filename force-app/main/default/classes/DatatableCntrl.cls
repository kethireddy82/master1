public class DatatableCntrl{  
   public List<Task> accList {get; set;}  
   public DatatableCntrl(){  
     accList = [SELECT id,Owner.Name,ActivityDate,Status,TaskSubtype,Subject FROM Task];  
   }  
 }