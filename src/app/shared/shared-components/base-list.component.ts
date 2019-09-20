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

    protected pageDict = {
        totalPages: this.totalPages,
        currentPage: this.currentPage,
        pageSize: this.currentPageSize,
    }

    searched: any = {name: ""};

    items: any[] = [];

    constructor() {
        super();
    }

    ngOnInit(){
        super.ngOnInit();
        this.search(this.searched);
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

    updatePageDict() {
        this.pageDict = {
            totalPages: this.totalPages,
            currentPage: this.currentPage,
            pageSize: this.currentPageSize,
        }
    }

    search(searchParam: any, page?: number) {
        this.loading = true;
        this.service.search(searchParam, page).subscribe(
            result => {
                this.totalPages = result.totalPages;
                this.currentPage = result.currentPage;
                this.currentPageSize = result.pageSize;

                this.loading = false;
                this.items = result.items;
                this.totalItems = result.totalItems;

                this.updatePageDict();
            },
            err => {
                console.log(err);
            }
        );
    }


    receiveDeleteEvent(event: any) {
        this.delete(event.id)
    }

    receivePageChangeEvent(event: any) {
        this.search(this.searched, event);
    }

    searchDealer(event: any): void {
        this.searched = {name: event.search};
        this.search(this.searched);
    }

    delete(id: any): void {
        this.service.delete(id).subscribe(result => {
            this.getAll();
        }, err => {
            console.log(err);
        });
    }
}