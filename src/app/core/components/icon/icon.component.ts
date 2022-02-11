import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconName, iconPack } from './iconPack';

@Component({
  selector: 'icon',
  template: '',
  styleUrls: ['./icon.component.sass'],
})
export class IconComponent implements OnInit {
  @Input() name: IconName = 'default';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  @HostBinding('innerHTML')
  public get svg() {
    return this.sanitizer.bypassSecurityTrustHtml(iconPack[this.name]);
  }
}
