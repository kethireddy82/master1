@isTest
public class CustomTaskDisplayController_Test {
    
     static testMethod void CustomTaskDisplayController1(){ 
         List<Task> testList;
         CustomTaskDisplayController ct = new CustomTaskDisplayController();
        // testList = 
           //  ct.fetchTasks();
        testList =  CustomTaskDisplayController.fetchTasks();
     }

}