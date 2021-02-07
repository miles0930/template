import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttrComponent } from './manipulations/attr/attr.component';
import { ClassComponent } from './manipulations/class/class.component';
import { CssComponent } from './manipulations/css/css.component';
import { EventListenerComponent } from './event-listener/event-listener.component';

@NgModule({
    declarations: [
        AppComponent,
        ClassComponent,
        AttrComponent,
        CssComponent,
        EventListenerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
