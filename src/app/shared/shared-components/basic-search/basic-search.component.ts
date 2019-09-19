import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-basic-search',
    templateUrl: './basic-search.component.html',
    styleUrls: ['./basic-search.component.scss']
})
export class BasicSearchComponent implements OnInit {

    @Output()
    submit = new EventEmitter<any>();


    constructor() { }

    ngOnInit() {
    }


    onSubmit(input: any): void {
        const emit = {
            search: input.value ? input.value : ""
        }
        this.submit.emit(emit);
    }

}
