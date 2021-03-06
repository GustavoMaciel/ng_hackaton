import { BaseComponent } from './base.component';
import { Subject } from 'rxjs';

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
    protected currentPageSize = 5;
    /**
     * Number of items
     */
    protected totalItems = 1;

    protected pages = [];
    /**
     * If the items are loading
     */
    public loading: boolean = true;
    /**
     * Service to be used by child
     */
    public service: any;
    /**
     * Object to facilitate access on pagination
     */
    protected pageDict = {
        totalPages: this.totalPages,
        currentPage: this.currentPage,
        pageSize: this.currentPageSize,
        totalItems: this.totalItems,
        pages: this.pages
    }
    /**
     * Object to keep track of what has been searched
     */
    protected searched: any = { name: "" };
    /**
     * Array of child items
     */
    protected items: any[] = [];
    /**
     * Subject to update pagination after item deletion
     */
    protected updatePagination: Subject<any> = new Subject<any>();


    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.search(this.searched);
    }


    /**
     * Navigates to the create route
     */
    add() {
        this.navigate([this.getRouterURL(), 'create']);
        return false;
    }
    /**
     * Updates Page Dict when something changes, mainly because of searches
     */
    updatePageDict() {
        this.pageDict = {
            totalPages: this.totalPages,
            currentPage: this.currentPage,
            pageSize: this.currentPageSize,
            totalItems: this.totalItems,
            pages: this.pages
        };
    }

    updateAttributes(result: any){
        this.totalPages = result.totalPages;
        this.currentPage = result.currentPage;
        this.currentPageSize = result.pageSize;

        this.loading = false;
        this.items = result.items;
        this.totalItems = result.totalItems;

        this.pages = result.pages;

        this.updatePageDict();
    }

    /**
     * Method to handle searches
     * Object must be {name: ""}
     * @param {Object} searchParam 
     * @param {number} page 
     */
    search(searchParam: any, page?: number) {
        this.loading = true;
        this.service.search(searchParam, page).subscribe(
            result => {
                this.updateAttributes(result);
            },
            err => {
                console.log(err);
            }
        );
    }


    /**
     * Method to deal with deletion on child component
     * @param event 
     */
    receiveDeleteEvent(event: any) {
        this.updatePagination.next(Math.random());
        this.delete(event.id)
    }
    /**
     * Method to deal with page change on child component
     * @param event 
     */
    receivePageChangeEvent(event: any) {
        this.search(this.searched, event);
    }
    /**
     * Method to deal with search changes on child component
     * @param event
     */
    searchDealer(event: any): void {
        this.updatePagination.next(Math.random());
        this.searched = { name: event.search };
        this.search(this.searched);
    }


    amountPerPageDealer(value: number){
        this.currentPageSize = value;
        this.service.pageSize = this.currentPageSize;

        this.search(this.searched);
        this.updatePageDict();
        this.updatePagination.next(Math.random());
    }


    /**
     * Method to deal with deletions
     * @param id 
     */
    delete(id: any): void {
        this.service.delete(id).subscribe(result => {
            this.search(this.searched);
        }, err => {
            console.log(err);
        });
    }
}