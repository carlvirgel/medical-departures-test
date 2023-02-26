import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor( private meta: Meta, private title: Title) {
  }

  ngOnInit(): void {
    this.meta.addTag({ name: 'description', content: 'Login Page Admin' });
    this.meta.addTag({ name: 'title', content: 'Medical Departures | Admin' });
    this.title.setTitle('Medical Departures | Admin ');
  }
}
