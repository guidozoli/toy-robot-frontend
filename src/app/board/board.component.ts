import { Component, HostListener, Input } from '@angular/core';
import { Command, RobotComponent } from '../robot/robot.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RobotComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  @Input() command?: Command;
  @HostListener('window:keyup', ['$event']) handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.command = { type: 'rotate', direction: 'left' };
        break;
      case 'ArrowRight':
        this.command = { type: 'rotate', direction: 'right' };
        break;
      case 'm':
      case 'M':
        this.command = { type: 'move' };
    }
  }
}
