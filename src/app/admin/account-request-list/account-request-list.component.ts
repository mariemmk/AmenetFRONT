import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountRequest } from 'src/app/core/models/AccountRequest';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-account-request-list',
  templateUrl: './account-request-list.component.html',
  styleUrls: ['./account-request-list.component.css']
})
export class AccountRequestListComponent implements OnInit {
 
  accountRequests: AccountRequest[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedUser: any;

  constructor(private accountRequestService: UserService ,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loading = true;
    this.accountRequestService.getListAccountRequests().subscribe(
      (data: AccountRequest[]) => {
        this.accountRequests = data;
        this.loading = false;
        console.log('Account Requests:', this.accountRequests);
      },
      (err) => {
        this.error = 'An error occurred while fetching account requests.';
        this.loading = false;
      }
    );
  }

  approveAccountRequest(idRequest: number): void {
    this.accountRequestService.approveAccountRequest(idRequest).subscribe((approvedRequest) => {
      this.accountRequests = this.accountRequests.map(request =>
        request.idRequest === idRequest ? approvedRequest : request
      );
    });
  }

  /*rejectAccountRequest(requestId: number): void {
    this.accountRequestService.rejectAccountRequest(requestId).subscribe((rejectedRequest) => {
      this.accountRequests = this.accountRequests.map(request =>
        request.id === requestId ? rejectedRequest : request
      );
    });
  }*/

    selectUser(userId: number): void {
      // Example: Assuming you have a UserService method to fetch user details
      this.accountRequestService.retrieveUser(userId).subscribe((userDetails) => {
        this.selectedUser = userDetails; // Set the selected user details
      });
    }

    clearSelectedUser(): void {
      this.selectedUser = null; // Clear selected user details
    }

}
