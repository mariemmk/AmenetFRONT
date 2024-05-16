import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Client } from 'src/app/core/models/Client';
import { UserService } from 'src/app/Services/user.service';
import { signup } from 'src/app/store/actions/user.action';
import { tunisianStates, usaStates } from './states';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  @ViewChild('gender') genderModel!: NgModel; // Add this line
  @ViewChild('accountType') accountTypeModel!:NgModel;
  showPassword = false;
  repeatPassword! : string;
  mdpValide! : boolean;
  user : Client;
  address !: string;
  city !: string ;
  state : string = "Choose ...";
 
  zip !: number;
  states = tunisianStates;
  selectedgenders = ['Male', 'Female', 'Other'];
  selectedAccountType=['IRA','CHECKING',' SAVING','MONEY_MARKET' ,' CERTIFICATION_OF_DEPOSIT'];

  constructor(private userService: UserService, private notifications: NotificationsService,private store : Store ){
    this.user = new Client();
    this.user.password ='';
    this.user.gender = ''; // Initialize gender property here
    this.user.accountType='';
  }
  ngOnInit(): void {
  }

  show(){
    this.showPassword = !this.showPassword;
  }

  signup(){
    this.user.address = this.getAddress();
    this.user.createdAt = new Date();
    
    this.user.lastModifiedAt = new Date();
    this.store.dispatch(signup(this.user));
    console.log('Birth Date:', this.user.birthDate);
    this.notifications.success('Succès', 'Ajout de compte avec succès',{timeoOut: 5000});
    console.log('Inscription effectuée avec succès:', this.user);
}

  getAddress=() => this.address+" "+this.city+" "+this.state+" "+this.zip
 
  checkPassword(){
    if (this.repeatPassword === this.user.password) {
      return true;
    }else{
      return false;
    }
  }

  hasUpperCase(input : string) : Boolean {
    return /[A-Z]/.test(input);
  }
  hasLowerCase(input : string) : Boolean {
    return /[a-z]/.test(input);
  }
  hasDigit(input : string) : Boolean {
    return /[0-9]/.test(input);
  }
  hasSpecialCharacters(input: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(input);
  }
  isPasswordLengthValid(input: string): boolean {
    return input.length >= 8 && input.length <= 24;
  }

}
