import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component {
  activeIndex: number = 0;
  urls: string[] = [
    '/recomendados?idCategoria=3', 
    '/recomendados?idCategoria=4', 
    '/recomendados?idCategoria=2', 
    '/recomendados?idCategoria=1'
  ];

  constructor(private router: Router) {}

 
  onSlideChange(event: any): void {
    this.activeIndex = event.to; 
  }


  navigateTo(): void {
    const targetUrl = this.urls[this.activeIndex];
    if (targetUrl) {
      this.router.navigateByUrl(targetUrl);
    }
  }
}