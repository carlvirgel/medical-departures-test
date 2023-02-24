import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/services/user.service';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { environment } from 'src/environments/environment';
import { CardComponent } from "./shared/card/card.component";
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PostComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        environment.production
            ? []
            : AkitaNgDevtools.forRoot({
                maxAge: 25,
            })
    ]
})
export class AppModule { }
