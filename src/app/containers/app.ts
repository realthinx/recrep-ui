import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'bc-app',
  templateUrl: './app.html'
})
export class AppComponent {

  title = 'app works!';

  constructor(private appService: AppService) {

  }


}
