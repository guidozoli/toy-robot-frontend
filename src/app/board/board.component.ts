import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Command, RobotComponent } from '../robot/robot.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RobotComponent, NgIf],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements AfterViewInit{
  @Input() command?: Command;
  unitSize?: number
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
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setUnitSize()
  }

  @ViewChild('board') boardEl?: ElementRef<HTMLDivElement>


  ngAfterViewInit(): void {
    this.setUnitSize()
  }

  setUnitSize() {
    const boardWidth = this.boardEl?.nativeElement.offsetWidth
    console.log(boardWidth)
    if(boardWidth) {
      this.unitSize = boardWidth / 5
    }
  }
 
}
