import { BaseComponent } from './base.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from 'src/app/modules/pessoa/pessoa';

export class BaseEditComponent extends BaseComponent {
    /**
   * If the form was already submitted
   * @type {boolean}
   */
    submitted: boolean = false;
    /**
     * if it is edit or create
     * @type {boolean}
     */
    isEditing: boolean = false;
    /**
     * The Item object is null if it's on create mode
     * @type {any}
     */
    item: any = null;

    loading: boolean = false;


    service: any = null;

    constructor(protected formBuilder: FormBuilder, protected route: ActivatedRoute, service: any) {
        super();
        this.service = service;
    }

    ngOnInit() {
        super.ngOnInit();
        const id: number = +this.route.snapshot.paramMap.get("id");

        if (id) {
            this.isEditing = true;
            this.setItem(id);
        } else {
            this.generateForm();
        }

    }

    async setItem(id: any) {
        this.loading = true;
        await this.service.getById(id).subscribe(result => {
            this.item = result;
            this.generateForm();
            this.loading = false;
        }, err => {
            console.log(err);
        });
    }

    protected generateForm() {}

}