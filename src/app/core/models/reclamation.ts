export class Reclamation{
    reclamationId!:number;
    date!:Date;
    contenu!:string;
    typeReclamation!:string

    constructor() {
        this.date = new Date(); // Automatically set the current date
      }
}

