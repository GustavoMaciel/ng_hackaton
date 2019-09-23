import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-basic-search',
    templateUrl: './basic-search.component.html',
    styleUrls: ['./basic-search.component.scss']
})
export class BasicSearchComponent implements OnInit {

    @Output()
    submit = new EventEmitter<any>();
    stringToSearch: string;

    searchIcon = faSearch;


    constructor() {
     }

    ngOnInit() {
    }

    onSubmit(): void {
        const emit = {
            search: this.stringToSearch ? this.stringToSearch.toLowerCase() : ""
        }
        this.submit.emit(emit);
    }

}
