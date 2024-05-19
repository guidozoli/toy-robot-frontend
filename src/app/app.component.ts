import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { Command, Direction } from './robot/robot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'toy-robot-frontend';

  @ViewChild('xInput') xInputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('yInput') yInputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('faceSelect') faceSelectEl?: ElementRef<HTMLSelectElement>;
  command?: Command;

  submitPlacement() {
    const x = this.xInputEl?.nativeElement.value
    const y = this.yInputEl?.nativeElement.value
    const face = this.faceSelectEl?.nativeElement.value
    if(x != null && x != '' && y != null && y != '' && face) {
      this.command = {
        type: 'place',
        position: {x: Number(x), y: Number(y), face: face as Direction}
      }
    }
  }
}
