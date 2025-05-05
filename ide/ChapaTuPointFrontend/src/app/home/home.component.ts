import { Component } from '@angular/core';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private modalService: ModalService) {}

  openLoginModal() {
    this.modalService.openModal();
    console.log('Intentando entrar al modal');
  }

}
