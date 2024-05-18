import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export type Direction = 'up' | 'right' | 'down' | 'left';
export type RotationDirection = 'right' | 'left';

export type PlaceCommand = {
  type: 'place';
  position: { x: number; y: number };
};
export interface MoveCommand {
  type: 'move';
}
export interface RotateCommand {
  type: 'rotate';
  direction: RotationDirection;
}

export interface ReportCommand {
  type: 'report';
}

export type Command =
  | MoveCommand
  | RotateCommand
  | PlaceCommand
  | ReportCommand;

@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss',
})
export class RobotComponent implements OnChanges {
  @Input() command?: Command;

  public direction: Direction = 'down';
  public position: { x: number; y: number } = { x: 0, y: 0 };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['command'] &&
      changes['command'].currentValue &&
      !changes['command'].firstChange
    ) {
      switch (this.command?.type) {
        case 'rotate':
          this.handleRotateCommand(this.command);
          break;
        case 'move':
          this.handleMoveCommand(this.command);
      }
    }
  }

  getRobotPosition() {
    return {
      left: `${this.position.x}px`,
      bottom: `${this.position.y}px`,
    };
  }

  private handleRotateCommand(command: RotateCommand) {
    this.direction = this.calculateNewDirection(command.direction);
  }

  private handleMoveCommand(command: MoveCommand) {
    let x = this.position.x;
    let y = this.position.y;
    this.updatePosition();
  }

  private updatePosition() {
    let x = this.position.x;
    let y = this.position.y;
    switch (this.direction) {
      case 'left':
        x = x - 100;
        break;
      case 'right':
        x = x + 100;
        break;
      case 'down':
        y = y - 100;
        break;
      case 'up':
        y = y + 100;
        break;
    }
    this.position = {
      x,
      y,
    };
  }

  private rotateLeft(): Direction {
    switch (this.direction) {
      case 'up':
        return 'left';
      case 'right':
        return 'up';
      case 'down':
        return 'right';
      case 'left':
        return 'down';
    }
  }

  private rotateRight(): Direction {
    switch (this.direction) {
      case 'up':
        return 'right';
      case 'right':
        return 'down';
      case 'down':
        return 'left';
      case 'left':
        return 'up';
    }
  }

  private calculateNewDirection(rotateTo: RotationDirection): Direction {
    switch (rotateTo) {
      case 'right':
        return this.rotateRight();
      case 'left':
        return this.rotateLeft();
    }
  }
}
