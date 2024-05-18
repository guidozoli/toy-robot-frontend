import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { Command } from './robot/robot.component';

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
  command?: Command;

  submitPlacement() {
    const x = this.xInputEl?.nativeElement.value
    const y = this.yInputEl?.nativeElement.value
    if(x != null && y != null) {
      this.command = {
        type: 'place',
        position: {x: Number(x), y: Number(y)}
      }
    }
  }
}
