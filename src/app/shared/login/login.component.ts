import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { NotificationsService } from 'angular2-notifications';
import { login } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  email!: string;
  password!: string;
  badCredentials: boolean = false;
  spinner = true;
  loading = false;
  error = false;

  constructor(private authService: UserService, private notifications: NotificationsService, private router: Router, private store: Store<{ user: Client, accessToken: string }>) {}

  ngOnInit(): void {
    setTimeout(() => this.spinner = !this.spinner, 500);
  }

  show() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: response => {
        this.notifications.success('Success', 'Logged in successfully', {
          timeOut: 5000
        });
        this.router.navigate(['/client']);
      },
      error: err => {
        this.notifications.error('Error', 'Login failed. Please check your credentials.', {
          timeOut: 5000
        });
        this.error = true;
        this.loading = false;
        console.error('Login error:', err);  // Add detailed logging
      }
    });
  }
}
