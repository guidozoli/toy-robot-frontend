import { Component, HostListener, Input } from '@angular/core';
import { RobotComponent, RotationDirection } from '../robot/robot.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RobotComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() rotateTo?: {direction: RotationDirection};
  @HostListener('window:keyup', ['$event']) handleKeyUp(event: KeyboardEvent) {
    console.log('keyup', event)
    switch(event.key) {
      case 'ArrowLeft':
        this.rotateTo = {direction: 'left'}
        break;
      case 'ArrowRight':
        this.rotateTo = {direction: 'right'}
        break;
    }

  }
}
