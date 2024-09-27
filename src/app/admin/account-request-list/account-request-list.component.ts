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
    this.fetchAccountRequests();
  }

  // Méthode pour récupérer les demandes de crédit
  fetchAccountRequests(): void {
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

  // Méthode pour approuver une demande
  approveAccountRequest(idRequest: number): void {
    this.accountRequestService.approveAccountRequest(idRequest).subscribe(
      (approvedRequest: AccountRequest) => {
        // Mise à jour locale de la demande approuvée sans rafraîchir toute la page
        this.accountRequests = this.accountRequests.map(request =>
          request.idRequest === idRequest ? approvedRequest : request
        );
        console.log('Demande de crédit approuvée:', approvedRequest);
      },
      (err) => {
        this.error = `An error occurred while approving the request with id ${idRequest}.`;
      }
    );
  }


    // Méthode pour refuseer une demande
    declineAccountRequest(idRequest: number): void {
      this.accountRequestService.declineAccountRequest(idRequest).subscribe(
        (declinedRequest: AccountRequest) => {
          // Mise à jour locale de la demande approuvée sans rafraîchir toute la page
          this.accountRequests = this.accountRequests.map(request =>
            request.idRequest === idRequest ? declinedRequest : request
          );
          console.log('Demande de crédit refuse:', declinedRequest);
        },
        (err) => {
          this.error = `An error occurred while approving the request with id ${idRequest}.`;
        }
      );
    }

  // Méthode pour sélectionner un utilisateur
  selectUser(userId: number): void {
    this.accountRequestService.retrieveUser(userId).subscribe((userDetails) => {
      this.selectedUser = userDetails;
      console.log('Selected User:', this.selectedUser);
    });
  }

  // Méthode pour effacer l'utilisateur sélectionné
  clearSelectedUser(): void {
    this.selectedUser = null;
  }

  // Formater la date
  getFormattedDate(date?: Date): string {
    if (date) {
      return this.datePipe.transform(date, 'dd-MM-yyyy') || '--';
    }
    return '--';
  }
}
