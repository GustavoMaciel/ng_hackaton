import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

    @Input() service: any;
    @Input() id: any;
    @Input() title: any;
    @Input() message: string;

    constructor() { }

    ngOnInit() {
    }

    delete(id: any) {
        this.service.delete(id).subscribe(result => {
            
        }, err => {
            console.log(err);
        });
        return false;
    }

}
