import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Client } from 'src/app/core/models/Client';
import { Reclamation } from 'src/app/core/models/reclamation';
import { Transaction } from 'src/app/core/models/Transactions';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
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
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ]
      }
    ]
  };
  public pieChartType: ChartType = 'pie';

  totalUsers: number = 0;
  totalTransactions: number = 0;
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

  constructor(
    private userService: UserService,
    private creditRequestService: CreditRequestService,
    private transactionService: TransactionService,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit(): void {
    this.loadDonutChartData();
    this.loadBarChartData();
    this.loadPieChartData(); // Call to load pie chart data
    this.loadTotalUsers();
    this.loadTotalTransactions();
    this.loadTotalReclamations();
  }

  loadDonutChartData() {
    this.creditRequestService.getCountByStatus().subscribe(
      (data) => {
        if (data) {
          console.log('Data received for Donut Chart:', data);
          this.donutChartLabels = Object.keys(data); // Set the labels
          this.donutChartData.labels = this.donutChartLabels; // Update the labels in the data
          this.donutChartData.datasets[0].data = Object.values(data); // Set the values
        } else {
          console.warn('No data received for Donut Chart');
        }
      },
      (error) => {
        console.error('Error fetching Donut Chart data:', error);
      }
    );
  }

  loadPieChartData() {
    this.userService.getCountByStatus().subscribe(
      (data) => {
        if (data) {
          console.log('Data received for Pie Chart:', data);
          this.pieChartLabels = Object.keys(data); // Set the labels
          this.pieChartData.labels = this.pieChartLabels; // Update the labels
          this.pieChartData.datasets[0].data = Object.values(data); // Set the values
        } else {
          console.warn('No data received for Pie Chart');
        }
      },
      (error) => {
        console.error('Error fetching Pie Chart data:', error);
      }
    );
  }

  loadBarChartData() {
    this.creditRequestService.getCountByCreditType().subscribe(data => {
      this.barChartLabels = Object.keys(data);
      this.barChartData.labels = this.barChartLabels;
      this.barChartData.datasets[0].data = Object.values(data);
      this.barChartData.datasets[0].backgroundColor = this.generateColors(this.barChartLabels.length);
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
    this.userService.getAllUsers().subscribe(
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
      }
    );
  }
}
