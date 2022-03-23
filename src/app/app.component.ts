import { Component, HostBinding } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlanService } from './core/services/plan.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(private planService: PlanService) {}

  @HostBinding('style.background-image')
  get backgroundImage() {
    return `url(${environment.assetsUrl}/backgrounds/${this.planService.background})`;
  }
}
