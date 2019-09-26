import { BaseComponent } from './base.component';
import { ActivatedRoute } from '@angular/router';

export class BaseViewComponent extends BaseComponent {

    item: any;

    constructor(private service: any) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        const id = this.getId();
        this.setItem(id);
    }

    getId() {
        return null;
    }

    setItem(id: any){
        this.service.getById(id).subscribe((result) => {
            this.item = result;
          });
    }

    protected getRouterURL(): string {
        return null;
      }
}