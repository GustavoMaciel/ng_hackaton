import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { LoginURL, UserURL } from '../url/url.domain';

@Injectable()
export class UserService extends AuthService {
    constructor(){
        super();
    }

    /**
     * Log the user in
     * 
     * @param username 
     * @param password 
     */
    login(username, password) {
        return this.post(LoginURL.BASE, { username, password });
    }

    changePassword(body: any){
        return this.patch(UserURL.CHANGE_PASSWORD, body)
    }
}