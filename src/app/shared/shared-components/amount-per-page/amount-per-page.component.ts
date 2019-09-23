import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-amount-per-page',
    templateUrl: './amount-per-page.component.html',
    styleUrls: ['./amount-per-page.component.scss']
})
export class AmountPerPageComponent {

    @Output() amountChanged = new EventEmitter<any>();
    validAmounts: number[] = [5, 10, 20];
    @Input() currentAmount = 5;

    constructor() { }

    isValid(value: number): boolean {
        for (let val of this.validAmounts){
            if(val == value){
                return true;
            }
        }
        return false;
    }

    onChange(value: number) {
        if (this.isValid(value)) {
            this.currentAmount = value;
            this.amountChanged.emit(value);
        }
    }

}
