import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngbd-pagination-basic',
    templateUrl: './pagination-basic.html'
})


export class NgbdPaginationBasic {
    @Input() pages: number;
    
    page = 4;
}
