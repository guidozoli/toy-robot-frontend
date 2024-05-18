import { NgClass } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export type Direction = 'up' | 'right' | 'down' | 'left';
export type RotationDirection = 'right' | 'left';

@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [NgClass],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss',
})
export class RobotComponent implements OnChanges {
  @Input() rotateTo?: { direction: RotationDirection };

  public direction: Direction = 'down';

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['rotateTo'] &&
      changes['rotateTo'].currentValue &&
      !changes['rotateTo'].firstChange
    ) {
      this.direction = this.calculateNewDirection(this.rotateTo!.direction);
      console.log('direction', this.direction)
    }
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
