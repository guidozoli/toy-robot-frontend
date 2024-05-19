import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { Command, Direction } from './robot/robot.component';
import { ModalData, ModalService } from './shared/modal/modal.service';
import { ModalComponent } from './shared/modal/modal.component';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, ModalComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('xInput') xInputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('yInput') yInputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('directionSelect')
  directionSelectEl?: ElementRef<HTMLSelectElement>;
  @HostListener('window:keyup', ['$event']) handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.command = { type: 'rotate', direction: 'LEFT' };
        break;
      case 'ArrowRight':
        this.command = { type: 'rotate', direction: 'RIGHT' };
        break;
      case 'm':
      case 'M':
        this.command = { type: 'move' };
        break;
      case 'r':
      case 'R':
        this.command = { type: 'report' };
        break;
    }
  }

  command?: Command;

  modalData?: ModalData;
  modalVisible = false;

  private modalSubscription?: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalSubscription = this.modalService.modalVisible.subscribe(
      (res: ModalData | null) => {
        if (!res) {
          setTimeout(() => {
            this.modalVisible = false;
          }, 0);
        } else {
          setTimeout(() => {
            this.modalData = res;
            this.modalVisible = true;
          }, 0);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  submitPlacement() {
    const x = this.xInputEl?.nativeElement.value;
    const y = this.yInputEl?.nativeElement.value;
    const face = this.directionSelectEl?.nativeElement.value;
    if (x != null && x != '' && y != null && y != '' && face) {
      this.command = {
        type: 'place',
        placement: { x: Number(x), y: Number(y), direction: face as Direction },
      };
    }
  }
}
