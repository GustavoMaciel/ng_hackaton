import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { AppInjector } from 'src/app/app.injector';
import { Router } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { SERVER_URL, LoginURL } from '../url/url.domain';


export const STORAGE_KEY = 'user';

@Injectable()
export class AuthService extends BaseService {
    /**
     * Service to manage redirects
     */
    public router: Router = AppInjector.get(Router)

    constructor(){
        super();
    }

    /**
     * Gets the user
     */
    getUser(){
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    /**
     * Verify if the user is logged 
     * 
     * @returns {boolean}
     */
    isLogged(): boolean {
        return this.getUser() !== null;
    }

    /**
     * Get token user.
     * 
     * @returns {string}
     */
    protected getToken(type: string): string{
        const user = this.getUser();
        if(user){
            return this.getUser()[type]
        }
        return null;
    }

    /**
     * Get access token for the user
     * 
     * @returns {string}
     */
    getAccessToken(): string{
        return this.getToken('token');
    }

    /**
     * Get refresh token for the user
     * 
     * @returns {string}
     */
    getRefreshToken(): string {
        return this.getToken('refreshToken');
    }

    /**
     * Saves the user's token
     * 
     * @param token
     */
    saveToken(token: any): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(token))
    }

    /**
     * Log the user out
     * 
     * @param redirectTo
     */
    logout(redirectTo: string = '/login'): void {
        localStorage.removeItem(STORAGE_KEY)
        this.router.navigate([redirectTo]);
    }

    /**
     * Update token access and refresh token.
     * 
     * @returns {Observable<string>}
     */
    refreshToken(): Observable<string> {
        return this.http.post(SERVER_URL + LoginURL.REFRESH_TOKEN, {token: this.getRefreshToken()})
            .pipe(map((result: any) => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
                return this.getUser().token;
            }), catchError((error) => {
                //this.notification.warning(this.translate.instant('system.session.expired'));
                this.logout();
                return empty();
            }));
    }    
}