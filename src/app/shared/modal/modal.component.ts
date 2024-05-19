import { Component, Input } from '@angular/core';
import { ModalData, ModalService } from './modal.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() modalData?: ModalData; 

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.hideModal();
  }


}
