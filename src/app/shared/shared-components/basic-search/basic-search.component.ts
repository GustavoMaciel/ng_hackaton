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

    public formGroup: FormGroup;

    constructor(protected formBuilder: FormBuilder) { }

    ngOnInit() {
        this.generateForm()
    }

    generateForm() {
        this.formGroup = this.formBuilder.group({
            search: ['']
        })
    }

    onSubmit(): void{
        const searchValue = this.formGroup.controls.search.value
        const emit = {
            search: searchValue
        }
        this.submit.emit(emit);
    }

}
