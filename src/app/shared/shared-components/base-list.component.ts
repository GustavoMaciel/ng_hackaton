import { BaseComponent } from './base.component';

export class BaseListComponent extends BaseComponent {
    /**
   * Number of total pages
   */
    public totalPages = 1;
    /**
     * Current page
     */
    public currentPage = 1;
    /**
     * Number of items per page
     */
    protected currentPageSize = 10;
    /**
     * If the items are loading
     */
    public loading: boolean = true;

    items: any[] = [];

    constructor() {
        super();
    }


    /**
     * Navigates to the edit route
     * 
     * @param {any} id 
     */
    edit(id: any) {
        this.navigate([this.getRouterURL(), 'edit', id ? id : '']);
        return false;
    }

    /**
     * Navigates to the view route
     * 
     * @param {any} id 
     */
    view(id: any) {
        this.navigate([this.getRouterURL(), 'view', id ? id : '']);
        return false;
    }

    /**
     * Navigates to the create route
     */
    add() {
        this.navigate([this.getRouterURL(), 'create']);
        return false;
    }

    search(service: any, searchParam: any) {
        this.loading = true;
        service.search(searchParam).subscribe(
            result => {
                this.totalPages = result.totalPages;
                this.loading = false;
                this.items = result.items;
            },
            err => {
                console.log(err);
            }
        );
    }

    getAll(service: any) {
        this.loading = true;
        service.getAll().subscribe(
            result => {
                this.totalPages = result.totalPages;
                this.loading = false;
                this.items = result.items;
            },
            err => {
                console.log(err);
            }
        );
    }

    delete(service: any, id: any): void {
        service.delete(id).subscribe(result => {
            //this.listItems(service);
        }, err => {
            console.log(err);
        });
    }
}