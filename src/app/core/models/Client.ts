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
    totpSecret!:string;
    

    income!:number;
    static fromObject(obj : Client){
        const { firstName,...myUser} = obj
        return myUser;
    }
}
export class Admin extends Client {
    constructor() {
        super();
        this.role = "ADMIN";
    }}