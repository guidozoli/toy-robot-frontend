import { Component, Input } from '@angular/core';
import { InfoModalData, ModalService } from '../../services/modal.service';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [NgIf, ButtonComponent],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {
  @Input() modalData?: InfoModalData; 

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.hideInfoModal();
  }


}
