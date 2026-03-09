import { Injectable } from "@angular/core";
import { LoginResponse } from "../models/login-response.model";
import { BehaviorSubject, map } from "rxjs";
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: string | null = null;
    private _username: string | null = null; 
    currentUser=new BehaviorSubject< {username: string} | null>(null);

    decodeUser(token: string) {
      const payload: any = jwtDecode(token);
        return {
             username: payload.sub
        };
    }
    setAuth(user: LoginResponse){
        this._token = user.token;
        this._username = user.username;
        const decodedUser = this.decodeUser(user.token);
        this.currentUser.next(decodedUser);
    }
    clearAuth(){
        this._token = null;
        this._username = null;
        this.currentUser.next(null);
    }
    get isLoggedIn() {
        return this.currentUser.pipe(map(user => user !== null && user !== undefined));
    }
    getTokenValue() {
        return this._token;
    }
    logOut() {
        this.clearAuth();   
    }

    
}