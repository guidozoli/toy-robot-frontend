import { Component, Input } from '@angular/core';
import { InfoModalData, ModalService } from './modal.service';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [NgIf, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class InfoModalComponent {
  @Input() modalData?: InfoModalData; 

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.hideModal();
  }


}
