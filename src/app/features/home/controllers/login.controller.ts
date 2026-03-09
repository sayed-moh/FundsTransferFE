import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { environment } from '../../../../enviroments/enviroment';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginController {  
    uri = environment.apiUrl
    constructor(private http: HttpClient) { }
    login(loginRequest:LoginRequest){
        return this.http.post<LoginResponse>(this.uri+'/api/auth/login', loginRequest);
    }
    signUp(signUpRequest:LoginRequest){
        return this.http.post<LoginResponse>(this.uri+'/api/auth/signup', signUpRequest);
    }
}