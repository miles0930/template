import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListenerComponent } from './event-listener/event-listener.component';
import { CodingStyleComponent } from './guideline/coding-style/coding-style.component';
import { InstallationComponent } from './guideline/installation/installation.component';
import { AttrComponent } from './manipulations/attr/attr.component';
import { ClassComponent } from './manipulations/class/class.component';
import { CssComponent } from './manipulations/css/css.component';

const routes: Routes = [
    {
        path: 'guideline', children: [
            { path: 'installation', component: InstallationComponent },
            { path: 'coding-style', component: CodingStyleComponent }
        ]
    },
    {
        path: 'event-listener', component: EventListenerComponent
    },
    {
        path: 'manipulations', children: [
            { path: 'attr', component: AttrComponent },
            { path: 'class', component: ClassComponent },
            { path: 'css', component: CssComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
