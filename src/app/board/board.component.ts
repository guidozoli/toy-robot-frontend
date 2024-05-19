import { Component, HostListener, Input } from '@angular/core';
import { Command, RobotComponent } from '../robot/robot.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RobotComponent, NgIf],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {

  @Input() command?: Command;
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
 
}
