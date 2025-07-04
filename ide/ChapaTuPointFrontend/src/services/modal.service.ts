// modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<boolean>();

  modalState$ = this.modalSubject.asObservable();

  openModal() {
    this.modalSubject.next(true);
  console.log('Intentando entrar al modal service');}

  closeModal() {
    this.modalSubject.next(false);
  }
}