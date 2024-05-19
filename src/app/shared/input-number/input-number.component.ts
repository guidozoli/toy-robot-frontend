import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss'
})
export class InputNumberComponent {
  @Input() placeholder = ''
  @Output() valueChanged = new EventEmitter<number>()

  handleChange(event: Event) {
    const val = (event.target as HTMLInputElement).value
    if(!isNaN(Number(val))) {
      this.valueChanged.emit(Number(val))
    }
  }
}
