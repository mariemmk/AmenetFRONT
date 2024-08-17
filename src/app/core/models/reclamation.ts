import { Client } from "./Client";

export interface Reclamation {
    reclamationId: number;
    date: Date ; // Automatically set the current date
    contenu: string;
    typeReclamation: string;
    user: Client | null;
}
