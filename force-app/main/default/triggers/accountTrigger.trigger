trigger accountTrigger on Account (before delete) {

    Set<Id> accountId= new Set<Id>();
    Set<Id> contactId= new Set<Id>();

    for( Account acct: Trigger.Old){
        accountId.add(acct.Id);

    }
    System.debug(accountId);

    
    List<contact> contactDel = new List<contact>();
    contactDel = [Select Id 
    from Contact 
        where 
            Account.Id IN: accountId ];

          

    delete contactDel;



}