import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';
import { SessionQuery } from './core/state/session/session.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{ 
  title = 'medical-departures-test';
  

}
