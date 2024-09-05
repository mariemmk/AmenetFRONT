import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Client } from 'src/app/core/models/Client';


import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  showPassword: boolean = false;
  showOtpForm: boolean = false;
  error: boolean = false;
  loading: boolean = false;
  spinner: boolean = true;

  loginForm: FormGroup;
  otpForm: FormGroup;
  email: string = '';  // Variable to store the email

  constructor(
    private authService: UserService,
    private notifications: NotificationsService,
    private router: Router,
    private store: Store<{ user: Client, accessToken: string }>,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otpCode: ['', Validators.required],
      email: ['']  // Add email to OTP form group
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.spinner = !this.spinner, 500);
  }

  show() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.email = email;  // Save email

    this.authService.login({ email, password }).subscribe({
      next: response => {
        this.showOtpForm = true;
        this.notifications.success('Success', 'Please enter the OTP sent to your email.', {
          timeOut: 5000
        });
        this.loading = false;
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
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  verifyOtp() {
    if (this.otpForm.invalid) {
      return;
    }
  
    this.loading = true;
    const { otpCode } = this.otpForm.value;
  
    this.authService.validateOtp(this.email, otpCode).subscribe({
      next: response => {
        // OTP validated, now fetch user details
        this.authService.getUserByEmail(this.email).subscribe({
          next: userResponse => {
            const user = userResponse;  // Assuming the response contains the user details
            console.log('User after OTP:', user);
  
            if (user && user.role === 'ADMIN') {
              this.notifications.success('Success', 'Logged in successfully as admin.', {
                timeOut: 5000
              });
              this.router.navigate(['/admin/dashbord']);  // Adjust the path as needed
            } else {
              this.notifications.error('Error', 'You do not have permission to access the admin dashboard.', {
                timeOut: 5000
              });
              this.loading = false;
            }
          },
          error: err => {
            this.notifications.error('Error', 'Failed to retrieve user information.', {
              timeOut: 5000
            });
            console.error('User info retrieval error:', err);
            this.loading = false;
          }
        });
      },
      error: err => {
        this.notifications.error('Error', 'Invalid OTP. Please check the code and try again.', {
          timeOut: 5000
        });
        this.error = true;
        this.loading = false;
        console.error('OTP validation error:', err);
      }
    });
  }
  
  
}
