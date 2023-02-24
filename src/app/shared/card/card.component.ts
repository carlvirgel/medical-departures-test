import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() data: User | any;
  @Input() cardType: 'user' | 'post' = 'user';


  
}
