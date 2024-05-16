import { FormControl, Validators } from "@angular/forms";

export class Client {
    idUser!: number;
   
    firstName!: string;
    photo!: string;
    familyName!: string;
    otherName!:string;
    phoneNumber!: string;
    alternativePhoneNumber!:number;
    stateOfOrigin!:string;
    gender!: string;

    accountNumber!:String;
    RIB!:string;
    accountBalance!:number;
    accountType!:String;

    cin!: number;
    password!: string;
    email!: string;
    birthDate!: Date;
    isVerified: boolean = false;
    isBanned: boolean = false;
    createdAt!: Date;
    lastModifiedAt!: Date;
    lastPassword!: string;
    lastDateChangePassword!: Date;
    address!: string;
    role: string = "USER";
    type ?: string;
    codeVerif!: string;
    static fromObject(obj : Client){
        const { firstName,...myUser} = obj
        return myUser;
    }
}
