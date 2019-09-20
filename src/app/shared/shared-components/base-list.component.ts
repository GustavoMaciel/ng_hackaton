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
    protected totalItems = 1;
    /**
     * If the items are loading
     */
    public loading: boolean = true;

    public service: any;

    items: any[] = [];

    constructor() {
        super();
    }

    get pageDict () {
        return {
            totalPages: this.totalPages,
            currentPage: this.currentPage,
            pageSize: this.currentPageSize,
        }
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

    search(searchParam: any) {
        this.loading = true;
        this.service.search(searchParam).subscribe(
            result => {
                this.totalPages = result.totalPages;
                this.currentPage = result.currentPage;
                this.currentPageSize = result.pageSize;
                this.loading = false;
                this.items = result.items;
            },
            err => {
                console.log(err);
            }
        );
    }

    getAll() {
        this.loading = true;
        this.service.getAll().subscribe(
            result => {
                this.totalPages = result.totalPages;
                this.currentPage = result.currentPage;
                this.currentPageSize = result.pageSize;
                
                this.loading = false;
                this.items = result.items;
                this.totalItems = result.totalItems;
            },
            err => {
                console.log(err);
            }
        );
    }

    receiveDeleteEvent(event: any) {
        this.delete(event.id)
    }

    delete(id: any): void {
        this.service.delete(id).subscribe(result => {
            this.getAll();
        }, err => {
            console.log(err);
        });
    }
}