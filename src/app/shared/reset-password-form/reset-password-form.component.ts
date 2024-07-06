import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit{

  @Input() email !: string;
  showPassword = false;
  password! : string;
  repeatPassword !: string;

  constructor(private userService : UserService, private router : Router) {}

  ngOnInit(): void {
  }

  reset() {
    this.userService.resetPassword({email : this.email, newPass : this.password})
      .subscribe(() => this.router.navigateByUrl('login'));
  }

  show(){
    this.showPassword = !this.showPassword;
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

  checkPassword(){
    if (this.repeatPassword === this.password) {
      return true;
    }else{
      return false;
    }
  }

}
