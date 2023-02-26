import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {

  isLoggedin: boolean = false;

  constructor(private router:Router, private activatedRoute: ActivatedRoute, private sessionService: SessionService) {
    router.events.forEach((event: any) => {
      if(event && event.routerEvent) {
        const { routerEvent } = event;
        if(routerEvent.url.includes('/login')) {
          this.isLoggedin = true;
        } else {
          this.isLoggedin = false;
        }
      } else if(event instanceof NavigationEnd) {
        if(event.url.includes('/login')) {
          this.isLoggedin = true;
        } else {
          this.isLoggedin = false;
        }
      }
    });
    this.activatedRoute.queryParams.subscribe(params => {
      let logout = params['logout'];
      if(logout) {
        this.sessionService.logout();
        setTimeout(()=> {
          this.router.navigate(['/'])
        })
      }
  });
  }
}
