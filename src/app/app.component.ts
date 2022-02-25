import { Component, HostBinding } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  @HostBinding('style.background-image')
  get backgroundImage() {
    return `url(${environment.assetsUrl}/backgrounds/background-9.jpg)`;
  }
}
