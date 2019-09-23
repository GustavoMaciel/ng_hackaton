import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-amount-per-page',
    templateUrl: './amount-per-page.component.html',
    styleUrls: ['./amount-per-page.component.scss']
})
export class AmountPerPageComponent {

    @Output() amountChanged = new EventEmitter<any>();
    amountPerPage = 10;
    

    constructor() { }

    onChange(value: number) {
        this.amountChanged.emit(value);
    }

}
