import { Component } from '@angular/core';
import { MediaService } from './shared/services/media.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private mediaService: MediaService) {
  }

  untilDate(date: string) {
    return new Date() >= new Date(date);
  }
}
