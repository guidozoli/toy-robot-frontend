import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Command, Direction, PlaceCommand } from '../robot/robot.component';
import { Option, SelectComponent } from '../shared/select/select.component';
import { ButtonComponent } from '../shared/button/button.component';
import { InputNumberComponent } from '../shared/input-number/input-number.component';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [ButtonComponent, InputNumberComponent, SelectComponent],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {
  @HostListener('window:keyup', ['$event']) handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.sendCommand({ type: 'rotate', direction: 'LEFT' });
        break;
      case 'ArrowRight':
        this.sendCommand({ type: 'rotate', direction: 'RIGHT' });
        break;
      case 'm':
      case 'M':
        this.sendCommand({ type: 'move' });
        break;
      case 'r':
      case 'R':
        this.sendCommand({ type: 'report' });
        break;
    }
  }

  @Output() commandSent = new EventEmitter<Command>()
  

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

  submitPlacement() {
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
    this.commandSent.emit(command)
  }
}
