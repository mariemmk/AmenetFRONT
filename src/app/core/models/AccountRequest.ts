export interface AccountRequest{
    idRequest:number
    accountType:String
    status:String
    requestDate:Date
    responseDate:Date
    user: {
        idUser: number;
        firstName: string;
        familyName: string;
        phoneNumber: string;
        gender: string;
        cin: number;
        birthDate: Date;
      };
}