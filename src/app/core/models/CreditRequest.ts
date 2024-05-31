export class  Credit{
     id!:number;

     agence!:string;
    date!:Date;
    accountNumber!:string;

    clientName!:string;
     clientCIN!:string;
     clientIdNumber!:string;
     clientJobStatus!:string;
     clientNetSalary!:number;
     clientOtherIncomeSources!:string;
    clientOtherIncomeAmount!:number;

    creditAmount!:number;
    creditPurpose!:string;
    repaymentFrequency!:string;
    durationYears!:number;
    convention!:string;
     conventionName!:string;

     repaymentType!:string;
     propertyOrConstructionAmount!:number;
     status!:string; 
     user?: any;

}