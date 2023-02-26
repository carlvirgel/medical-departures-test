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

@NgModule({
    declarations: [
        AppComponent,
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
        environment.production
            ? []
            : AkitaNgDevtools.forRoot({
                maxAge: 25,
            })
    ]
})
export class AppModule { }
