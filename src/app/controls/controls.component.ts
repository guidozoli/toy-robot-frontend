import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import {
  Command,
  Direction,
  PlaceCommand,
  RotationDirection,
} from '../robot/robot.component';
import { Option, SelectComponent } from '../shared/select/select.component';
import { ButtonComponent } from '../shared/button/button.component';
import { InputNumberComponent } from '../shared/input-number/input-number.component';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [ButtonComponent, InputNumberComponent, SelectComponent],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  @HostListener('window:keyup', ['$event']) handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.rotate('LEFT');
        break;
      case 'ArrowRight':
        this.rotate('RIGHT');
        break;
      case 'm':
      case 'M':
        this.move();
        break;
      case 'r':
      case 'R':
        this.report()
        break;
    }
  }

  @Output() commandSent = new EventEmitter<Command>();

  directionOptions: Option[] = [
    { value: '', label: '-- Select a direction --' },
    { value: 'NORTH', label: 'NORTH' },
    { value: 'SOUTH', label: 'SOUTH' },
    { value: 'WEST', label: 'WEST' },
    { value: 'EAST', label: 'EAST' },
  ];

  private xVal?: number;
  private yVal?: number;
  private directionVal?: Direction;

  handleValueChange(field: 'x' | 'y' | 'direction', value: number | string) {
    switch (field) {
      case 'x':
        this.xVal = value as number;
        break;
      case 'y':
        this.yVal = value as number;
        break;
      case 'direction':
        this.directionVal = value as Direction;
        break;
    }
  }

  rotate(direction: RotationDirection) {
    this.sendCommand({ type: 'rotate', direction });
  }

  move() {
    this.sendCommand({ type: 'move' });
  }
  
  report() {
    this.sendCommand({ type: 'report' });
  }

  submitPlace() {
    if (this.xVal != null && this.yVal != null && this.directionVal) {
      const command: PlaceCommand = {
        type: 'place',
        placement: {
          x: this.xVal,
          y: this.yVal,
          direction: this.directionVal,
        },
      };
      this.sendCommand(command);
    }
  }

  private sendCommand(command: Command) {
    this.commandSent.emit(command);
  }
}
