import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppPaginationComponent } from './pagination-component';

@NgModule({
    imports: [BrowserModule, NgbModule],
    declarations: [AppPaginationComponent],
    exports: [AppPaginationComponent],
    bootstrap: [AppPaginationComponent]
})
export class AppPaginationModule{ }