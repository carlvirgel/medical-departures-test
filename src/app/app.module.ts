import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './pages/admin/admin.module';
import { PublicModule } from './pages/public/public.module';
import { CreateFormComponent } from './pages/public/create-form/create-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//primeng 
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AnimateModule } from 'primeng/animate';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
    declarations: [
        AppComponent,
        CreateFormComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PublicModule,
        AdminModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AnimateModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        environment.production
            ? []
            : AkitaNgDevtools.forRoot({
                maxAge: 25,
            })
    ]
})
export class AppModule { }
