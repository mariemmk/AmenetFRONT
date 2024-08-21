import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Reclamation } from 'src/app/core/models/reclamation';
import { ReclamationService } from 'src/app/Services/reclamation.service';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {
  loading: boolean = false;
  error: string | null = null;
  reclamations: Reclamation[] = [];
  selectedUser: any;
  modalOpen = false;
  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  private loadReclamations(): void {
    this.loading = true;
    this.error = null; // Reset error before loading
    this.reclamationService.getAllReclamations().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching reclamations:', err);
        this.error = 'Failed to load reclamations. Please try again later.';
        this.loading = false;
      }
    );
  }

  formatDate(dateArray: any): string {
    if (Array.isArray(dateArray)) {
      const [year, month, day] = dateArray;
      return `${day}-${month}-${year}`;
    }
    return 'Unknown date';
  }

  consulterUtilisateur(reclamation: Reclamation) {
    this.selectedUser = reclamation.user;
    this.modalOpen = true;

    // Manually trigger modal opening
    const modalElement = document.getElementById('userDetailsModal') as any;
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  supprimerReclamation(reclamationId:number){
    this.reclamationService.deleteReclamation(reclamationId).subscribe((userDetails) => {
      this.selectedUser = userDetails;
      
      console.log('Selected User:', this.selectedUser);
      this.loading=true;
    });
  }
}
