import { Component, OnInit } from '@angular/core';
import { AccountRequest } from 'src/app/core/models/AccountRequest';
import { UserService } from 'src/app/Services/user.service';
import { DatePipe } from '@angular/common';

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

  constructor(private accountRequestService: UserService, private datePipe: DatePipe) {}

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

  selectUser(userId: number): void {
    this.accountRequestService.retrieveUser(userId).subscribe((userDetails) => {
      this.selectedUser = userDetails;
      console.log('Selected User:', this.selectedUser);
    });
  }

  clearSelectedUser(): void {
    this.selectedUser = null;
  }

  getFormattedDate(date?: Date): string {
    if (date) {
      return this.datePipe.transform(date, 'dd-MM-yyyy') || '--';
    }
    return '--';
  }
}
