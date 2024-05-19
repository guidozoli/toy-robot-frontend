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
import { InfoModalData, ModalService } from './shared/modal/modal.service';
import { InfoModalComponent } from './shared/modal/modal.component';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { ButtonComponent } from './shared/button/button.component';
import { InputNumberComponent } from './shared/input-number/input-number.component';
import { Option, SelectComponent } from './shared/select/select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BoardComponent,
    InfoModalComponent,
    NgIf,
    ButtonComponent,
    InputNumberComponent,
    SelectComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {


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

  infoModalData?: InfoModalData;
  infoModalVisible = false;

  directionOptions: Option[] = [
    {value: '', label: '--select a direction--'},
    {value: 'NORTH', label: 'NORTH'},
    {value: 'SOUTH', label: 'SOUTH'},
    {value: 'WEST', label: 'WEST'},
    {value: 'EAST', label: 'EAST'}
  ]

  private modalSubscription?: Subscription;

  private xVal?: number;
  private yVal?: number;
  private directionVal?: Direction;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalSubscription = this.modalService.modalVisible.subscribe(
      (res: InfoModalData | null) => {
        if (!res) {
          setTimeout(() => {
            this.infoModalVisible = false;
          }, 0);
        } else {
          setTimeout(() => {
            this.infoModalData = res;
            this.infoModalVisible = true;
          }, 0);
        }
      }
    );
  }

  handleValueChange(field: 'x' | 'y' | 'direction', value: number | string) {
    switch(field) {
      case 'x':
        this.xVal = value as number
        break;
      case 'y':
        this.yVal = value as number
        break;
      case 'direction':
        this.directionVal = value as Direction
        break;
    }
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  submitPlacement() {
    if (this.xVal != null && this.yVal != null && this.directionVal) {
      this.command = {
        type: 'place',
        placement: {
          x: this.xVal,
          y: this.yVal,
          direction: this.directionVal,
        },
      };
    }
  }
}
