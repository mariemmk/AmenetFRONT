import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-bourse',
  templateUrl: './bourse.component.html',
  styleUrls: ['./bourse.component.css']
})
export class BourseComponent implements OnInit{
  bourseList: any[] = [];

  constructor (private userService:UserService){}
  ngOnInit(): void {
    this.getBourse()
  }


  getBourse(){
    this.userService.Bourse().subscribe(
      (response: any) => {
        this.bourseList = response; // Affecte la réponse à la liste de devises
        console.log('Devises récupérées avec succès !', response);
      },
      error => {
        console.error('Erreur lors de la récupération des devises :', error);
      }
    );
  }

}
