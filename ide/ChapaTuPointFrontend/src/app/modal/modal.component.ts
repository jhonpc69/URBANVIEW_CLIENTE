import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input('title') title: string = '';
  @Input('textAccept') textAccept: string = 'Guardar';
  @Output('accept') accept: EventEmitter<any> = new EventEmitter<any>();
  @Output('cancel') cancel: EventEmitter<any> = new EventEmitter<any>();
  @Input('hideCancel') hideCancel: boolean = false;
  @Input('hideFooter') hideFooter: boolean = false;
  @Input('scrollable') scrollable: boolean = false;
  @Input('size') size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen' | '' = 'md';
  showModal: boolean = false;
  @Input('show') show: boolean = false;


  onAccept() {
    this.accept.emit(null);
  }


  onCancel() {
    this.cancel.emit(null);
  }

}
