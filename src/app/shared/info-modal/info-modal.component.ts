import { Component, Input } from '@angular/core';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';

import { InfoModalData, ModalService } from '../../services/modal.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [NgIf, ButtonComponent, NgFor, KeyValuePipe],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {
  @Input() modalData?: InfoModalData; 

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.hideInfoModal();
  }

  isMessageString() {
    const res = typeof this.modalData?.message === 'string' || this.modalData?.message instanceof String
    return res;
  }


}
