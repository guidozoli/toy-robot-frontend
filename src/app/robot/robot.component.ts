import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../shared/modal/modal.service';

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
export type RotationDirection = 'RIGHT' | 'LEFT';

export interface Placement {
  x: number;
  y: number;
  face: Direction
}

export interface PlaceCommand {
  type: 'place';
  position: Placement;
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

const maxX = 5;
const maxY = 5;

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
  position?: { x: number; y: number };

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
          this.handlePlaceCommand(this.command.position);
          break;
        case 'rotate':
          if(this.applicationStarted) {
            this.handleRotateCommand(this.command.direction);
          }
          break;
        case 'move':
          if(this.applicationStarted) {
            this.handleMoveCommand();
          }
          break;
        case 'report':
          if(this.applicationStarted) {
            this.handleReportCommand();
          }
          break;
      }
    }
  }

  getRobotPosition() {
    if(!this.position || !this.unitSize) {
      return
    }
    return {
      left: `${this.position.x}px`,
      bottom: `${this.position.y}px`,
      width: `${Math.floor(this.unitSize)}px`,
      height: `${Math.floor(this.unitSize)}px`
    };
  }

  handlePlaceCommand(placement: Placement) {
    const x = placement.x * this.unitSize
    const y = placement.y * this.unitSize
    if(!this.applicationStarted && (!this.canUpdateX(x) || !this.canUpdateY(y))) {
      return
    }
    this.position = {
      x: this.canUpdateX(x) ? x: this.position!.x,
      y: this.canUpdateY(y) ? y: this.position!.y,
    };
    this.direction = placement.face
    this.applicationStarted = true;
  }

  private handleRotateCommand(direction: RotationDirection) {
    this.updateDirection(direction);
  }

  private handleMoveCommand() {
    this.updatePosition();
  }

  private handleReportCommand() {
    if(!this.position) {
      return
    }
    console.log(this.position);
    this.modalService.showModal(
      `x: ${this.position.x}; y: ${this.position.y}; face: ${this.direction}`,
      'Placement'
    )
  }

  private updatePosition() {
    if(!this.position) {
      return;
    }
    let x = this.position.x;
    let y = this.position.y;
    switch (this.direction) {
      case 'WEST':
        x = x - this.unitSize;
        break;
      case 'EAST':
        x = x + this.unitSize;
        break;
      case 'SOUTH':
        y = y - this.unitSize;
        break;
      case 'NORTH':
        y = y + this.unitSize;
        break;
    }

    this.position = {
      x: this.canUpdateX(x) ? x: this.position.x,
      y: this.canUpdateY(y) ? y: this.position.y
    };
  }

  private canUpdateX(xToCheck: number): boolean {
    return xToCheck >= 0 && xToCheck <= this.unitSize * (maxX - 1) 
  }

  private canUpdateY(yToCheck: number): boolean {
    return yToCheck >= 0 && yToCheck <= this.unitSize * (maxY - 1) 
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
