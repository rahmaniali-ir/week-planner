import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Color } from '../../models/color';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.sass'],
})
export class ColorPickerComponent implements OnInit {
  @Input() color: Color = new Color(0, 0, 0);
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  onColorChange() {
    this.color.hex = this.input.nativeElement.value;
  }
}
