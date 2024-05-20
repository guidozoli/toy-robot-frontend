import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { MAX_STEPS_NUMBER } from '../constants';

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
export type RotationDirection = 'RIGHT' | 'LEFT';

export interface Placement {
  x: number;
  y: number;
  direction: Direction;
}

export interface PlaceCommand {
  type: 'place';
  placement: Placement;
}
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
  imports: [NgClass, NgStyle, NgIf],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss',
})
export class RobotComponent implements OnChanges {
  @Input() command?: Command;
  @Input() unitSize!: number;
  coordinates?: { x: number; y: number };
  public direction?: Direction;

  applicationStarted = false;

  constructor(private modalService: ModalService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['command'] &&
      changes['command'].currentValue &&
      !changes['command'].firstChange
    ) {
      console.log('command', this.command);
      switch (this.command?.type) {
        case 'place':
          this.handlePlaceCommand(this.command.placement);
          break;
        case 'rotate':
          if (this.applicationStarted) {
            this.handleRotateCommand(this.command.direction);
          }
          break;
        case 'move':
          if (this.applicationStarted) {
            this.handleMoveCommand();
          }
          break;
        case 'report':
          if (this.applicationStarted) {
            this.handleReportCommand();
          }
          break;
      }
    }
  }

  getRobotStyleObj() {
    if (!this.coordinates || !this.unitSize) {
      return;
    }
    return {
      left: `${this.coordinates.x * this.unitSize}px`,
      bottom: `${this.coordinates.y * this.unitSize}px`,
      width: `${this.unitSize}px`,
      height: `${this.unitSize}px`,
    };
  }

  handlePlaceCommand(placement: Placement) {
    if (
      !this.isNewCoordinateInRange(placement.x) ||
      !this.isNewCoordinateInRange(placement.y)
    ) {
      return;
    }
    this.coordinates = {
      x: placement.x,
      y: placement.y,
    };
    this.direction = placement.direction;
    this.applicationStarted = true;
  }

  private handleRotateCommand(direction: RotationDirection) {
    this.updateDirection(direction);
  }

  private handleMoveCommand() {
    this.makeStep();
  }

  private handleReportCommand() {
    if (!this.coordinates || !this.direction) {
      return;
    }
    this.modalService.showInfoModal(
      {'X': this.coordinates.x.toString(), 'Y': this.coordinates.y.toString(),  'Direction': this.direction},
      'Placement'
    );
  }

  private makeStep() {
    if (!this.coordinates) {
      return;
    }
    let x = this.coordinates.x;
    let y = this.coordinates.y;
    switch (this.direction) {
      case 'WEST':
        x = x - 1;
        break;
      case 'EAST':
        x = x + 1;
        break;
      case 'SOUTH':
        y = y - 1;
        break;
      case 'NORTH':
        y = y + 1;
        break;
    }

    this.coordinates = {
      x: this.isNewCoordinateInRange(x) ? x : this.coordinates.x,
      y: this.isNewCoordinateInRange(y) ? y : this.coordinates.y,
    };
  }

  private isNewCoordinateInRange(newCoordinate: number): boolean {
    return newCoordinate >= 0 && newCoordinate < MAX_STEPS_NUMBER;
  }

  private rotateLeft(): Direction {
    switch (this.direction!) {
      case 'NORTH':
        return 'WEST';
      case 'EAST':
        return 'NORTH';
      case 'SOUTH':
        return 'EAST';
      case 'WEST':
        return 'SOUTH';
    }
  }

  private rotateRight(): Direction {
    switch (this.direction!) {
      case 'NORTH':
        return 'EAST';
      case 'EAST':
        return 'SOUTH';
      case 'SOUTH':
        return 'WEST';
      case 'WEST':
        return 'NORTH';
    }
  }

  private updateDirection(rotateTo: RotationDirection) {
    switch (rotateTo) {
      case 'RIGHT':
        this.direction = this.rotateRight();
        break;
      case 'LEFT':
        this.direction = this.rotateLeft();
        break;
    }
  }
}
