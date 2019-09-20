import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() pageDict: any;
    @Output() pageChanged = new EventEmitter<any>();

    firstPage: number = 1;
    maxPages: number = 5;
    lastPage: number = 1;
    pages = [];

    get currentPage() {
        return this.pageDict.currentPage;
    }
    set currentPage(value) {
        this.pageDict.currentPage = value;
    }

    get totalPages() {
        return this.pageDict.totalPages;
    }

    set totalPages(value) {
        this.pageDict.totalPages = value;
        this.updatePages();
    }

    constructor() { }

    ngOnInit() {
        this.updatePages();
    }

    changeToFirstPage() {
        this.changePage(this.firstPage);
    }
    changeToLastPage() {
        this.changePage(this.lastPage);
    }
    changePage(page: any) {
        if (page !== this.currentPage) {
            this.currentPage = page;
            this.updatePages();
            this.pageChanged.emit(page);
        }
    }

    updatePages() {
        this.lastPage = this.totalPages;
        const fitAll = this.totalPages <= this.maxPages;

        let firstIndex = fitAll ? 1 : this.currentPage - 2;
        let lastIndex = fitAll ? this.totalPages : this.currentPage + 2;

        if (firstIndex < this.firstPage) {
            firstIndex = this.firstPage;
            lastIndex = lastIndex + (lastIndex - this.firstPage);
        } else if (lastIndex > this.totalPages) {
            firstIndex = firstIndex - (lastIndex - this.totalPages);
            lastIndex = this.totalPages;
        }

        let index = firstIndex;
        this.pages = [];

        for (let i = 0; i < this.maxPages; i++) {
            if (index <= lastIndex) {
                this.pages[i] = index++;
            }
        }
    }


}
