import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '../icon/iconPack';

type NotAllowedIcon = 'sun';
type AllowedIcon = Exclude<IconName, NotAllowedIcon>;

@Component({
  selector: 'icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.sass'],
})
export class IconPickerComponent implements OnInit {
  @Input() value: IconName = 'default';

  icons: AllowedIcon[] = ['smile'];

  constructor() {}

  ngOnInit(): void {}
}
