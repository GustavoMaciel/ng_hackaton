import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() pageDict: any;
    @Input() update: Subject<any>;
    @Output() pageChanged = new EventEmitter<any>();

    firstPage: number = 1;
    maxPages: number = 5;
    lastPage: number = 1;

    leftIcon = faAngleDoubleLeft;
    rightIcon = faAngleDoubleRight;

    //pages = [];

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
    get pages(){
        let pages = [];
        let auxPages = this.updatePages();
        for (let i=0; i < this.maxPages; i++){
            if (pages.length < auxPages.length) {
                pages.push(auxPages[i]);
            }
        }
        return pages;
    }

    constructor() { }

    ngOnInit() {
        this.updatePages();
        this.update.subscribe(res => {
            this.updatePages();
        });
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

    public updatePages() {
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
        let auxPages = [];

        for (let i = 0; i < this.maxPages; i++) {
            if (index <= lastIndex) {
                auxPages[i] = index++;
            }
        }
        return auxPages;
    }


}
