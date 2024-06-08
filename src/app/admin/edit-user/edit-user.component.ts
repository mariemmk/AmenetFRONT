import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, UPDATE } from '@ngrx/store';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';

import { update, update_admin } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user: Client | null=null;
  showModal = false;
  updateUserForm!: FormGroup;
  constructor(
    private store: Store<any> ,private fb: FormBuilder, private userService:UserService
  ){}

  ngOnInit() {
    console.log(this.user); // Verify the initial value of user
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.initializeForm();
    }
  }

  initializeForm() {
    
    this.updateUserForm = this.fb.group({
      firstName: [this.user?.firstName || '', Validators.required],
      familyName: [this.user?.familyName || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [this.user?.phoneNumber || '', Validators.required],
      cin: [this.user?.cin || '', Validators.required],
      address: [this.user?.address || '', Validators.required],
      // Ajoutez d'autres champs si nécessaire
    });

  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  updateUser() {
    if (this.updateUserForm.valid) {
      const updatedUser: Client = {
        idUser: this.user!.idUser,
        firstName: this.updateUserForm.value.firstName,
        familyName: this.updateUserForm.value.familyName,
        email: this.updateUserForm.value.email,
        phoneNumber: this.updateUserForm.value.phoneNumber,
        cin: this.updateUserForm.value.cin,
        address: this.updateUserForm.value.address,
        photo: this.updateUserForm.value.photo,
        otherName: this.updateUserForm.value.otherName,
        alternativePhoneNumber: this.updateUserForm.value.alternativePhoneNumber,
        stateOfOrigin: this.updateUserForm.value.address,
        gender: this.updateUserForm.value.gender,
        accountNumber:this.updateUserForm.value.accountNumber ,
        rib: this.updateUserForm.value.rib,
        accountBalance: this.updateUserForm.value.accountBalance,
        accountType: this.updateUserForm.value.accountType,
        password: this.updateUserForm.value.password,
        birthDate: this.updateUserForm.value.birthDate,
        isVerified: this.updateUserForm.value.isVerified,
        isBanned: this.updateUserForm.value.isBanned,
        createdAt: this.updateUserForm.value.createdAt,
        lastModifiedAt: this.updateUserForm.value.lastModifiedAt,
        lastPassword: this.updateUserForm.value.lastPassword,
        lastDateChangePassword: this.updateUserForm.value.lastDateChangePassword,
        role: this.updateUserForm.value.role,
        codeVerif: this.updateUserForm.value.codeVerif
      };

      this.userService.updateUser(updatedUser).subscribe((response) => {
        // Gérez la réponse de mise à jour ici
        console.log('User updated successfully:', response);
      });
    }
  }
}
