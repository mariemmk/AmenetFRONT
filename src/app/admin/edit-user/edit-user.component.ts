import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
import { update_admin } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  @Input() user!: Observable<Client>;
  modalVisible = false;
  showModal = false;

  constructor(
    private store : Store<any>
  ) {}

  ngOnInit() {
    console.log(this.user); // Vérifier la valeur initiale de user
  }

  toggleModal() {
    this.showModal = !this.showModal;
    console.log("Modal toggled. Current state:", this.showModal);
  }

  saveChanges() {

  }

  

  
  
}
