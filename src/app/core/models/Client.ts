export class Client {
    idUser!: number;
    userApplicationId!: string;
    name!: string;
    photo!: string;
    familyName!: string;
    phoneNumber!: string;
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
        const { name,...myUser} = obj
        return myUser;
    }
}
