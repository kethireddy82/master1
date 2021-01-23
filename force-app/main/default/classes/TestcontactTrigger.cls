@isTest
private class TestcontactTrigger
{
    static testMethod void testUnitMethod()
    {
        Contact con = new Contact();
        con.LastName = 'TestLName';
        con.Contact_Role_s__c = 'Compliance Point of Contact';
        insert Con;
        
        con.Contact_Role_s__c = 'DoD MOU Point of Contact';
        Update con;
        
    }

}