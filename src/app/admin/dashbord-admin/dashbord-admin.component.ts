import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Client } from 'src/app/core/models/Client';
import { Reclamation } from 'src/app/core/models/reclamation';
import { Transaction } from 'src/app/core/models/Transactions';
import { ReclamationService } from 'src/app/Services/reclamation.service';
import { TransactionService } from 'src/app/Services/transaction.service';

import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css']
})
export class DashbordAdminComponent implements OnInit {
  // Pie chart for credit status distribution
  public pieChartLabels: string[] = [];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'] }]
  };
  public pieChartType: ChartType = 'pie';
  totalUsers: number = 0;
  totalTransactions:number=0;
  totalReclamations: number = 0;
  // Bar chart for credit types distribution
  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };
  public barChartType: ChartType = 'bar';
  public barChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  // Donut chart for credit status breakdown
  public donutChartLabels: string[] = [];
  public donutChartData: ChartData<'doughnut', number[], string> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'] }]
  };
  public donutChartType: ChartType = 'doughnut';


  constructor(private creditService: UserService , private transactionService:TransactionService , private reclamationService:ReclamationService) { }

  ngOnInit(): void {
    this.loadPieChartData();
    this.loadBarChartData();
    this.loadDonutChartData();
    this.loadTotalUsers();
    this.loadTotalTransactions();
    this.loadTotalReclamations();
  }

  loadPieChartData() {
    this.creditService.getCountByStatus().subscribe(data => {
      this.pieChartLabels = Object.keys(data);
      this.pieChartData.labels = this.pieChartLabels;
      this.pieChartData.datasets[0].data = Object.values(data);
    });
  }

  loadBarChartData() {
    this.creditService.getCountByCreditType().subscribe(data => {
      this.barChartLabels = Object.keys(data);
      this.barChartData.labels = this.barChartLabels;
      this.barChartData.datasets[0].data = Object.values(data);
      this.barChartData.datasets[0].backgroundColor = this.generateColors(this.barChartLabels.length);
    });
  }

  loadDonutChartData() {
    this.creditService.getCountByCreditType().subscribe(data => {
      this.donutChartLabels = Object.keys(data);
      this.donutChartData.labels = this.donutChartLabels;
      this.donutChartData.datasets[0].data = Object.values(data);
    });
  }

  generateColors(length: number) {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`);
    }
    return colors;
  }

  loadTotalUsers() {
    this.creditService.getAllUsers().subscribe(
      (users: Client[]) => this.totalUsers = users.length,
      error => console.error('Error fetching user count:', error)
    );
  }


  loadTotalTransactions() {
    this.transactionService.getAllTransactions().subscribe(
      (transactions: Transaction[]) => this.totalTransactions = transactions.length,
      error => console.error('Error fetching transaction count:', error)
    );
  }
  loadTotalReclamations() {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations: Reclamation[]) => {
        this.totalReclamations = reclamations.length;
      },
      (error) => {
        console.error('Error fetching reclamation count:', error);
        // Ajoutez du code pour gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
      }
    );
  }
  
}
