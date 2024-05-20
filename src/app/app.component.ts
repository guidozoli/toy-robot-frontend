import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

import { BoardComponent } from './board/board.component';
import { Command } from './robot/robot.component';
import { InfoModalData, ModalService } from './services/modal.service';
import { InfoModalComponent } from './shared/info-modal/info-modal.component';
import { ControlsComponent } from './controls/controls.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BoardComponent,
    InfoModalComponent,
    NgIf,
    ControlsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  command?: Command;

  infoModalData?: InfoModalData;
  infoModalVisible = false;

  private modalSubscription?: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalSubscription = this.modalService.infoModalVisible.subscribe(
      (res: InfoModalData | false) => {
        if (!res) {
          this.infoModalVisible = false;
        } else {
          setTimeout(() => {
            this.infoModalData = res;
            this.infoModalVisible = true;
          }, 0);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }
}
