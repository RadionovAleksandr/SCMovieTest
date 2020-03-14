import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPaginationComponent } from './pagination-component';

@NgModule({
    imports: [BrowserModule, NgbModule],
    declarations: [NgbdPaginationComponent],
    exports: [NgbdPaginationComponent],
    bootstrap: [NgbdPaginationComponent]
})
export class NgbdPaginationModule { }