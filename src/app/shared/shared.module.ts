import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomColorPipe } from './pipe/random.color.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    RandomColorPipe,
    HeaderComponent,
    FooterComponent,
    TableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RandomColorPipe,
    HeaderComponent,
    TableComponent
  ],
  providers: []
})
export class SharedModule { }
