import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppInjector} from '../../app.injector';

export abstract class  BaseComponent implements OnInit {
    protected router: Router = AppInjector.get(Router)

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
}