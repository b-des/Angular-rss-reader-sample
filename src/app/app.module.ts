import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { UniquePipe } from './unique.pipe';
import { ChartsModule } from 'ng2-charts-x';
import { StorageServiceModule} from 'angular-webstorage-service';

@NgModule({
    declarations: [
        AppComponent,
        UniquePipe
    ],
    imports: [
        BrowserModule,
        ChartsModule,
        AppRoutingModule,
        HttpClientModule,
        StorageServiceModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
