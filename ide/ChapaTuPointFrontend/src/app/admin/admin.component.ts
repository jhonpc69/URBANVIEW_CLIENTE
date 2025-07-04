import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  currentComponent: string = 'adminpanel';

  loadComponent(componentName: string) {
    this.currentComponent = componentName;
  }
}