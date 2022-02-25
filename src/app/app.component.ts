import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  @HostBinding('style.background-image')
  get backgroundImage() {
    return 'url(/assets/backgrounds/background-9.jpg)';
  }
}
