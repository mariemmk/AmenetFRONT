import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  curencyList: any[] = [];
  constructor(private userService:UserService , private http:HttpClient){}
  ngOnInit(): void {
   this.getCurency()
  }

  getCurency() {
    this.userService.eventsf().subscribe(
      (response: any) => {
        this.curencyList = response; // Affecte la réponse à la liste de devises
        console.log('Devises récupérées avec succès !', response);
      },
      error => {
        console.error('Erreur lors de la récupération des devises :', error);
      }
    );
  }
   

}

  

