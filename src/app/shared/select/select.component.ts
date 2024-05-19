import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Option {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgFor],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options: Option[] = [];
  @Output() valueChanged = new EventEmitter<string | number>()

  handleChange(event: Event) {
    this.valueChanged.emit((event.target as HTMLSelectElement).value)
  }
}
