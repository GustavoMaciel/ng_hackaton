import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppInjector} from '../../app.injector';
import { faEdit, faEye, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export abstract class  BaseComponent implements OnInit {
    protected router: Router = AppInjector.get(Router)


    /**
     * Icons
     */
    protected editIcon = faEdit;
    protected deleteIcon = faTrash;
    protected viewIcon = faEye;
    protected addIcon = faPlusCircle;

    constructor() {}
    ngOnInit(): void{}

    /**
     * Navigates to the path provided
     * 
     * @param {any[]} urls 
     */
    protected navigate(urls: any[]): void{
        this.router.navigate(urls);
    }

    protected getRouterURL(): string{
        return null
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
}