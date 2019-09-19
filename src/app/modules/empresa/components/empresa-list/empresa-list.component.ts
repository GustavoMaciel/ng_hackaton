import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/shared-components/base-list.component';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'app-empresa-list',
    templateUrl: './empresa-list.component.html',
    styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent extends BaseListComponent {

    constructor(service: EmpresaService) { super(); this.service = service; }

    ngOnInit() {
        super.ngOnInit();
        this.getAll();
    }


    protected getRouterURL(): string {
        return 'empresa';
    }

    get companies() {
        return this.items
    }

    searchDealer(event: any): void {
        if (event.search) {
            this.search({ name: event.search })
        }
    }

}
