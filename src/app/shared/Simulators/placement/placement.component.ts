import { formatDate } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SimulateurService } from 'src/app/Services/simulateur.service';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css']
})
export class PlacementComponent {
  readonly styles: string[] =[
    "assets/landing/css/style.css",
    "assets/landing/vendor/swiper/swiper-bundle.min.css",
    "assets/landing/vendor/glightbox/css/glightbox.min.css",
    "assets/landing/vendor/bootstrap-icons/bootstrap-icons.css",
    "assets/landing/vendor/boxicons/css/boxicons.min.css",
    "assets/landing/vendor/bootstrap/css/bootstrap.min.css",
    "assets/landing/vendor/aos/aos.css"
  ];

  js: string[] = [
    "assets/landing/vendor/aos/aos.js",
    "assets/landing/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "assets/landing/vendor/glightbox/js/glightbox.min.js",
    "assets/landing/vendor/isotope-layout/isotope.pkgd.min.js",
    "assets/landing/vendor/swiper/swiper-bundle.min.js",
    "assets/landing/js/main.js",
    "https://unpkg.com/swiper/swiper-bundle.min.js"
  ];

  private styleElements: HTMLLinkElement[] = [];
  private scriptElements: HTMLScriptElement[] = [];

  constructor(private renderer : Renderer2, private router : Router , private simulator:SimulateurService) {}
  ngOnInit(): void {
    this.styles.forEach(element => {
      const linkElement = this.renderer.createElement('link');
      this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
      this.renderer.setAttribute(linkElement, 'href', element);
      this.styleElements.push(linkElement); // Push the created element into the array
      this.renderer.appendChild(document.head, linkElement);
    });
    this.js.forEach(element => {
      const scriptElement = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptElement, 'src', element);
      this.renderer.setAttribute(scriptElement, 'type', "text/javascript");
      this.scriptElements.push(scriptElement); // Push the created element into the array
      this.renderer.appendChild(document.head, scriptElement);
    });
  }
  destroy(route : string){
    this.styleElements.forEach(element => {
      this.renderer.removeChild(document.head, element);
    });
    this.scriptElements.forEach(element => {
      this.renderer.removeChild(document.head, element);
    });
    this.router.navigateByUrl(route);
  }

  ngOnDestroy(): void {
    this.styleElements.forEach(element => {
      this.renderer.removeChild(document.head, element);
    });
    this.scriptElements.forEach(element => {
      this.renderer.removeChild(document.head, element);
    });
  }


  amount!: number;
  issueDate!:Date;
  maturityDate!:Date;
  result: any = null; 
 
  
  formatDate(date: any): string {
    // Implémentez votre logique de formatage de date ici
    return formatDate(date, 'yyyy-MM-dd', 'en-US'); // Exemple de format de date
  }
  
  simulatePlacement() {
    this.simulator.simulateInvestment(this.amount, this.issueDate , this.maturityDate,).subscribe(response => {
    this.result=response;
      console.log(response);
      // Traitez la réponse ici, par exemple en mettant à jour les variables du composant
    }, error => {
      console.error('Erreur lors de la simulation :', error);
    });

}
}
