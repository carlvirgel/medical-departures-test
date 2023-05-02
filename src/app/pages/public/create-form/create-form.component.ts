import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Quote } from 'src/app/core/model/quote';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {

  quote : Quote | any = undefined;
  quoteForm = this.fb.group({
    name: '',
    email: '',
    mobileno: '',
    treatmentDestination: '',
    treatmentInterest: '',
    comments: ''

  })

  constructor(private fb: FormBuilder){

  }
}
