import { Component, OnInit } from '@angular/core';
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

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  private loadReclamations(): void {
    this.loading = true;
    this.reclamationService.getAllReclamtions().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching reclamations:', err);
        console.error('Error details:', err.message, err.status, err.error);
        this.error = 'An error occurred while fetching reclamations.';
        this.loading = false;
      }
    );
    
  }

  formatDate(dateArray: any): string {
    if (Array.isArray(dateArray)) {
      // Assuming dateArray is [year, month, day]
      const [year, month, day] = dateArray;
      return `${day}-${month}-${year}`;
    }
    return 'Unknown date';
  }
}
