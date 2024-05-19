import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Command, RobotComponent } from '../robot/robot.component';
import { NgIf } from '@angular/common';
import { MAX_STEPS_NUMBER } from '../shared/modal/constants';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RobotComponent, NgIf],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements AfterViewInit {
  @Input() command?: Command;
  unitSize?: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setUnitSize();
  }

  @ViewChild('board') boardEl?: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.setUnitSize();
  }

  setUnitSize() {
    const boardWidth = this.boardEl?.nativeElement.offsetWidth;
    console.log(boardWidth);
    if (boardWidth) {
      this.unitSize = Math.floor(boardWidth / MAX_STEPS_NUMBER);
    }
  }
}
