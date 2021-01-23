public class CaseCreationController {
    public CaseCreationController(ApexPages.StandardController controller){}
    public pagereference redirectcasePage(){
        pagereference pr = new pagereference('/lightning/o/Case/new?count=2&nooverride=1');
        return pr;
    }
}