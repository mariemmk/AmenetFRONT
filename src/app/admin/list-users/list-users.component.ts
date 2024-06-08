import { Component, OnInit, ViewChild } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Client } from 'src/app/core/models/Client';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  @ViewChild(EditUserComponent)
  modal!: EditUserComponent;
  users: Client[] = [];  // Initialize the users array
  selectedUser!: Client;
  modalOpen = false;

  constructor(private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: Client[]) => {
      this.users = data.sort((a, b) => a.idUser - b.idUser);
      if (this.users.length > 0) {
        this.selectedUser = this.users[0];
      }
    }, error => {
      console.error('Error fetching users:', error);
    });
  }

  consulterUtilisateur(user: Client) {
    this.selectedUser = user;
    this.modalOpen = true;
  }

  modifierUtilisateur(user: Client) {
    this.selectedUser = user;
    this.modal.showModal = true;
  }

  supprimerUtilisateur(user: Client) {
    this.selectedUser = user;
  }

  getFormattedDate(date?: Date) {
    if (date) {
      return this.datePipe.transform(date, 'dd-MM-yyyy');
    }
    return '--';
  }

  bloquerUtilisateur(idUser: number): any {
    return this.userService.bloquerUtilisateur(idUser).subscribe(response => {
      console.log(response);
    });
  }
}
