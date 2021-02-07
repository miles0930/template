import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffComponent } from './event-listener/off/off.component';
import { OnComponent } from './event-listener/on/on.component';
import { AttrComponent } from './manipulations/attr/attr.component';
import { ClassComponent } from './manipulations/class/class.component';
import { CssComponent } from './manipulations/css/css.component';

@NgModule({
    declarations: [
        AppComponent,
        ClassComponent,
        AttrComponent,
        CssComponent,
        OnComponent,
        OffComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
