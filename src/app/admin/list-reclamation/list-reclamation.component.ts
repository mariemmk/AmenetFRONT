import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/core/models/reclamation';
import { ReclamationService } from 'src/app/Services/reclamation.service';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loading = true;
    this.reclamationService.getAllReclamtions().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
        this.loading = false;
      },
      (err) => {
        this.error = 'An error occurred while fetching reclamations: ' + err.message;
        this.loading = false;
      }
    );
  }
}
