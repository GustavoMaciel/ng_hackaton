import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    
    @Output() deleted = new EventEmitter<any>();
    @Input() id: any;
    @Input() title: any;
    @Input() message: string;

    constructor() { }

    ngOnInit() {
    }

    delete(id: any) {
        this.deleted.emit({id: this.id})
    }

}
